// ─── Pipeline Step ───────────────────────────────────────────────────────────

export type StepStatus = 'idle' | 'running' | 'done' | 'error';

export interface PipelineStep {
  id: string;
  label: string;
  status: StepStatus;
}

export type PipelineStatus = 'idle' | 'running' | 'done' | 'error';

// ─── Intent ──────────────────────────────────────────────────────────────────

export type LayoutType =
  | 'DashboardWithSidebar'
  | 'PageWithFilters'
  | 'FormPage'
  | 'CatalogGrid'
  | 'AnalyticsDashboard';

export interface IntentResult {
  layout: LayoutType;
  title: string;
  entities: string[];
  interactions: string[];
  components_needed: string[];
  data_shape: string;
  complexity: 'low' | 'medium' | 'high';
}

// ─── Component Registry ───────────────────────────────────────────────────────

export type Framework = 'MUI' | 'React' | 'Stencil.js' | 'MUI+React' | 'React+Chart.js';

export interface ComponentSpec {
  name: string;
  desc: string;
  props: string[];
  tags: string[];
  fw: Framework;
  score?: number;
}

// ─── Blueprint ───────────────────────────────────────────────────────────────

export interface BlueprintSection {
  id: string;
  component: string;
  props: Record<string, unknown>;
  data_source: string;
  order: number;
}

export interface Blueprint {
  blueprint_version: string;
  layout: string;
  page_title: string;
  sections: BlueprintSection[];
  theme: {
    primary: string;
    variant: 'light' | 'dark';
  };
}

// ─── Validation ──────────────────────────────────────────────────────────────

export type ValidationStatus = 'pass' | 'warn' | 'fail';

export interface ValidationCheck {
  type: ValidationStatus;
  msg: string;
}

// ─── MCP Log ─────────────────────────────────────────────────────────────────

export type McpRole = 'orch' | 'rag' | 'comp' | 'val' | 'sys';

export interface McpLogEntry {
  time: string;
  role: McpRole;
  msg: string;
}

// ─── Pipeline Results ─────────────────────────────────────────────────────────

export interface PipelineResults {
  intent: IntentResult | null;
  retrieved: ComponentSpec[];
  blueprint: Blueprint | null;
  code: string;
  validations: ValidationCheck[];
  mcpLog: McpLogEntry[];
}

// ─── Full Pipeline State ──────────────────────────────────────────────────────

export interface PipelineState {
  status: PipelineStatus;
  steps: PipelineStep[];
  results: PipelineResults;
  activeTab: string;
}
