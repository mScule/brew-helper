import z from "zod";

export const CoffeeSchema = z.object({
  name: z.string().min(1),
  cupInMillilitres: z.number().min(0),
  coffeeInGrams: z.number().min(0),
});

export type Coffee = z.infer<typeof CoffeeSchema>;
