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
          "bg-gradient-to-br from-[#6b4e2e] to-[#2f241b] text-white border border-[#876246] hover:from-[#7f5c3a] hover:to-[#3b2d22] shadow-lg font-semibold transition-all duration-300 hover:scale-102 hover:shadow-xl",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400 shadow-lg transition-all duration-300 hover:scale-102",
        outline:
          "border border-gray-600 bg-transparent hover:bg-gray-800 hover:border-gray-500 text-white backdrop-blur-sm transition-all duration-300 hover:scale-102",
        secondary:
          "bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600 shadow-lg font-semibold transition-all duration-300 hover:scale-102 border border-gray-600",
        ghost:
          "hover:bg-gray-800 hover:text-white transition-all duration-300 backdrop-blur-sm hover:scale-102",
        link: "text-[#d6bfa3] underline-offset-4 hover:underline hover:text-[#e6d2bd] transition-colors duration-300",
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