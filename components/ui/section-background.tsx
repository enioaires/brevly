import { ReactNode } from "react";

interface SectionBackgroundProps {
  children: ReactNode;
  variant?: "dots" | "grid";
  className?: string;
}

export function SectionBackground({ 
  children, 
  variant = "dots", 
  className = "" 
}: SectionBackgroundProps) {
  if (variant === "dots") {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background ${className}`}>
        {/* Padrão de pontos sutil */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground)/0.4) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Gradientes coloridos usando variáveis do tema */}
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: `hsl(var(--primary)/0.1)` }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: `hsl(var(--accent)/0.1)` }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: `hsl(var(--secondary)/0.1)` }}
        ></div>

        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-tr from-muted/10 via-background to-accent/5 ${className}`}>
        {/* Grid pattern sutil */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)/0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)/0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Formas geométricas sutis */}
        <div 
          className="absolute top-20 right-10 w-32 h-32 rounded-full opacity-10"
          style={{ backgroundColor: `hsl(var(--secondary)/0.2)` }}
        ></div>
        <div 
          className="absolute bottom-20 left-10 w-24 h-24 rotate-45 opacity-10"
          style={{ backgroundColor: `hsl(var(--primary)/0.2)` }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full opacity-5"
          style={{ backgroundColor: `hsl(var(--accent)/0.3)` }}
        ></div>

        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }

  return <div className={className}>{children}</div>;
}