import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ChartComponent } from "../index";
import { CoinCardProps } from "../../utils/types";

export const CoinCard = ({ coin }: CoinCardProps) => {
  const navigate = useNavigate();

  if (!coin) return <Skeleton variant="rounded" sx={{ height: "150px" }} />;

  return (
    <Card variant="outlined" square sx={{ width: "100%", height: "100%" }}>
      <CardContent sx={{ p: 0, [`&:last-child`]: { p: 0 }, height: "100%" }}>
        <CardActionArea sx={{ height: "100%" }} onClick={() => navigate("/charts", { state: { symbol: coin.symbol } })}>
          <Stack direction="column" spacing={1} sx={{ p: 1, height: "100%" }}>
            <Stack direction="row" spacing={4}>
              <CardMedia
                component="img"
                sx={{ objectFit: "contain", width: "50px", display: "unset" }}
                image={coin.image}
                alt={coin.name}
              />
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" noWrap color="text.secondary" gutterBottom>
                  {coin.marketCapRank}
                </Typography>
                <Typography variant="subtitle1" noWrap component="div">
                  {coin.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} noWrap color="text.secondary">
                  [{coin.symbol}]
                </Typography>
                {coin.stable && (
                  <Typography sx={{ mb: 1.5 }} noWrap color="text.secondary">
                    stable
                  </Typography>
                )}
              </Stack>
            </Stack>
            <Stack direction="row" spacing={4} justifyContent="center">
              <Typography variant="subtitle2" noWrap align="left">
                Market Cap: $ {coin.marketCap}
                <br />
                Market Cap Change (24h): $ {coin.marketCapChange24H}
                <br />
                Market Cap Change(24h - %): {coin.marketCapChangePercentage24H}
                <br />
                Price: $ {coin.currentPrice}
                <br />
                Price Change (24h): $ {coin.priceChange24H}
                <br />
                Circulating Supply: {coin.circulatingSupply}
              </Typography>
            </Stack>
            {coin.sparkline7D && (
              <Box sx={{ minHeight: 100 }}>
                <ChartComponent data={coin.sparkline7D} />
              </Box>
            )}
          </Stack>
        </CardActionArea>
      </CardContent>
    </Card>
  );
}; 