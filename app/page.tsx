import { currentUser, auth } from '@clerk/nextjs/server'
import { TestComponent } from '@/features/url/components/test-component';
import { elysia } from '@/lib/elysia';
import { SignInButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';



export default async function Home() {
  const user = await currentUser()
  const { userId } = await auth()

  const { data, error } = await elysia.api.health.get()

  if (error) {
    throw error
  }

  console.log(data)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      {!userId && (
        <SignInButton>
          <Button>Entrar</Button>
        </SignInButton>
      )}
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Superblog
      </h1>
      <p className="text-lg text-[#666666] font-[family-name:var(--font-geist-sans)]">
        Seu blog está pronto para começar! {user ? `Olá, ${user.emailAddresses[0].emailAddress}!` : 'Faça login para ver o seu blog.'}
      </p>
      <TestComponent />
    </div>
  );
}