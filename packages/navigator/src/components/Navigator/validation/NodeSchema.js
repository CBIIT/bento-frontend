import { z } from "zod";

const TagSchema = z.object({
    Category: z.string(),
    Assignment: z.enum(['core', 'extended']),
    Class: z.enum(['primary', 'secondary']),
    Template: z.enum(['Yes', 'No'])
});

export const NodeSchema = z.object({
  Desc: z.string().optional(),
  Tags: TagSchema,
  Props: z.string().array(),
});
