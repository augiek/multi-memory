const BASE_URL = 'http://localhost:8000/';

const fetchEntryByID = async (entryID) => {
  const token = localStorage.getItem('auth-user')
  const response = await fetch(`${BASE_URL}journal/${entryID}/`, { headers: {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${token}`
  }});
  const data = await response.json();
  return data;
};

const fetchEntries = async () => {
  const token = localStorage.getItem('auth-user')
  console.log('token', token)
  const url = `${BASE_URL}journal/archive/`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    }
  });
  const data = await response.json();
  return data;
};

const searchEntries = async (textToSearchFor) => {
  const response = await fetch(`${BASE_URL}?filter={"where":{"entry_title":{"ilike":"${textToSearchFor}"}}}`)
  const data = await response.json();
  return data;
};

const addEntry = (entryObject) => {
  console.log(entryObject)
  const token = localStorage.getItem('auth-user')
  console.log('token', token)
  return fetch(`${BASE_URL}journal/new/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
    method: "POST",
    body: JSON.stringify(entryObject)
  });
};

const editEntry = (entryObject) => {
  console.log(entryObject)
  return fetch(`${BASE_URL}journal/${entryObject.id}/edit/`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: "PUT",
    body: JSON.stringify(entryObject)
  });
};

const deleteEntry = (entryObject) => {
  return fetch(`${BASE_URL}journal/${entryObject.id}/delete/`, {
    headers: {
      'Content-Type': 'application/json',
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