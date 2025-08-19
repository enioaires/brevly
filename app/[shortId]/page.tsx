import { redirect, notFound } from 'next/navigation';
import prisma from '@/lib/prisma';

interface PageProps {
    params: Promise<{
        shortId: string;
    }>;
}

export default async function RedirectPage({ params }: PageProps) {
    const { shortId } = await params;
    
    const url = await prisma.url.findUnique({
        where: { shortId }
    });
    
    if (!url) {
        notFound();
    }
    
    await prisma.url.update({
        where: { shortId },
        data: { clicks: { increment: 1 } }
    });
    
    redirect(url.originalUrl);
}
