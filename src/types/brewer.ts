import z from "zod";

export const BrewerSchema = z.object({
  name: z
    .string()
    .min(1, "Name cannot be smaller than 1 characters"),
  cupInMillilitres: z
    .number()
    .min(0, "Cup size in millilitres cannot be smaller than 0"),
});

export type Brewer = z.infer<typeof BrewerSchema>;
