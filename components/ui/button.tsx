import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "btn-press inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 [--button-shadow:#0a0a0a]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [--button-shadow:#7f1d1d]",
        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 [--button-shadow:var(--border)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 [--button-shadow:#525252]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 [--button-shadow:var(--border)]",
        link: "text-primary underline-offset-4 hover:underline shadow-none",
        gold:
          "bg-[linear-gradient(135deg,var(--gold-primary),var(--gold-soft))] text-white border-none px-5 py-3 rounded-sm font-semibold shadow-[0_6px_16px_rgba(212,175,55,0.4),-5px_5px_0_0_var(--gold-dark)] hover:bg-[linear-gradient(135deg,var(--gold-soft),var(--gold-primary))] [--button-shadow:var(--gold-dark)]",
        wheat:
          "bg-[linear-gradient(to_bottom,#F4DEB5,#D1A87A)] text-[#5c3d1e] border-none hover:bg-[linear-gradient(to_bottom,#f9e8ca,#dbb98e)] [--button-shadow:#8B5E3C]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
