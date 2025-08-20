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

interface ContactWaitlistFormData {
    email: string;
    projectDetails: string;
    phoneNumber?: string;
    companyName?: string;
}

export function ContactWaitlistForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const createWaitlistEntry = useCreateWaitlistEntry();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactWaitlistFormData>();

    const onSubmit = async (data: ContactWaitlistFormData) => {
        try {
            // Prepare data for submission, filtering out empty optional fields
            const submitData = {
                email: data.email,
                projectDetails: data.projectDetails,
                ...(data.phoneNumber && data.phoneNumber.trim() && { phoneNumber: data.phoneNumber }),
                ...(data.companyName && data.companyName.trim() && { companyName: data.companyName }),
            };

            await createWaitlistEntry.mutateAsync(submitData);
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
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-green-600">✓ Inscrição realizada com sucesso!</CardTitle>
                    <CardDescription>
                        Nossa equipe entrará em contato em breve para discutir seu projeto.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <Button
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                        className="mt-4 border-green-300 text-green-700 hover:bg-green-100"
                    >
                        Nova inscrição
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Entre na Waitlist</CardTitle>
                <CardDescription>
                    Preencha o formulário abaixo para entrar na nossa waitlist e ser um dos primeiros a conhecer nossos serviços.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email - Obrigatório */}
                    <div className="space-y-2">
                        <Label htmlFor="contact-email" className="text-sm font-medium">
                            Email *
                        </Label>
                        <Input
                            id="contact-email"
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

                    {/* Detalhes do Projeto - Obrigatório */}
                    <div className="space-y-2">
                        <Label htmlFor="contact-project" className="text-sm font-medium">
                            Detalhes do Projeto *
                        </Label>
                        <Textarea
                            id="contact-project"
                            placeholder="Conte-nos sobre seu projeto, suas necessidades e objetivos..."
                            {...register("projectDetails", {
                                required: "Detalhes do projeto são obrigatórios",
                                minLength: {
                                    value: 10,
                                    message: "Por favor, forneça mais detalhes sobre seu projeto (mínimo 10 caracteres)"
                                },
                                maxLength: {
                                    value: 1000,
                                    message: "Detalhes do projeto devem ter no máximo 1000 caracteres"
                                }
                            })}
                            className={`min-h-[120px] resize-none ${errors.projectDetails ? "border-destructive" : ""}`}
                            disabled={createWaitlistEntry.isPending}
                        />
                        {errors.projectDetails && (
                            <p className="text-sm text-destructive">{errors.projectDetails.message}</p>
                        )}
                    </div>

                    {/* Campos Opcionais */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Telefone - Opcional */}
                        <div className="space-y-2">
                            <Label htmlFor="contact-phone" className="text-sm font-medium">
                                Telefone
                            </Label>
                            <Input
                                id="contact-phone"
                                type="tel"
                                placeholder="(11) 99999-9999"
                                {...register("phoneNumber", {
                                    pattern: {
                                        value: /^(\+55\s?)?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
                                        message: "Formato inválido. Use: (11) 99999-9999"
                                    }
                                })}
                                className={errors.phoneNumber ? "border-destructive" : ""}
                                disabled={createWaitlistEntry.isPending}
                            />
                            {errors.phoneNumber && (
                                <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
                            )}
                        </div>

                        {/* Nome da Empresa - Opcional */}
                        <div className="space-y-2">
                            <Label htmlFor="contact-company" className="text-sm font-medium">
                                Nome da Empresa
                            </Label>
                            <Input
                                id="contact-company"
                                type="text"
                                placeholder="Sua Empresa Ltda"
                                {...register("companyName", {
                                    maxLength: {
                                        value: 100,
                                        message: "Nome da empresa deve ter no máximo 100 caracteres"
                                    }
                                })}
                                className={errors.companyName ? "border-destructive" : ""}
                                disabled={createWaitlistEntry.isPending}
                            />
                            {errors.companyName && (
                                <p className="text-sm text-destructive">{errors.companyName.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                        * Campos obrigatórios
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
            </CardContent>
        </Card>
    );
}