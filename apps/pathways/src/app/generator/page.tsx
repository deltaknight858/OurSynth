'use client';

import { Container, Typography, Box } from '@mui/material';

import ComponentGenerator from '@/components/generator/ComponentGenerator';

export default function GeneratorPage() {
  return (
    <div className="gradient-bg">
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            className="electric-text"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
              letterSpacing: '-0.02em',
            }}
          >
            AI Component Generator
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Describe the React component you want to create, and our AI will generate beautiful,
            functional code with{' '}
            <span style={{ color: '#e879f9', fontWeight: 600 }}>electric purple energy</span>.
          </Typography>
        </Box>

        <ComponentGenerator />
      </Container>
    </div>
  );
}
