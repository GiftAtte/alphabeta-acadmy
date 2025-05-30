import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh bg-gradient-to-br from-primary/5 via-background to-primary/10">
            <div className="hidden lg:block lg:w-1/2 bg-primary/5 relative">
                <div className="absolute inset-0 bg-[url('/images/auth-bg.jpg')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
                    <div className="max-w-md text-center">
                        <h2 className="text-3xl font-bold text-primary mb-6">Alpha Beta Academy</h2>
                        <p className="text-xl text-foreground/80 mb-6">
                            Empowering through education. Join our platform for professional development and certification.
                        </p>
                        <div className="flex justify-center">
                            <AppLogoIcon className="size-20 fill-current text-primary" />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-md">
                    <div className="rounded-xl bg-card shadow-sm border p-8">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col items-center gap-4">
                                <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                                    <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-md">
                                        <AppLogoIcon className="size-12 fill-current text-primary" />
                                    </div>
                                    <span className="sr-only">{title}</span>
                                </Link>

                                <div className="space-y-2 text-center">
                                    <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                                    <p className="text-muted-foreground text-center text-sm">{description}</p>
                                </div>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
