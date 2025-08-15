import { ptBR } from '@clerk/localizations'
import { ClerkProvider as ClerkNextJSProvider } from '@clerk/nextjs'
import { shadcn } from '@clerk/themes'

type ClerkProviderProps = React.ComponentProps<typeof ClerkNextJSProvider>

export function ClerkProvider({ children, appearance, ...props }: ClerkProviderProps) {
  return (
    <ClerkNextJSProvider
      appearance={{
        theme: shadcn,
        ...appearance,
      }}
      localization={ptBR}
      {...props}
    >
      {children}
    </ClerkNextJSProvider>
  )
}
