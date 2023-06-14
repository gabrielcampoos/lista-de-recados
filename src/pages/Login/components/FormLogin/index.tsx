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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../../../../shared-components/Loading';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
	hideLoading,
	showLoading,
} from '../../../../store/modules/Loading/loadingSlice';
import { buscarUsuarios } from '../../../../store/modules/Users/usersSlice';
import { IsValidCredentials } from '../../../../store/types/IsValidCredentials';
import { emailRegex } from '../../../../utils/validators/regexData';
import AlertDialog from '../ModalSignUpUser';

export const FormLogin = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [isLogged, setIsLogged] = useState(false);
	const [emailIsValid, setEmailIsValid] = useState<IsValidCredentials>({
		helperText: '',
		isValid: false,
	});

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const select = useAppSelector(buscarUsuarios);

	useEffect(() => {
		if (email.length && !emailRegex.test(email)) {
			setEmailIsValid({
				helperText: 'Email inválido',
				isValid: false,
			});
			return;
		}

		setEmailIsValid({
			helperText: 'Utilize seu e-mail para realizar o login.',
			isValid: true,
		});
	}, [email]);

	useEffect(() => {
		if (
			localStorage.getItem('userLogged') ||
			sessionStorage.getItem('userLogged')
		) {
			navigate('/home');
		}
	}, [navigate]);

	const loggedUser = (
		event: React.SyntheticEvent<Element, Event>,
		checked: boolean,
	) => {
		setIsLogged(checked);
	};

	// função que controla a abertura do Modal - dispara ao clique do link de cadastrar conta
	const handleClickOpen = () => {
		setIsOpen(true);
	};

	const verifyUserExists = () => {
		const user = select.find((user) => {
			return user.email === email && user.senha === senha;
		});

		if (!user) {
			alert('Usuário não encontrado.');
			return;
		}

		isLogged
			? localStorage.setItem('userLogged', user.email)
			: sessionStorage.setItem('userLogged', user.email);

		dispatch(showLoading());
		setTimeout(() => {
			dispatch(hideLoading());
			navigate('/home');
		}, 2000);
	};

	return (
		<Box
			component="form"
			marginY={4}
			onSubmit={(event) => {
				event.preventDefault();
				verifyUserExists();
			}}
		>
			<TextField
				label="E-mail"
				helperText={emailIsValid.helperText}
				error={!emailIsValid.isValid}
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
					onChange={loggedUser}
					value={isLogged}
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
					onClick={handleClickOpen}
				>
					Criar uma!
				</Link>
			</Typography>
			<Loading />
			<AlertDialog aberto={isOpen} mudarAberto={setIsOpen} />
		</Box>
	);
};
