export type DropdownTriggerProps = {
  label: string
  output: string
  outputQuery: string
  onChange?: (output: string, outputQuery: string) => void
  children?: (onClose: () => void) => React.ReactNode
  className?: string
}
