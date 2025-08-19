"use client";

import { Monitor, Smartphone, Palette, TrendingUp, ShoppingCart, Server } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionBackground } from "@/components/ui/section-background";
import { toast } from "sonner";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const services = [
    {
        icon: Monitor,
        title: "Desenvolvimento Web",
        description: "Sites personalizados e aplicações web construídas com as mais recentes tecnologias para garantir performance, segurança e escalabilidade."
    },
    {
        icon: Smartphone,
        title: "Desenvolvimento de Apps Mobile",
        description: "Aplicativos nativos e multiplataforma projetados para proporcionar experiências de usuário perfeitas em todos os dispositivos."
    },
    {
        icon: Palette,
        title: "UI/UX Design",
        description: "Design centrado no usuário que equilibra apelo estético com funcionalidade para criar experiências digitais envolventes."
    },
    {
        icon: TrendingUp,
        title: "Marketing Digital",
        description: "Campanhas de marketing estratégicas que aumentam a visibilidade, geram tráfego e convertem leads em clientes fiéis."
    },
    {
        icon: ShoppingCart,
        title: "Soluções E-Commerce",
        description: "Lojas online personalizadas com gateways de pagamento seguros, gestão de inventário e processos de checkout otimizados."
    },
    {
        icon: Server,
        title: "Serviços em Nuvem",
        description: "Configuração de infraestrutura em nuvem escalável, migração e gestão para garantir que suas aplicações funcionem perfeitamente."
    }
];

export function ServicesSection() {
    const { smoothScrollTo } = useSmoothScroll();

    const handleLearnMore = (serviceTitle: string) => {
        // Usar scroll customizado mais suave
        smoothScrollTo('contato', 1500);

        // Mostrar toast informativo
        setTimeout(() => {
            toast.info(`Interessado em ${serviceTitle}? Preencha o formulário abaixo e entraremos em contato para discutir seu projeto!`);
        }, 1600);
    };
    return (
        <SectionBackground variant="dots" className="py-20 px-4">
            <section id="servicos" className="scroll-mt-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Nossos Serviços
                        </h2>
                        <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Oferecemos soluções digitais abrangentes adaptadas às necessidades do seu negócio
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => {
                            const IconComponent = service.icon;
                            return (
                                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                                    <CardHeader className="pb-4">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                            <IconComponent className="w-6 h-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {service.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
                                            {service.description}
                                        </CardDescription>
                                        <Button
                                            variant="ghost"
                                            className="p-0 h-auto font-medium text-primary hover:text-primary/80 group-hover:translate-x-1 transition-all"
                                            onClick={() => handleLearnMore(service.title)}
                                        >
                                            Saiba mais →
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>
        </SectionBackground>
    );
}