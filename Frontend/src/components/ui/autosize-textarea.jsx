import * as React from "react"
import { cn } from "@/lib/utils"

const AutosizeTextarea = React.forwardRef(({ className, onChange, minRows = 3, maxRows = 15, value, defaultValue, ...props }, ref) => {
  const innerRef = React.useRef(null)
  
  React.useImperativeHandle(ref, () => innerRef.current)

  const adjustHeight = React.useCallback(() => {
    const el = innerRef.current
    if (!el) return

    el.style.height = 'auto'
    
    const computedStyle = window.getComputedStyle(el)
    const paddingTop = parseFloat(computedStyle.paddingTop) || 0
    const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0
    // Approximate line height if normal
    const lhString = computedStyle.lineHeight
    const lineHeight = lhString === 'normal' ? 20 : (parseFloat(lhString) || 20)

    const minHeight = (minRows * lineHeight) + paddingTop + paddingBottom
    const maxHeight = maxRows ? (maxRows * lineHeight) + paddingTop + paddingBottom : null

    let newHeight = el.scrollHeight
    
    if (newHeight < minHeight) newHeight = minHeight
    if (maxHeight && newHeight > maxHeight) newHeight = maxHeight

    el.style.height = `${newHeight}px`
    
    if (maxHeight && el.scrollHeight > maxHeight) {
      el.style.overflowY = 'auto'
    } else {
      el.style.overflowY = 'hidden'
    }
  }, [minRows, maxRows])

  // Run on mount and value change
  React.useEffect(() => {
    // Add small timeout to ensure layout is computed
    const timeoutId = setTimeout(adjustHeight, 0)
    return () => clearTimeout(timeoutId)
  }, [value, defaultValue, adjustHeight])

  const handleChange = (e) => {
    adjustHeight()
    if (onChange) onChange(e)
  }

  return (
    <textarea
      className={cn(
        "flex w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none overflow-hidden",
        className
      )}
      ref={innerRef}
      onChange={handleChange}
      value={value}
      defaultValue={defaultValue}
      rows={minRows}
      {...props}
    />
  )
})
AutosizeTextarea.displayName = "AutosizeTextarea"

export { AutosizeTextarea }
