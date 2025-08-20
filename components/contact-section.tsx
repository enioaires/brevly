"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionBackground } from "@/components/ui/section-background";
import { useCreateWaitlistEntry } from "@/features/waitlist/queries";

interface ContactFormData {
  email: string;
  phone: string;
  company: string;
  projectDetails: string;
}

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createWaitlistEntry = useCreateWaitlistEntry();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Prepare data for waitlist submission, filtering out empty optional fields
      const submitData = {
        email: data.email,
        projectDetails: data.projectDetails,
        ...(data.phone && data.phone.trim() && { phoneNumber: data.phone }),
        ...(data.company && data.company.trim() && { companyName: data.company }),
      };

      await createWaitlistEntry.mutateAsync(submitData);
      toast.success("Obrigado! Entraremos em contato em breve.");
      reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao enviar formulário";

      // Handle specific error cases
      if (errorMessage.includes("já está na waitlist") || errorMessage.includes("already exists")) {
        toast.info("Este email já está cadastrado!");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionBackground variant="grid" className="py-20 px-4">
      <section id="contato" className="scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pronto para começar seu projeto?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vamos discutir como podemos ajudar a transformar sua presença digital e impulsionar seu negócio.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Obtenha uma Consulta Gratuita</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Endereço de Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="joao@empresa.com"
                    {...register("email", {
                      required: "Email é obrigatório",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email inválido"
                      }
                    })}
                    className={errors.email ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Segunda linha - Telefone e Empresa */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Número de Telefone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      {...register("phone", {
                        pattern: {
                          value: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
                          message: "Formato: (11) 99999-9999"
                        }
                      })}
                      className={errors.phone ? "border-destructive" : ""}
                      disabled={isSubmitting}
                      onChange={(e) => {
                        // Máscara para telefone brasileiro
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 11) {
                          value = value.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
                          if (value.length === 14) {
                            value = value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
                          }
                        }
                        e.target.value = value;
                      }}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Sua Empresa"
                      {...register("company")}
                      className={errors.company ? "border-destructive" : ""}
                      disabled={isSubmitting}
                    />
                    {errors.company && (
                      <p className="text-sm text-destructive">{errors.company.message}</p>
                    )}
                  </div>
                </div>

                {/* Detalhes do projeto */}
                <div className="space-y-2">
                  <Label htmlFor="projectDetails">Detalhes do Projeto</Label>
                  <Textarea
                    id="projectDetails"
                    placeholder="Conte-nos sobre seu projeto..."
                    {...register("projectDetails", {
                      required: "Detalhes do projeto são obrigatórios",
                      minLength: {
                        value: 10,
                        message: "Por favor, forneça mais detalhes sobre seu projeto"
                      }
                    })}
                    className={`min-h-[120px] resize-none ${errors.projectDetails ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.projectDetails && (
                    <p className="text-sm text-destructive">{errors.projectDetails.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </div>
                  ) : (
                    "Enviar Consulta"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </SectionBackground>
  );
}