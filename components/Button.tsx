/**
 * Improved Button component with better TypeScript support and variants
 */
import { forwardRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

interface ButtonAsButtonProps extends BaseButtonProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  href?: never;
}

interface ButtonAsLinkProps extends BaseButtonProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  href: string;
  onClick?: never;
  type?: never;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const getVariantClasses = (variant: ButtonVariant): string => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border-transparent',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 border-transparent',
    outline: 'bg-transparent text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500 border-blue-600',
    ghost: 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500 border-transparent',
  };
  return variants[variant];
};

const getSizeClasses = (size: ButtonSize): string => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  return sizes[size];
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      className,
      disabled = false,
      loading = false,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const baseClasses = classNames(
      'inline-flex items-center justify-center font-medium rounded-md border transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      {
        'w-full': fullWidth,
        'cursor-not-allowed opacity-50': disabled || loading,
      },
      getVariantClasses(variant),
      getSizeClasses(size),
      className
    );

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </>
    );

    if (props.href) {
      const { href, ...linkProps } = props as ButtonAsLinkProps;
      return (
        <Link
          href={href}
          className={baseClasses}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          {...linkProps}
        >
          {content}
        </Link>
      );
    }

    const { ...buttonProps } = props as ButtonAsButtonProps;
    return (
      <button
        className={baseClasses}
        disabled={disabled || loading}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        {...buttonProps}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Keep backward compatibility
export default function ButtonComponent(props: any) {
  return <Button {...props} />;
}
