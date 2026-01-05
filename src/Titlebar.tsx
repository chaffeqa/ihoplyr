
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function SimpleAppBar({ title }: { title: string }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default SimpleAppBar;
