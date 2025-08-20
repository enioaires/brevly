"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateWaitlistEntry } from "../queries";

interface WaitlistFormData {
  fullName: string;
  email: string;
  projectDetails: string;
}

export function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const createWaitlistEntry = useCreateWaitlistEntry();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormData>();

  const onSubmit = async (data: WaitlistFormData) => {
    try {
      await createWaitlistEntry.mutateAsync({
        email: data.email,
        projectDetails: data.projectDetails,
      });
      setIsSubmitted(true);
      reset();
      toast.success("Obrigado! Entraremos em contato em breve.");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao enviar formulário";

      // Handle specific error cases
      if (errorMessage.includes("já está na waitlist") || errorMessage.includes("already exists")) {
        toast.info("Este email já está cadastrado!");
      } else {
        toast.error(errorMessage);
      }
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-green-600">✓ Mensagem enviada com sucesso!</CardTitle>
          <CardDescription>
            Nossa equipe entrará em contato em breve.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button
            variant="outline"
            onClick={() => setIsSubmitted(false)}
            className="mt-4"
          >
            Enviar nova mensagem
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Entre em Contato</CardTitle>
        <CardDescription>
          Pronto para começar seu projeto? Preencha o formulário abaixo e nossa equipe entrará em contato em breve.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nome Completo</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="João Silva"
              {...register("fullName", {
                required: "Nome completo é obrigatório",
                minLength: {
                  value: 2,
                  message: "Nome deve ter pelo menos 2 caracteres"
                }
              })}
              className={errors.fullName ? "border-destructive" : ""}
              disabled={createWaitlistEntry.isPending}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName.message}</p>
            )}
          </div>

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
              disabled={createWaitlistEntry.isPending}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

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
              className={`min-h-[100px] resize-none ${errors.projectDetails ? "border-destructive" : ""}`}
              disabled={createWaitlistEntry.isPending}
            />
            {errors.projectDetails && (
              <p className="text-sm text-destructive">{errors.projectDetails.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={createWaitlistEntry.isPending}
          >
            {createWaitlistEntry.isPending ? (
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
  );
}