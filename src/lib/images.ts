/**
 * Map CMS image filenames (under src/assets/images/) to Vite imports.
 * Add a line here when a new image file is added for a page.
 */
import heroTrucks from '../assets/images/hero-trucks.jpg';
import dsc07211 from '../assets/images/dsc07211.jpg';
import caterpillarLeaf from '../assets/images/caterpillar-leaf.jpg';
import teamTruck from '../assets/images/team-truck.jpg';
import cankerworm from '../assets/images/cankerworm.jpg';
import dsc07205 from '../assets/images/dsc07205.jpg';
import dsc07198 from '../assets/images/dsc07198.jpg';
import dsc07217 from '../assets/images/dsc07217.jpg';
import eabBeforeAfter from '../assets/images/eab-before-after.jpg';
import treeazin from '../assets/images/treeazin.jpg';
import eabBeetle from '../assets/images/eab-beetle.jpg';
import eabSigns from '../assets/images/eab-signs.jpg';
import dutchElmHalf from '../assets/images/dutch-elm-half.jpg';
import dedLw from '../assets/images/ded-lw.jpg';
import dutchElmMarked from '../assets/images/dutch-elm-marked.jpg';
import winnipeg from '../assets/images/winnipeg.jpg';
import type { ImageMetadata } from 'astro';

export const imageFiles: Record<string, ImageMetadata> = {
  'hero-trucks.jpg': heroTrucks,
  'dsc07211.jpg': dsc07211,
  'caterpillar-leaf.jpg': caterpillarLeaf,
  'team-truck.jpg': teamTruck,
  'cankerworm.jpg': cankerworm,
  'dsc07205.jpg': dsc07205,
  'dsc07198.jpg': dsc07198,
  'dsc07217.jpg': dsc07217,
  'eab-before-after.jpg': eabBeforeAfter,
  'treeazin.jpg': treeazin,
  'eab-beetle.jpg': eabBeetle,
  'eab-signs.jpg': eabSigns,
  'dutch-elm-half.jpg': dutchElmHalf,
  'ded-lw.jpg': dedLw,
  'dutch-elm-marked.jpg': dutchElmMarked,
  'winnipeg.jpg': winnipeg,
};

export function resolveImage(
  images: { id: string; file: string; alt: string }[],
  id: string
): { src: ImageMetadata; alt: string } {
  const meta = images.find((i) => i.id === id);
  if (!meta) throw new Error(`Unknown image id: ${id}`);
  const src = imageFiles[meta.file];
  if (!src) throw new Error(`Image file not in map: ${meta.file}`);
  return { src, alt: meta.alt };
}
