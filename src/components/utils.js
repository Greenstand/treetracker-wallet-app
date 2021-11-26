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

//Create a url for optimizing an image
//Basically it's the same as OptimizedImage.js, just returns a string instead of a component
//We can use this where we can't insert a component, for example in the MUI avatar's src prop
export function getOptimizedCDNUrl(src, width) {
  if (!src) return '';

  const cdnPath = 'https://cdn.statically.io/img';
  const matches = src.match(/\/\/(.*?)\/(.*)/);

  let cdnUrl;

  if (matches?.length > 1) {
    const domain = matches[1];
    const imagePath = matches[2];

    cdnUrl = `${cdnPath}/${domain}/w=${width}/${imagePath}`;
  }
  return cdnUrl;
}
