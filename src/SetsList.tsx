
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
import { IEntriesItem } from '../src/types.d';
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
  items: IEntriesItem[]
}
interface ISubProps {
  item: IEntriesItem
}

function getSecondary(item: IEntriesItem) {
  const secondary = [] as string[]
  if (item['ihopkc$worshipLeader'] && item['ihopkc$worshipLeader'].length) {
    secondary.push(item['ihopkc$worshipLeader'][0])
  }
  if (item['ihopkc$setType'].length) {
    secondary.push(item['ihopkc$setType'][0])
  }
  return secondary
}
function getVideo(item: IEntriesItem) {
  return item.content.find((c) => c.contentType === "video")
}
function getAudio(item: IEntriesItem) {
  return item.content.find((c) => c.contentType === "audio")
}

// function SetItemLnk({item}: ISubProps) {
//   return (
//     <>
//     <ListItem button component={NextComposed} href={`/set?guid=${item.guid}`}>
//       <ListItemText
//         primary={item.title}
//         secondary={getSecondary(item)}
//       />
//     </ListItem>
//     <Divider variant="inset" component="li" />
//     </>
//   )
// }
function SetItem({ item }: ISubProps) {
  const audio = getAudio(item)
  const video = getVideo(item)
  return (
    <>
      <ListItem disableGutters={true}>
        <ListItemText
          primary={item.title}
          secondary={getSecondary(item).join(" - ")}
          secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
        />
        {video && (
          <IconButton color="secondary" component="a" edge="start" aria-label="Video" rel="noopenter" href={video.downloadUrl}>
            <MusicVideoIcon />
          </IconButton>
        )}
        {audio && (
          <IconButton color="primary" component="a" edge="end" aria-label="Audio" rel="noopenter" href={audio.downloadUrl}>
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
        <SetItem item={item} key={item.guid} />
      ))}
    </List>
  );
}

export default SetsList;
