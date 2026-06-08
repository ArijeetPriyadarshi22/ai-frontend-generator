import { Blueprint, ComponentSpec, IntentResult } from '../types';

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';
const MAX_TOKENS = 1000;

/**
 * Base API call wrapper.
 * The API key is injected by the platform (claude.ai artifact proxy).
 */
async function callClaude(userContent: string): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [{ role: 'user', content: userContent }],
    }),
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.content.map((c: { text?: string }) => c.text ?? '').join('');
}

/** Strip markdown code fences if the model wraps JSON in them */
function stripFences(raw: string): string {
  return raw.replace(/```(?:json|typescript|tsx|ts|jsx)?\n?/g, '').replace(/```/g, '').trim();
}

// ─── Step 1: Intent Parser ───────────────────────────────────────────────────

export async function parseIntent(prompt: string): Promise<IntentResult> {
  const raw = await callClaude(`
You are an intent parser for a UI generator pipeline.
Given a user prompt, return ONLY valid JSON — no markdown, no explanation.

Prompt: "${prompt}"

Return exactly this JSON shape:
{
  "layout": "DashboardWithSidebar | PageWithFilters | FormPage | CatalogGrid | AnalyticsDashboard",
  "title": "short page title",
  "entities": ["main", "data", "entities"],
  "interactions": ["user", "actions"],
  "components_needed": ["ComponentName"],
  "data_shape": "brief description of the data",
  "complexity": "low | medium | high"
}
  `);

  try {
    return JSON.parse(stripFences(raw)) as IntentResult;
  } catch {
    // Fallback if the model deviates from JSON
    return {
      layout: 'DashboardWithSidebar',
      title: 'Generated Screen',
      entities: ['Item'],
      interactions: ['view', 'filter'],
      components_needed: ['DataTable', 'FilterPanel'],
      data_shape: 'List of items',
      complexity: 'medium',
    };
  }
}

// ─── Step 3: Blueprint Generator ─────────────────────────────────────────────

export async function generateBlueprint(
  prompt: string,
  intent: IntentResult,
  components: ComponentSpec[]
): Promise<Blueprint> {
  const compNames = components.map((c) => c.name).join(', ');

  const raw = await callClaude(`
You are a UI Blueprint generator. Return ONLY valid JSON — no markdown.

User prompt: "${prompt}"
Detected layout: ${intent.layout}
Page title: ${intent.title}
Available components (from component registry): ${compNames}

Generate a UI Blueprint that maps the prompt to the available components.
Return exactly this JSON shape:
{
  "blueprint_version": "1.0",
  "layout": "${intent.layout}",
  "page_title": "${intent.title}",
  "sections": [
    {
      "id": "s1",
      "component": "ComponentName",
      "props": {},
      "data_source": "entity_name",
      "order": 1
    }
  ],
  "theme": { "primary": "#1e2235", "variant": "light" }
}
  `);

  try {
    return JSON.parse(stripFences(raw)) as Blueprint;
  } catch {
    return {
      blueprint_version: '1.0',
      layout: intent.layout,
      page_title: intent.title,
      sections: components.slice(0, 3).map((c, i) => ({
        id: `s${i + 1}`,
        component: c.name,
        props: {},
        data_source: intent.entities[0] ?? 'items',
        order: i + 1,
      })),
      theme: { primary: '#1e2235', variant: 'light' },
    };
  }
}

// ─── Step 4: Code Compiler ────────────────────────────────────────────────────

export async function generateCode(
  prompt: string,
  blueprint: Blueprint,
  components: ComponentSpec[]
): Promise<string> {
  const compList = components.map((c) => `${c.name} (${c.fw})`).join(', ');

  const raw = await callClaude(`
You are a senior React/TypeScript engineer generating production-ready UI code.

User request: "${prompt}"
Blueprint layout: ${blueprint.layout}
Page title: ${blueprint.page_title}
Blueprint sections: ${JSON.stringify(blueprint.sections)}
Components to use: ${compList}

Generate a complete React functional component (.tsx) that:
1. Imports from @mui/material (Box, Grid, Paper, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Stack)
2. Adds comments for Stencil.js web components (StatusBadge, SearchBar) showing how they'd be imported
3. Defines TypeScript interfaces for all data shapes
4. Uses useState for local filter/search state
5. Includes realistic mock data arrays
6. Renders all sections from the blueprint
7. Applies the MUI theme (primary: ${blueprint.theme.primary})

Output ONLY the raw TSX code. No markdown fences, no explanation.
  `);

  return stripFences(raw);
}
