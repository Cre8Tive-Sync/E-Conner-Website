import {
  BarChart2,
  Leaf,
  ClipboardList,
  Scale,
  Hospital,
  Mountain,
  Droplets,
  TreePine,
  Coins,
  Pin,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  BarChart2,
  Leaf,
  ClipboardList,
  Scale,
  Hospital,
  Mountain,
  Droplets,
  TreePine,
  Coins,
  Pin,
};

export function DynamicIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return <span>{name}</span>;
  return <Icon size={size} />;
}
