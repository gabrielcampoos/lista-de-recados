import { combineReducers } from '@reduxjs/toolkit';

import contextoSlice from './ContextoModal/contextoSlice';
import loadingSlice from './Loading/loadingSlice';
import ModalMensagens from './ModalMensagens';
import notificationSlice from './Notification/notificationSlice';
import recadosSlice from './Recados/recadosSlice';
import usersSlice from './Usuario/usuarioSlice';

const rootReducer = combineReducers({
	// a cada novo slice, adicionamos uma nova propriedade neste objeto
	// propriedade - nome na store
	// valor - reducer/manager deste estado global
	// modal: modalSlice,
	users: usersSlice,
	notification: notificationSlice,
	loading: loadingSlice,
	// modal: modalTarefasSlice,
	recados: recadosSlice,
	contexto: contextoSlice,
	idRecado: ModalMensagens,
});

export default rootReducer;
