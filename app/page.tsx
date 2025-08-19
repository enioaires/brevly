import { WaitlistForm } from '@/features/waitlist/components/waitlist-form';

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4 -mt-16">
      <div className="text-center mb-8 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Algo incrível está chegando
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Seja o primeiro a descobrir nossa nova plataforma. 
          Entre na waitlist e receba acesso exclusivo quando lançarmos.
        </p>
      </div>
      
      <WaitlistForm />
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Sem spam. Apenas atualizações importantes sobre o lançamento.
        </p>
      </div>
    </div>
  );
}