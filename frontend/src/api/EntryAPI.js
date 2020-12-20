const BASE_URL = 'http://localhost:8000/';

const fetchEntryByID = async (entryID) => {
  const response = await fetch(`${BASE_URL}journal/${entryID}/`);
  const data = await response.json();
  return data;
};

const fetchEntries = async () => {
  const url = `${BASE_URL}journal/archive/`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const searchEntries = async (textToSearchFor) => {
  const response = await fetch(`${BASE_URL}?filter={"where":{"entry_title" OR 'written_body" OR 'location_tags' OR 'text_tags':{"ilike":"${textToSearchFor}"}}}`)
  const data = await response.json();
  return data;
};

const addEntry = (entryObject) => {
  console.log(entryObject)
  return fetch(`${BASE_URL}journal/new/`, {
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data'
    },
    method: "POST",
    body: JSON.stringify(entryObject)
  });
};

const editEntry = (entryObject) => {
  console.log(entryObject)
  // entry_id = entryObject.id
  // const entry_id = String(entryObject.id);
  return fetch(`${BASE_URL}journal/${entryObject.id}/edit/`, {
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data'
    },
    method: "PUT",
    body: JSON.stringify(entryObject)
  });
};

const deleteEntry = (entryObject) => {
  // console.log(entryObject)
  // entry_id = entryObject.id
  // const entry_id = String(entryObject.id);
  return fetch(`${BASE_URL}journal/${entryObject.id}/delete/`, {
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data'
    },
    method: "DELETE",
    body: JSON.stringify(entryObject)
  });
};

export {
  fetchEntryByID,
  fetchEntries,
  searchEntries,
  addEntry,
  editEntry,
  deleteEntry,
};