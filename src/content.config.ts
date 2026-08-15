import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const characters = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/contents/characters",
  }),
  schema: ({ image }) =>
    z.object({
      epithet: z.string().optional(),
      name: z.string(),
      peerage: z.string().optional(),
      image: image(),
      cast: reference("casts").optional(),
    }),
});

const casts = defineCollection({
  loader: file("src/contents/casts.yaml"),
  schema: z.object({
    name: z.string(),
    role: z.string(),
  }),
});

const staff = defineCollection({
  loader: file("src/contents/staff.yaml"),
  schema: z.object({
    role: z.string(),
    name: z.string(),
    note: z.string().optional(),
    colSpan: z.boolean().optional(),
  }),
});

const comments = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/contents/comments",
  }),
  schema: ({ image }) =>
    z
      .object({
        cast: reference("casts").optional(),
        staff: reference("staff").optional(),
        image: image().optional(),
      })
      .refine(({ cast, staff }) => Boolean(cast) !== Boolean(staff), {
        message: "A comment must reference exactly one cast or staff entry.",
      }),
});

const episodes = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/contents/episodes",
  }),
  schema: ({ image }) =>
    z.object({
      episode: z.number(),
      title: z.string(),
      image: image(),
    }),
});

export const collections = { characters, casts, staff, comments, episodes };
