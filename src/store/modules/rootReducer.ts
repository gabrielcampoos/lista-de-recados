import { combineReducers } from '@reduxjs/toolkit';

import loadingSlice from './Loading/loadingSlice';
import notificationSlice from './Notification/notificationSlice';
import tarefasSlice from './Tarefas/tarefasSlice';
import usersSlice from './Users/usersSlice';

const rootReducer = combineReducers({
	// a cada novo slice, adicionamos uma nova propriedade neste objeto
	// propriedade - nome na store
	// valor - reducer/manager deste estado global
	// modal: modalSlice,
	users: usersSlice,
	notification: notificationSlice,
	loading: loadingSlice,
	// modal: modalTarefasSlice,
	tarefas: tarefasSlice,
});

export default rootReducer;
