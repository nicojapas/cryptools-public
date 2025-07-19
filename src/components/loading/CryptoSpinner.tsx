import React from 'react';
import {
  SpinnerContainer,
  BitcoinIcon,
  BitcoinSymbol,
  LoadingText,
  OrbitalContainer,
  OrbitalDot
} from './CryptoSpinner.styles';

interface CryptoSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  variant?: 'bitcoin' | 'orbital';
}

const CryptoSpinner: React.FC<CryptoSpinnerProps> = ({ 
  size = 'medium', 
  text = 'Loading crypto data...',
  variant = 'bitcoin'
}) => {  
  const getSizes = () => {
    switch (size) {
      case 'small':
        return { icon: '40px', container: '50px', text: '12px' };
      case 'large':
        return { icon: '80px', container: '100px', text: '16px' };
      default:
        return { icon: '60px', container: '70px', text: '14px' };
    }
  };
  
  const sizes = getSizes();

  if (variant === 'orbital') {
    return (
      <SpinnerContainer>
        <OrbitalContainer>
          <BitcoinIcon sx={{ width: sizes.icon, height: sizes.icon }}>
            <BitcoinSymbol viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 6.41c.78-.78.78-2.05 0-2.83-.78-.78-2.05-.78-2.83 0l-1.41 1.41c-.78.78-.78 2.05 0 2.83.78.78 2.05.78 2.83 0l1.41-1.41z"/>
              <path d="M12.5 6.5h-1v2h-2v1h2v2h1v-2h2v-1h-2v-2z"/>
            </BitcoinSymbol>
          </BitcoinIcon>
          <OrbitalDot delay={0} />
          <OrbitalDot delay={0.5} />
          <OrbitalDot delay={1} />
        </OrbitalContainer>
        {text && (
          <LoadingText sx={{ fontSize: sizes.text }}>
            {text}
          </LoadingText>
        )}
      </SpinnerContainer>
    );
  }

  return (
    <SpinnerContainer>
      <BitcoinIcon sx={{ width: sizes.icon, height: sizes.icon }}>
        <BitcoinSymbol viewBox="0 0 24 24">
          <path d="M17.06 11.57c.59-.69.94-1.59.94-2.57 0-1.86-1.27-3.43-3-3.87V3h-2v2.06c-.5-.06-1-.06-1.5 0V3h-2v2.13c-.5.06-1 .19-1.5.37L8 8.5c.37-.13.77-.23 1.19-.27.42-.04.83-.04 1.25 0 .42.04.81.14 1.19.27.37.13.71.31 1 .54.58.46.94 1.16.94 1.96 0 .8-.36 1.5-.94 1.96-.29.23-.63.41-1 .54-.38.13-.77.23-1.19.27-.42.04-.83.04-1.25 0-.42-.04-.82-.14-1.19-.27L8 15.5l-.01 2.37c.5.18 1 .31 1.5.37V21h2v-2.06c.5.06 1 .06 1.5 0V21h2v-2.13c1.73-.44 3-2.01 3-3.87 0-.98-.35-1.88-.94-2.57zm-5.56-.82c.58 0 1.08.23 1.44.59.36.36.59.86.59 1.44s-.23 1.08-.59 1.44c-.36.36-.86.59-1.44.59s-1.08-.23-1.44-.59c-.36-.36-.59-.86-.59-1.44s.23-1.08.59-1.44c.36-.36.86-.59 1.44-.59z"/>
        </BitcoinSymbol>
      </BitcoinIcon>
      {text && (
        <LoadingText sx={{ fontSize: sizes.text }}>
          {text}
        </LoadingText>
      )}
    </SpinnerContainer>
  );
};

export default CryptoSpinner;