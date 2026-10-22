import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const imageRef = z.object({
  id: z.string(),
  file: z.string(),
  alt: z.string(),
});

const block = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('paragraph'),
    text: z.string(),
    center: z.boolean().optional(),
    small: z.boolean().optional(),
  }),
  z.object({ type: z.literal('heading'), level: z.union([z.literal(2), z.literal(3), z.literal(4)]), text: z.string() }),
  z.object({
    type: z.literal('image'),
    imageId: z.string(),
    caption: z.string().optional(),
    maxWidth: z.number().optional(),
    ratio: z.string().optional(),
    ratioMobile: z.string().optional(),
  }),
  z.object({
    type: z.literal('imageText'),
    imageId: z.string(),
    heading: z.string().optional(),
    paragraphs: z.array(z.string()),
    items: z.array(z.string()).optional(),
    button: z.object({ label: z.string(), href: z.string() }).optional(),
    afterParagraphs: z.array(z.string()).optional(),
    tightTop: z.boolean().optional(),
    spaceAfter: z.number().optional(),
    layout: z.enum(['open', 'how', 'photos', 'half', 'benefits']).optional(),
    mediaFirst: z.boolean().optional(),
    ratio: z.string().optional(),
    ratioMobile: z.string().optional(),
    imageShift: z.number().optional(),
  }),
  z.object({ type: z.literal('divider') }),
  z.object({
    type: z.literal('videoList'),
    heading: z.string(),
    items: z.array(z.string()),
    videos: z.array(
      z.object({ youtubeId: z.string(), title: z.string(), srcExtra: z.string().optional() })
    ),
    caption: z.string().optional(),
    layout: z.enum(['open', 'how', 'photos', 'half', 'benefits']).optional(),
  }),
  z.object({
    type: z.literal('textImagePair'),
    paragraphs: z.array(z.string()),
    button: z.object({ label: z.string(), href: z.string() }),
    leftId: z.string(),
    rightId: z.string(),
    layout: z.enum(['open', 'how', 'photos', 'half', 'benefits']).optional(),
    ratio: z.string().optional(),
    ratioMobile: z.string().optional(),
  }),
  z.object({
    type: z.literal('imagePair'),
    leftId: z.string(),
    rightId: z.string(),
    leftCaption: z.string().optional(),
    rightCaption: z.string().optional(),
    ratio: z.string().optional(),
    ratioMobile: z.string().optional(),
    pairedCorners: z.boolean().optional(),
    rightZoom: z.number().optional(),
    spaceBelow: z.number().optional(),
  }),
  z.object({ type: z.literal('list'), items: z.array(z.string()) }),
  z.object({
    type: z.literal('richList'),
    items: z.array(
      z.object({
        html: z.string().optional(),
        text: z.string().optional(),
      })
    ),
  }),
  z.object({
    type: z.literal('button'),
    label: z.string(),
    href: z.string(),
    padY: z.number().optional(),
  }),
  z.object({ type: z.literal('video'), youtubeId: z.string(), title: z.string(), srcExtra: z.string().optional() }),
  z.object({ type: z.literal('html'), html: z.string() }),
]);

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    canonicalPath: z.string(),
    ogTitle: z.string().optional(),
    h1: z.string(),
    flushHeader: z.boolean().default(false),
    images: z.array(imageRef).default([]),
    blocks: z.array(block).default([]),
    services: z
      .array(
        z.object({
          label: z.string(),
          href: z.string().optional(),
          suffix: z.string().optional(),
        })
      )
      .optional(),
    quote: z
      .object({
        text: z.string(),
        source: z.string().optional(),
      })
      .optional(),
    linkGroups: z
      .array(
        z.object({
          heading: z.string(),
          links: z.array(z.object({ label: z.string(), href: z.string() })),
        })
      )
      .optional(),
    bookNow: z
      .object({
        newCustomers: z.string(),
        existingCustomers: z.string(),
        privacy: z.string(),
        emailLabel: z.string(),
        email: z.string(),
        contactLabel: z.string(),
        phone: z.string(),
        phoneHref: z.string(),
        areaServed: z.string(),
        clientLoginUrl: z.string(),
        clientLoginLabel: z.string(),
      })
      .optional(),
    homeCards: z
      .array(
        z.object({
          imageId: z.string(),
          caption: z.string(),
          buttonLabel: z.string(),
          buttonHref: z.string(),
        })
      )
      .optional(),
    hero: z
      .object({
        imageId: z.string(),
        subhead: z.string(),
        primaryCta: z.object({ label: z.string(), href: z.string() }),
        secondaryCta: z.object({ label: z.string(), href: z.string() }),
      })
      .optional(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    order: z.number(),
  }),
});

export const collections = { pages, faq };
