"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateWaitlistEntry } from "../queries";

interface HeroWaitlistFormData {
    email: string;
    projectDetails: string;
}

export function HeroWaitlistForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const createWaitlistEntry = useCreateWaitlistEntry();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<HeroWaitlistFormData>();

    const onSubmit = async (data: HeroWaitlistFormData) => {
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
            <div className="w-full max-w-md mx-auto bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-green-600 text-lg font-semibold mb-2">
                    ✓ Inscrição realizada com sucesso!
                </div>
                <p className="text-green-700 text-sm mb-4">
                    Nossa equipe entrará em contato em breve.
                </p>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSubmitted(false)}
                    className="border-green-300 text-green-700 hover:bg-green-100"
                >
                    Nova inscrição
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="hero-email" className="text-sm font-medium">
                        Email
                    </Label>
                    <Input
                        id="hero-email"
                        type="email"
                        placeholder="seu@email.com"
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
                    <Label htmlFor="hero-project" className="text-sm font-medium">
                        Detalhes do Projeto
                    </Label>
                    <Textarea
                        id="hero-project"
                        placeholder="Conte-nos sobre seu projeto..."
                        {...register("projectDetails", {
                            required: "Detalhes do projeto são obrigatórios",
                            minLength: {
                                value: 10,
                                message: "Por favor, forneça mais detalhes sobre seu projeto"
                            }
                        })}
                        className={`min-h-[80px] resize-none ${errors.projectDetails ? "border-destructive" : ""}`}
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
                        "Entrar na Waitlist"
                    )}
                </Button>
            </form>
        </div>
    );
}