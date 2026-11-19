import type { IconName } from '@/components/icons/icons';

export interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

export const appNavigation: NavItem[] = [
  { label: 'Library', href: '/library', icon: 'library' },
  { label: 'Discover', href: '/discover', icon: 'discover' },
  { label: 'Search', href: '/search', icon: 'search' },
  { label: 'Marks', href: '/marks', icon: 'marks' },
  { label: 'Settings', href: '/settings', icon: 'settings' },
];

export const publicNavigation: NavItem[] = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Demo', href: '/demo', icon: 'book-open' },
  { label: 'Help', href: '/help', icon: 'help' },
];
