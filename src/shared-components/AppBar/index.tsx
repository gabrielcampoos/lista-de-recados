import { Logout } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../store/hooks';
import {
	hideLoading,
	showLoading,
} from '../../store/modules/Loading/loadingSlice';
import Loading from '../Loading';

const MyAppBar = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const logout = () => {
		localStorage.removeItem('userLogged');
		sessionStorage.removeItem('userLogged');

		dispatch(showLoading());
		setTimeout(() => {
			dispatch(hideLoading());
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
						<MenuIcon />
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
			<Loading />
		</Box>
	);
};

export default MyAppBar;
