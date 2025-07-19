import React from 'react';
import { Box, Typography, Stack, Paper } from '@mui/material';
import CryptoSpinner from './CryptoSpinner';

/**
 * Example component demonstrating how to use the CryptoSpinner
 * This shows different variations and sizes of the spinner
 */
const LoadingExample: React.FC = () => {
  return (
    <Paper sx={{ p: 4, m: 2 }}>
      <Typography variant="h5" gutterBottom>
        CryptoSpinner Examples
      </Typography>
      
      <Stack spacing={4}>
        {/* Basic Bitcoin Spinner */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Basic Bitcoin Spinner (Medium)
          </Typography>
          <CryptoSpinner />
        </Box>

        {/* Small Bitcoin Spinner */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Small Bitcoin Spinner
          </Typography>
          <CryptoSpinner 
            size="small" 
            text="Loading prices..." 
          />
        </Box>

        {/* Large Bitcoin Spinner */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Large Bitcoin Spinner
          </Typography>
          <CryptoSpinner 
            size="large" 
            text="Fetching blockchain data..." 
          />
        </Box>

        {/* Orbital Variant */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Orbital Spinner Variant
          </Typography>
          <CryptoSpinner 
            variant="orbital" 
            text="Syncing with network..." 
          />
        </Box>

        {/* No Text */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Spinner without Text
          </Typography>
          <CryptoSpinner text="" />
        </Box>
      </Stack>
    </Paper>
  );
};

export default LoadingExample;