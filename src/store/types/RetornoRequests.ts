import { RecadoState } from './RecadoState';
import { UsuarioState } from './UsuarioState';

export type RespostaCadastro = {
	sucesso: boolean;
	mensagem: string;
	dadoCadastrado?: UsuarioState & { id: string };
};

export type RespostaRecado = {
	sucesso: boolean;
	mensagem: string;
	dadoCadastrado?: RecadoState[];
};
