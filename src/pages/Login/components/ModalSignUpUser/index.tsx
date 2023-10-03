import { Close } from '@mui/icons-material';
import {
	Box,
	CircularProgress,
	Divider,
	IconButton,
	TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { cadastrarUsuario } from '../../../../store/modules/Usuario/usuarioSlice';
import { IsValidCredentials } from '../../../../store/types/IsValidCredentials';
import { User } from '../../../../store/types/usuario';
import { emailRegex, nomeRegex } from '../../../../utils/validators/regexData';

export interface AlertDialogProps {
	aberto: boolean;
	mudarAberto: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ aberto, mudarAberto }) => {
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const estadoUsuario = useAppSelector((estado) => estado.users);
	const dispatch = useAppDispatch();

	const [errorNome, setErrorNome] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});

	const [errorEmail, setErrorEmail] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});

	const [errorSenha, setErrorSenha] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});

	const handleClose = () => {
		mudarAberto(false);
	};

	const usuario: User = {
		nome,
		email,
		senha,
	};

	const handleSignupUser = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		if (!ev.currentTarget.checkValidity()) {
			return;
		}

		dispatch(cadastrarUsuario(usuario));
		setTimeout(() => {
			// limpar os campos de input
			setEmail('');
			setSenha('');
			setNome('');

			// fechar o modal
			handleClose();
		}, 3000);
	};

	useEffect(() => {
		if (!nome.length && !nomeRegex.test(nome)) {
			setErrorNome({
				helperText: 'Informe um nome.',
				isValid: false,
			});
		} else {
			setErrorNome({
				helperText: 'Utilize seu nome para criar uma conta.',
				isValid: true,
			});
		}
	}, [nome]);

	useEffect(() => {
		if (email.length && !emailRegex.test(email)) {
			setErrorEmail({
				helperText: 'Informe um e-mail válido.',
				isValid: false,
			});
		} else {
			setErrorEmail({
				helperText: 'Utilize seu e-mail para criar uma conta.',
				isValid: true,
			});
		}
	}, [email]);

	useEffect(() => {
		if (senha.length && senha.length < 6) {
			setErrorSenha({
				helperText: 'Cadastre uma senha com no mínimo 6 caracteres.',
				isValid: false,
			});
		} else {
			setErrorSenha({
				helperText:
					'Utilize uma senha fácil de lembrar e anote para não esquecer.',
				isValid: true,
			});
		}
	}, [senha]);

	// useEffect(() => {
	// 	if (!estadoUsuario.loading) {
	// 		setEmail('');
	// 		setSenha('');
	// 		setNome('');

	// 		// fechar o modal
	// 		handleClose();
	// 	}
	// }, [estadoUsuario, handleClose]);

	return (
		<Dialog
			open={aberto}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<IconButton
				aria-label="close"
				onClick={handleClose}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<Close />
			</IconButton>
			<DialogTitle id="alert-dialog-title">
				{'Criar uma conta'}
			</DialogTitle>
			<Divider />
			<Box component="form" onSubmit={handleSignupUser}>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<TextField
							label="Nome"
							type="text"
							error={!errorNome.isValid}
							helperText={errorNome.helperText}
							fullWidth
							sx={{ marginY: 3 }}
							onChange={(event) => {
								setNome(event.currentTarget.value);
							}}
							required
							value={nome}
						/>
						<TextField
							label="E-mail"
							type="email"
							error={!errorEmail.isValid}
							helperText={errorEmail.helperText}
							fullWidth
							sx={{ marginY: 3 }}
							onChange={(event) => {
								setEmail(event.currentTarget.value);
							}}
							required
							value={email}
						/>
						<TextField
							label="Senha"
							error={!errorSenha.isValid}
							helperText={errorSenha.helperText}
							type="password"
							fullWidth
							sx={{ marginY: 3 }}
							onChange={(event) => {
								setSenha(event.currentTarget.value);
							}}
							required
							inputProps={{ minLength: 6 }}
							value={senha}
						/>
					</DialogContentText>
				</DialogContent>
				<Divider />
				<DialogActions
					sx={{
						paddingY: 3,
					}}
				>
					<Button
						type="button"
						variant="outlined"
						onClick={handleClose}
					>
						Cancelar
					</Button>
					<Button
						disabled={!errorEmail.isValid || !errorSenha.isValid}
						type="submit"
						variant="contained"
						autoFocus
						startIcon={
							estadoUsuario.loading ? (
								<CircularProgress color="inherit" />
							) : (
								<></>
							)
						}
					>
						Cadastrar
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
};

export default AlertDialog;
