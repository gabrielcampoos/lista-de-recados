import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { ListaDeTarefasModel } from '../../types/ListaDeTarefasModel';

export const tarefasAdapter = createEntityAdapter<ListaDeTarefasModel>({
	selectId: (state) => state.id,
});

const tarefasSlice = createSlice({
	initialState: tarefasAdapter.getInitialState(),
	name: 'tarefas',
	reducers: {
		createTarefa: tarefasAdapter.addOne,
		updateTarefa: tarefasAdapter.updateOne,
		deleteTarefa: tarefasAdapter.removeOne,
	},
});

export const { selectAll: listAllTarefas } = tarefasAdapter.getSelectors(
	(state: RootState) => state.tarefas,
);

export const { createTarefa, updateTarefa, deleteTarefa } =
	tarefasSlice.actions;

export default tarefasSlice.reducer;
