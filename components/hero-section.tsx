import { WaitlistForm } from '@/features/waitlist/components/waitlist-form';
import { SectionBackground } from '@/components/ui/section-background';

export function HeroSection() {
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


        </div>

        {/* Lado direito - Formulário */}
        <div className="flex justify-center lg:justify-end">
          <WaitlistForm />
        </div>
      </div>
    </SectionBackground>
  );
}