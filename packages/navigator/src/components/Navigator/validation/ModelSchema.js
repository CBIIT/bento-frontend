import { z } from "zod";

const ModelSchema = z.object({
  name: z.string(),
  age: z.number().min(0),
  isActive: z.boolean(),
});
