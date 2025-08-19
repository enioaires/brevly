"use client";

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { WaitlistAdmin } from '@/features/waitlist/components/waitlist-admin';
import { Header } from '@/components/header';

export default function AdminPage() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="container mx-auto px-4 py-8">
            <WaitlistAdmin />
          </div>
        </div>
      </SignedIn>
    </>
  );
}