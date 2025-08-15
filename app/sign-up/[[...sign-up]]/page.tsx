import { SignUp } from '@clerk/nextjs'
import { ChartLine, Clock, ShieldCheck, Sparkles } from 'lucide-react'

export default function SignUpPage() {
    return (
        <div className="bg-muted flex w-full flex-1 items-center justify-center p-6 md:p-10">
            <SignUp />
        </div>
    )
}
