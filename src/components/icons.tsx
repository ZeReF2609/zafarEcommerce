import { Gem } from 'lucide-react';

export const Logo = ({ className }: { className?: string }) => (
  <div className={`flex items-center gap-2 font-bold text-xl ${className}`}>
    <div className='bg-primary p-2 rounded-lg'>
      <Gem className="h-5 w-5 text-primary-foreground" />
    </div>
    <span className="font-headline font-extrabold text-foreground tracking-tight">ShopSphere</span>
  </div>
);
