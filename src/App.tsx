import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Topbar from './components/Topbar';
import PipelineBar from './components/PipelineBar';
import InputSection from './components/InputSection';
import OutputTabs from './components/OutputTabs';
import { usePipeline } from './hooks/usePipeline';
import { PipelineState } from './types';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1e2235' },
    secondary: { main: '#3B6D11' },
    background: { default: '#f4f5f8', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", sans-serif',
    fontSize: 13,
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 500 },
      },
    },
  },
});

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const { state, run, reset } = usePipeline();

  const handleGenerate = () => {
    if (prompt.trim()) run(prompt.trim());
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Topbar pipelineStatus={state.status} />
        <PipelineBar steps={state.steps} />
        <InputSection
          prompt={prompt}
          onPromptChange={setPrompt}
          onGenerate={handleGenerate}
          onReset={reset}
          isRunning={state.status === 'running'}
        />
        <OutputTabs results={state.results} activeTab={state.activeTab} />
      </Box>
    </ThemeProvider>
  );
};

export default App;
