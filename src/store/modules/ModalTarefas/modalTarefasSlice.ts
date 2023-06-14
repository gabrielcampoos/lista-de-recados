import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ModalTarefasProps {
	open: boolean;
	context: 'create' | 'update' | 'delete';
}

const initialState: ModalTarefasProps = {
	open: true,
	context: 'create',
};

const ModalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		showModal: (
			state,
			action: PayloadAction<'create' | 'update' | 'delete'>,
		) => {
			return {
				open: true,
				context: action.payload,
			};
		},
		hideModal: (state) => {
			return {
				...state,
				open: false,
			};
		},
	},
});
export const { showModal, hideModal } = ModalSlice.actions;

export default ModalSlice.reducer;
