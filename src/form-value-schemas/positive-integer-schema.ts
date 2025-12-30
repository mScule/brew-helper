import z from "zod";

export const PositiveIntegerSchema = z.string().refine(value => Number.isInteger(Number(value)) && Number(value) > 0, {
  error: "Value has to be a positive integer"
});
