import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';

interface User {
	email: string;
	senha: string;
}

const usersAdapter = createEntityAdapter<User>({
	selectId: (estado) => estado.email,
});

export const { selectAll: buscarUsuarios } = usersAdapter.getSelectors(
	(global: RootState) => global.users,
);

const usersSlice = createSlice({
	name: 'users',
	initialState: usersAdapter.getInitialState(),
	reducers: {
		adicionarUsuario: usersAdapter.addOne,
	},
});

export const { adicionarUsuario } = usersSlice.actions;

export default usersSlice.reducer;
