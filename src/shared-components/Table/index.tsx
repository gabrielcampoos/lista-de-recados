import { Grid, Paper } from '@mui/material';
import { useState } from 'react';

import TableHeader from '../../pages/Login/components/TableHeader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { listAllTarefas } from '../../store/modules/Tarefas/tarefasSlice';
import ListaDeTarefas from '../ListaDeTarefas';

const Table = () => {
	const [userLogged, setUserLogged] = useState(
		sessionStorage.getItem('userLogged') ??
			(localStorage.getItem('userLogged') as string),
	);
	const dispatch = useAppDispatch();
	const listaDeTarefas = useAppSelector(listAllTarefas);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Paper
					square
					sx={{
						height: '500px',
						borderTop: '0 20px',
						background:
							'linear-gradient(to bottom , rgba(0, 0, 0, 1) , transparent)',
					}}
				>
					<TableHeader />

					{listaDeTarefas
						.filter((tarefa) => tarefa.createBy === userLogged)
						.map((tarefa) => (
							<ListaDeTarefas key={tarefa.id} tarefa={tarefa} />
						))}
				</Paper>
			</Grid>
		</Grid>
	);
};

export default Table;
