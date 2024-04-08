"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
}

const SidebarItem = ({
    icon: Icon,
    label,
    href,
}: SidebarItemProps) => {

    const pathname = usePathname();
    const router = useRouter();

    const isActive = 
        (pathname === "/" && href === "/") || 
        pathname === href ||
        pathname?.startsWith(`${href}/`);

    

    return ( 
        <div>

        </div>
    );
}

export default SidebarItem;