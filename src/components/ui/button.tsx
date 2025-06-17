import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-green to-green/90 text-black hover:from-green/90 hover:to-green/80 shadow-green-glow/60 font-semibold transition-all duration-300 hover:scale-105",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-red-glow/50 transition-all duration-300",
        outline:
          "border border-green/50 bg-transparent hover:bg-green/10 hover:border-green text-green backdrop-blur-sm transition-all duration-300 hover:shadow-green/20",
        secondary:
          "bg-gradient-to-r from-gold to-gold/90 text-black hover:from-gold/90 hover:to-gold/80 shadow-gold-glow/60 font-semibold transition-all duration-300 hover:scale-105",
        ghost:
          "hover:bg-white/10 hover:text-green transition-all duration-300 backdrop-blur-sm",
        link: "text-green underline-offset-4 hover:underline hover:text-green/80 transition-colors duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
