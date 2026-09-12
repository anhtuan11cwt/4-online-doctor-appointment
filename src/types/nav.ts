export interface NavItem {
  description?: string;
  disabled?: boolean;
  external?: boolean;
  href: string;
  icon?: string;
  title: string;
}

export interface NavGroup {
  items: NavItem[];
  title: string;
}
