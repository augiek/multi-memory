import React, { Component, useState} from 'react';
import { addEntry } from '../api/EntryAPI';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

function NewEntryPage() {
  const [ redirect, setRedirect ] = React.useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const entryObject = {
      voice_body_temp: event.target.elements[0].value,
      written_body: event.target.elements[1].value,
      // voice_text: auto-generated after submit,
      // medium: auto-generated--either "voice" or "written",
      location_tags: event.target.elements[2].value,
      text_tags: event.target.elements[3].value,
      // published_date: auto-generated--time.now,
      file_upload: event.target.elements[4].value,
      privacy: event.target.elements[5].value,
      entry_title: event.target.elements[6].value,
    }

    try {
      const response = await addEntry(entryObject);
      if (response.status === 200) {
        // redirect the user back to Home Page upon successful POST
        setRedirect(true);
      } else {
        const jsonData = await response.json();
        alert(jsonData.error.message);
      }
    } catch (err) {
      console.error('error occurred while adding entry (consoled on NewEntryPage1):', err);
    }
  };

  return redirect ? <Redirect to='/' /> : (
    <div style={{ padding: '20px' }}>
      <h3> Add an Entry </h3>
      <Form onSubmit={handleFormSubmit}>
        {/* <FormGroup> */}
          <Label for="voice_body_temp">VOICE RECORD</Label>
          <Input type="text" name="voice_body_temp" id="voice_body_temp" />
        {/* </FormGroup> */}
        {/* <FormGroup> */}
          <Label for="written_body">Write your entry</Label>
          <Input type="textarea" name="written_body" id="written_body" />
        {/* </FormGroup> */}
        {/* <FormGroup> */}
          <Label for="location_tags">Relevant Locations</Label>
          <Input type="textarea" name="location_tags" id="location_tags" />
        {/* </FormGroup>
        <FormGroup> */}
          <Label for="text_tags">Relevant Tags</Label>
          <Input type="text" name="text_tags" id="text_tags" />
        {/* </FormGroup>
        <FormGroup> */}
          <Label for="file_upload">Relevant Files</Label>
          <Input type="file" name="file_upload" id="file_upload" />
        {/* </FormGroup>
        <FormGroup> */}
          <Label for="privacy">Privacy</Label>
          <Input type="select" name="privacy" id="privacy" multiple>
            <option>Only me</option>
            <option>Kids only</option>
            <option>Kids' branches</option>
            <option>Spouse only</option>
            <option>Suzanne's branch</option>
            {/* maybe there's a better way to do this? need to have a family tree page somewhere else where they can add people and make branches/groups. customized privacy is a lower priority in the grand scheme */}
          </Input>
          {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>Privacy</DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Only me (default)</DropdownItem>
            <DropdownItem>Immediate Family</DropdownItem>
            <DropdownItem>Mom's side</DropdownItem>
            <DropdownItem>Dad's side</DropdownItem>
            <DropdownItem>Childhood friends</DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
        {/* </FormGroup>
        <FormGroup> */}
          <Label for="entry_title">Entry Title</Label>
          <Input type="text" name="entry_title" id="entry_title" />
        {/* </FormGroup> */}
        <Button>Submit</Button>
      </Form>
    </div>
  )
};

export default NewEntryPage