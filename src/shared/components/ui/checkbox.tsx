import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/shared/utils/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onCheckedChange?.(e.target.checked)
    }

    return (
      <div className="relative flex items-center h-4 w-4">
        <input
          type="checkbox"
          ref={ref}
          onChange={handleChange}
          className={cn(
            "peer absolute inset-0 z-10 opacity-0 cursor-pointer disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        <div className="h-4 w-4 shrink-0 rounded-sm border border-primary shadow peer-focus-visible:ring-1 peer-focus-visible:ring-ring peer-disabled:opacity-50 peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground flex items-center justify-center transition-colors
          peer-checked:bg-primary peer-checked:text-primary-foreground"
        >
          <Check className="h-4 w-4 hidden peer-checked:block" />
        </div>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
