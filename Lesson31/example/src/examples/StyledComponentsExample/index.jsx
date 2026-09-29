import { styled, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const StyledDiv = styled('div')`
	color: ${props => props.color};
	text-align: center;
	background-color: var(--color-lighter);
	border-radius: 5px;
	width: 100%;
	max-width: 500px;
	margin: 20px auto;
	padding: 20px;`;


const StyledTypography = styled(Typography)`
	color: var(--color-default);
`;

export const StyledComponentsExample = () => {
  const theme = useTheme();

	return (
		<StyledDiv color={theme.palette.warning.light}>
			{/* <Typography variant='h3' color={theme.palette.primary.main}>This is Styled Components Example component</Typography> */}
      <h1>This is Styled Components Example component</h1>
			<StyledTypography variant='body1' component="p">
				If you're into the JavaScript-in-CSS vibe, this is for you. Styled
				components let you write actual CSS in your JavaScript file, using
				tagged template literals. It's like merging styles and components into
				one, which can be really powerful for component-based designs.
			</StyledTypography>
			<Button variant='contained' color='warning'>Click me</Button>
		</StyledDiv>
	);
};
