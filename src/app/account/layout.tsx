
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Lock, Package, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/account", label: "Perfil", icon: User },
  { href: "/account/orders", label: "Pedidos", icon: Package },
  { href: "/account/favorites", label: "Favoritos", icon: Heart },
  { href: "/account/security", label: "Seguridad", icon: Lock },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline mb-8">Mi Cuenta</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="md:col-span-1">
                <nav className="flex flex-col space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                        <Button
                            key={item.href}
                            asChild
                            variant={isActive ? "default" : "ghost"}
                            className="justify-start"
                        >
                            <Link href={item.href}>
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.label}
                            </Link>
                        </Button>
                        );
                    })}
                </nav>
            </aside>
            <main className="md:col-span-3">
                <div className="bg-background p-6 rounded-lg shadow-sm">
                    {children}
                </div>
            </main>
        </div>
    </div>
  );
}
