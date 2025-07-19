import { Box, keyframes, styled } from '@mui/material';

// Keyframes for rotation animation
export const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Keyframes for pulsing effect
export const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

// Orbital dots animation
export const orbitalDots = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled container for the spinner
export const SpinnerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

// Styled Bitcoin icon container
export const BitcoinIcon = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${theme.palette.mode === 'dark' ? '#f7931a' : '#f7931a'}, ${theme.palette.mode === 'dark' ? '#ffb84d' : '#ffb84d'})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${rotate} 2s linear infinite`,
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 0 20px rgba(247, 147, 26, 0.3)'
    : '0 0 20px rgba(247, 147, 26, 0.2)',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '70px',
    height: '70px',
    border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(247, 147, 26, 0.3)' : 'rgba(247, 147, 26, 0.2)'}`,
    borderRadius: '50%',
    animation: `${pulse} 1.5s ease-in-out infinite`,
  },
}));

// Bitcoin symbol SVG
export const BitcoinSymbol = styled('svg')(({ theme }) => ({
  width: '30px',
  height: '30px',
  fill: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
  filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))',
}));

// Loading text with typewriter effect
export const LoadingText = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
  fontSize: '14px',
  fontWeight: 500,
  animation: `${pulse} 2s ease-in-out infinite`,
  fontFamily: 'monospace',
}));

export const OrbitalContainer = styled(Box)({
  position: 'relative',
  width: '100px',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const OrbitalDot = styled(Box)<{ delay: number }>(({ theme, delay }) => ({
  position: 'absolute',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: theme.palette.primary.main,
  animation: `${orbitalDots} 3s linear infinite`,
  animationDelay: `${delay}s`,
  transformOrigin: '50px 50px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-46px',
    left: '-4px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'inherit',
    opacity: 0.7,
  },
}));