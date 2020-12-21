import React, { Component, useState } from 'react';
import { addGroup } from '../api/GroupAPI';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

function NewGroupPage() {
  const [ redirect, setRedirect ] = React.useState(false);
  const [groupName, setGroupName] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const groupObject = {
      group_name: groupName,
    }
    console.log(groupObject)
    try {
      const response = await addGroup(groupObject);
      if (response.status === 200) {
        // redirect the user back to Family Tree Page upon successful POST
        setRedirect(true);
      } else {
        const jsonData = await response.json();
        alert(jsonData.error.message);
        console.log("else statement triggered, line 77")
      }
    } catch (err) {
      console.error('error occurred while adding group (consoled on NewEntryPage1):', err);
    }
  };

  // return redirect ? <Redirect to={`/groups/`} /> : (
  return redirect ? <Redirect to={`/groups`} /> : (

    <div style={{ padding: '20px' }}>
      <h3> Add a Group </h3>
      <p>Groups can be parts of your family, circles of friends, or anyone you want to share common access to your chosen journal entries. </p>
      <Form>
        <FormGroup>
          <Label for="groupName" >Group Name</Label>
          <Input type="text" name="groupName" id="groupName" onChange={e => setGroupName(e.target.value)}/>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  )};

export default NewGroupPage