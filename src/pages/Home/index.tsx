// import { Add } from '@mui/icons-material';
// import { Box, Fab } from '@mui/material';
// import { useEffect, useState } from 'react';

// import MyAppBar from '../../shared-components/AppBar';
// import { ModalTarefas } from '../../shared-components/ModalTarefas';
// import Table from '../../shared-components/Table';
// import { useAppDispatch } from '../../store/hooks';
// import { logoutUser, setUser } from '../../store/modules/Users/userSlice';

// const Home = () => {
// 	const [open, setOpen] = useState(false);
// 	const dispatch = useAppDispatch();

// 	useEffect(() => {
// 		const userLogged = localStorage.getItem('userLogged');

// 		if (!userLogged) {
// 			dispatch(logoutUser());
// 			return;
// 		}

// 		dispatch(setUser(JSON.parse(userLogged)));
// 	}, [dispatch]);

// 	return (
// 		<>
// 			<MyAppBar />
// 			<Box
// 				component={'main'}
// 				sx={{
// 					width: { xs: '100%', sm: '80%' },
// 					marginY: 3,
// 					marginX: 'auto',
// 				}}
// 			>
// 				<Table />
// 			</Box>
// 			<Fab
// 				color="primary"
// 				aria-label="add"
// 				sx={{ position: 'fixed', bottom: '30px', right: '30px' }}
// 				onClick={() => setOpen(true)}
// 			>
// 				<Add />
// 			</Fab>
// 			<ModalTarefas context="create" open={open} setOpen={setOpen} />;
// 		</>
// 	);
// };

// export default Home;

import AddIcon from '@mui/icons-material/Add';
import InboxIcon from '@mui/icons-material/Inbox';
import { Box, Divider, Fab, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MyAppBar from '../../shared-components/AppBar';
import { Loading } from '../../shared-components/Loading';
import { SnackBarComp } from '../../shared-components/SnackBar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mostraModal } from '../../store/modules/ContextoModal/contextoSlice';
import { showNotification } from '../../store/modules/Notification/notificationSlice';
import {
	listaTodosRecados,
	listarRecados,
	refresh,
} from '../../store/modules/Recados/recadosSlice';
import { logoutUser, setUser } from '../../store/modules/Usuario/usuarioSlice';
import { PostitiCards } from './components/Cards';
import { ModalMensagens } from './components/ModalMensagens';

export const Home: React.FC = () => {
	const [mostraArquivados, setMostraArquivados] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const selector = useAppSelector((s) => s.recados);

	const selectRecados = useAppSelector(listaTodosRecados);
	const selectUser = useAppSelector((s) => s.users);

	useEffect(() => {
		const userLogged = localStorage.getItem('userLogged');

		if (!userLogged) {
			dispatch(
				showNotification({
					success: false,
					message: 'You shall not pass!',
				}),
			);
			dispatch(logoutUser);
			localStorage.clear();
			navigate('/');
			return;
		}

		dispatch(setUser(JSON.parse(userLogged)));

		//lógica de montar o site
		dispatch(
			listarRecados({
				id: selectUser.usuario.id,
				arquivado: mostraArquivados,
			}),
		);
	}, [dispatch, mostraArquivados, navigate, selectUser.usuario.id]);

	return (
		<>
			<Box
				display={'flex'}
				flexDirection={'column'}
				width={'100%'}
				top={0}
			>
				<MyAppBar />
				{/* <Container
					sx={{ position: 'fixed', top: '56px', bgcolor: 'skyblue' }}
				> */}
				<Typography
					variant="h6"
					color={'HighlightText'}
					paddingY={'8px'}
					textAlign={'center'}
					sx={{
						background:
							'linear-gradient(to right , rgba(0, 0, 0, 1) 70%, transparent)',
					}}
				>
					{mostraArquivados ? 'Arquivados' : 'Seus recados'}
				</Typography>

				<Divider />
				{/* </Container> */}

				{/* <Container
					sx={{
						marginTop: '113px',
						paddingBottom: '24px',
					}}
					component={'main'}
					fixed
				> */}
				<Grid container spacing={2} mt={2} px={2}>
					{/* {selectRecados.length === 0 || !selectRecados ? (
						<Appbar />
					) : ( */}
					{selectRecados
						.filter(
							(item) =>
								item.arquivado === mostraArquivados &&
								item.criadoPor === selectUser.usuario.id,
						)
						.map(({ criadoEm, recado, titulo, id, arquivado }) => (
							<PostitiCards
								data={criadoEm}
								recado={recado}
								titulo={titulo}
								key={id}
								id={id}
								arquivado={arquivado}
							/>
						))}
				</Grid>
				{/* </Container> */}
				{/* <Container
					sx={{
						position: 'fixed',
						bottom: 0,
						paddingBottom: '16px',
						bgcolor: 'skyblue',
					}}
				>
					<Divider />
				</Container> */}
			</Box>
			<Box
				sx={{
					position: 'fixed',
					bottom: '24px',
					right: '24px',
					display: 'flex',
					flexDirection: 'column-reverse',
					gap: 2,
				}}
			>
				<Fab
					color="primary"
					aria-label="add"
					onClick={() => dispatch(mostraModal('adicionar'))}
					disabled={mostraArquivados}
				>
					<AddIcon />
				</Fab>
				<Fab
					color={mostraArquivados ? 'primary' : 'default'}
					aria-label="archive"
					onClick={() => {
						setMostraArquivados(!mostraArquivados);
						dispatch(
							listarRecados({
								id: selectUser.usuario.id,
								arquivado: mostraArquivados,
							}),
						);
						dispatch(refresh);
					}}
				>
					<InboxIcon />
				</Fab>
			</Box>

			<SnackBarComp />
			<ModalMensagens />
			<Loading open={selector.loading} />
		</>
	);
};
