import { Box } from '@mui/material';

import Everest from '../../assets/images/everest.png';

interface ILayout {
	children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
	return (
		<Box
			sx={{
				width: '100vw',
				height: '100vh',
				padding: '0',
				margin: '0',
				zIndex: '-1',
				backgroundImage: `url(${Everest})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			{children}
		</Box>
	);
};

export default Layout;
