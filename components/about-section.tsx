import { CheckCircle, Users, Zap } from "lucide-react";
import { SectionBackground } from "@/components/ui/section-background";

export function AboutSection() {
  return (
    <SectionBackground variant="grid" className="py-20 px-4">
      <section id="sobre-nos" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sobre Nós
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Lado esquerdo - Conteúdo */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Somos uma equipe de artesãos digitais
                </h3>

                <div className="space-y-4 text-muted-foreground">
                  <p className="text-lg leading-relaxed">
                    Fundada em 2024, a BrevDigital tem estado na vanguarda da inovação digital,
                    ajudando empresas a transformar sua presença online através de design estratégico
                    e desenvolvimento.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Nossa abordagem combina pensamento criativo com expertise técnica para entregar
                    soluções que não apenas parecem excepcionais, mas também geram resultados
                    mensuráveis para nossos clientes.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Abordagem Estratégica
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Decisões baseadas em dados
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Equipe Especializada
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Profissionais da indústria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Entrega Rápida
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      No prazo, sempre
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado direito - Placeholder para imagem */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-lg h-80 bg-muted/20 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Imagem de Colaboração da Equipe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionBackground>
  );
}