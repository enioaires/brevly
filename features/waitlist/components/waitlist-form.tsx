"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateWaitlistEntry } from "../queries";

interface WaitlistFormData {
  email: string;
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
      await createWaitlistEntry.mutateAsync(data.email);
      setIsSubmitted(true);
      reset();
      toast.success("Obrigado! Você foi adicionado à nossa waitlist.");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao se inscrever na waitlist";
      
      // Handle specific error cases
      if (errorMessage.includes("já está na waitlist") || errorMessage.includes("already exists")) {
        toast.info("Este email já está inscrito na nossa waitlist!");
      } else {
        toast.error(errorMessage);
      }
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-green-600">✓ Inscrito com sucesso!</CardTitle>
          <CardDescription>
            Você receberá um email quando o produto estiver disponível.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setIsSubmitted(false)}
            className="mt-4"
          >
            Inscrever outro email
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Entre na Waitlist</CardTitle>
        <CardDescription>
          Seja o primeiro a saber quando lançarmos!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido"
                }
              })}
              className={errors.email ? "border-red-500" : ""}
              disabled={createWaitlistEntry.isPending}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={createWaitlistEntry.isPending}
          >
            {createWaitlistEntry.isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Inscrevendo...
              </div>
            ) : (
              "Entrar na Waitlist"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}