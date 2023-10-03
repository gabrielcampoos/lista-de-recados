import { Box, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormLogin } from './components/FormLogin';

export const Login = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('userLogged')) {
			navigate('/home');
		}
	}, [navigate]);

	return (
		<Container
			component="main"
			sx={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Box
				component="section"
				sx={{
					height: '60vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					background:
						'linear-gradient(to top, rgba(0, 0, 0, 1), transparent)',
					gap: '2rem',
				}}
			>
				<Typography component="h1" variant="h3" color={'HighlightText'}>
					Bem-vindo. Faça login!
				</Typography>
				<FormLogin />
			</Box>
		</Container>
	);
};
