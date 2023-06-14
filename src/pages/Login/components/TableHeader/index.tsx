import { Grid, Typography } from '@mui/material';

const TableHeader = () => {
	return (
		<Grid container>
			<Grid item xs={5} padding={2}>
				<Typography variant="h6" color={'HighlightText'}>
					ID
				</Typography>
			</Grid>
			<Grid item xs={7} padding={2}>
				<Typography variant="h6" color={'HighlightText'} marginLeft={9}>
					Recados
				</Typography>
			</Grid>
		</Grid>
	);
};

export default TableHeader;
