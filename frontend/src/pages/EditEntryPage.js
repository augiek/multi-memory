import React, { Component, useState, useEffect } from 'react';
import { editEntry, fetchEntryByID } from '../api/EntryAPI';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
// import { ReactMic } from 'react-mic';
import MicRecorder from 'mic-recorder-to-mp3'

const EditEntryPage = (props) => {
  const [ redirect, setRedirect ] = React.useState(false);
  // const [voiceBody, setVoiceBody] = useState(null);
  // const [writtenBody, setWrittenBody] = useState(null);
  // const [locationTags, setLocationTags] = useState(null);
  // const [textTags, setTextTags] = useState(null);
  // // const [fileUpload, setFileUpload] = useState(null);
  // const [privacy, setPrivacy] = useState(null);
  // const [entryTitle, setEntryTitle] = useState("");
  const [entry, setEntry] = useState({});

  const recorder = new MicRecorder ({
    bitRate: 128
  });

  // state starts as null, and then you go get whatever exists in that page (useEffect?)
  // option to replace recording?
  // option to listen to existing recording?

  useEffect(() => {
    // This useEffect using [] will only run 1 time after initial render/return
    const response = fetchEntryByID(props.match.params.id)
    response.then(data => {
      console.log('data1', data)
      setEntry(data)})
  }, [])

  // const startRecord = async (event) => {
  //   event.preventDefault();
  //   recorder.start().then(() => {
  //   }).catch((e) => {
  //     console.error(e);
  //   });
  // }

  // const stopRecord = async (event) => {
  //   event.preventDefault();
  //   recorder.stop()
  //   .getMp3().then(([buffer, blob]) => {
  //     blob.arrayBuffer().then(buffer => {
  //       let base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  //       setVoiceBody(base64String)
  //     });

  //     let base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));


      
  //   }).catch((e) => {
  //     alert('We could not retrieve your message');
  //     console.log(e);
  //   });
  // }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const entryObject = {
      id: entry.id,
      // voice_body: entry.voice_body,
      written_body: entry.written_body,
      location_tags: entry.location_tags,
      text_tags: entry.text_tags,
      // file_upload: btoa(fileUpload),
      privacy: entry.privacy,
      entry_title: entry.entry_title 
    }
    try {
      const response = await editEntry(entryObject);
      if (response.status === 200) {
        // redirect the user back to Home Page upon successful POST
        // setRedirect(true);
      } else {
        // const jsonData = await response.json();
        // alert(jsonData.error.message);
        console.log("else statement triggered, line 77")
      }
    } catch (err) {
      console.error('error occurred while adding entry (consoled on NewEntryPage1):', err);
    }
  };

  return redirect ? <Redirect to='/' /> : (
    <div style={{ padding: '20px' }}>
      <h3> Edit Your Entry </h3>
        {/* <Label for="record_start"> Start recording</Label>
        <Button size="sm" color="success" type="button" name="record_start" id="record_start" onClick={startRecord}>RECORD</Button>
        <br/>
        <Label for="record_stop"> Stop recording </Label>
        <Button size="sm" color="danger" type="button" name="record_stop" id="record_stop" onClick={stopRecord}>STOP</Button>
        <br/> */}
      <Form onSubmit={handleFormSubmit}>
        <FormGroup>
          <Label for="entryTitle" >Title</Label>
          <Input value={entry.entry_title} type="text" name="entryTitle" id="entryTitle" onChange={e => setEntry({...entry, entry_title: e.target.value})}/>
        </FormGroup>
        <FormGroup>
          <Label for="writtenBody">Add some details</Label>
          <Input value={entry.written_body} type="textarea" name="writtenBody" id="writtenBody" onChange={e => setEntry({...entry, written_body: e.target.value})}/>
        </FormGroup>
        <FormGroup>
          <Label for="locationTags">Add a location</Label>
          <Input value={entry.location_tags} type="textarea" name="locationTags" id="locationTags" onChange={e => setEntry({...entry, location_tags: e.target.value})} />
        </FormGroup>
        <FormGroup>
          <Label for="textTags">Add some tags</Label>
          <Input value={entry.text_tags} type="text" name="textTags" id="textTags" onChange={e => setEntry({...entry, text_tags: e.target.value})}/>
        </FormGroup>
        {/* <FormGroup>
          <Label for="fileUpload">Relevant Files</Label>
          <Input type="file" name="fileUpload" id="fileUpload" onChange={e => setFileUpload(e.target.value)}/>
        </FormGroup> */}
        <FormGroup>
          <Label for="privacy">Update your share setting</Label>
          <Input value={entry.privacy} type="select" name="privacy" id="privacy" multiple onChange={e => setEntry({...entry, privacy: e.target.value})}>
            <option>Only me</option>
            <option>Kids only</option>
            <option>Kids' branches</option>
            <option>Spouse only</option>
            <option>Suzanne's branch</option>
            {/* maybe there's a better way to do this? need to have a family tree page somewhere else where they can add people and make branches/groups. customized privacy is a lower priority in the grand scheme */}
          </Input>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  )};

export default EditEntryPage