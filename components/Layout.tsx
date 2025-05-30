/**
 * Main layout component with improved structure and TypeScript
 */
import { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Layout.module.css';

interface GradientBackgroundProps {
  variant: 'large' | 'small';
  className?: string;
}

export function GradientBackground({ variant, className }: GradientBackgroundProps) {
  const classes = classNames(
    {
      [styles.colorBackground]: variant === 'large',
      [styles.colorBackgroundBottom]: variant === 'small',
    },
    className
  );

  return <div className={classes} />;
}

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showGradient?: boolean;
  gradientVariant?: 'large' | 'small';
}

export default function Layout({ 
  children, 
  showGradient = false, 
  gradientVariant = 'large' 
}: LayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until component is mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="relative pb-24 overflow-hidden">
      {showGradient && <GradientBackground variant={gradientVariant} />}
      <div className="flex flex-col items-center max-w-2xl w-full mx-auto">
        {children}
      </div>
    </div>
  );
}
