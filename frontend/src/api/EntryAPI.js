const BASE_URL = 'http://localhost:8000/';

// const fetchEntryByID = async (entryID) => {
//   const response = await fetch(`${BASE_URL}/${entryID}`);
//   const data = await response.json();
//   return data;
// };

const fetchEntries = async (filters = null) => {
  const url = filters ? `${BASE_URL}?filter={"where":${filters}}` : BASE_URL;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const searchEntries = async (textToSearchFor) => {
  const response = await fetch(`${BASE_URL}?filter={"where":{"title":{"ilike":"${textToSearchFor}"}}}`)
  const data = await response.json();
  return data;
};

const addEntry = (entryObject) => {
  return fetch(BASE_URL, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(entryObject)
  });
};

export {
  // fetchEntryByID,
  // fetchEntries,
  // searchEntries,
  addEntry,
};