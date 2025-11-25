export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
} 