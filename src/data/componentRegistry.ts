import { ComponentSpec } from '../types';

/**
 * Component Registry
 *
 * Each entry represents a component in the design system.
 * Tags are used as the "vocabulary" for RAG-style similarity matching.
 * Props are the TypeScript interface contracts.
 *
 * Frameworks:
 *  - MUI       → Material UI v5 component
 *  - React     → Pure React component
 *  - Stencil.js → Web Component (framework-agnostic)
 *  - MUI+React → MUI-styled React wrapper
 *  - React+Chart.js → Chart.js wrapped in React
 */
export const COMPONENT_REGISTRY: Record<string, ComponentSpec> = {
  DataTable: {
    name: 'DataTable',
    desc: 'Paginated, sortable, filterable table for entity lists',
    props: [
      'columns: ColumnDef<T>[]',
      'data: T[]',
      'onRowClick?: (row: T) => void',
      'selectable?: boolean',
      'pagination?: boolean',
      'loading?: boolean',
    ],
    tags: ['table', 'list', 'data', 'users', 'orders', 'items', 'entities', 'grid', 'rows'],
    fw: 'MUI+React',
  },

  FilterPanel: {
    name: 'FilterPanel',
    desc: 'Horizontal filter bar with chips, selects and date ranges',
    props: [
      'filters: FilterDef[]',
      'onFilter: (values: Record<string, unknown>) => void',
      'defaultValues?: Record<string, unknown>',
      'loading?: boolean',
    ],
    tags: ['filter', 'query', 'date', 'status', 'select', 'search', 'criteria'],
    fw: 'React',
  },

  StatsCard: {
    name: 'StatsCard',
    desc: 'KPI metric card with value, trend delta and label',
    props: [
      'value: string | number',
      'label: string',
      'delta?: number',
      'icon?: string',
      'currency?: boolean',
    ],
    tags: ['stats', 'kpi', 'metric', 'analytics', 'count', 'overview', 'summary', 'card'],
    fw: 'MUI',
  },

  FormField: {
    name: 'FormField',
    desc: 'Controlled MUI input field with validation and label',
    props: [
      'name: string',
      'label: string',
      'type?: "text" | "email" | "password" | "number" | "select"',
      'required?: boolean',
      'error?: string',
      'helperText?: string',
    ],
    tags: ['form', 'input', 'field', 'settings', 'profile', 'edit', 'create', 'text'],
    fw: 'MUI',
  },

  SidebarNav: {
    name: 'SidebarNav',
    desc: 'Left navigation sidebar with icons and route links',
    props: [
      'items: NavItem[]',
      'activeRoute: string',
      'onNavigate: (route: string) => void',
      'collapsed?: boolean',
    ],
    tags: ['navigation', 'sidebar', 'menu', 'layout', 'routing', 'nav', 'links'],
    fw: 'React',
  },

  StatusBadge: {
    name: 'StatusBadge',
    desc: 'Stencil.js web component for status/state indicators',
    props: [
      'status: "active" | "inactive" | "pending" | "error"',
      'label?: string',
      'size?: "sm" | "md"',
    ],
    tags: ['status', 'badge', 'state', 'indicator', 'label', 'pill'],
    fw: 'Stencil.js',
  },

  SearchBar: {
    name: 'SearchBar',
    desc: 'Stencil.js debounced search input with clear button',
    props: [
      'placeholder?: string',
      'onSearch: (query: string) => void',
      'debounce?: number',
      'clearable?: boolean',
    ],
    tags: ['search', 'input', 'find', 'lookup', 'query', 'filter', 'text'],
    fw: 'Stencil.js',
  },

  PageLayout: {
    name: 'PageLayout',
    desc: 'Full-page scaffold with topbar, sidebar and content slots',
    props: [
      'title: string',
      'actions?: React.ReactNode',
      'sidebar?: React.ReactNode',
      'breadcrumbs?: BreadcrumbItem[]',
    ],
    tags: ['layout', 'page', 'scaffold', 'structure', 'wrapper', 'shell', 'frame'],
    fw: 'React',
  },

  ChartWidget: {
    name: 'ChartWidget',
    desc: 'Chart.js line/bar/pie wrapper component',
    props: [
      'type: "line" | "bar" | "pie" | "doughnut"',
      'data: ChartData',
      'title?: string',
      'height?: number',
      'loading?: boolean',
    ],
    tags: ['chart', 'graph', 'trend', 'analytics', 'line', 'bar', 'visualization', 'plot'],
    fw: 'React+Chart.js',
  },
};
