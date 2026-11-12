import type { CSSProperties } from 'react';

/*
 * Flat, hand-cut produce shapes used as decoration across the app.
 * All are aria-hidden: purely visual.
 */

type ArtProps = { className?: string; style?: CSSProperties };

const C = {
  burgundy: '#8A1C1C',
  orange: '#E8622C',
  rust: '#B4501F',
  cobalt: '#1F3FD1',
  leaf: '#2E6B3A',
  lime: '#9BC53D',
  mustard: '#F2B632',
  pale: '#F2D06B',
  tomato: '#C2432E',
  cream: '#F6EEE3',
  plum: '#3A1F8F',
};

export function Tomato({ className, style }: ArtProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 24c23 1 41 15 39 37-2 20-19 32-41 31-21-1-38-13-37-34 1-20 17-35 39-34z" fill={C.tomato} />
      <path d="M50 18l5 13 14-4-9 11 10 8-14-1-6 13-5-13-14 2 9-9-10-10 14 3z" fill={C.leaf} />
    </svg>
  );
}

export function Lemon({ className, style }: ArtProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M14 52c0-20 17-34 37-34 19 0 35 13 36 32 1 20-15 33-36 33-21 0-37-11-37-31z" fill={C.mustard} />
      <path d="M10 50c-4-1-5 4-1 5M90 47c4-1 5 4 1 5" stroke={C.mustard} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function Pumpkin({ className, style }: ArtProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 30c-14-2-30 6-36 22-6 18 4 36 22 40 10 2 18-2 22-6 6 6 16 8 26 2 16-10 18-34 4-48-10-10-24-12-38-10z" fill={C.mustard} />
      <path d="M50 30c0-8 4-16 10-20" stroke={C.leaf} strokeWidth="7" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Eggplant({ className, style }: ArtProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M30 34c12-10 32-8 44 6 14 16 16 40 4 50-12 10-30 4-40-10-8-12-20-34-8-46z" fill={C.cobalt} />
      <path d="M24 30c8-6 18-6 22 2-6 0-10 4-14 8-2-4-6-6-8-10z" fill={C.leaf} />
    </svg>
  );
}

export function Carrot({ className, style }: ArtProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M44 30c-3 22-6 44-14 64-2-24 0-44 6-62z" fill={C.orange} />
      <path d="M40 32c14-6 22-14 22-26M40 32c-12-4-18-12-16-22" stroke={C.leaf} strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Pear({ className, style }: ArtProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M52 10c10 0 14 12 14 24 0 10 16 18 18 36 2 18-14 26-32 26S16 88 18 70c2-18 18-26 18-36 0-12 6-24 16-24z" fill={C.pale} />
      <path d="M52 10c2-4 6-6 10-6" stroke={C.leaf} strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Egg({ className, style }: ArtProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 12c18 0 34 20 34 44S70 94 50 94 16 80 16 56 32 12 50 12z" fill={C.cream} />
      <path d="M50 40c9 0 16 8 16 18s-7 16-16 16-16-6-16-16 7-18 16-18z" fill={C.mustard} />
    </svg>
  );
}

export function Flower({ className, style }: ArtProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 10c8 10 22 10 26 22 10 2 16 14 10 24 8 10 0 24-12 22-4 12-20 14-26 4-12 6-26-2-24-14-12-4-14-20-4-26-4-12 8-22 18-18 2-10 8-14 12-14z" fill={C.cobalt} />
      <circle cx="50" cy="50" r="12" fill={C.cream} />
    </svg>
  );
}

export function Broccoli({ className, style }: ArtProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="34" cy="40" r="20" fill={C.leaf} />
      <circle cx="62" cy="36" r="22" fill={C.leaf} />
      <circle cx="50" cy="20" r="18" fill={C.leaf} />
      <path d="M46 52l-4 40h16l-4-40z" fill={C.lime} />
    </svg>
  );
}

/** The collage used in the home hero. */
export function HeroCollage() {
  return (
    <div className="hero-art" aria-hidden="true">
      <Pumpkin style={{ width: '46%', right: '18%', top: '4%', transform: 'rotate(-8deg)' }} />
      <Tomato style={{ width: '30%', right: '-2%', top: '-2%', transform: 'rotate(14deg)' }} />
      <Eggplant style={{ width: '40%', right: '-4%', top: '42%', transform: 'rotate(-34deg)' }} />
      <Flower style={{ width: '22%', right: '62%', top: '8%', transform: 'rotate(10deg)' }} />
      <Pear style={{ width: '26%', right: '38%', top: '50%', transform: 'rotate(12deg)' }} />
      <Lemon style={{ width: '24%', right: '64%', top: '56%', transform: 'rotate(-22deg)' }} />
      <Carrot style={{ width: '24%', right: '28%', top: '-4%', transform: 'rotate(40deg)' }} />
      <Broccoli style={{ width: '15%', right: '20%', top: '66%', transform: 'rotate(-6deg)' }} />
    </div>
  );
}

/* ---------- Item tokens (replace emoji with hand-cut colour blobs) ---------- */

const categoryColors: Record<string, { bg: string; light?: boolean }> = {
  'Produce': { bg: C.leaf },
  'Dairy & Eggs': { bg: C.cobalt },
  'Meat & Protein': { bg: C.tomato },
  'Bakery': { bg: C.mustard, light: true },
  'Pantry': { bg: C.burgundy },
  'Frozen': { bg: C.plum },
  'Drinks': { bg: C.rust },
  'Snacks': { bg: C.orange },
  'Household & Cleaning': { bg: C.cobalt },
  'Personal Care': { bg: C.pale, light: true },
  'Pet supplies': { bg: C.leaf },
};

function tiltFor(name: string) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) | 0;
  return `${(Math.abs(h) % 13) - 6}deg`;
}

export function categoryColor(category: string) {
  return (categoryColors[category] ?? { bg: C.orange }).bg;
}

/** Item badge: the item's emoji on a hand-cut blob tinted with its category colour. */
export function ItemToken({ name, emoji, category, small }: { name: string; emoji?: string | null; category: string; small?: boolean }) {
  const bg = categoryColor(category);
  return (
    <span
      className={`token${small ? ' token-sm' : ''}`}
      style={{ background: `color-mix(in oklab, ${bg} 22%, #FBF6EE)`, ['--tilt' as string]: tiltFor(name) } as CSSProperties}
      aria-hidden="true"
    >
      {emoji || name.trim().charAt(0).toUpperCase()}
    </span>
  );
}

const avatarColors = [C.orange, C.cobalt, C.leaf, C.burgundy];
export function avatarColor(index: number) {
  return avatarColors[index % avatarColors.length];
}
