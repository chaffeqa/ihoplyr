
import { createStyles, makeStyles } from '@mui/styles';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles(
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

function LoadingBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  );
}

export default LoadingBar;
