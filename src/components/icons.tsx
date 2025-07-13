import { Gem } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center gap-2 font-bold text-xl', className)}>
    <div className='bg-primary p-2 rounded-lg'>
      <Gem className="h-5 w-5 text-primary-foreground" />
    </div>
    <span className={cn("font-headline font-extrabold tracking-tight", className)}>ShopSphere</span>
  </div>
);
