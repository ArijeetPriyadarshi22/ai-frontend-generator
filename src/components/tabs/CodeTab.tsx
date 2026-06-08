import React from 'react';
import { Box, Typography, Paper, Stack, Chip } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import EmptyState from '../shared/EmptyState';
import CopyButton from '../shared/CopyButton';

interface CodeTabProps {
  code: string;
}

/** Lightweight TSX syntax highlighter */
function highlightCode(code: string): string {
  return code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // comments
    .replace(/(\/\/[^\n]*)/g, '<span style="color:#94a3b8">$1</span>')
    // imports / keywords
    .replace(
      /\b(import|export default|export|from|const|let|const|interface|type|return|React|useState|useEffect|useCallback)\b/g,
      '<span style="color:#c084fc">$1</span>'
    )
    // types
    .replace(/\b(string|number|boolean|void|any|FC|React\.FC|Record|Array)\b/g,
      '<span style="color:#fbbf24">$1</span>'
    )
    // strings
    .replace(/'([^']*)'/g, "<span style=\"color:#34d399\">'$1'</span>")
    // JSX tags (after escaping)
    .replace(/(&lt;\/?[A-Z][A-Za-z]*)/g, '<span style="color:#60a5fa">$1</span>')
    .replace(/(&lt;\/?[a-z]+)/g, '<span style="color:#7dd3fc">$1</span>');
}

const CodeTab: React.FC<CodeTabProps> = ({ code }) => {
  if (!code) {
    return <EmptyState icon={<CodeIcon fontSize="inherit" />} message="Generated React + TypeScript code appears here" />;
  }

  const lines = code.split('\n').length;

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.25}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="caption" color="text.secondary">
            Generated React + TypeScript
          </Typography>
          <Chip label={`${lines} lines`} size="small" variant="outlined" sx={{ height: 18, fontSize: 10 }} />
          <Chip label="MUI v5" size="small" color="info" variant="outlined" sx={{ height: 18, fontSize: 10 }} />
          <Chip label="Stencil.js" size="small" color="secondary" variant="outlined" sx={{ height: 18, fontSize: 10 }} />
        </Stack>
        <CopyButton text={code} />
      </Stack>

      <Paper
        variant="outlined"
        sx={{ p: 1.75, borderRadius: 2, bgcolor: '#0f172a', overflow: 'auto', maxHeight: 520 }}
      >
        <Box
          component="pre"
          sx={{
            m: 0,
            fontFamily: 'monospace',
            fontSize: 12,
            lineHeight: 1.75,
            color: '#e2e8f0',
            whiteSpace: 'pre',
            wordBreak: 'normal',
          }}
          dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
        />
      </Paper>
    </Box>
  );
};

export default CodeTab;
