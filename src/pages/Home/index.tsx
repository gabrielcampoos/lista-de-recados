import { Add } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MyAppBar from '../../shared-components/AppBar';
import { ModalTarefas } from '../../shared-components/ModalTarefas';
import Table from '../../shared-components/Table';
import { useAppDispatch } from '../../store/hooks';

const Home = () => {
	const [open, setOpen] = useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (
			!localStorage.getItem('userLogged') &&
			!sessionStorage.getItem('userLogged')
		) {
			navigate('/');
		}
	}, [navigate]);

	return (
		<>
			<MyAppBar />
			<Box
				component={'main'}
				sx={{
					width: { xs: '100%', sm: '80%' },
					marginY: 3,
					marginX: 'auto',
				}}
			>
				<Table />
			</Box>
			<Fab
				color="primary"
				aria-label="add"
				sx={{ position: 'fixed', bottom: '30px', right: '30px' }}
				onClick={() => setOpen(true)}
			>
				<Add />
			</Fab>
			<ModalTarefas context="create" open={open} setOpen={setOpen} />;
		</>
	);
};

export default Home;
