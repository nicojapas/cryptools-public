import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import hiedraImage from "../../../assets/hiedra.png";
import bitcoinImage from "../../../assets/bitcoin-ascii-art.png";

interface SidePanelProps {
	isLeft?: boolean;
}

const SidePanel = ({ isLeft = false }: SidePanelProps) => {
	return (
		<Grid item xs={12} md={2} sx={{ height: '100%' }}>
			<Paper
				sx={{
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'grey.100',
					border: '2px dashed grey.300',
					flexWrap: "wrap",
					gap: 1
				}}
			>
				{/* First hiedra image */}
				<img 
					src={hiedraImage} 
					alt="Hiedra" 
					style={{ 
						maxWidth: '80%', 
						maxHeight: '40%', 
						objectFit: 'contain',
						transform: isLeft ? 'scaleX(-1)' : 'none'
					}} 
				/>
				
				{/* First bitcoin image */}
				<img 
					src={bitcoinImage} 
					alt="Bitcoin" 
					style={{ 
						maxWidth: '40%', 
						maxHeight: '30%', 
						objectFit: 'contain',
						transform: isLeft ? 'rotate(-30deg)' : 'none'
					}} 
				/>
				
				{/* Second hiedra image */}
				<img 
					src={hiedraImage} 
					alt="Hiedra" 
					style={{ 
						maxWidth: '80%',
						maxHeight: '40%', 
						objectFit: 'contain',
						transform: isLeft ? 'scaleX(-1)' : 'none'
					}} 
				/>
				
				{/* Second bitcoin image */}
				<img 
					src={bitcoinImage} 
					alt="Bitcoin" 
					style={{ 
						maxWidth: '40%', 
						maxHeight: '30%', 
						objectFit: 'contain',
						transform: isLeft ? 'none' : 'rotate(-30deg)'
					}} 
				/>
				
				{/* Third hiedra image */}
				<img 
					src={hiedraImage} 
					alt="Hiedra" 
					style={{ 
						maxWidth: '80%', 
						maxHeight: '40%', 
						objectFit: 'contain',
						transform: isLeft ? 'scaleX(-1)' : 'none'
					}} 
				/>
			</Paper>
		</Grid>
	);
};

export default SidePanel; 