import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  className?: string;
  size?: number;
}

export function StarRating({ rating, totalStars = 5, className, size = 16 }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} fill="currentColor" className="text-primary" style={{ width: size, height: size }} />
      ))}
      {halfStar && <Star fill="currentColor" className="text-primary" style={{ clipPath: 'inset(0 50% 0 0)', width: size, height: size }} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} fill="currentColor" className="text-gray-300" style={{ width: size, height: size }} />
      ))}
    </div>
  );
}
