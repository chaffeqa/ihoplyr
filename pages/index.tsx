
import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { IPayload } from "../src/types.d"
import SetsList from '../src/SetsList';
// import Titlebar from '../src/Titlebar';
import LoadingBar from '../src/LoadingBar';
import { withRouter } from 'next/router';
import useAbortableFetch from 'use-abortable-fetch';




const perPage = 20

function Index(props: any) {
  // console.log('props')
  // console.dir(props)
  const guid = props.router.query.guid
  // const guid = '190525_TPR_1600'
  const params = guid ? `byguid=${guid}` : `q=&range=0-${perPage}&=&sort=pubDate|desc&count=true`
  const url = `https://feed.theplatform.com/f/IfSiAC/5ct7EYhhJs9Z/?${params}`;
  const fetchAction = useAbortableFetch(url);
  let payload = null as IPayload | null
  let error = fetchAction.error as Error | null
  const { loading, data } = fetchAction
  try {
    payload = data && typeof (data) === 'string' && JSON.parse(data) || data as IPayload | null
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
            <SetsList items={payload.entries} />
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
