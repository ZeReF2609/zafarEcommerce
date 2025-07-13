
"use client";

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
     if (value === undefined) {
      return null;
    }
    const aInterval = interval as keyof TimeLeft;
    return (
      <div key={interval} className="flex flex-col items-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">
          {String(timeLeft[aInterval]).padStart(2, '0')}
        </div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{interval}</div>
      </div>
    );
  });

  return (
    <div className="mt-6 flex justify-center space-x-4 md:space-x-8">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
}
