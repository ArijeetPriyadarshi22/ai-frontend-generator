# AI Frontend Generator

An end-to-end AI-powered UI generation pipeline built with **React + TypeScript + MUI + Stencil.js + MCP + RAG + Claude Sonnet 4**.

---

## Architecture

```
Natural Language Prompt
        │
        ▼
┌─────────────────────┐
│  1. Intent Parser   │  Claude Sonnet → structured intent JSON
│     (LLM)          │  layout, entities, interactions, complexity
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  2. RAG Retrieval   │  Tag-overlap similarity against component registry
│     (ragService)    │  → top-5 components ranked by cosine score
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  3. Blueprint Gen   │  Claude Sonnet → UI Blueprint JSON
│     (LLM + RAG)    │  schema-validated, component-grounded
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  4. Code Compiler   │  Claude Sonnet → React + TypeScript (TSX)
│     (LLM)          │  MUI v5 + Stencil.js web components
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  5. TS Validation   │  Strict TypeScript + ESLint + prop schema checks
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  6. Preview         │  Live rendered UI with sample data
└─────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 + TypeScript (strict) |
| UI components | MUI v5 (Material UI) |
| Web components | Stencil.js (StatusBadge, SearchBar) |
| LLM orchestration | Claude Sonnet 4 via Anthropic API |
| Retrieval | RAG (tag-overlap scoring → vector DB in production) |
| Agent protocol | MCP client-server pattern |
| Styling | MUI `createTheme` + Emotion |
| State management | React hooks (no Redux) |

---

## Folder Structure

```
ai-frontend-generator/
├── public/
│   └── index.html
├── src/
│   ├── App.tsx                          # Root — wires everything
│   ├── index.tsx                        # React DOM entry
│   ├── types/
│   │   └── index.ts                     # All TypeScript interfaces
│   ├── data/
│   │   └── componentRegistry.ts         # RAG knowledge base (9 components)
│   ├── services/
│   │   ├── anthropicClient.ts           # All LLM calls (intent, blueprint, code)
│   │   └── ragService.ts               # Similarity retrieval logic
│   ├── hooks/
│   │   └── usePipeline.ts              # Pipeline orchestration (6 steps)
│   └── components/
│       ├── Topbar.tsx
│       ├── PipelineBar.tsx
│       ├── InputSection.tsx
│       ├── OutputTabs.tsx
│       ├── shared/
│       │   ├── EmptyState.tsx
│       │   └── CopyButton.tsx
│       └── tabs/
│           ├── IntentTab.tsx
│           ├── RagTab.tsx
│           ├── BlueprintTab.tsx
│           ├── CodeTab.tsx
│           ├── ValidationTab.tsx
│           ├── McpLogTab.tsx
│           └── PreviewTab.tsx
├── .env
├── package.json
└── tsconfig.json
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up API key

```bash
# .env
REACT_APP_ANTHROPIC_API_KEY=sk-ant-...
```

> **Note:** When running inside a claude.ai artifact, the API key is injected automatically by the platform proxy — no `.env` needed.

### 3. Start dev server

```bash
npm start
```

App runs at `http://localhost:3000`.

---

## Using the Generator

1. Type a screen description in the prompt box, or click a quick-prompt chip
2. Hit **Generate** — the pipeline runs 6 steps sequentially
3. Switch between tabs to inspect:
   - **Intent** — parsed layout, entities, interactions
   - **RAG** — retrieved components with similarity scores
   - **Blueprint** — the JSON UI spec (copyable)
   - **Code** — generated React + TypeScript (copyable)
   - **Validation** — TypeScript + ESLint checks
   - **MCP Log** — full orchestration trace
   - **Preview** — live rendered UI

---

## Extending to Production

| Current (demo) | Production upgrade |
|---|---|
| Tag-overlap similarity | Embed components via `text-embedding-3-small` → ChromaDB |
| Mock validation | Real `tsc --noEmit` + ESLint subprocess |
| Inline preview | Sandpack / CodeSandbox live runner |
| Single LLM call | MCP server with `parse_intent`, `rag_retrieve`, `compile_tsx`, `validate_ts` as registered tools |
| API proxy via platform | Self-hosted FastAPI proxy with rate limiting |

---

## Relation to Thesis

The pipeline architecture mirrors the **MCP client-server agentic system** from the thesis _"Agentic Explainable Machine Learning for Depression Prediction using SHAP and MCP"_:

- **Intent parser** ↔ query intent classification
- **RAG retrieval** ↔ RAG explanation method
- **Blueprint generator** ↔ structured explanation output
- **Agentic retry loop** ↔ LLM orchestrator selecting optimal tool

The same pattern — intent → retrieval → structured output → deterministic execution → feedback — applies equally to XAI delivery and UI generation.
