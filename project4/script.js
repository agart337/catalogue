// Rijksmuseum collection API
const API = "https://data.rijksmuseum.nl/search/collection?imageAvailable=true&type=painting";

const HOLD = 5000;          // how long each image stays, ms
const TRANSITION = 2500;    // length of the threshold effect, ms
const START_BLEACH = 0.5;  // how far the threshold starts from neutral (0 to 0.5)
const START_GAIN = 35;      // how harsh the threshold starts (1 = no effect)
const MAX_SIDE = 800;      // working resolution cap, keeps the effect smooth

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const off = document.createElement("canvas");
const offCtx = off.getContext("2d", { willReadFrequently: true });

const ease = t => t * t * (3 - 2 * t);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

function loadOnce(src, cors) {

    return new Promise(resolve => {

        const img = new Image();

        if (cors) {
            img.crossOrigin = "anonymous";
        }

        img.onload = async () => {

            try {
                await img.decode();
            } catch (e) {
                // Continue if the browser has already loaded it
            }

            resolve(img);
        };

        img.onerror = () => resolve(null);

        img.src = src;
    });
}
// Try with CORS so the effect can read pixels; if the server refuses, show it without the effect.
async function load(src) {
    return (await loadOnce(src, true)) || (await loadOnce(src, false));
}

// Convert Rijksmuseum identifiers into usable URLs
function dataURL(url) {
    return url.replace(
        "https://id.rijksmuseum.nl/",
        "https://data.rijksmuseum.nl/"
    );
}

// Get the image URL from an artwork record
async function getArtworkImage(item) {

    try {

        // Get the artwork record
        const artworkURL = dataURL(item.id) + "?_profile=la-framed";

        const artworkRes = await fetch(artworkURL);

        if (!artworkRes.ok) return null;

        const artwork = await artworkRes.json();


        // GET ARTWORK TITLE
        const title = artwork.identified_by?.find(
            item => item.type === "Name"
        )?.content || "Untitled";


        // GET ARTIST
        const artists = artwork.produced_by?.carried_out_by || [];

        const artist = artists.map(person =>
            person._label || person.label || "Unknown artist"
        ).join(", ") || "Unknown artist";


        // GET DATE
        const timespan = artwork.produced_by?.timespan;

        const date = timespan?.begin_of_the_begin
            ? timespan.begin_of_the_begin.slice(0, 4)
            : "Date unknown";


        // FIND VISUAL ITEM
        const visualItemURL = artwork.shows?.[0]?.id;

        if (!visualItemURL) return null;

        const visualRes = await fetch(
            dataURL(visualItemURL) + "?_profile=la-framed"
        );

        if (!visualRes.ok) return null;

        const visual = await visualRes.json();


        // FIND DIGITAL OBJECT
        const digitalObjectURL = visual.digitally_shown_by?.[0]?.id;

        if (!digitalObjectURL) return null;

        const digitalRes = await fetch(
            dataURL(digitalObjectURL) + "?_profile=la-framed"
        );

        if (!digitalRes.ok) return null;

        const digital = await digitalRes.json();


        // FIND IMAGE URL
        const imageURL = digital.access_point?.find(
            item => item.id?.includes("iiif.micr.io")
        )?.id;

        if (!imageURL) return null;


        // RESIZE IMAGE
        const identifier = imageURL
            .split("iiif.micr.io/")[1]
            .split("/")[0];

        const resizedURL =
            `https://iiif.micr.io/${identifier}/full/1200,/0/default.jpg`;


        // RETURN IMAGE + INFORMATION TOGETHER
        return {
            url: resizedURL,
            title: title,
            artist: artist,
            date: date
        };

    } catch (error) {

        console.error("Artwork error:", error);

        return null;
    }
}

function pixelsOf(img) {
    offCtx.fillStyle = "white";
    offCtx.fillRect(0, 0, off.width, off.height);
    const s = Math.min(off.width / img.width, off.height / img.height);
    const w = img.width * s, h = img.height * s;
    offCtx.drawImage(img, (off.width - w) / 2, (off.height - h) / 2, w, h);
    return offCtx.getImageData(0, 0, off.width, off.height);
}

function drawPlain(img) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const s = Math.min(canvas.width / img.width, canvas.height / img.height);
    const w = img.width * s, h = img.height * s;
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
}

function transition(fromImg, toImg) {
    return new Promise(resolve => {
        let a, b;
        try { a = pixelsOf(fromImg); b = pixelsOf(toImg); }
        catch (e) { drawPlain(toImg); return resolve(); }   // canvas blocked by CORS: plain cut

        const n = a.data.length / 4;
        const key = new Float32Array(n);
        for (let i = 0, j = 0; i < n; i++, j += 4) {
            const d = (Math.abs(a.data[j] - b.data[j]) +
                Math.abs(a.data[j + 1] - b.data[j + 1]) +
                Math.abs(a.data[j + 2] - b.data[j + 2])) / 765;
            key[i] = (1 - d) * 0.6 + Math.random() * 0.12;      // big change reveals first, plus grain
        }
        const out = ctx.createImageData(canvas.width, canvas.height);
        const t0 = performance.now();

        function step(now) {
            const p = clamp((now - t0) / TRANSITION);
            const reveal = ease(p) / 0.7;                        // everything revealed by 70%
            const r = ease(clamp((p - 0.3) / 0.7));              // relaxation back to true colour
            const g = 1 + (START_GAIN - 1) * (1 - r) * (1 - r);
            const shift = 0.5 - START_BLEACH * (1 - r);          // threshold level

            const ad = a.data, bd = b.data, od = out.data;
            for (let i = 0, j = 0; i < n; i++, j += 4) {
                if (reveal >= key[i]) {
                    od[j] = ((bd[j] / 255 - shift) * g + 0.5) * 255;
                    od[j + 1] = ((bd[j + 1] / 255 - shift) * g + 0.5) * 255;
                    od[j + 2] = ((bd[j + 2] / 255 - shift) * g + 0.5) * 255;
                } else {
                    od[j] = ad[j]; od[j + 1] = ad[j + 1]; od[j + 2] = ad[j + 2];
                }
                od[j + 3] = 255;
            }
            ctx.putImageData(out, 0, 0);
            if (p < 1) requestAnimationFrame(step);
            else { ctx.putImageData(b, 0, 0); resolve(); }
        }
        requestAnimationFrame(step);
    });
}

const wait = ms => new Promise(r => setTimeout(r, ms));
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

async function start() {

    // 1. Fetch the Rijksmuseum collection
    const res = await fetch(API);

    if (!res.ok) {
        throw new Error("Rijksmuseum API returned " + res.status);
    }

    const data = await res.json();
    const artworks = data.orderedItems || [];

    if (!artworks.length) {
        throw new Error("No artworks found");
    }

    // Keep a manageable collection
    const selectedArtworks = artworks.slice(0, 30);

    let artworkIndex = 0;

    // 2. Get the next fully loaded artwork
    async function nextReady() {

        let attempts = 0;

        while (attempts < selectedArtworks.length) {

            if (artworkIndex >= selectedArtworks.length) {
                artworkIndex = 0;
            }

            const item = selectedArtworks[artworkIndex++];

            attempts++;

            // Resolve the artwork into an image URL
            const frame = await getArtworkImage(item);

            if (!frame) continue;

            const img = await load(frame.url);

            if (img) {
                return {
                    img: img,
                    details: frame
                };
            }
        }

        throw new Error("Could not load an artwork image");
    }

    // 3. Load the FIRST image only
    let current = await nextReady();

    // Set canvas dimensions once
    const scale = Math.min(
        1,
        MAX_SIDE / Math.max(
            current.img.naturalWidth,
            current.img.naturalHeight
        )
    );

    canvas.width = off.width =
        Math.round(current.img.naturalWidth * scale);

    canvas.height = off.height =
        Math.round(current.img.naturalHeight * scale);

    drawPlain(current.img);
    updateArtworkInfo(current.details);

    console.log("First artwork loaded!");

    // 4. Start the slideshow
    while (true) {

        // Start loading the next artwork immediately
        // while the current artwork is still visible
        const nextPromise = nextReady();

        // Keep current image on screen
        await wait(HOLD);

        // Wait until the next image is completely ready
        const next = await nextPromise;

        // 5. Transition between artworks
        if (reduceMotion) {
            drawPlain(next.img);
        } else {
            await transition(current.img, next.img);
        }

        current = next;

        // Update artwork information
        updateArtworkInfo(current.details);
    }
}

function updateArtworkInfo(details) {

    document.getElementById("artwork-title").textContent =
        details.title;

    document.getElementById("artwork-artist").textContent =
        details.artist;

    document.getElementById("artwork-date").textContent =
        details.date;
}

start().catch(console.error);