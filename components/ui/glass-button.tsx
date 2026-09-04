import * as React from 'react'
import Link from 'next/link'

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'bull' | 'bear' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  href?: string
}

const GlassButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, GlassButtonProps>(
  ({ className = '', variant = 'default', size = 'default', href, ...props }, ref) => {
    
    // Base classes for the glass effect
    const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 backdrop-blur'
    
    // Variant styles
    const variants = {
      default: 'border border-white/10 bg-white/5 text-white hover:bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]',
      bull: 'border border-bull/30 bg-bull/10 text-bull hover:bg-bull/20 shadow-[0_0_20px_rgba(34,197,94,0.15)]',
      bear: 'border border-bear/30 bg-bear/10 text-bear hover:bg-bear/20 shadow-[0_0_20px_rgba(239,68,68,0.15)]',
      outline: 'border border-white/20 bg-transparent text-white hover:bg-white/5 hover:border-white/30',
      ghost: 'border-transparent bg-transparent text-slate-300 hover:text-white hover:bg-white/5',
    }

    // Size styles
    const sizes = {
      default: 'h-11 px-6 py-2 text-sm',
      sm: 'h-9 px-4 text-xs',
      lg: 'h-14 px-8 text-base',
      icon: 'h-11 w-11',
    }

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

    if (href) {
      return (
        <Link href={href} className={classes} ref={ref as any} {...(props as any)} />
      )
    }

    return (
      <button
        className={classes}
        ref={ref as any}
        {...props}
      />
    )
  }
)
GlassButton.displayName = 'GlassButton'

export { GlassButton }
