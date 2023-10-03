/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowForwardIos } from '@mui/icons-material';
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { showNotification } from '../../../../store/modules/Notification/notificationSlice';
import { loginUsuario } from '../../../../store/modules/Usuario/usuarioSlice';
import AlertDialog from '../ModalSignUpUser';

export const FormLogin = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');

	const user = useAppSelector((state) => state.users);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		if (!email || !senha) {
			dispatch(
				showNotification({
					success: false,
					message: 'Usuário não cadastrado.',
				}),
			);
			return;
		}

		const login = {
			email: email,
			senha: senha,
		};

		dispatch(loginUsuario(login));
	};

	return (
		<Box component="form" marginY={4} onSubmit={handleSubmit}>
			<TextField
				label="E-mail"
				// helperText={emailIsValid.helperText}
				// error={!emailIsValid.isValid}
				sx={{
					display: 'block',
					marginBottom: '2rem',
					background: 'rgba(255, 255, 255, .8)',
				}}
				fullWidth
				onChange={(event) => {
					setEmail(event.currentTarget.value);
				}}
				value={email}
			/>
			<TextField
				label="Senha"
				type="password"
				sx={{
					display: 'block',
					marginBottom: '2rem',
					background: 'rgba(255, 255, 255, .8)',
				}}
				fullWidth
				onChange={(event) => {
					setSenha(event.currentTarget.value);
				}}
				value={senha}
			/>
			<Grid item xs={12}>
				<FormControlLabel
					sx={{
						color: '#fff',
					}}
					control={<Checkbox sx={{ color: '#fff' }} />}
					label="Permanecer logado?"
					// value={isLogged}
				/>
			</Grid>
			<Button
				sx={{ marginY: '1rem', height: '56px' }}
				variant="contained"
				size="large"
				type="submit"
				startIcon={<ArrowForwardIos />}
				fullWidth
			>
				Acessar
			</Button>
			<Typography
				variant="caption"
				sx={{
					fontSize: '14px',
					color: '#fff',
				}}
			>
				Ainda não tem uma conta?{' '}
				<Link
					component="button"
					type="button"
					sx={{
						textDecoration: 'none',
						fontWeight: 'bold',
						fontSize: '1rem',
					}}
					onClick={() => setIsOpen(true)}
				>
					Criar uma!
				</Link>
			</Typography>
			<AlertDialog aberto={isOpen} mudarAberto={setIsOpen} />
		</Box>
	);
};
