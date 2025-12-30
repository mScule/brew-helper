import z from "zod";

export const BrewerSchema = z.object({
  name: z.string().min(1),
  cupInMillilitres: z.number().min(0),
});

export type Brewer = z.infer<typeof BrewerSchema>;
