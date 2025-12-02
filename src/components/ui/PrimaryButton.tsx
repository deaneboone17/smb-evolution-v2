import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps extends ButtonProps {
    className?: string;
    children: React.ReactNode;
}

export const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                className={cn(
                    "rounded-full bg-gradient-to-r from-[#1C77C3] to-[#06D6A0] text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-none",
                    className
                )}
                {...props}
            >
                {children}
            </Button>
        );
    }
);

PrimaryButton.displayName = "PrimaryButton";
