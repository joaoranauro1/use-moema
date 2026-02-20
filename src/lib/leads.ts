import { z } from "zod";

/* ─── Zod Schemas ─── */

const baseSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
});

export const contactLeadSchema = baseSchema.extend({
  source: z.literal("formulario_contato"),
  message: z.string().optional(),
});

export const interestLeadSchema = baseSchema.extend({
  source: z.literal("modal_interesse"),
  motivation: z.array(z.string()).min(1),
  budget: z.string().min(1),
});

export const leadSchema = z.discriminatedUnion("source", [
  contactLeadSchema,
  interestLeadSchema,
]);

/* ─── Types ─── */

export type ContactLead = z.infer<typeof contactLeadSchema>;
export type InterestLead = z.infer<typeof interestLeadSchema>;
export type Lead = z.infer<typeof leadSchema>;

/* ─── Client-side submit ─── */

interface SubmitResult {
  success: boolean;
  error?: string;
}

export async function submitLead(data: Lead): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      return {
        success: false,
        error: body?.error || "Erro ao enviar. Tente novamente.",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Erro de conexão. Verifique sua internet e tente novamente.",
    };
  }
}
