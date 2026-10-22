// One-time migration: copies every trombone out of MongoDB into content/trombones/,
// writing base64 images out to client/public/uploads/ as regular files.
//
// Usage: MONGO_URL="mongodb+srv://user:pass@host/dbname" node scripts/export-mongo.js
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const contentDir = path.join(__dirname, "../content/trombones");
const uploadsDir = path.join(__dirname, "../client/public/uploads");

const extensions = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/svg+xml": "svg",
};

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
    trombones.forEach(({ _id, __v, ...trombone }) => {
        const id = String(_id);
        trombone.images = (trombone.images || []).filter(Boolean).map((image, i) => {
            const match = image.match(/^data:([^;]+);base64,(.*)$/s);
            if (!match) {
                // already a url, leave as is
                return image;
            }
            const [, mimeType, data] = match;
            const filename = `${id}-${i + 1}.${extensions[mimeType] || "jpg"}`;
            const buffer = Buffer.from(data, "base64");
            imageBytes += buffer.length;
            fs.writeFileSync(path.join(uploadsDir, filename), buffer);
            return `/uploads/${filename}`;
        });
        trombone.footnotes = (trombone.footnotes || []).filter(Boolean);
        fs.writeFileSync(path.join(contentDir, `${id}.json`), JSON.stringify(trombone, null, 2) + "\n");
    });

    console.log(`Exported ${trombones.length} trombones`);
    console.log(`Images: ${(imageBytes / 1024 / 1024).toFixed(1)} MB`);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
