import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary-blue text-primary-foreground rounded-full hover:bg-primary-blue/90 hover:scale-[1.03] shadow-smooth",
        destructive: "bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90",
        outline: "border-2 border-primary-blue text-primary-blue bg-background rounded-full hover:bg-primary-blue/10",
        secondary: "bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80",
        ghost: "rounded-md hover:bg-accent hover:text-accent-foreground",
        link: "text-primary-blue underline-offset-4 hover:underline",
        accent: "bg-spark text-spark-foreground rounded-full hover:bg-spark/90 hover:scale-[1.03] shadow-smooth",
        momentum: "bg-momentum text-momentum-foreground rounded-full hover:bg-momentum/90 hover:scale-[1.03] shadow-smooth",
        mastery: "bg-mastery text-mastery-foreground rounded-full hover:bg-mastery/90 hover:scale-[1.03] shadow-smooth",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
