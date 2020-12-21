const BASE_URL = 'http://localhost:8000/';

const fetchGroupByID = async (groupID) => {
  const response = await fetch(`${BASE_URL}journal/groups/${groupID}/`);
  const data = await response.json();
  return data;
};

const fetchGroups = async () => {
  const url = `${BASE_URL}journal/groups/`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const searchGroups = async (textToSearchFor) => {
  const response = await fetch(`${BASE_URL}?filter={"where":{"entry_title" OR 'written_body" OR 'location_tags' OR 'text_tags':{"ilike":"${textToSearchFor}"}}}`)
  const data = await response.json();
  return data;
};

const addGroup = (groupObject) => {
  console.log(groupObject)
  return fetch(`${BASE_URL}journal/groups/new/`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: "POST",
    body: JSON.stringify(groupObject)
  });
};

const editGroup = (groupObject) => {
  console.log(groupObject)
  return fetch(`${BASE_URL}journal/${groupObject.id}/edit/`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: "PUT",
    body: JSON.stringify(groupObject)
  });
};

const deleteGroup = (groupObject) => {
  return fetch(`${BASE_URL}journal/${groupObject.id}/delete/`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: "POST",
    body: JSON.stringify(groupObject)
  });
};

// group members:
const fetchGroupMemberByID = async (groupID, memberID) => {
  const response = await fetch(`${BASE_URL}journal/groups/${groupID}/${memberID}/`);
  const data = await response.json();
  return data;
};

const fetchGroupMembers = async (groupID) => {
  const url = `${BASE_URL}journal/groups/${groupID}/`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const addGroupMember = (groupID, memberObject) => {
  console.log(memberObject)
  return fetch(`${BASE_URL}journal/groups/${groupID}/new`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: "POST",
    body: JSON.stringify(memberObject)
  });
};

const editGroupMember = (groupID, memberObject) => {
  console.log(memberObject)
  return fetch(`${BASE_URL}journal/groups/${groupID}/${memberObject.id}/edit/`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: "PUT",
    body: JSON.stringify(memberObject)
  });
};

const deleteGroupMember = (groupID, memberObject) => {
  return fetch(`${BASE_URL}journal/groups/${groupID}/${memberObject.id}/delete/`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: "POST",
    body: JSON.stringify(memberObject)
  });
};

export {
  fetchGroupByID,
  fetchGroups,
  addGroup,
  editGroup,
  deleteGroup,
  fetchGroupMemberByID,
  fetchGroupMembers,
  addGroupMember,
  editGroupMember,
  deleteGroupMember,
};