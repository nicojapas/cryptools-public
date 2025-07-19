import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ChartComponent } from "../index";
import { CoinCardProps } from "../../utils/types";
import { StyledCard, StyledCardActionArea, StyledTypography, PriceTypography, MarketCapTypography } from "./CoinCard.styles";


export const CoinCard = ({ coin }: CoinCardProps) => {
  const navigate = useNavigate();

  if (!coin) return <Skeleton variant="rounded" sx={{ height: "200px", borderRadius: 2 }} />;

  return (
    <StyledCard data-testid={`coin-card-${coin.symbol}`} variant="outlined" sx={{ width: "100%", height: "100%" }}>
      <CardContent sx={{ p: 0, [`&:last-child`]: { p: 0 }, height: "100%" }}>
        <StyledCardActionArea 
          data-testid={`coin-card-action-${coin.symbol}`} 
          sx={{ height: "100%" }} 
          onClick={() => navigate("/charts", { state: { symbol: coin.symbol } })}
          aria-label={`View ${coin.name} (${coin.symbol}) chart - Price: $${parseFloat(coin.currentPrice).toLocaleString()}, Market Cap Rank: #${coin.marketCapRank}`}
        >
          <Stack direction="column" spacing={2} sx={{ p: 2, height: "100%" }}>
            {/* Header with coin info */}
            <Stack direction="row" spacing={2} alignItems="center">
              <CardMedia
                component="img"
                sx={{ 
                  width: "60px", 
                  height: "60px",
                  borderRadius: "12px",
                  border: (theme) => theme.palette.mode === 'light'
                    ? "2px solid rgba(102, 126, 234, 0.2)"
                    : "2px solid rgba(102, 126, 234, 0.3)",
                  background: (theme) => theme.palette.mode === 'light'
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(26, 31, 46, 0.8)",
                  objectFit: "contain"
                }}
                image={coin.image}
                alt={coin.name}
              />
              <Stack direction="column" spacing={0.5} sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    #{coin.marketCapRank}
                  </Typography>
                  <StyledTypography variant="h6" noWrap>
                    {coin.name}
                  </StyledTypography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {coin.symbol.toUpperCase()}
                  </Typography>
                  {coin.stable && (
                    <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                      STABLE
                    </Typography>
                  )}
                </Stack>
                <PriceTypography variant="h6">
                  ${parseFloat(coin.currentPrice).toLocaleString()}
                </PriceTypography>
              </Stack>
            </Stack>

            {/* Market data */}
            <Stack direction="column" spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <MarketCapTypography>Market Cap:</MarketCapTypography>
                <MarketCapTypography>${parseFloat(coin.marketCap).toLocaleString()}</MarketCapTypography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <MarketCapTypography>24h Change:</MarketCapTypography>
                <Typography 
                  variant="body2" 
                  color={parseFloat(coin.priceChange24H) >= 0 ? "success.main" : "error.main"}
                  sx={{ fontWeight: 600 }}
                >
                  ${parseFloat(coin.priceChange24H).toLocaleString()}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <MarketCapTypography>Supply:</MarketCapTypography>
                <MarketCapTypography>{parseFloat(coin.circulatingSupply).toLocaleString()}</MarketCapTypography>
              </Stack>
            </Stack>

            {/* Chart */}
            {coin.sparkline7D && (
              <Box sx={{ minHeight: 120, mt: 1 }}>
                <ChartComponent data={coin.sparkline7D} />
              </Box>
            )}
          </Stack>
        </StyledCardActionArea>
      </CardContent>
    </StyledCard>
  );
}; 