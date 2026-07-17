import fs from "fs/promises";
import path from "path";
import Image, { type StaticImageData } from "next/image";

const STICKERS_DIR = path.join(process.cwd(), "public", "Images", "Stickers");
const IMAGE_EXTENSIONS = /\.(png|jpe?g|webp|gif|avif|svg)$/i;

// Bounding boxes (% of section) stickers roam within, so placement feels
// hand-scattered rather than gridded, without colliding with the centered
// heading/photo. New stickers are assigned a zone round-robin.
type ZoneBounds = { top?: [number, number]; bottom?: [number, number]; left?: [number, number]; right?: [number, number] };

const ZONES: Record<string, ZoneBounds> = {
  "top-left": { top: [3, 15], left: [2, 14] },
  "top-right": { top: [3, 15], right: [2, 14] },
  "top-center": { top: [1, 9], left: [34, 52] },
  "mid-left": { top: [36, 56], left: [1, 9] },
  "mid-right": { top: [36, 56], right: [1, 9] },
  "bottom-left": { bottom: [3, 16], left: [3, 16] },
  "bottom-right": { bottom: [3, 16], right: [2, 15] },
};

const ZONE_KEYS = Object.keys(ZONES) as (keyof typeof ZONES)[];
// zones whose stickers get hidden on small screens to avoid crowding the
// stacked mobile layout, where the hero content takes the full width.
const MOBILE_HIDDEN_ZONES = new Set(["mid-left", "mid-right"]);

// Deterministic seeded PRNG so the "random" scatter is identical on the
// server render and the client hydration pass (avoids hydration mismatch).
function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(rand: () => number, [min, max]: [number, number]) {
  return min + rand() * (max - min);
}

function toAltText(filename: string) {
  return filename
    .replace(IMAGE_EXTENSIONS, "")
    .replace(/[-_.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function loadStickers() {
  let filenames: string[] = [];
  try {
    filenames = (await fs.readdir(STICKERS_DIR))
      .filter((name) => IMAGE_EXTENSIONS.test(name))
      .sort();
  } catch {
    return [];
  }

  return Promise.all(
    filenames.map(async (filename, index) => {
      const { default: image } = (await import(
        `@/public/Images/Stickers/${filename}`
      )) as { default: StaticImageData };

      const zoneKey = ZONE_KEYS[index % ZONE_KEYS.length];
      const rand = mulberry32(hashSeed(filename));
      const zone = ZONES[zoneKey];

      const position: Record<string, string> = {};
      if (zone.top) position.top = `${lerp(rand, zone.top).toFixed(1)}%`;
      if (zone.bottom) position.bottom = `${lerp(rand, zone.bottom).toFixed(1)}%`;
      if (zone.left) position.left = `${lerp(rand, zone.left).toFixed(1)}%`;
      if (zone.right) position.right = `${lerp(rand, zone.right).toFixed(1)}%`;

      // widest side of the sticker (in px) is randomized; the other side
      // follows the image's real aspect ratio, so nothing gets cropped.
      const longSide = lerp(rand, [64, 140]);
      const ratio = image.width / image.height;
      const widthPx = ratio >= 1 ? longSide : longSide * ratio;

      return {
        filename,
        image,
        alt: toAltText(filename),
        badge: /hex|badge/i.test(filename),
        hiddenOnMobile: MOBILE_HIDDEN_ZONES.has(zoneKey),
        position,
        widthPx,
        ratio,
        rotate: lerp(rand, [-18, 18]),
        delay: lerp(rand, [0, 1.6]),
        duration: lerp(rand, [3.2, 5.4]),
      };
    })
  );
}

export default async function Stickers() {
  const stickers = await loadStickers();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {stickers.map((sticker) => {
        const vw = ((sticker.widthPx / 1100) * 100).toFixed(2);

        return (
          <div
            key={sticker.filename}
            className={`pointer-events-auto absolute transition-transform duration-300 ease-out hover:scale-110 hover:z-20 ${
              sticker.hiddenOnMobile ? "hidden sm:block" : ""
            }`}
            style={{
              ...sticker.position,
              width: `clamp(40px, ${vw}vw, ${sticker.widthPx.toFixed(0)}px)`,
              aspectRatio: `${sticker.ratio}`,
              rotate: `${sticker.rotate.toFixed(1)}deg`,
            }}
          >
            <div
              className="animate-float relative h-full w-full"
              style={{
                animationDelay: `${sticker.delay.toFixed(2)}s`,
                animationDuration: `${sticker.duration.toFixed(2)}s`,
              }}
            >
              <div
                className={`relative h-full w-full ${
                  sticker.badge ? "drop-shadow-xl" : "rounded-xl border-[3px] border-white bg-white shadow-xl"
                }`}
              >
                <Image src={sticker.image} alt={sticker.alt} fill sizes="180px" className="object-contain" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
