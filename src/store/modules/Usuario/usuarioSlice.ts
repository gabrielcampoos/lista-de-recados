// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { AxiosError } from 'axios';

// import minhaAPI from '../../../configs/services/listaDeRecados.api';
// import { SnackBarComp } from '../../../shared-components/SnackBar';
// import { RetornoCriar, RetornoLogin } from '../../types/usuario';

// export interface Usuario {
// 	nome: string;
// 	email: string;
// 	senha: string;
// }

// const initialState = {
// 	usuario: {
// 		id: '',
// 		nome: '',
// 		logado: false,
// 	},
// 	loading: false,
// };

// // CRIAR ACTION ASYNC PARA CADASTRAR
// export const cadastrarUsuario = createAsyncThunk(
// 	'usuarios/cadastro',
// 	async (novoUsuario: Usuario, { dispatch }) => {
// 		// ESTOU FAZENDO UMA REQUISIÇÃO À ALGO EXTERNO? TRY CATCH
// 		try {
// 			const resposta = await minhaAPI.post(
// 				'/usuarios/cadastrar',
// 				novoUsuario,
// 			);

// 			const dadosAPI = resposta.data as RetornoCriar;

// 			dispatch(SnackBarComp);

// 			return dadosAPI;
// 		} catch (error) {
// 			if (error instanceof AxiosError) {
// 				const dadosAPI = error.response?.data as RetornoCriar;

// 				return dadosAPI;
// 			}

// 			return {
// 				sucesso: false,
// 				mensagem:
// 					'Algo de errado não está certo no código. Chama o DEV.',
// 			};
// 		}
// 	},
// );

// // CRIAR ACTION ASYNC PARA LOGAR
// export const logarUsuario = createAsyncThunk(
// 	'usuarios/login',
// 	async (dados: Omit<Usuario, 'nome'>) => {
// 		try {
// 			const resposta = await minhaAPI.post('usuarios/logar', dados);

// 			const dadosAPI = resposta.data as RetornoLogin;

// 			return dadosAPI;
// 		} catch (error) {
// 			if (error instanceof AxiosError) {
// 				const dadosAPI = error.response?.data as RetornoLogin;

// 				return dadosAPI;
// 			}

// 			return {
// 				sucesso: false,
// 				mensagem:
// 					'Algo de errado não está certo no código. Chama o DEV.',
// 			};
// 		}
// 	},
// );

// const userSlice = createSlice({
// 	name: 'usuario',
// 	initialState: initialState,
// 	reducers: {
// 		setUsuario: (estado, action) => {
// 			// STRING COM O ID DO USUÁRIO LOGADO
// 			return {
// 				...estado,
// 				usuario: {
// 					id: action.payload,
// 					nome: '',
// 					logado: true,
// 				},
// 			};
// 		},
// 		logoutUsuario: () => {
// 			localStorage.removeItem('usuarioLogado');
// 			sessionStorage.removeItem('usuarioLogado');
// 			return initialState;
// 		},
// 	},
// 	extraReducers: (builder) => {
// 		// CADASTRO
// 		builder.addCase(cadastrarUsuario.pending, (estadoAtual) => {
// 			return {
// 				...estadoAtual,
// 				loading: true,
// 			};
// 		});

// 		builder.addCase(cadastrarUsuario.fulfilled, (estadoAtual, action) => {
// 			if (action.payload.sucesso && action.payload.dados) {
// 				return {
// 					usuario: {
// 						id: action.payload.dados?.id,
// 						nome: action.payload.dados.nome,
// 						logado: false,
// 					},
// 					loading: false,
// 				};
// 			}

// 			if (!action.payload.sucesso) {
// 				return {
// 					...estadoAtual,
// 					loading: false,
// 				};
// 			}
// 		});

// 		builder.addCase(cadastrarUsuario.rejected, (estadoAtual) => {
// 			// ULTIMO CASO, ERRAMOS MUITO NA CONSTRUÇÃO DA REQUISIÇÃO
// 			return {
// 				...estadoAtual,
// 				loading: false,
// 			};
// 		});

// 		// LOGIN
// 		builder.addCase(logarUsuario.pending, (estadoAtual) => {
// 			return {
// 				...estadoAtual,
// 				loading: true,
// 			};
// 		});

// 		builder.addCase(logarUsuario.fulfilled, (estadoAtual, action) => {
// 			if (action.payload.sucesso && action.payload.dados) {
// 				// SALVAR O ID NO LOCALSTORAGE
// 				localStorage.setItem(
// 					'usuarioLogado',
// 					JSON.stringify(action.payload.dados),
// 				);

// 				// TER UMA PROPRIEDADE NO ESTADO DE USUÁRIO QUE DIGA SE ESTÁ LOGADO OU NÃO
// 				return {
// 					usuario: {
// 						id: action.payload.dados,
// 						nome: '',
// 						logado: true,
// 					},
// 					loading: false,
// 				};
// 			}

// 			if (!action.payload.sucesso) {
// 				return initialState;
// 			}
// 		});

// 		builder.addCase(logarUsuario.rejected, () => {
// 			return initialState;
// 		});
// 	},
// });

// export const { setUsuario, logoutUsuario } = userSlice.actions;

// export default userSlice.reducer;

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import serviceAPI from '../../../configs/services/listaDeRecados.api';
import { RespostaCadastro } from '../../types/RetornoRequests';
import { UsuarioLogin, UsuarioState } from '../../types/UsuarioState';
import { showNotification } from '../Notification/notificationSlice';

export type UsuarioLogado = {
	id: string;
	nome: string;
	isLogged: boolean;
};

const initialState = {
	usuario: { id: '', nome: '', isLogged: false },
	loading: false,
};

// Criar action async para sign up
export const cadastrarUsuario = createAsyncThunk(
	'usuario/cadastro',
	async (novoUsuario: UsuarioState, { dispatch }) => {
		//try catch - toda vez q for feita uma requisição externa

		try {
			const resposta = await serviceAPI.post('/usuarios', novoUsuario);

			const respostaAPI = resposta.data as RespostaCadastro;

			dispatch(
				showNotification({
					message: respostaAPI.mensagem,
					success: respostaAPI.sucesso,
				}),
			);

			return respostaAPI;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response = error.response?.data as RespostaCadastro;

				dispatch(
					showNotification({
						message: response.mensagem,
						success: response.sucesso,
					}),
				);

				return response;
			}

			return {
				success: false,
				message: 'Erro inesperado.',
			};
		}
	},
);

// Criar action async para sign in
export const loginUsuario = createAsyncThunk(
	'usuario/login',
	async (login: UsuarioLogin, { dispatch }) => {
		try {
			const resposta = await serviceAPI.post('/login', login);

			const respostaAPI = resposta.data as RespostaCadastro;

			dispatch(
				showNotification({
					message: respostaAPI.mensagem,
					success: respostaAPI.sucesso,
				}),
			);

			return respostaAPI;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response = error.response?.data as RespostaCadastro;

				dispatch(
					showNotification({
						message: response.mensagem,
						success: response.sucesso,
					}),
				);

				return response;
			}

			return {
				success: false,
				message: 'Erro inesperado.',
			};
		}
	},
);

export const usuariosSlice = createSlice({
	name: 'usuario',
	initialState: initialState,
	reducers: {
		setUser: (estadoAtual, action: PayloadAction<UsuarioLogado>) => {
			return {
				...estadoAtual,
				usuario: {
					id: action.payload.id,
					isLogged: action.payload.isLogged,
					nome: action.payload.nome,
				},
			};
		},
		logoutUser: (estadoAtual) => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		//cadastro
		builder.addCase(cadastrarUsuario.pending, (estadoAtual) => {
			return {
				...estadoAtual,
				loading: true,
			};
		});
		builder.addCase(cadastrarUsuario.fulfilled, (estadoAtual, action) => {
			const payload = action.payload as RespostaCadastro;

			if (payload.sucesso && payload.dadoCadastrado) {
				return {
					usuario: {
						id: payload.dadoCadastrado?.id,
						nome: payload.dadoCadastrado?.nome,
						isLogged: false,
					},
					loading: false,
				};
			}

			if (!payload.sucesso) {
				return {
					...estadoAtual,
					loading: false,
				};
			}
		});
		builder.addCase(cadastrarUsuario.rejected, (estadoAtual) => {
			return {
				...estadoAtual,
				loading: false,
			};
		});

		//Login
		builder.addCase(loginUsuario.pending, (estadoAtual) => {
			return {
				...estadoAtual,
				loading: true,
			};
		});
		builder.addCase(loginUsuario.fulfilled, (estadoAtual, action) => {
			const payload = action.payload as RespostaCadastro;

			if (payload.sucesso && payload.dadoCadastrado) {
				localStorage.setItem(
					'userLogged',
					JSON.stringify(payload.dadoCadastrado),
				);

				return {
					...estadoAtual,
					usuario: {
						id: payload.dadoCadastrado.id,
						isLogged: true,
						nome: payload.dadoCadastrado.nome,
					},
					loading: false,
				};
			}

			if (!payload.sucesso) {
				return {
					usuario: {
						id: '',
						isLogged: false,
						nome: '',
					},
					loading: false,
				};
			}
		});
		builder.addCase(loginUsuario.rejected, (estadoAtual) => {
			return {
				...estadoAtual,
				loading: false,
			};
		});
	},
});

export const { setUser, logoutUser } = usuariosSlice.actions;
export default usuariosSlice.reducer;
