import { defineCollection, z } from 'astro:content';

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    company:    z.string(),
    role:       z.string(),
    role_es:    z.string(),
    startDate:  z.string(), // "YYYY-MM"
    endDate:    z.string().optional(), // omit = "Present"
    bullets:    z.array(z.string()).max(4),
    bullets_es: z.array(z.string()).max(4),
  }),
});

const education = defineCollection({
  type: 'content',
  schema: z.object({
    institution: z.string(),
    degree:      z.string(),
    degree_es:   z.string(),
    startYear:   z.number(),
    endYear:     z.number().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title:          z.string(),
    description:    z.string(),
    description_es: z.string(),
    tags:           z.array(z.string()),
    image:          z.string().optional(),
    liveUrl:        z.string().url().optional(),
    repoUrl:        z.string().url().optional(),
    order:          z.number().default(0), // for display ordering
  }),
});

export const collections = { experience, education, projects };
