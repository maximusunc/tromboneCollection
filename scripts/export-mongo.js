// One-time migration: copies every trombone out of MongoDB into content/trombones/,
// writing base64 images out to client/public/uploads/ as regular files.
//
// Usage: MONGO_URL="mongodb+srv://user:pass@host/dbname" node scripts/export-mongo.js
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const contentDir = path.join(__dirname, "../content/trombones");
const uploadsDir = path.join(__dirname, "../client/public/uploads");

// identify images by their content rather than the mime type the browser reported on upload
function detectFormat(buffer) {
    const hex = buffer.subarray(0, 12).toString("hex");
    const ascii = buffer.subarray(0, 12).toString("latin1");
    if (hex.startsWith("ffd8ff")) return "jpg";
    if (hex.startsWith("89504e47")) return "png";
    if (ascii.startsWith("GIF8")) return "gif";
    if (ascii.startsWith("RIFF") && ascii.slice(8, 12) === "WEBP") return "webp";
    if (ascii.slice(4, 8) === "ftyp") {
        const brand = ascii.slice(8, 12);
        if (brand.startsWith("avi")) return "avif";
        if (["heic", "heix", "hevc", "mif1", "msf1", "heim", "heis"].includes(brand)) return "heic";
    }
    if (ascii.startsWith("BM")) return "bmp";
    if (hex.startsWith("49492a00") || hex.startsWith("4d4d002a")) return "tiff";
    if (/^\s*(<\?xml|<svg)/i.test(buffer.subarray(0, 100).toString("utf8"))) return "svg";
    return null;
}

// formats browsers other than Safari can't display
const unsupportedFormats = ["heic", "tiff"];

async function main() {
    if (!process.env.MONGO_URL) {
        throw new Error("Set MONGO_URL to your MongoDB connection string.");
    }
    const client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    const trombones = await client.db().collection("trombones").find({}).toArray();
    await client.close();

    fs.mkdirSync(contentDir, { recursive: true });
    fs.mkdirSync(uploadsDir, { recursive: true });

    let imageBytes = 0;
    const problems = [];
    trombones.forEach(({ _id, __v, ...trombone }) => {
        const id = String(_id);
        const label = `${trombone.date || "?"} ${trombone.maker || "?"} (${id})`;
        trombone.images = (trombone.images || []).filter(Boolean).map((image, i) => {
            const match = image.match(/^data:([^,]*?);base64,(.*)$/s);
            if (!match) {
                // not an embedded image, leave as is
                problems.push(`${label} image ${i + 1}: not an uploaded image, kept as a link: ${image.slice(0, 120)}`);
                return image;
            }
            const [, mimeType, data] = match;
            const buffer = Buffer.from(data, "base64");
            const format = detectFormat(buffer);
            if (!format) {
                problems.push(`${label} image ${i + 1}: unrecognized image data (reported as "${mimeType}", ${buffer.length} bytes)`);
            } else if (unsupportedFormats.includes(format)) {
                problems.push(`${label} image ${i + 1}: ${format.toUpperCase()} image, which most browsers can't display; convert it to JPEG and re-upload`);
            }
            const filename = `${id}-${i + 1}.${format || "bin"}`;
            imageBytes += buffer.length;
            fs.writeFileSync(path.join(uploadsDir, filename), buffer);
            console.log(`${label} image ${i + 1}: ${filename} (reported as "${mimeType}", ${(buffer.length / 1024).toFixed(0)} KB)`);
            return `/uploads/${filename}`;
        });
        trombone.footnotes = (trombone.footnotes || []).filter(Boolean);
        fs.writeFileSync(path.join(contentDir, `${id}.json`), JSON.stringify(trombone, null, 2) + "\n");
    });

    console.log(`Exported ${trombones.length} trombones`);
    console.log(`Images: ${(imageBytes / 1024 / 1024).toFixed(1)} MB`);
    if (problems.length) {
        console.log(`\n${problems.length} image problem(s):`);
        problems.forEach(problem => console.log(`- ${problem}`));
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
