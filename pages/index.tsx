import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {IPayload} from "../src/types.d"
import SetsList from '../src/SetsList';
import LoadingBar from '../src/LoadingBar';
import { withRouter } from 'next/router';
import useAbortableFetch from 'use-abortable-fetch';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);


function Index(props: any) {
  // console.log('props')
  // console.dir(props)
  const guid = props.router.query.guid
  // const guid = '190525_TPR_1600'
  const params = guid ? `byguid=${guid}` : `q=&range=0-6&=&sort=pubDate|desc&count=true`
  const url = `https://feed.theplatform.com/f/IfSiAC/5ct7EYhhJs9Z/?${params}`;
  const fetchAction = useAbortableFetch(url);
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;
  // if (!data) return null;
  let payload = null as IPayload | null
  let error = fetchAction.error as Error | null
  const {loading, abort, data} = fetchAction
  try {
    payload = data && typeof(data) === 'string' && JSON.parse(data) || data as IPayload | null
  } catch (err) {
    error = err
  }
  console.dir(payload)
  const title = guid ? `Item: ${guid}` : `Recent Playlists`
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>{title}</Typography>
        {loading && (
          <LoadingBar />
        )}
        {payload && (
          <SetsList items={payload.entries} />
        )}
        {error && (
          <pre>{error.message}</pre>
        )}
      </Box>
    </Container>
  );
}

export default withRouter(Index)
