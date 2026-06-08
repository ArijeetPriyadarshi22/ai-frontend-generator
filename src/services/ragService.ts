import { ComponentSpec } from '../types';
import { COMPONENT_REGISTRY } from '../data/componentRegistry';

/**
 * RAG Retrieval Service
 *
 * Simulates vector-DB retrieval against the component registry.
 * In production this would:
 *  1. Embed the query string via an embedding model (e.g. text-embedding-3-small)
 *  2. Store component metadata as vectors in ChromaDB / pgvector
 *  3. Return top-k results by cosine similarity
 *
 * Here we approximate with tag-overlap scoring + intent boosting.
 */

const SIMILARITY_THRESHOLD = 0.12;
const TOP_K = 5;

/**
 * Score a single component against a query string.
 * Returns a value in [0, 1].
 */
function scoreComponent(name: string, comp: ComponentSpec, query: string): number {
  const q = query.toLowerCase();
  let score = 0;

  // Tag overlap — each matching tag contributes
  comp.tags.forEach((tag) => {
    if (q.includes(tag)) score += 0.15;
  });

  // Intent boosting — explicit keyword → component affinity
  const boosts: Record<string, [string, number][]> = {
    table:     [['DataTable', 0.3]],
    list:      [['DataTable', 0.25]],
    dashboard: [['PageLayout', 0.2], ['StatsCard', 0.15]],
    filter:    [['FilterPanel', 0.28]],
    search:    [['SearchBar', 0.28], ['FilterPanel', 0.12]],
    stat:      [['StatsCard', 0.35]],
    kpi:       [['StatsCard', 0.35]],
    metric:    [['StatsCard', 0.3]],
    analytics: [['StatsCard', 0.2], ['ChartWidget', 0.3]],
    form:      [['FormField', 0.3]],
    setting:   [['FormField', 0.28]],
    profile:   [['FormField', 0.2]],
    status:    [['StatusBadge', 0.25]],
    badge:     [['StatusBadge', 0.28]],
    chart:     [['ChartWidget', 0.35]],
    graph:     [['ChartWidget', 0.3]],
    nav:       [['SidebarNav', 0.28]],
    sidebar:   [['SidebarNav', 0.35]],
  };

  Object.entries(boosts).forEach(([keyword, entries]) => {
    if (q.includes(keyword)) {
      entries.forEach(([compName, boost]) => {
        if (compName === name) score += boost;
      });
    }
  });

  // Cap + add small jitter to simulate embedding variance
  score = Math.min(score + Math.random() * 0.04, 0.97);
  return parseFloat(score.toFixed(2));
}

/**
 * Retrieve top-K components most relevant to the query.
 * Returns components sorted by descending similarity score.
 */
export function retrieveComponents(query: string): ComponentSpec[] {
  return Object.entries(COMPONENT_REGISTRY)
    .map(([name, comp]) => ({
      ...comp,
      score: scoreComponent(name, comp, query),
    }))
    .filter((c) => (c.score ?? 0) > SIMILARITY_THRESHOLD)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, TOP_K);
}
