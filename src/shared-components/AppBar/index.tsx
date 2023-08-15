import { Logout } from '@mui/icons-material';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	hideLoading,
	showLoading,
} from '../../store/modules/Loading/loadingSlice';
import { logoutUser } from '../../store/modules/Usuario/usuarioSlice';

const MyAppBar = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const usuarioLogado = useAppSelector((usuario) => usuario.users);
	const logout = () => {
		dispatch(showLoading());
		setTimeout(() => {
			dispatch(hideLoading());
			dispatch(logoutUser());
			navigate('/');
		}, 2000);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						background:
							'linear-gradient(to right , rgba(0, 0, 0, 1) 70%, transparent)',
					}}
				>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<Typography
							variant="h6"
							component="p"
							sx={{ flexGrow: 1 }}
						>
							Olá {usuarioLogado.usuario.nome}!
						</Typography>
					</IconButton>

					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={logout}
					>
						<Logout fontSize="large" />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default MyAppBar;
