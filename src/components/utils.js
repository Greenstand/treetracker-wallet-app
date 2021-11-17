/* A utils tool function collection */
import axios from 'axios';
import log from 'loglevel';

// to request the api server with the given url, using module axios
// and return the response data
export const request = async (url, method = 'get', data = null) => {
  let realUrl = `${process.env.REACT_APP_API_WALLET}${url}`;
  log.debug(`requesting ${realUrl}`);

  //TODO temporarily modify the url for mock data
  realUrl = realUrl.replace(/\?/, '/query/');
  log.debug(`for mock requesting ${realUrl}`);

  const result = await axios({
    method,
    url: realUrl,
    data,
  }).then((res) => res.data);

  return result;
};
