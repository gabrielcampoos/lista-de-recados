/* eslint-disable no-case-declarations */
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	TextField,
} from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import { v4 as generateId } from 'uuid';

import { useAppDispatch } from '../../store/hooks';
import {
	createTarefa,
	deleteTarefa,
	updateTarefa,
} from '../../store/modules/Tarefas/tarefasSlice';
import { ListaDeTarefasModel } from '../../store/types/ListaDeTarefasModel';

interface ModalTarefasProps {
	tarefaSelected?: ListaDeTarefasModel;
	context: 'create' | 'update' | 'delete';
	open: boolean;
	setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const ModalTarefas: React.FC<ModalTarefasProps> = ({
	tarefaSelected,
	context,
	open,
	setOpen,
}) => {
	const [tarefa, setTarefa] = useState(tarefaSelected?.tarefa ?? '');

	useEffect(() => {
		console.log(tarefaSelected);
	}, [tarefaSelected]);

	const dispatch = useAppDispatch();

	const handleConfirm = () => {
		switch (context) {
			case 'create':
				// Aqui vai ser a lógica de criação

				const newTarefa: ListaDeTarefasModel = {
					id: generateId(),
					tarefa: tarefa,
					createBy: (sessionStorage.getItem('userLogged') ??
						localStorage.getItem('userLogged')) as string,
				};

				dispatch(createTarefa(newTarefa));
				clearInputs();
				setOpen(false);
				break;

			case 'update':
				// Aqui vai ser a lógica de atualização
				if (tarefaSelected) {
					dispatch(
						updateTarefa({
							id: tarefaSelected.id,
							changes: { tarefa: tarefa },
						}),
					);
				}
				clearInputs();
				setOpen(false);
				break;

			case 'delete':
				// Aqui vai ser a lógica de exclusão
				if (tarefaSelected) {
					dispatch(deleteTarefa(tarefaSelected.id));
				}
				break;

			default:
		}
	};

	const clearInputs = () => {
		setTarefa('');
	};

	return (
		<Dialog
			fullWidth
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{context === 'create' && 'Criar Tarefa'}
				{context === 'update' && 'Atualizar Tarefa'}
				{context === 'delete' && 'Excluir Tarefa'}
			</DialogTitle>
			<DialogContent>
				{context !== 'delete' && (
					<Grid container marginY={3} spacing={3}>
						<Grid item xs={12}>
							<TextField
								label="Tarefa"
								fullWidth
								value={tarefa}
								onChange={(e) => setTarefa(e.target.value)}
							/>
						</Grid>
					</Grid>
				)}

				{context === 'delete' && (
					<DialogContentText id="alert-dialog-description">
						Tem certeza que deseja excluir a tarefa?
					</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={() => setOpen(false)}>
					Cancelar
				</Button>
				<Button variant="contained" onClick={handleConfirm} autoFocus>
					Aceitar
				</Button>
			</DialogActions>
		</Dialog>
	);
};
