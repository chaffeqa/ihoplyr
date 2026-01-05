
// import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import {NextComposed} from '../src/Link';
import { ISardiusHit } from '../src/types.d';
import IconButton from '@mui/material/IconButton';
// import MuiLink from '@mui/material/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 600,
      backgroundColor: theme.palette.background.paper,
    },
    item: {

    }
  }),
);

interface IProps {
  items: ISardiusHit[]
}
interface ISubProps {
  item: ISardiusHit
}

function getSecondary(item: ISardiusHit) {
  const secondary = [] as string[]
  if (item.bios && item.bios.worshipLeaders && item.bios.worshipLeaders.length) {
    secondary.push(item.bios.worshipLeaders[0])
  }
  return secondary
}

function SetItem({ item }: ISubProps) {
  const videoUrl = item.media && item.media.url
  const audioUrl = videoUrl ? videoUrl.replace("playlist.m3u8", "playlist-gpraudio.m3u8") : null

  return (
    <>
      <ListItem disableGutters={true}>
        <ListItemText
          primary={item.title}
          secondary={getSecondary(item).join(" - ")}
          secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
        />
        {videoUrl && (
          <IconButton color="secondary" component="a" edge="start" aria-label="Video" rel="noopenter" href={videoUrl}>
            <MusicVideoIcon />
          </IconButton>
        )}
        {audioUrl && (
          <IconButton color="primary" component="a" edge="end" aria-label="Audio" rel="noopenter" href={audioUrl}>
            <AudiotrackIcon />
          </IconButton>
        )}
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}

function SetsList(props: IProps) {
  const classes = useStyles();

  return (
    <List className={classes.root} component="ol">
      {props.items.map((item) => (
        <SetItem item={item} key={item.id} />
      ))}
    </List>
  );
}

export default SetsList;
