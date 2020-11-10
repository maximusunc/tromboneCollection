import React from "react";
import Container from "../components/container/container";

const HowToUse = () => {
    return (
        <Container>
            <h2>
                Guide to use:
            </h2>

            <ol>
                <li>Abbreviations: be = bell; bo = bore (where only a single measurement is cited; bo1 refers to the inside bore of the initial or "descending" slide tube, bo2 to the inside bore of the "ascending" slide tube; diam. = diameter; ext. = exterior; int. = interior; h = height (i.e. length from tip of bell-bow to tip of slide-bow); le = overall length of tube (without mouthpiece unless otherwise specified); mp = mouthpiece; orig. = original; pos. = position, positions; sec. = section. Bibliographical abbreviations: Abb. = Abbildung, Abbildungen (illustration, illustrations)</li>
                <li>Dimensions are given in millimeters unless otherwise indicated.</li>
                <li>All instruments made of brass unless otherwise indicated.</li>
                <li>Under Literature, published photographs are shown in bold roman type, drawings are indicated in italic type; scale drawings in bold italic type. Where a single biographical entry is cited in connection with an instrument, it may be assumed to be the source of the information for that instrument; where multiple citations are given for one instrument, the work marked with an asterisk may be assumed to be the source for information on that instrument.</li>
                <li>Dates are derived from inscriptions wherever possible, and the checklist is arranged chronologically. Subscript numbers following dates distinguish among multiple instruments produced in the same year. For undated instruments, approximate dates supplied by museum catlaogues and other secondary sources have been adopted here. ****The letters "ca." following a date signify "circa"; the letter "c" by itself signifies "century" (i.e., 18c = 18th century); 18cM = mid-eighteenth century; 18c2H = 18th century, second half; 18c2Q = 18th century, second quarter, and so on.</li>
                <li>Signatures are copied here exactly as they appear in the secondary sources form which they are derived, unless the author has examined the instrument personally. All appear on the garland of the instrument unless otherwise indicated.</li>
                <li>Information on pitch is reported exactly as it appears in the cited secondary source(s), unless the author has examined the instrument personally. Thus many seventeenth-century tenor trombones are reported here to be in B-flat, even though it is unlikely that this was the nominal pitch for any trombone during the period in question. Seventeenth-century instruments reported by modern writers to be in B-flat were probably considered to be in A at “high” pitch (Praetorius’ CammerThon, essentially equivalent to the pitch known as Chorton**** in most areas of Germany in the 18th century).</li>
                <li>All instruments are assumed to have no slide stockings unless otherwise indicated.</li>
            </ol>

        </Container>
    );
};

export default HowToUse;