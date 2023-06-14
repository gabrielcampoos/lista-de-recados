import { Delete, Edit } from '@mui/icons-material';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { ListaDeTarefasModel } from '../../store/types/ListaDeTarefasModel';
import { ModalTarefas } from '../ModalTarefas';

interface ListaDeTarefasProps {
	tarefa: ListaDeTarefasModel;
}

const ListaDeTarefas: React.FC<ListaDeTarefasProps> = ({ tarefa }) => {
	const [open, setOpen] = useState(false);
	const [deleta, setDeleta] = useState(false);
	const [update, setUpdate] = useState(false);

	const dispatch = useAppDispatch();

	return (
		<>
			<Grid
				key={tarefa.id}
				item
				xs={12}
				padding={2}
				display={'flex'}
				alignItems={'center'}
				sx={{
					backgroundColor: 'rgba(50, 50, 50, .8)',
				}}
			>
				<Grid item xs={2}>
					<Typography color={'HighlightText'}>{tarefa.id}</Typography>
				</Grid>

				<Grid item xs={8}>
					<Typography color={'HighlightText'} align="center">
						{tarefa.tarefa}
					</Typography>
				</Grid>

				<Grid item xs={2} textAlign={'end'}>
					<Stack
						direction={'row'}
						spacing={3}
						justifyContent={'flex-end'}
					>
						<IconButton
							color="error"
							aria-label="delete"
							onClick={() => {
								setOpen(true);
								setUpdate(false);
								setDeleta(true);
							}}
						>
							<Delete />
						</IconButton>
						<IconButton
							color="info"
							aria-label="edit"
							onClick={() => {
								setOpen(true);
								setUpdate(true);
								setDeleta(false);
							}}
						>
							<Edit />
						</IconButton>
					</Stack>
				</Grid>
			</Grid>
			<ModalTarefas
				context={update ? 'update' : 'delete'}
				open={open}
				setOpen={setOpen}
				tarefaSelected={tarefa}
			/>
		</>
	);
};

export default ListaDeTarefas;
