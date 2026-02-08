import { z } from "zod";

export const jobFormSchema = z.object({
  title: z.string().min(2, "Title is required"),
  company: z.string().min(2, "Company is required"),
  location: z.string().min(2, "Location is required"),
  applyUrl: z
    .string()
    .url("Must be a valid URL (include https://)")
    .optional()
    .or(z.literal("")),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
