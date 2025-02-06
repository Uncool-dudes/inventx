'use client';
import { usePathname } from 'next/navigation';
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { upperFirst } from 'es-toolkit/string';

export function Breadcrumble () {
    const pathname = usePathname();
    const path = pathname.split( '/' ).filter( Boolean );

    return (
        <BreadcrumbList>
            <BreadcrumbItem className="hidden md:flex items-center" key="home">
                <BreadcrumbLink href="/">
                    Home
                </BreadcrumbLink>
            </BreadcrumbItem>
            {path.map( ( segment, index ) => (
                <div key={`segment-${index}`} className="hidden md:flex items-center gap-5">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        {index === path.length - 1 ? (
                            <BreadcrumbPage>{upperFirst(segment)}</BreadcrumbPage>
                        ) : (
                            <BreadcrumbLink href={`/${path.slice( 0, index + 1 ).join( '/' )}`}>
                                {upperFirst(segment)}
                            </BreadcrumbLink>
                        )}
                    </BreadcrumbItem>
                </div>
            ) )}
        </BreadcrumbList>
    );
}
