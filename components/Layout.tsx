/**
 * Main layout component with improved structure and TypeScript
 */
import { ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import { useTheme } from '../lib/hooks';
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
  const { mounted } = useTheme();

  // Prevent hydration mismatch by not rendering until theme is mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {showGradient && <GradientBackground variant={gradientVariant} />}
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
