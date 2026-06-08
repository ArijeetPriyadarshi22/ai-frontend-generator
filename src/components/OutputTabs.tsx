import React from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import StorageIcon from '@mui/icons-material/Storage';
import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';
import VerifiedIcon from '@mui/icons-material/Verified';
import TerminalIcon from '@mui/icons-material/Terminal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { PipelineResults } from '../types';
import IntentTab from './tabs/IntentTab';
import RagTab from './tabs/RagTab';
import BlueprintTab from './tabs/BlueprintTab';
import CodeTab from './tabs/CodeTab';
import ValidationTab from './tabs/ValidationTab';
import McpLogTab from './tabs/McpLogTab';
import PreviewTab from './tabs/PreviewTab';

interface OutputTabsProps {
  results: PipelineResults;
  activeTab: string;
}

const TAB_CONFIG = [
  { id: 'intent', label: 'Intent',     Icon: PsychologyIcon },
  { id: 'rag',    label: 'RAG',        Icon: StorageIcon    },
  { id: 'bp',     label: 'Blueprint',  Icon: ArticleIcon    },
  { id: 'code',   label: 'Code',       Icon: CodeIcon       },
  { id: 'val',    label: 'Validation', Icon: VerifiedIcon   },
  { id: 'mcp',    label: 'MCP Log',    Icon: TerminalIcon   },
  { id: 'prev',   label: 'Preview',    Icon: VisibilityIcon },
];

function TabBadge({ value }: { value: string | number }) {
  if (!value && value !== 0) return null;
  return (
    <Box
      component="span"
      sx={{
        ml: 0.75, px: 0.75, py: 0.1,
        bgcolor: 'grey.200', color: 'text.secondary',
        borderRadius: 2, fontSize: 10, fontWeight: 500,
        lineHeight: 1.6,
      }}
    >
      {value}
    </Box>
  );
}

function deriveBadge(id: string, results: PipelineResults): string | number {
  switch (id) {
    case 'intent': return results.intent ? 'OK' : '';
    case 'rag':    return results.retrieved.length > 0 ? results.retrieved.length : '';
    case 'bp':     return results.blueprint ? 'JSON' : '';
    case 'code':   return results.code ? `${results.code.split('\n').length}L` : '';
    case 'val': {
      const p = results.validations.filter((v) => v.type === 'pass').length;
      return results.validations.length > 0 ? `${p}/${results.validations.length}` : '';
    }
    case 'mcp':  return results.mcpLog.length > 0 ? results.mcpLog.length : '';
    case 'prev': return results.blueprint ? '✓' : '';
    default: return '';
  }
}

const OutputTabs: React.FC<OutputTabsProps> = ({ results, activeTab }) => {
  const currentIdx = TAB_CONFIG.findIndex((t) => t.id === activeTab);

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Tab headers */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Tabs
          value={currentIdx === -1 ? 0 : currentIdx}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ minHeight: 40, '& .MuiTab-root': { minHeight: 40, py: 0, fontSize: 12 } }}
        >
          {TAB_CONFIG.map(({ id, label, Icon }) => (
            <Tab
              key={id}
              disableRipple
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Icon sx={{ fontSize: 14 }} />
                  <Typography variant="caption" fontWeight={500}>{label}</Typography>
                  <TabBadge value={deriveBadge(id, results)} />
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab panels */}
      <Box sx={{ flex: 1, overflow: 'auto', bgcolor: 'background.paper' }}>
        {TAB_CONFIG.map(({ id }, idx) => (
          <Box
            key={id}
            role="tabpanel"
            hidden={currentIdx !== idx}
            sx={{ p: 2, display: currentIdx === idx ? 'block' : 'none' }}
          >
            {id === 'intent'  && <IntentTab     intent={results.intent} />}
            {id === 'rag'     && <RagTab         retrieved={results.retrieved} />}
            {id === 'bp'      && <BlueprintTab   blueprint={results.blueprint} />}
            {id === 'code'    && <CodeTab         code={results.code} />}
            {id === 'val'     && <ValidationTab   validations={results.validations} />}
            {id === 'mcp'     && <McpLogTab       logs={results.mcpLog} />}
            {id === 'prev'    && <PreviewTab       results={results} />}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OutputTabs;
