import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';

const StyledDiv = styled('div')(
  ({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'center',
  backgroundColor: 'var(--color-lighter)',
  borderRadius: '5px',
  width: '100%',
  maxWidth: '500px',
  margin: `${theme.spacing * 5} auto`,
  padding: theme.spacing * 5,
})
);

const StyledTypography = styled(Typography)`
  color: var(--color-default);
`;

export const StyledComponentsExample = () => {
  return (
    <StyledDiv>
      <h1>This is Styled Components Example component</h1>
      <StyledTypography variant='body1'>
        If you're into the JavaScript-in-CSS vibe, this is for you. Styled
        components let you write actual CSS in your JavaScript file, using
        tagged template literals. It's like merging styles and components into
        one, which can be really powerful for component-based designs.
      </StyledTypography>
    </StyledDiv>
  );
};
