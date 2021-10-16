import React from "react";
import Container from "../components/container/Container";

export default function HowToUse() {
    return (
        <Container>
            <h2>
                Guide to use:
            </h2>

            <ol>
                <li>
                    Abbreviations:
                    <ul className="howtoList">
                        <li>be = bell</li>
                        <li>bo = bore (where only a single measurement is cited; bo1 refers to the inside bore of the initial or "descending" slide tube, bo2 to the inside bore of the "ascending" slide tube)</li>
                        <li>diam. = diameter</li>
                        <li>ext. = exterior</li>
                        <li>int. = interior</li>
                        <li>h = height (i.e., length from tip of bell-bow to tip of slide-bow)</li>
                        <li>le = overall length of tube (without mouthpiece unless otherwise specified)</li>
                        <li>mp = mouthpiece</li>
                        <li>orig. = original</li>
                        <li>pos. = position, positions</li>
                        <li>sec. = section</li>
                        <li>Bibliographical abbreviations: Abb. = Abbildung, Abbildungen (illustration, illustrations)</li>
                    </ul>
                </li>
                <li>Dimensions are given in millimeters unless otherwise indicated.</li>
                <li>All cataloged instruments are made of brass unless otherwise indicated.</li>
                <li>Under Literature, published photographs or drawings are shown next to the source (shown in parenthesis) or as a link for website publications.</li>
                <li>Where a single biographical entry is cited in connection with an instrument, it may be assumed to be the source of the information for that instrument. Where multiple citations are given for one instrument, the work marked with an asterisk may be assumed to be the source for information on that instrument.</li>
                <li>Dates are derived from inscriptions wherever possible, and the checklist is arranged chronologically. Subscript numbers following dates distinguish among multiple instruments produced in the same year. For undated instruments, approximate dates, supplied by museum catalogues and other secondary sources, have been adopted here. The letters "ca." following a date signify "circa"; the letter "c" by itself signifies "century" (i.e., 18c = 18th century); 18cM = mid-eighteenth century; 18c2H = 18th century, second half; 18c2Q = 18th century, second quarter, and so on.</li>
                <li>Signatures are copied here exactly as they appear in the secondary sources from which they are derived unless the author has examined the instrument personally. All signatures appear on the garland of the instrument unless otherwise indicated.</li>
                <li>Information on pitch is reported exactly as it appears in the cited secondary source(s) unless the author has examined the instrument personally. Thus, many seventeenth-century tenor trombones are reported here to be in B-flat, even though it is unlikely that this was the nominal pitch for any trombone during the period in question. Seventeenth-century instruments reported by modern writers to be in B-flat were probably considered to be in A at “high” pitch (Praetorius’ CammerThon, essentially equivalent to the pitch known as Chorton in most areas of Germany in the 18th century).</li>
                <li>All instruments are assumed to have no slide stockings unless otherwise indicated.</li>
                <li>
                    Guide to MUSEUM SIGLA:
                    <ul className="howtoList">
                        <li>A-G = Graz, Grazer Öffentliche Sammlungen</li>
                        <li>A-K = Kremsmünster, Schloss Kremsegg</li>
                        <li>A-L = Linz, Oberösterreisches Landesmuseum</li>
                        <li>A-LA = Lambach, Monastery</li>
                        <li>A-S = Salzburg, Museo Carolino Augusteum </li>
                        <li>A-SE = Seitenstettin, Stift (as of June 1999, instruments on loan to Innsbrucker Bläserkreis)</li>
                        <li>A-Wk = Vienna, Kunsthistorisches Museum, Sammlung alter Musikinstrumente</li>
                        <li>A-Wg = Vienna, Gesellschaft der Musikfreunde </li>
                        <li>B-A = Antwerp, Museum Vleeshuis</li>
                        <li>B-Bcm = Brussels, Conservatory of Music, Instrument Museum</li>
                        <li>B-Bma = Brussels, Musée de l'Armée</li>
                        <li>CH-BAhm = Basel, Historisches Museum, Collection of Ancient Instruments</li>
                        <li>CH-BAhh = Basel, private collection of Heinrich Huber</li>
                        <li>CH-BE= Bern, Historical Museum</li>
                        <li>CH-BI = Binningen, private collection of E.W. Buser</li>
                        <li>CH-BU = Burgdorf (Switzerland), Rittersaalverein Historisches Museum</li>
                        <li>CH-R = Rheinfelden, Fricktaler Museum</li>
                        <li>CH-Z = Zurich, Landesmueum</li>
                        <li>CH-ZIM = Zimmerwald, private collection of Karl Burri</li>
                        <li>CR-O = Olomouc, Krajské Vastivédné Muzeum </li>
                        <li>CR-Pn = Prague, Hudebni Oddeleni Narodniho Muzea</li>
                        <li>CR-Ps = Prague, Strahov Monastery (lost; inventory of 1747 repr. in Keller 1975)</li>
                        <li>CR-Psm = Prague, Symposium Musicum (ensemble)</li>
                        <li>D-A = Altötting, Wallfahrts- und Heimatmuseum</li>
                        <li>D-B = Berlin, Muzikinstrumenten-Museum</li>
                        <li>D-BT = Berthelsdorf near Herrnhut (Saxony), Kirchgemeinde.</li>
                        <li>D-BR = Bremen, Focke Museum</li>
                        <li>D-BRA = Braunschweig, Städtisches Museum	</li>
                        <li>D-E = Eisenach, Bacchaus</li>
                        <li>D-F(M) = Frankfurt-am-Main, Historisches Museum</li>
                        <li>D-F(O) = Frankfurt (Oder), Museum Viadrina</li>
                        <li>D-G = Gotha, Regionalmuseum</li>
                        <li>D-HAL = Halle, Händel-Haus</li>
                        <li>D-HAM = Hamburg, Museum für Hamburgische Geschichte</li>
                        <li>D-HAR = Harburg, Furstlich Oettingen-Wallersteinische Sammlungen.</li>
                        <li>D-I = Ingolstadt, Bavarian Army Museum.</li>
                        <li>D-K = Cologne, Musikinstrumentensammlung des Kölnischen Stadtmuseums</li>
                        <li>D-KA = Kassel, Hessisches Landesmuseum</li>
                        <li>D-LE = Leipzig, Musikinstrumentenmuseum der Universität Leipzig</li>
                        <li>D-LÜ = Lübeck, St. Annen-Museum	</li>
                        <li>D-N = Nuremberg, Germanisches Nationalmuseum</li>
                        <li>D-Mbn = Munich, Bayerischen Nationalmuseum</li>
                        <li>D-Md = Munich, Deutsches Museum</li>
                        <li>D-Ms = Munich, Musikinstrumentenmuseum im Stadtmuseum</li>
                        <li>D-MA = Markneukirchen, Musikinstrumenten-Museum</li>
                        <li>D-R = Rosenheim, Städtisches Museum </li>
                        <li>D-Ruhland = private collection, Konrad Ruhland</li>
                        <li>D-Ssw = Schmalkalden, Heimatmuseum, Schloss Wilhelmsburg </li>
                        <li>D-Ssg = Schmalkalden, Stadtkirch St. Georg</li>
                        <li>D-SI = Sigmaringen an der Donau, Sammlung der Musikinstrumente im Fürstlich-Hohenzollernschen Schloss </li>
                        <li>D-T = Taubenheim (Spree), Evangelisch Lutherische Kirchgemeinde.</li>
                        <li>D-W = Weissenfels, Schlossmuseum</li>
                        <li>DK-Kcc = Copenhagen, Dansk Muzikmuseet (formerly Musikhistorik Museum og Carl Claudius Samling)</li>
                        <li>DK-Kmm = Copenhagen, Musikhistorisk Museum</li>
                        <li>E-B = Barcelona, Museu de la Música</li>
                        <li>EI-D = Dublin***</li>
                        <li>F-N = Nice, Musée du Palais Lascaris</li>
                        <li>F-P = Paris, Musée de Musique (formerly Musée instrumental du Conservatoire National Superieur de Musique)</li>
                        <li>GB-E = Edinburgh, University Collection</li>
                        <li>GB-Lbh = London, Boosey & Hawkes Collection</li>
                        <li>GB-Lh = London, Horniman Museum</li>
                        <li>GB-Lmp = Private collection of Reginald Morley-Pegge</li>
                        <li>H-B = Budapest, Magyar Mezeti Múzeum</li>
                        <li>I-F = Florence, Conservatorio di Musica Luigi Cherubini</li>
                        <li>I-M = Modena, Museo Civico di Storia e Arte Medievale e Moderna di Modena</li>
                        <li>I-V = Verona, Accademia Filarmonica</li>
                        <li>JA-H = Hamamatsu, City Museum of Musical Instruments</li>
                        <li>L-R = Riga (Latvia), Museum of Riga History and Navigation</li>
                        <li>NL-A = Amsterdam, [see Plenkers]</li>
                        <li>NL-DH = The Hague, Gemeentemuseum</li>
                        <li>PL-G = Danzig (Gdánsk), former collection*****</li>
                        <li>PL-Pn = Poznán (Poland), National Museum</li>
                        <li>PL-Ps = Poznán, coll. of Zdzislaw Szulc***** acquired ca. 1950 by PL Poznán;catalogue 1939</li>
                        <li>PL-W = Wroclaw (Poland; formerly Breslau, Germany), Schlesisches Museum für Kunstgewerbe und Altertümer (destroyed 1945; collection lost)</li>
                        <li>R-SP = St. Petersburg, Museum of Musical Instruments</li>
                        <li>S-G = Göteborg, ***</li>
                        <li>S-L = Lund, Kulturhistoriska Museet</li>
                        <li>S-S = Stockholm, Musikmuseet</li>
                        <li>S-Smmc = Stockholm, Maria Magdalena Church</li>
                        <li>S-Skk = Stockholm, Kataryna Kirka</li>
                        <li>S-Sn = Stockhom, Nydahl Collection (Stiftelsen Musikkulturens Främjande)</li>
                        <li>US-AA = Ann Arbor, University of Michigan, Stearns Collection of Musical Instruments</li>
                        <li>US-BE = Bethlehem (PA), Moravian Museum</li>
                        <li>US-BO = Boston, Museum of Fine Arts</li>
                        <li>US-CAe = Cambridge (MA), The Eddy Collection of Musical Instruments</li>
                        <li>US-D = Dearborn (MI), Henry Ford Museum</li>
                        <li>US-GN = Gnadenhutten (OH), John Heckewelder Memorial Moravian Church</li>
                        <li>US-LI = Lititz (PA), Moravian Church (Brethren's House)</li>
                        <li>US-NAZ = Nazareth (PA), Whitefield House</li>
                        <li>US-NH = New Haven (CT), Yale University Collection</li>
                        <li>US-P = Providence (RI), Rhode Island Historical Society</li>
                        <li>US-NY = New York, Center for Musical Antiquities [dealer]</li>
                        <li>US-VE = Vermillion (SD), Shrine to Music Museum</li>
                        <li>US-WS = Winston-Salem (NC), Boys’ School Museum (Old Salem)</li>
                    </ul>
                </li>
            </ol>

        </Container>
    );
};
