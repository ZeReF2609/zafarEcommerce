import { Gem } from 'lucide-react';

export const Logo = ({ className }: { className?: string }) => (
  <div className={`flex items-center gap-2 font-bold text-2xl ${className}`}>
    <Gem className="h-7 w-7 text-primary" />
    <span className="font-headline">ShopSphere</span>
  </div>
);
