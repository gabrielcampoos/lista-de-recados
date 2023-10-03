export interface User {
	nome: string;
	email: string;
	senha: string;
	isLogged: boolean;
}

export type RetornoCriar = {
	sucesso: boolean;
	mensagem: string;
	dados?: User & { id: string };
};

export type RetornoLogin = {
	sucesso: boolean;
	mensagem: string;
	dados?: string;
};
