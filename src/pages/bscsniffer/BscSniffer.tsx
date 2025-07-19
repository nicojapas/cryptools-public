import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

import Container from "@mui/material/Container";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


import {
	APP_BAR_HEIGHT,
	BSCSCAN_ICON,
	BSCSCAN_ADDRESS_URL,
	BSCSCAN_TOKEN_URL,
	POOCOIN_ICON,
	POOCOIN_URL,
} from "../../constants.js";
import { StyledBoxForPages } from "../../components";
import { useBscTokensData } from "../../hooks";
import { BscTokenData, TokenTableRowProps } from "../../utils/types";
import { SidePanel } from "./elements";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const BscSniffer = () => {
	const navigate = useNavigate();
	const [hovered, setHovered] = useState<number | undefined>();
	const [rowRect, setRowRect] = useState<DOMRect | null>(null);
	const { isLoading, error, data } = useBscTokensData();

	const handleRowMouseEnter = (index: number) => {
		setHovered(index);
		const row = document.getElementById(`bsc-sniffer-row-${index}`);
		if (row) setRowRect(row.getBoundingClientRect());
	};

	// Deselect row if clicking outside table or balloons
	useEffect(() => {
		function handleDocumentClick(e: MouseEvent) {
			const table = document.querySelector('[data-testid="bsc-sniffer-table"]');
			const balloons = document.querySelectorAll('.bsc-sniffer-balloon');
			const target = e.target as Node;
			let insideTable = false;
			let insideBalloon = false;
			if (table && table.contains(target)) insideTable = true;
			balloons.forEach(b => { if (b.contains(target)) insideBalloon = true; });
			if (!insideTable && !insideBalloon) {
				setHovered(undefined);
				setRowRect(null);
			}
		}
		document.addEventListener('mousedown', handleDocumentClick);
		return () => document.removeEventListener('mousedown', handleDocumentClick);
	}, []);

	if (error) return <>&apos;An error has occurred: &apos; + error.message</>;
	if (isLoading) return (
		<StyledBoxForPages
			id="bsc-sniffer"
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden", height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
		>
			<Container maxWidth="lg" sx={{ p: 2, height: '100%' }}>
				<Grid container spacing={2} sx={{ height: '100%' }}>
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<Skeleton variant="rounded" height="100%" sx={{ borderRadius: 2 }} />
					</Grid>
					<Grid item xs={12} md={8} sx={{ height: '100%' }}>
						<Skeleton variant="rounded" height="100%" sx={{ borderRadius: 2 }} />
					</Grid>
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<Skeleton variant="rounded" height="100%" sx={{ borderRadius: 2 }} />
					</Grid>
				</Grid>
			</Container>
		</StyledBoxForPages>
	);

	// Sort tokens by timestamp (most recent first)
	const sortedData = (data || []).slice().sort((a: BscTokenData, b: BscTokenData) => Number(b.timestamp) - Number(a.timestamp));

	// Balloon data for the currently hovered row
	const hoveredToken = hovered !== undefined ? sortedData[hovered] : null;

	// Balloon overlay logic
	const leftBalloons = hoveredToken ? [
		{
			key: 'rug',
			title: 'Rug Check!',
			onClick: () => navigate("/rug-checker", { state: { redirectedTargetAddress: hoveredToken.contract_address } }),
			icon: <GppGoodOutlinedIcon sx={{ height: "16px", width: "16px" }} />,
			label: 'Rug Check!'
		},
		{
			key: 'copyAddress',
			title: `Copy ${hoveredToken.contract_address}`,
			onClick: () => navigator.clipboard.writeText(hoveredToken.contract_address),
			icon: <ContentCopyIcon sx={{ height: "16px", width: "16px" }} />,
			label: 'Contract Address'
		},
		{
			key: 'bscscanToken',
			title: 'Check token address in Bscscan',
			onClick: () => window.open(new URL(hoveredToken.contract_address, BSCSCAN_TOKEN_URL).href),
			icon: <img src={BSCSCAN_ICON} alt="Bscscan icon" style={{ height: "16px", width: "16px" }} />,
			label: 'To Bscscan'
		},
	] : [];
	const rightBalloons = hoveredToken ? [
		{
			key: 'poocoin',
			title: 'Check token in Poocoin',
			onClick: () => window.open(new URL(hoveredToken.contract_address, POOCOIN_URL).href),
			icon: <img src={POOCOIN_ICON} alt="Poocoin icon" style={{ height: "16px", width: "16px" }} />,
			label: 'To Poocoin'
		},
		{
			key: 'copyCreator',
			title: `Copy ${hoveredToken.creator}`,
			onClick: () => navigator.clipboard.writeText(hoveredToken.creator),
			icon: <ContentCopyIcon sx={{ height: "16px", width: "16px" }} />,
			label: 'Creator Address'
		},
		{
			key: 'bscscanCreator',
			title: 'Check creator address in Bscscan',
			onClick: () => window.open(new URL(hoveredToken.creator, BSCSCAN_ADDRESS_URL).href),
			icon: <img src={BSCSCAN_ICON} alt="Bscscan icon" style={{ height: "16px", width: "16px" }} />,
			label: 'To Bscscan'
		},
	] : [];

	return (
		<StyledBoxForPages
			id="news"
			data-testid="bsc-sniffer-page"
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden", height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
		>
			<Container data-testid="bsc-sniffer-container" maxWidth="lg" sx={{ p: 2, height: '100%' }}>
				<Grid container spacing={2} sx={{ height: '100%' }}>
					{/* Left side panel - hidden on small screens */}
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<SidePanel isLeft={true} />
					</Grid>

					{/* Main table */}
					<Grid item xs={12} md={8} sx={{ height: '100%' }}>
						<TableContainer data-testid="bsc-sniffer-table" component={Paper} sx={{ height: '100%', overflow: 'auto' }}>
							<Table stickyHeader>
								<TableHead>
									<TableRow>
										<StyledTableCell align="left" sx={{ width: "20%" }}>
											Creation
										</StyledTableCell>
										<StyledTableCell align="left" sx={{ width: "40%" }}>
											Name
										</StyledTableCell>
										<StyledTableCell align="left" sx={{ width: "40%" }}>
											Symbol
										</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{sortedData.map((token: BscTokenData, index: number) => (
										<TokenTableRow
											key={index}
											id={index}
											hovered={hovered}
											token={token}
											onRowMouseEnter={() => handleRowMouseEnter(index)}
										/>
									))}
								</TableBody>
							</Table>
							{hovered !== undefined && rowRect && (
								<BalloonOverlay
									rowRect={rowRect}
									leftBalloons={leftBalloons}
									rightBalloons={rightBalloons}
									onClose={() => { setHovered(undefined); setRowRect(null); }}
								/>
							)}
						</TableContainer>
					</Grid>

					{/* Right side panel - hidden on small screens */}
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<SidePanel isLeft={false} />
					</Grid>
				</Grid>
			</Container>
		</StyledBoxForPages>
	);
};

// BalloonOverlay component
const BalloonOverlay = ({
  rowRect,
  leftBalloons,
  rightBalloons,
  onClose,
}: {
  rowRect: DOMRect | null;
  leftBalloons: any[];
  rightBalloons: any[];
  onClose: () => void;
}) => {
  if (!rowRect) return null;

  // Center of the row
  const rowCenterY = rowRect.top + rowRect.height / 2;
  // Center of the screen
  const screenCenterY = window.innerHeight / 2;
  // Allow the group to move within a limited range, shifted lower
  const maxOffset = 80;
  const verticalShift = 30;
  const groupOffset = Math.max(-maxOffset, Math.min(maxOffset, rowCenterY - screenCenterY));
  const groupCenterY = screenCenterY + verticalShift + groupOffset;
  // Horizontal offset for balloons
  const offsetX = Math.min(window.innerWidth / 2 - 180, 300);
  // Vertical spread for balloons
  const spread = 80;
  const balloonWidth = 160;
  const balloonHeight = 40; // estimated, adjust if needed

  // Track animated Y positions for each balloon
  const [balloonYs, setBalloonYs] = useState<{ [key: string]: number }>({});
  const balloonRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Balloons positions (3 left, 3 right), group can move within a limited range
  const balloons = [
    ...leftBalloons.map((b, i) => ({
      ...b,
      x: rowRect.left - offsetX,
      y: groupCenterY + (i - 1) * spread,
      side: "left",
      lineStartX: rowRect.left,
      lineStartY: rowCenterY,
      lineEndX: rowRect.left - offsetX + balloonWidth,
      lineEndY: balloonYs[b.key] ?? (groupCenterY + (i - 1) * spread + balloonHeight / 2),
      refKey: b.key,
    })),
    ...rightBalloons.map((b, i) => ({
      ...b,
      x: rowRect.right + offsetX - balloonWidth,
      y: groupCenterY + (i - 1) * spread,
      side: "right",
      lineStartX: rowRect.right,
      lineStartY: rowCenterY,
      lineEndX: rowRect.right + offsetX - balloonWidth,
      lineEndY: balloonYs[b.key] ?? (groupCenterY + (i - 1) * spread + balloonHeight / 2),
      refKey: b.key,
    })),
  ];

  // Animation frame to update balloonYs
  useEffect(() => {
    let running = true;
    function update() {
      if (!running) return;
      const newYs: { [key: string]: number } = {};
      for (const b of balloons) {
        const ref = balloonRefs.current[b.refKey];
        if (ref) {
          const rect = ref.getBoundingClientRect();
          newYs[b.refKey] = rect.top + rect.height / 2;
        }
      }
      setBalloonYs(newYs);
      requestAnimationFrame(update);
    }
    update();
    return () => { running = false; };
  }, [balloons.length]);

  return ReactDOM.createPortal(
    <>
      {/* Overlay background for click-away */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 2000,
          background: "transparent",
          pointerEvents: "none", // allow mouse events to pass through
        }}
        onClick={onClose}
      />
      {/* Balloons and lines */}
      <div>
        {balloons.map((b, i) => {
          // Calculate SVG bounds
          const minX = Math.min(b.lineStartX, b.lineEndX);
          const minY = Math.min(b.lineStartY, b.lineEndY);
          const width = Math.abs(b.lineEndX - b.lineStartX);
          const height = Math.abs(b.lineEndY - b.lineStartY);
          // Calculate start/end relative to SVG
          const startX = b.lineStartX < b.lineEndX ? 20 : width + 20;
          const startY = b.lineStartY < b.lineEndY ? 20 : height + 20;
          const endX = b.lineStartX > b.lineEndX ? 20 : width + 20;
          const endY = b.lineStartY > b.lineEndY ? 20 : height + 20;
          const curveOffset = 60;
          let c1x, c1y, c2x, c2y;
          if (b.side === "left") {
            // Curve out to the left, then into the balloon vertically
            c1x = startX - curveOffset;
            c1y = startY;
            c2x = endX + curveOffset;
            c2y = endY;
          } else {
            // Curve out to the right, then into the balloon vertically
            c1x = startX + curveOffset;
            c1y = startY;
            c2x = endX - curveOffset;
            c2y = endY;
          }
          const pathD = `M${startX},${startY} C${c1x},${c1y} ${c2x},${c2y} ${endX},${endY}`;
          return (
            <React.Fragment key={b.key}>
              {/* Diagonal line */}
              <svg
                width={width + 40}
                height={height + 40}
                style={{
                  position: "fixed",
                  left: minX - 20,
                  top: minY - 20,
                  pointerEvents: "none",
                  zIndex: 2001,
                }}
              >
                <path
                  d={pathD}
                  fill="none"
                  stroke={b.side === "left" ? "#00B894" : "#00D4AA"}
                  strokeWidth={3}
                />
              </svg>
              {/* Balloon */}
              <div
                ref={el => (balloonRefs.current[b.refKey] = el)}
                className="bsc-sniffer-balloon"
                style={{
                  position: "fixed",
                  left: b.x,
                  top: b.y,
                  width: balloonWidth,
                  height: balloonHeight,
                  padding: 12,
                  borderRadius: 16,
                  background: b.side === "left"
                    ? "linear-gradient(135deg, #00B894 0%, #FFC107 100%)"
                    : "linear-gradient(135deg, #00D4AA 0%, #FFC107 100%)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  zIndex: 2002,
                  animation: `floatY${i % 3} 3s ease-in-out infinite`,
                  color: b.side === "left" ? "#222" : "#fff",
                  border: `2px solid ${b.side === "left" ? "#00B894" : "#00D4AA"}`,
                  cursor: "pointer",
                  pointerEvents: "auto", // allow interaction with balloon
                }}
                tabIndex={0}
                onClick={e => { e.stopPropagation(); b.onClick(); }}
                title={b.title}
              >
                {b.icon}
                <span style={{ fontSize: 13, fontWeight: 500 }}>{b.label}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>,
    document.body
  );
};

// Update TokenTableRow to only use onRowMouseEnter
const TokenTableRow = (props: Omit<TokenTableRowProps, 'setHovered'> & { onRowMouseEnter: () => void; }) => {
	const { token, id, hovered, onRowMouseEnter } = props;
	return (
		<TableRow
			id={`bsc-sniffer-row-${id}`}
			sx={{
				height: "4.25rem",
				backgroundColor: hovered === id ? "background.default" : "unset",
				position: "relative"
			}}
			onMouseEnter={onRowMouseEnter}
		>
			{hovered !== id ? (
				<>
					<TableCell align="left" component="th" scope="row">
						{token.timestamp}
					</TableCell>
					<TableCell align="left">{token.name}</TableCell>
					<TableCell align="left">{token.symbol}</TableCell>
				</>
			) : (
				<>
					<TableCell colSpan={3} align="left" sx={{ textAlignLast: "center", background: "rgba(255,255,255,0.7)", zIndex: 1, position: "relative" }}>
						{token.timestamp} — {token.name} — {token.symbol}
					</TableCell>
				</>
			)}
		</TableRow>
	);
};

export default BscSniffer;

// Add floating keyframes
const style = document.createElement('style');
style.innerHTML = `
@keyframes floatY0 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
@keyframes floatY1 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(8px);} }
@keyframes floatY2 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-12px);} }
`;
document.head.appendChild(style);
