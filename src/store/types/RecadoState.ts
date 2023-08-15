export interface RecadoState {
	id: string;
	titulo: string;
	recado: string;
	criadoEm: string;
	criadoPor: string;
	arquivado: boolean;
}

export type RecadoDTO = {
	titulo: string;
	recado: string;
	criadoPor: string;
	arquivado?: boolean;
	id?: string;
};

export type PesquisaRecado = {
	id: string;
	arquivado: boolean;
};
