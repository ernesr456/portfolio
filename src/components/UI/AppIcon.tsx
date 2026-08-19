import * as HeroIcons from '@heroicons/react/24/outline';
import type { ComponentType, SVGProps } from 'react';

export type AppIconName = keyof typeof HeroIcons;

type AppIconProps = {
  name: AppIconName;
  size?: number;
  className?: string;
};

export default function AppIcon({ name, size = 24, className }: AppIconProps) {
  const Icon = HeroIcons[name] as ComponentType<SVGProps<SVGSVGElement>>;

  return <Icon aria-hidden="true" className={className} height={size} width={size} />;
}
