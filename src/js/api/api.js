const what3wordsUrl = "https://api.what3words.com/v2/forward?addr=index.home.raft&key=TBF0OQEZ";

let commonHeaders = {
  'Content-Type': 'application/json',
}

export const getLocationByWhat3Words = () => fetch(`${what3wordsUrl}`, {
  method: 'GET',
  headers: {
    // ...commonHeaders,
  }
}).then((response) => response.json().then((data) => {
  console.log('data = ', data)
  return data;
}));