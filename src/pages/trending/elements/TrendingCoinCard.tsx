import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { TrendingCoinCardProps } from "../../../utils/types";

const TrendingCoinCard = (props: TrendingCoinCardProps) => {
  const navigate = useNavigate();
  const [fireGifLoaded, setFireGifLoaded] = useState(false);
  const [fireGifSrc, setFireGifSrc] = useState<string | null>(null);

  function handleClick() {
    navigate("/charts", {
      state: { symbol: props.symbol },
    });
  }

  // Lazy load the fire GIF only when component is visible and after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only load if this is a high-trending coin (top 3)
      if (props.score <= 2) {
        import("../../../assets/fire3.gif").then((fireModule) => {
          setFireGifSrc(fireModule.default);
          setFireGifLoaded(true);
        }).catch(() => {
          // Fallback: use icon if GIF fails to load
          setFireGifLoaded(false);
        });
      }
    }, 1000); // Delay loading by 1 second to prioritize initial page load

    return () => clearTimeout(timer);
  }, [props.score]);

  return (
    <Card
      variant="outlined"
      square={true}
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: `rgba(255,0,0,${1 - props.score / 10})`,
      }}
    >
      <CardContent
        sx={{ p: 0, height: "100%", [`&:last-child`]: { p: 0 } }}
      >
        {props.id === null ? (
          <Stack
            direction="column"
            spacing={1}
            sx={{ p: 1, height: "100%" }}
          >
            <Skeleton variant="text" width={60} height={48} sx={{ alignSelf: "center" }} />
            <Skeleton variant="circular" width={100} height={100} sx={{ alignSelf: "center" }} />
            <Skeleton variant="text" width="80%" height={32} sx={{ alignSelf: "center" }} />
            <Skeleton variant="text" width="60%" height={24} sx={{ alignSelf: "center" }} />
          </Stack>
        ) : (
          <CardActionArea
            sx={{ height: "100%" }}
            onClick={handleClick}
            aria-label={`View ${props.name} (${props.symbol}) chart - Trending rank #${props.score + 1}`}
          >
            <Stack
              direction="column"
              spacing={1}
              sx={{ p: 1, height: "100%" }}
            >
              {/* Fire indicator - GIF for top 3, icon for others */}
              {fireGifLoaded && fireGifSrc ? (
                <CardMedia
                  component="img"
                  sx={{
                    objectFit: "contain",
                    width: `calc(100% - ${props.score * 10}%)`,
                    display: "unset",
                    alignSelf: "center",
                    position: "absolute",
                    bottom: 0,
                  }}
                  image={fireGifSrc}
                  alt={`Trending indicator fire animation for rank ${props.score + 1}`}
                />
              ) : (
                <WhatshotIcon
                  sx={{
                    color: props.score <= 2 ? "#ff4444" : "#ff8888",
                    fontSize: `${Math.max(20, 40 - props.score * 5)}px`,
                    position: "absolute",
                    bottom: 8,
                    alignSelf: "center",
                    opacity: 0.8,
                  }}
                />
              )}
              <Typography variant="h2" sx={{ p: 2, zIndex: 1 }}>
                {props.score + 1}
              </Typography>
              <CardMedia
                component="img"
                sx={{
                  objectFit: "contain",
                  width: "100px",
                  display: "unset",
                  alignSelf: "center",
                  zIndex: 1,
                }}
                image={props.large}
                alt={props.name}
              />
              <Typography
                variant="h4"
                component="div"
                color="primary"
                sx={{ p: 2, zIndex: 1 }}
              >
                {props.name}
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                sx={{ p: 2, zIndex: 1 }}
              >
                [{props.symbol}]
              </Typography>
            </Stack>
          </CardActionArea>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendingCoinCard; 