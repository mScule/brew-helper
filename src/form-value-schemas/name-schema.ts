import z from "zod";

export const NameSchema = z.string().min(3, "Value has to be 3 letters or longer");
