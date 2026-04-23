/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
}

const Button = ({ children, className = '', variant = 'primary', onClick, ...props }: ButtonProps) => {
  const baseClasses = "flex items-center justify-center gap-2 rounded-xl border-2 border-slate-900 neubrutal-shadow font-lexend font-bold active-press transition-all py-3 px-6";
  const variants: Record<string, string> = {
    primary: "bg-primary text-white border-b-8 shadow-xl",
    secondary: "bg-white text-slate-900 border-b-8 shadow-xl",
    ghost: "bg-transparent border-none shadow-none neubrutal-shadow-none",
    danger: "bg-secondary text-white border-b-8 shadow-xl"
  };
  return (
    <button className={`${baseClasses} ${variants[variant!]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
