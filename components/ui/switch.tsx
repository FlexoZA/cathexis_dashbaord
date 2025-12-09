import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    return (
      <label
        className={cn(
          "inline-flex items-center cursor-pointer select-none",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <input
          type="checkbox"
          role="switch"
          className="sr-only"
          ref={ref}
          checked={checked}
          disabled={disabled}
          onChange={(event) => onCheckedChange?.(event.target.checked)}
          {...props}
        />
        <span
          className={cn(
            "relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full border transition-colors",
            checked ? "bg-blue-600 border-blue-600" : "bg-gray-200 border-gray-200"
          )}
        >
          <span
            className={cn(
              "inline-block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform",
              checked ? "translate-x-4" : "translate-x-0.5"
            )}
          />
        </span>
      </label>
    )
  }
)

Switch.displayName = "Switch"

