
import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ISardiusPayload } from "../src/types.d"
import SetsList from '../src/SetsList';
// import Titlebar from '../src/Titlebar';
import LoadingBar from '../src/LoadingBar';
import { withRouter } from 'next/router';
import useAbortableFetch from 'use-abortable-fetch';




// const perPage = 20

function Index() {
  // const guid = props.router.query.guid // routing logic might need update if guid format changed, but assuming list view first
  const url = `https://api.sardius.media/feeds/-K6FGrVYzVr92SDZiDnc/fdf257CfD1/public?count=12&sort=airDate:desc`;
  const fetchAction = useAbortableFetch(url);
  let payload = null as ISardiusPayload | null
  let error = fetchAction.error as Error | null
  const { loading, data } = fetchAction
  try {
    payload = data && typeof (data) === 'string' && JSON.parse(data) || data as ISardiusPayload | null
  } catch (err) {
    error = err as Error
  }
  // console.dir(payload)
  // const title = guid ? `Item: ${guid}` : `Recent Playlists`
  return (
    <>
      {(loading) && (
        <LoadingBar />
      )}
      <Container maxWidth="sm" component="main">
        {/*<Titlebar title={title} /> */}
        <Box component="section">
          {payload && (
            <SetsList items={payload.hits} />
          )}
          {error && (
            <pre>{error.message}</pre>
          )}
        </Box>
      </Container>
    </>
  );
}

export default withRouter(Index)
