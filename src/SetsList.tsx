import React from 'react';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AudiotrackIcon from '@material-ui/icons/audiotrack';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import DraftsIcon from '@material-ui/icons/Drafts';
import {NextComposed} from '../src/Link';
import {IEntriesItem} from '../src/types.d';
import IconButton from '@material-ui/core/IconButton';
import MuiLink from '@material-ui/core/Link';

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
function SetItem({item}: ISubProps) {
  const audio = getAudio(item)
  const video = getVideo(item)
  return (
    <>
    <ListItem>
      <ListItemText
        primary={item.title}
        secondary={getSecondary(item).join(" - ")}
      />
      <ListItemSecondaryAction>
        {video && (
          <IconButton component="a" edge="start" aria-label="Video" href={video.downloadUrl}>
            <MusicVideoIcon />
          </IconButton>
        )}
        {audio && (
          <IconButton component="a" edge="end" aria-label="Audio" href={audio.downloadUrl}>
            <AudiotrackIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
    <Divider variant="inset" component="li" />
    </>
  )
}

function SetsList(props: IProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav">
      {props.items.map((item, i) => {
        return (<SetItem item={item} key={item.guid} />)
      })}
      </List>
    </div>
  );
}

export default SetsList;
