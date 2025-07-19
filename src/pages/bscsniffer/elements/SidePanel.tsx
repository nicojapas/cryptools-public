import Box from "@mui/material/Box";

interface SidePanelProps {
	isLeft?: boolean;
}

const SidePanel = ({ isLeft = false }: SidePanelProps) => {
	return (
		<Box sx={{ 
			width: '100%', 
			height: '100%', 
			position: 'relative',
			overflow: 'hidden'
		}}>
			{/* Animated flowing lines */}
			<Box
				sx={{
					position: 'absolute',
					top: '10%',
					left: isLeft ? '10%' : '85%',
					width: '60%',
					height: '2px',
					background: 'linear-gradient(90deg, transparent, #00B894, #FFC107, transparent)',
					animation: 'flow 3s ease-in-out infinite',
					transform: isLeft ? 'rotate(-15deg)' : 'rotate(15deg)',
					zIndex: -1,
				}}
			/>
			<Box
				sx={{
					position: 'absolute',
					top: '30%',
					left: isLeft ? '5%' : '80%',
					width: '70%',
					height: '2px',
					background: 'linear-gradient(90deg, transparent, #FFC107, #00D4AA, transparent)',
					animation: 'flow 3s ease-in-out infinite 1s',
					transform: isLeft ? 'rotate(10deg)' : 'rotate(-10deg)',
					zIndex: -1,
				}}
			/>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: isLeft ? '15%' : '75%',
					width: '50%',
					height: '2px',
					background: 'linear-gradient(90deg, transparent, #00D4AA, #00B894, transparent)',
					animation: 'flow 3s ease-in-out infinite 2s',
					transform: isLeft ? 'rotate(-20deg)' : 'rotate(20deg)',
					zIndex: -1,
				}}
			/>
			<Box
				sx={{
					position: 'absolute',
					top: '70%',
					left: isLeft ? '0%' : '90%',
					width: '80%',
					height: '2px',
					background: 'linear-gradient(90deg, transparent, #00B894, #FFC107, transparent)',
					animation: 'flow 3s ease-in-out infinite 0.5s',
					transform: isLeft ? 'rotate(5deg)' : 'rotate(-5deg)',
					zIndex: -1,
				}}
			/>

			{/* Pulsing circles */}
			<Box
				sx={{
					position: 'absolute',
					top: '20%',
					left: isLeft ? '20%' : '75%',
					width: '8px',
					height: '8px',
					borderRadius: '50%',
					background: '#00B894',
					animation: 'pulse 2s ease-in-out infinite',
					boxShadow: '0 0 10px rgba(0, 184, 148, 0.5)',
					zIndex: -1,
				}}
			/>
			<Box
				sx={{
					position: 'absolute',
					top: '60%',
					left: isLeft ? '60%' : '85%',
					width: '6px',
					height: '6px',
					borderRadius: '50%',
					background: '#FFC107',
					animation: 'pulse 2s ease-in-out infinite 1s',
					boxShadow: '0 0 8px rgba(255, 193, 7, 0.5)',
					zIndex: -1,
				}}
			/>
			<Box
				sx={{
					position: 'absolute',
					top: '40%',
					left: isLeft ? '5%' : '90%',
					width: '10px',
					height: '10px',
					borderRadius: '50%',
					background: '#00D4AA',
					animation: 'pulse 2s ease-in-out infinite 0.5s',
					boxShadow: '0 0 12px rgba(0, 212, 170, 0.5)',
					zIndex: -1,
				}}
			/>

			{/* Floating dots */}
			<Box
				sx={{
					position: 'absolute',
					top: '15%',
					left: isLeft ? '70%' : '95%',
					width: '4px',
					height: '4px',
					borderRadius: '50%',
					background: '#00B894',
					animation: 'float 4s ease-in-out infinite',
					zIndex: -1,
				}}
			/>
			<Box
				sx={{
					position: 'absolute',
					top: '75%',
					left: isLeft ? '10%' : '80%',
					width: '3px',
					height: '3px',
					borderRadius: '50%',
					background: '#FFC107',
					animation: 'float 4s ease-in-out infinite 2s',
					zIndex: -1,
				}}
			/>
			<Box
				sx={{
					position: 'absolute',
					top: '85%',
					left: isLeft ? '40%' : '70%',
					width: '5px',
					height: '5px',
					borderRadius: '50%',
					background: '#00D4AA',
					animation: 'float 4s ease-in-out infinite 1s',
					zIndex: -1,
				}}
			/>

			{/* Keyframe animations */}
			<style>
				{`
					@keyframes flow {
						0%, 100% { opacity: 0.3; transform: translateX(-20px); }
						50% { opacity: 0.8; transform: translateX(20px); }
					}
					@keyframes pulse {
						0%, 100% { transform: scale(1); opacity: 0.7; }
						50% { transform: scale(1.2); opacity: 1; }
					}
					@keyframes float {
						0%, 100% { transform: translateY(0px); opacity: 0.5; }
						50% { transform: translateY(-10px); opacity: 1; }
					}
				`}
			</style>
		</Box>
	);
};

export default SidePanel; 