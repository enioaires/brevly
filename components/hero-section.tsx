"use client";
import { HeroWaitlistForm } from '@/features/waitlist/components/hero-waitlist-form';
import { SectionBackground } from '@/components/ui/section-background';
import { Button } from '@/components/ui/button';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

export function HeroSection() {
  const { smoothScrollTo } = useSmoothScroll();

  return (
    <SectionBackground variant="dots" className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Lado esquerdo - Conteúdo principal */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Transformando Ideias
              <br />
              <span className="text-foreground">Em Excelência</span>
              <br />
              <span className="text-foreground">Digital</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Criamos soluções digitais inovadoras que elevam marcas e impulsionam o crescimento dos negócios. Vamos construir algo extraordinário juntos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => smoothScrollTo('contato')}
            >
              Começar Agora
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => smoothScrollTo('servicos')}
            >
              Nossos Serviços
            </Button>
          </div>
        </div>

        {/* Lado direito - Formulário */}
        <div className="flex justify-center lg:justify-end">
          <HeroWaitlistForm />
        </div>
      </div>
    </SectionBackground>
  );
}