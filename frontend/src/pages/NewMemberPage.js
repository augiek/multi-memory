import React, { Component, useState } from 'react';
import { addEntry } from '../api/EntryAPI';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

function NewMemberPage() {
  const [ redirect, setRedirect ] = React.useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [maidenName, setMaidenName] = useState(null);
  const [relationship, setRelationship] = useState(null);


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const entryObject = {
      first_name: firstName,
      last_name: lastName,
      maiden_name: maidenName,
      relationship_to_you: relationship, 
    }
    console.log(entryObject)
    try {
      const response = await addEntry(entryObject);
      if (response.status === 200) {
        // redirect the user back to Home Page upon successful POST
        setRedirect(true);
      } else {
        // const jsonData = await response.json();
        // alert(jsonData.error.message);
        console.log("else statement triggered, line 77")
      }
    } catch (err) {
      console.error('error occurred while adding entry (consoled on NewEntryPage1):', err);
    }
  };

  // return redirect ? <Redirect to={`/archive/entry/${entry.id}`} /> : (
  return redirect ? <Redirect to={`/`} /> : (

    <div style={{ padding: '20px' }}>
      <h3> Add an Member to {this.group_name} </h3>
      <Form onSubmit={handleFormSubmit}>
        <FormGroup>
          <Label for="firstName">Write your entry</Label>
          <Input value={firstName} type="textarea" name="firstName" id="firstName" onChange={e => setFirstName(e.target.value)}/>
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Write your entry</Label>
          <Input value={lastName} type="textarea" name="lastName" id="lastName" onChange={e => setLastName(e.target.value)}/>
        </FormGroup>
        <FormGroup>
          <Label for="maidenName">Write your entry</Label>
          <Input value={maidenName} type="textarea" name="maidenName" id="maidenName" onChange={e => setMaidenName(e.target.value)}/>
        </FormGroup>
        <FormGroup>
          <Label for="relationship">Write your entry</Label>
          <Input value={relationship} type="textarea" name="relationship" id="relationship" onChange={e => setRelationship(e.target.value)}/>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  )};

export default NewMemberPage