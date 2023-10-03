export interface UsuarioState {
	email: string;
	senha: string;
	nome: string;
	isLogged: boolean;
}

export type UsuarioLogin = {
	email: string;
	senha: string;
};
