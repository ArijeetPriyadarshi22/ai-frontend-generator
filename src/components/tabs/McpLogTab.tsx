import React from 'react';
import { Box, Stack, Typography, Chip } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import EmptyState from '../shared/EmptyState';
import { McpLogEntry, McpRole } from '../../types';

interface McpLogTabProps {
  logs: McpLogEntry[];
}

const ROLE_CONFIG: Record<McpRole, { label: string; color: 'info' | 'warning' | 'success' | 'error' | 'default' }> = {
  orch: { label: 'orchestrator', color: 'info'    },
  rag:  { label: 'rag',         color: 'warning'  },
  comp: { label: 'compiler',    color: 'success'  },
  val:  { label: 'validator',   color: 'error'    },
  sys:  { label: 'system',      color: 'default'  },
};

const McpLogTab: React.FC<McpLogTabProps> = ({ logs }) => {
  if (logs.length === 0) {
    return <EmptyState icon={<TerminalIcon fontSize="inherit" />} message="MCP client-server orchestration log appears here" />;
  }

  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.25, fontSize: 11 }}>
        MCP client-server orchestration trace · {logs.length} events
      </Typography>

      <Stack spacing={0.625}>
        {logs.map((entry, i) => {
          const { label, color } = ROLE_CONFIG[entry.role];
          return (
            <Box
              key={i}
              sx={{
                display: 'flex', alignItems: 'flex-start', gap: 1,
                px: 1.5, py: 0.875,
                bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider',
                borderRadius: 1.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontFamily: 'monospace', color: 'text.disabled', whiteSpace: 'nowrap', pt: 0.1, minWidth: 76 }}
              >
                {entry.time}
              </Typography>
              <Chip
                label={label}
                size="small"
                color={color}
                variant="outlined"
                sx={{ height: 18, fontSize: 10, flexShrink: 0 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ flex: 1, lineHeight: 1.5, fontSize: 12 }}>
                {entry.msg}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default McpLogTab;
