'use client';

import { useEffect, useRef, useState } from 'react';

interface FixedBottomBarProps {
  children: React.ReactNode;
  ref: React.RefObject<HTMLDivElement | null>;
}

export default function FixedBottomBar({ children, ref }: FixedBottomBarProps) {
  return (
    <nav
      ref={ref}
      className="bg-gray-750 laptop:hidden fixed right-0 bottom-0 left-0 flex items-center gap-7 p-6"
      role="navigation"
      aria-label="하단 고정 메뉴"
    >
      {children}
    </nav>
  );
}

export function useFixedBottomBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const extraPadding = 30;

  useEffect(() => {
    const element = ref.current;
    if (element) {
      // Set initial height immediately
      setHeight(element.offsetHeight);

      const observer = new ResizeObserver(() => {
        setHeight(element.offsetHeight + extraPadding);
      });

      observer.observe(element);
      return () => observer.disconnect();
    }
  }, []);

  return { ref, height };
}
