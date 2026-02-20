"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";
import { submitLead } from "@/lib/leads";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    const result = await submitLead({
      source: "formulario_contato",
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message || undefined,
    });

    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.error ?? "Erro ao enviar. Tente novamente.");
    }
  };

  const inputClasses =
    "w-full bg-transparent border-b border-black/10 py-4 text-sm text-black placeholder:text-black/25 focus:border-black focus:outline-none transition-colors duration-500";

  return (
    <section id="contato" className="relative bg-white noise">
      {/* Top divider — full bleed */}
      <div className="rule" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 py-24 md:py-40">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left — Editorial statement */}
          <div className="lg:col-span-5">
            <p className="text-caption text-black/25 mb-6">Contato</p>
            <h2 className="text-h1 text-black">
              Tenho
              <br />
              <span className="text-black/25">interesse.</span>
            </h2>

            <p className="text-body text-black/40 mt-8 max-w-sm">
              Preencha o formulário e nossa equipe entrará em contato para
              apresentar condições e disponibilidade.
            </p>

            {/* Key facts — vertical rhythm */}
            <div className="mt-16 space-y-6">
              {[
                "Conclusão da obra: Dezembro 2027",
                "53 unidades de 20 a 56 m²",
                "A partir de R$ 14.600/m²",
                "Moema — IDH 0,962",
              ].map((fact, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-px w-4 bg-black/15 flex-shrink-0" />
                  <p className="text-caption text-black/30">{fact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-7 lg:pl-12 lg:border-l lg:border-steel-10">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-10"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <label className="text-caption text-black/25 block mb-3">Nome</label>
                    <input
                      {...register("name", { required: "Nome é obrigatório" })}
                      placeholder="Seu nome completo"
                      className={inputClasses}
                    />
                    {errors.name && (
                      <p className="mt-2 text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-caption text-black/25 block mb-3">E-mail</label>
                    <input
                      {...register("email", {
                        required: "E-mail é obrigatório",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "E-mail inválido",
                        },
                      })}
                      type="email"
                      placeholder="seu@email.com"
                      className={inputClasses}
                    />
                    {errors.email && (
                      <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-caption text-black/25 block mb-3">Telefone</label>
                    <input
                      {...register("phone", { required: "Telefone é obrigatório" })}
                      type="tel"
                      placeholder="(11) 99999-0000"
                      className={inputClasses}
                    />
                    {errors.phone && (
                      <p className="mt-2 text-xs text-red-500">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-caption text-black/25 block mb-3">
                      Mensagem <span className="text-black/15">(opcional)</span>
                    </label>
                    <textarea
                      {...register("message")}
                      placeholder="Conte-nos sobre seu interesse"
                      rows={3}
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded px-4 py-3">
                      {submitError}
                    </p>
                  )}

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="large"
                      className="w-full md:w-auto"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar interesse"}
                    </Button>
                  </div>

                  <p className="text-[11px] text-black/20 leading-relaxed max-w-md">
                    Ao enviar, você concorda com nossa política de privacidade.
                    Dados utilizados exclusivamente para contato comercial sobre
                    o empreendimento use.moema.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="flex h-full min-h-[400px] items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-center">
                    <div className="rule mx-auto max-w-[60px] mb-8" />
                    <h3 className="text-h1 text-black">Obrigado.</h3>
                    <p className="text-body text-black/40 mt-6 max-w-sm mx-auto">
                      Recebemos seu interesse. Nossa equipe entrará em contato em breve.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
