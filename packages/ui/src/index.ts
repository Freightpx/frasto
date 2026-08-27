import '../dist/styles.css';

export { default as Avatar } from './components/Avatar.astro';
export { default as Badge } from './components/Badge.astro';
export { default as Button } from './components/Button.astro';
export { default as Checkbox } from './components/Checkbox.astro';
export { default as Dialog } from './components/Dialog.astro';
export { default as Dropdown } from './components/Dropdown.astro';
export { default as DropdownItem } from './components/DropdownItem.astro';
export { default as Drawer } from './components/Drawer.astro';
export { default as Icon } from './components/Icon.astro';
export { default as IconButton } from './components/IconButton.astro';
export { default as Input } from './components/Input.astro';
export { default as Popover } from './components/Popover.astro';
export { default as Radio } from './components/Radio.astro';
export { default as Select } from './components/Select.astro';
export { default as Separator } from './components/Separator.astro';
export { default as Skeleton } from './components/Skeleton.astro';
export { default as Spinner } from './components/Spinner.astro';
export { default as Switch } from './components/Switch.astro';
export { default as Surface } from './components/Surface.astro';
export { default as Tab } from './components/Tab.astro';
export { default as TabPanel } from './components/TabPanel.astro';
export { default as Tabs } from './components/Tabs.astro';
export { default as Textarea } from './components/Textarea.astro';
export { default as Tooltip } from './components/Tooltip.astro';
export type {
  AvatarSize,
} from './components/avatar-styles';
export type {
  BadgeSize,
  BadgeTone,
  BadgeVariant,
} from './components/badge-styles';
export type {
  ButtonSize,
  ButtonTone,
  ButtonVariant,
} from './components/button-styles';
export type { DropdownPlacement } from './components/dropdown-styles';
export type { DialogSize } from './components/dialog-styles';
export type {
  DrawerSide,
  DrawerSize,
} from './components/drawer-styles';
export type { InputSize } from './components/input-styles';
export type { PopoverPlacement } from './components/popover-styles';
export type { CheckboxSize } from './components/checkbox-styles';
export type { RadioSize } from './components/radio-styles';
export type { SelectSize } from './components/select-styles';
export type {
  SeparatorOrientation,
  SeparatorTone,
} from './components/separator-styles';
export type {
  SkeletonAnimation,
  SkeletonVariant,
} from './components/skeleton-styles';
export type { SpinnerSize } from './components/spinner-styles';
export type { SwitchSize } from './components/switch-styles';
export type {
  SurfaceElement,
  SurfacePadding,
  SurfaceVariant,
} from './components/surface-styles';
export type { TextareaResize } from './components/textarea-styles';
export type { TooltipPlacement } from './components/tooltip-styles';
export {
  ArrowUpRight as ArrowUpRightIcon,
  Menu as MenuIcon,
  Plus as PlusIcon,
  Search as SearchIcon,
} from '@lucide/astro';

export const version = '0.0.0';
