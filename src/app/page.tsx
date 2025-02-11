'use client';
import { AuroraText } from '@/components/magicui/aurora-text';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { LineShadowText } from '@/components/magicui/line-shadow-text';
import { cn } from '@/lib/utils';
import { SignInButton, useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
export default function Home () {
    const user = useUser();
    if ( user.isSignedIn ) {
        redirect( "/events" );
        return null;
    }
    return (
        <div className={`flex flex-col items-center justify-center h-screen`}>
            <DotPattern
                className={cn(
                    "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] -z-10",
                )}
            />
            <div className={`flex flex-col justify-center`}>
                <h1 className="text-4xl lg:text-8xl font-bold tracking-tighter sm:text-5xl">
                    Introducing <AuroraText>BossY</AuroraText>
                </h1>
                <h2 className="text-md sm:text-lg lg:text-3xl text-left p-4 pl-0 text-balance font-semibold leading-none tracking-tighter">
                    Interfacing <LineShadowText className="italic">recruitment</LineShadowText> for universities.
                </h2>
                <div className={`p-3`}>
                    <SignInButton>
                        <InteractiveHoverButton className="">
                            Get Started
                        </InteractiveHoverButton>
                    </SignInButton>
                </div>
            </div>
        </div>
    );
}
