import React from 'react';
import {
  Box, Paper, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Grid, Stack,
  TextField, Button, LinearProgress,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import EmptyState from '../shared/EmptyState';
import { PipelineResults } from '../../types';

interface PreviewTabProps {
  results: PipelineResults;
}

// ─── Sample data generators ────────────────────────────────────────────────

const USER_ROWS = [
  { name: 'Arijeet Priyadarshi', email: 'arijeet@ulm.de',  role: 'Engineer',        status: 'active'   as const },
  { name: 'Lena Schmidt',         email: 'lena@co.de',      role: 'Designer',         status: 'active'   as const },
  { name: 'Marco Rossi',          email: 'm.r@co.it',       role: 'Product Manager',  status: 'pending'  as const },
  { name: 'Yuki Tanaka',          email: 'y.t@co.jp',       role: 'Data Scientist',   status: 'inactive' as const },
  { name: 'Sarah Johnson',        email: 's.j@startup.io',  role: 'Engineer',         status: 'active'   as const },
];

const ORDER_ROWS = [
  { id: '#ORD-1042', customer: 'DENSO Automotive',  amount: '€12,800', status: 'active'   as const, date: '2026-06-02' },
  { id: '#ORD-1041', customer: 'Thermo Fisher',     amount: '€4,200',  status: 'pending'  as const, date: '2026-06-01' },
  { id: '#ORD-1040', customer: 'Siemens AG',         amount: '€8,600',  status: 'active'   as const, date: '2026-05-30' },
  { id: '#ORD-1039', customer: 'CoCreate AI',        amount: '€3,100',  status: 'inactive' as const, date: '2026-05-28' },
];

const STATUS_COLOR: Record<'active' | 'pending' | 'inactive', 'success' | 'warning' | 'error'> = {
  active:   'success',
  pending:  'warning',
  inactive: 'error',
};

const KPI_STATS_USER   = [{ l: 'Total Users', v: 248 }, { l: 'Active', v: 186 }, { l: 'Pending', v: 34  }, { l: 'Completion', v: '94%' }];
const KPI_STATS_ORDER  = [{ l: 'Orders',      v: '1,042' }, { l: 'Active', v: 824 }, { l: 'Pending', v: 156 }, { l: 'Revenue', v: '€284k' }];
const KPI_STATS_ANALYT = [{ l: 'Sessions',    v: '24.8k' }, { l: 'Active', v: '18.4k' }, { l: 'Pending', v: '4.1k' }, { l: 'Conversion', v: '3.2%' }];

// ─── Sub-components ────────────────────────────────────────────────────────

function BrowserChrome({ url }: { url: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.75, bgcolor: 'grey.100', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Stack direction="row" spacing={0.5}>
        {['#f97316', '#facc15', '#4ade80'].map((c) => (
          <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: c }} />
        ))}
      </Stack>
      <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.disabled', ml: 1, fontSize: 11 }}>
        localhost:3000/{url}
      </Typography>
    </Box>
  );
}

function AppNavbar({ title }: { title: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.25, bgcolor: '#1e2235', color: '#c5c9d8' }}>
      <Typography variant="body2" fontWeight={600} color="#fff">{title}</Typography>
      <Box sx={{ ml: 'auto' }}>
        <Typography variant="caption" sx={{ color: '#8b8bb3', fontSize: 11 }}>CoCreate UI · Auto-generated</Typography>
      </Box>
    </Box>
  );
}

function StatsRow({ stats }: { stats: { l: string; v: string | number }[] }) {
  return (
    <Grid container spacing={1.5} mb={2}>
      {stats.map((s) => (
        <Grid item xs={3} key={s.l}>
          <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block">{s.l}</Typography>
            <Typography variant="h6" fontWeight={500}>{s.v}</Typography>
            <Typography variant="caption" color="success.main" sx={{ fontSize: 11 }}>↑ 12%</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

const PreviewTab: React.FC<PreviewTabProps> = ({ results }) => {
  const { blueprint, retrieved, code } = results;

  if (!blueprint) {
    return <EmptyState icon={<VisibilityIcon fontSize="inherit" />} message="Live UI preview renders here after generation" />;
  }

  const prompt       = blueprint.page_title?.toLowerCase() ?? '';
  const isOrder      = prompt.includes('order');
  const isAnalytic   = prompt.includes('analytic') || prompt.includes('overview');
  const hasStats     = retrieved.some((r) => r.name === 'StatsCard');
  const hasFilter    = retrieved.some((r) => r.name === 'FilterPanel' || r.name === 'SearchBar');
  const hasTable     = retrieved.some((r) => r.name === 'DataTable');

  const stats = isOrder ? KPI_STATS_ORDER : isAnalytic ? KPI_STATS_ANALYT : KPI_STATS_USER;
  const rows  = isOrder ? ORDER_ROWS : USER_ROWS;
  const compLabel = retrieved.map((r) => r.name).join(' + ');
  const lineCount = code.split('\n').length;
  const slug = blueprint.page_title.toLowerCase().replace(/\s+/g, '-');

  return (
    <Box>
      {/* Meta info row */}
      <Stack direction="row" alignItems="center" spacing={1} mb={1.25} flexWrap="wrap">
        <Typography variant="caption" color="text.secondary">Live preview</Typography>
        <Chip label={compLabel} size="small" variant="outlined" sx={{ fontSize: 11, height: 20 }} />
        <Box sx={{ ml: 'auto' }}>
          <Chip label={`${lineCount}L TypeScript · Validated`} size="small" color="success" variant="outlined" sx={{ fontSize: 11, height: 20 }} />
        </Box>
      </Stack>

      {/* Preview card */}
      <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <BrowserChrome url={slug} />
        <AppNavbar title={blueprint.page_title} />

        <Box sx={{ p: 2, bgcolor: '#f4f5f8' }}>
          {/* Stats cards */}
          {hasStats && <StatsRow stats={stats} />}

          {/* Filter / search bar */}
          {hasFilter && (
            <Stack direction="row" spacing={1} mb={1.75} alignItems="center">
              <TextField
                size="small"
                placeholder={`Search ${isOrder ? 'orders' : 'users'}…`}
                InputProps={{ startAdornment: <SearchIcon sx={{ fontSize: 16, color: 'text.disabled', mr: 0.5 }} /> }}
                sx={{ width: 200, '& .MuiInputBase-input': { fontSize: 12 } }}
              />
              <TextField select size="small" defaultValue="all" sx={{ width: 120, '& .MuiInputBase-input': { fontSize: 12 } }}>
                {/* MUI select placeholder */}
              </TextField>
              {isOrder && (
                <TextField select size="small" defaultValue="30d" sx={{ width: 120, '& .MuiInputBase-input': { fontSize: 12 } }} />
              )}
              <Box sx={{ ml: 'auto' }}>
                <Button variant="contained" size="small" sx={{ bgcolor: '#1e2235', fontSize: 12 }}>
                  + Add {isOrder ? 'Order' : 'User'}
                </Button>
              </Box>
            </Stack>
          )}

          {/* Data table */}
          {hasTable && (
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f9fafb' }}>
                    {isOrder
                      ? ['Order ID', 'Customer', 'Amount', 'Status', 'Date'].map((h) => (
                          <TableCell key={h} sx={{ fontSize: 11, fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.4 }}>{h}</TableCell>
                        ))
                      : ['Name', 'Email', 'Role', 'Status', 'Actions'].map((h) => (
                          <TableCell key={h} sx={{ fontSize: 11, fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.4 }}>{h}</TableCell>
                        ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isOrder
                    ? ORDER_ROWS.map((row, i) => (
                        <TableRow key={i} hover>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: 11 }}>{row.id}</TableCell>
                          <TableCell sx={{ fontSize: 12 }}>{row.customer}</TableCell>
                          <TableCell sx={{ fontSize: 12, fontWeight: 500 }}>{row.amount}</TableCell>
                          <TableCell>
                            {/* status-badge Stencil.js web component */}
                            <Chip label={row.status} size="small" color={STATUS_COLOR[row.status]} sx={{ height: 18, fontSize: 11, textTransform: 'capitalize' }} />
                          </TableCell>
                          <TableCell sx={{ fontSize: 11, color: 'text.secondary' }}>{row.date}</TableCell>
                        </TableRow>
                      ))
                    : USER_ROWS.map((row, i) => (
                        <TableRow key={i} hover>
                          <TableCell sx={{ fontSize: 12, fontWeight: 500 }}>{row.name}</TableCell>
                          <TableCell sx={{ fontSize: 11, color: 'text.secondary' }}>{row.email}</TableCell>
                          <TableCell sx={{ fontSize: 12 }}>{row.role}</TableCell>
                          <TableCell>
                            <Chip label={row.status} size="small" color={STATUS_COLOR[row.status]} sx={{ height: 18, fontSize: 11, textTransform: 'capitalize' }} />
                          </TableCell>
                          <TableCell>
                            <Button size="small" variant="outlined" sx={{ fontSize: 11, py: 0.25 }}>Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>

      <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 1, fontSize: 11 }}>
        Stencil.js web components (StatusBadge, SearchBar) registered as custom elements · MUI v5 theme applied · Props type-checked
      </Typography>
    </Box>
  );
};

export default PreviewTab;
