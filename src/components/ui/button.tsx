import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-primary neo-pop-shadow hover:neo-pop-shadow-lg hover:scale-[1.02] active:scale-[0.98] active:shadow-[1px_1px_0px_0px] active:shadow-primary/50",
        destructive:
          "bg-destructive text-destructive-foreground border-destructive neo-pop-shadow hover:neo-pop-shadow-lg hover:scale-[1.02] active:scale-[0.98] active:shadow-[1px_1px_0px_0px] active:shadow-destructive/50",
        outline:
          "border-border bg-background hover:bg-accent hover:text-accent-foreground neo-pop-shadow-sm hover:neo-pop-shadow hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary neo-pop-shadow-sm hover:neo-pop-shadow hover:scale-[1.02] active:scale-[0.98]",
        ghost: "border-transparent hover:bg-accent hover:text-accent-foreground hover:border-border hover:neo-pop-shadow-sm hover:scale-[1.02] active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline border-transparent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
