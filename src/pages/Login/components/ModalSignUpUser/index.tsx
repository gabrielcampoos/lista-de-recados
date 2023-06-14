import { Close } from '@mui/icons-material';
import { Box, Divider, IconButton, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';

import { useAppDispatch } from '../../../../store/hooks';
import { adicionarUsuario } from '../../../../store/modules/Users/usersSlice';
import { IsValidCredentials } from '../../../../store/types/IsValidCredentials';
import { emailRegex } from '../../../../utils/validators/regexData';

export interface AlertDialogProps {
	aberto: boolean;
	mudarAberto: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ aberto, mudarAberto }) => {
	const [emailCadastro, setEmailCadastro] = useState('');
	const [senhaCadastro, setSenhaCadastro] = useState('');

	const [errorEmail, setErrorEmail] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});

	const [errorSenha, setErrorSenha] = useState<IsValidCredentials>({
		helperText: '',
		isValid: true,
	});

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (emailCadastro.length && !emailRegex.test(emailCadastro)) {
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
	}, [emailCadastro]);

	useEffect(() => {
		if (senhaCadastro.length && senhaCadastro.length < 6) {
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
	}, [senhaCadastro]);

	const handleClose = () => {
		mudarAberto(false);
	};

	const handleSignupUser = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		if (!ev.currentTarget.checkValidity()) {
			return;
		}

		dispatch(
			adicionarUsuario({
				email: emailCadastro,
				senha: senhaCadastro,
			}),
		);
		// limpar os campos de input
		setEmailCadastro('');
		setSenhaCadastro('');

		// fechar o modal
		handleClose();
	};

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
							label="E-mail"
							type="email"
							error={!errorEmail.isValid}
							helperText={errorEmail.helperText}
							fullWidth
							sx={{ marginY: 3 }}
							onChange={(event) => {
								setEmailCadastro(event.currentTarget.value);
							}}
							required
							value={emailCadastro}
						/>
						<TextField
							label="Senha"
							error={!errorSenha.isValid}
							helperText={errorSenha.helperText}
							type="password"
							fullWidth
							sx={{ marginY: 3 }}
							onChange={(event) => {
								setSenhaCadastro(event.currentTarget.value);
							}}
							required
							inputProps={{ minLength: 6 }}
							value={senhaCadastro}
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
					>
						Cadastrar
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
};

export default AlertDialog;
