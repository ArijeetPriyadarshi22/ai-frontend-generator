import React from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import EmptyState from '../shared/EmptyState';
import CopyButton from '../shared/CopyButton';
import { Blueprint } from '../../types';

interface BlueprintTabProps {
  blueprint: Blueprint | null;
}

/** Very lightweight JSON syntax highlighter — no external deps */
function highlightJson(obj: unknown): string {
  const raw = JSON.stringify(obj, null, 2);
  return raw
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"([^"]+)":/g, '<span style="color:#60a5fa">"$1"</span>:')
    .replace(/: "([^"]+)"/g, ': <span style="color:#34d399">"$1"</span>')
    .replace(/: (\d+\.?\d*)/g, ': <span style="color:#fbbf24">$1</span>')
    .replace(/: (true|false|null)/g, ': <span style="color:#f87171">$1</span>');
}

const BlueprintTab: React.FC<BlueprintTabProps> = ({ blueprint }) => {
  if (!blueprint) {
    return <EmptyState icon={<ArticleIcon fontSize="inherit" />} message="UI Blueprint JSON appears here" />;
  }

  const jsonStr = JSON.stringify(blueprint, null, 2);

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.25}>
        <Typography variant="caption" color="text.secondary">
          UI Blueprint v{blueprint.blueprint_version} · {blueprint.sections?.length ?? 0} sections · schema validated
        </Typography>
        <CopyButton text={jsonStr} />
      </Stack>

      <Paper
        variant="outlined"
        sx={{
          p: 1.75,
          borderRadius: 2,
          bgcolor: '#0f172a',
          overflow: 'auto',
          maxHeight: 480,
        }}
      >
        <Box
          component="pre"
          sx={{
            m: 0,
            fontFamily: 'monospace',
            fontSize: 12,
            lineHeight: 1.7,
            color: '#e2e8f0',
            whiteSpace: 'pre',
          }}
          dangerouslySetInnerHTML={{ __html: highlightJson(blueprint) }}
        />
      </Paper>
    </Box>
  );
};

export default BlueprintTab;
