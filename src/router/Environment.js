import fetch from 'isomorphic-fetch';
import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime';

const graphqlUrl = ENV === 'prod' ? GRAPHQL_API : '/graphql';

function fetchQuery(
  operation,
  variables,
  cacheConfig,
  uploadables
) {

  const authToken = localStorage.getItem('jwt');

  return fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : 'jwt '+authToken
    },
    body: JSON.stringify({
      query: operation.text,
      variables: variables,
    })
  }).then(response => {

    return response.json();
  });
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);
const source = new RecordSource();
const store = new Store(source);

export default new Environment({
  network,
  store
})
