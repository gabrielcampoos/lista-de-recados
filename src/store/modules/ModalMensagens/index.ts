import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ModalMensagensProps {
	idRecado: string | undefined;
	tituloRecado: string | undefined;
	recado: string | undefined;
	arquivado: boolean;
}

const initialState: ModalMensagensProps = {
	idRecado: '',
	recado: '',
	tituloRecado: '',
	arquivado: false,
};

export const idRecadoSlice = createSlice({
	name: 'modalMensagens',
	initialState,
	reducers: {
		capturaId: (state, action: PayloadAction<ModalMensagensProps>) => {
			return {
				idRecado: action.payload.idRecado ?? '',
				recado: action.payload.recado ?? '',
				tituloRecado: action.payload.tituloRecado ?? '',
				arquivado: action.payload.arquivado,
			};
		},
		apagaId: (state) => {
			return initialState;
		},
	},
});

export const { apagaId, capturaId } = idRecadoSlice.actions;

export default idRecadoSlice.reducer;
