import React, { Component, useState } from 'react';
import { addEntry } from '../api/EntryAPI';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
// import { ReactMic } from 'react-mic';
import MicRecorder from 'mic-recorder-to-mp3'

function NewEntryPage() {
  const [ redirect, setRedirect ] = React.useState(false);
  const [voiceBody, setVoiceBody] = useState(null);
  const [writtenBody, setWrittenBody] = useState("");

  const recorder = new MicRecorder ({
    bitRate: 128
  });

  const startRecord = async (event) => {
    event.preventDefault();
    recorder.start().then(() => {
      // something else
    }).catch((e) => {
      console.error(e);
    });
    }

  const stopRecord = async (event) => {
    event.preventDefault();
    recorder.stop()
    .getMp3().then(([buffer, blob]) => {
      // do what ever you want with buffer and blob
      // Example: Create a mp3 file and play
      // console.log(buffer)
      // console.log(blob)
      blob.arrayBuffer().then(buffer => {setVoiceBody(buffer)});

      
    }).catch((e) => {
      alert('We could not retrieve your message');
      console.log(e);
    });
  }
  
  const playRecord = async (event) => {
    event.preventDefault();

      const player = new Audio(URL.createObjectURL(stopRecord.audio_file));
        player.play();
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const entryObject = {
      voice_body: voiceBody,
      written_body: writtenBody
      // location_tags: "",
      // text_tags: "",
      // file_upload: "",
      // privacy: "",
      // entry_title: ""
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
        console.log("else statement triggered, line 71")
      }
    } catch (err) {
      console.error('error occurred while adding entry (consoled on NewEntryPage1):', err);
    }
  };

  return redirect ? <Redirect to='/' /> : (
    <div style={{ padding: '20px' }}>
      <h3> Add an Entry </h3>
        <Label for="record_start"> Start recording</Label>
        <Button size="sm" color="success" type="button" name="record_start" id="record_start" onClick={startRecord}>RECORD</Button>
        <br/>
        <Label for="record_stop"> Stop recording </Label>
        <Button size="sm" color="danger" type="button" name="record_stop" id="record_stop" onClick={stopRecord}>STOP</Button>
        <br/>
        <Label for="record_stop"> Play recording </Label>
        <Button size="sm" color="primary" type="button" name="record_play" id="record_play" onClick={playRecord}>PLAY</Button>
      <Form onSubmit={handleFormSubmit}>
        {/* <FormGroup>
          <Label for="audio_file">Audio File (to be hidden?)</Label>
          <Input type="file" name="voice_body" id="audio_file" />
        </FormGroup> */}
        <FormGroup>
          <Label for="writtenBody">Write your entry</Label>
          <Input value={writtenBody} type="textarea" name="writtenBody" id="writtenBody" onChange={e => setWrittenBody(e.target.value)}/>
        </FormGroup>
        {/* <FormGroup>
          <Label for="location_tags">Relevant Locations</Label>
          <Input type="textarea" name="location_tags" id="location_tags" />
        </FormGroup>
        <FormGroup>
          <Label for="text_tags">Relevant Tags</Label>
          <Input type="text" name="text_tags" id="text_tags" />
        </FormGroup>
        <FormGroup>
          <Label for="file_upload">Relevant Files</Label>
          <Input type="file" name="file_upload" id="file_upload" />
        </FormGroup>
        <FormGroup>
          <Label for="privacy">Privacy</Label>
          <Input type="select" name="privacy" id="privacy" multiple>
            <option>Only me</option>
            <option>Kids only</option>
            <option>Kids' branches</option>
            <option>Spouse only</option>
            <option>Suzanne's branch</option> */}
            {/* maybe there's a better way to do this? need to have a family tree page somewhere else where they can add people and make branches/groups. customized privacy is a lower priority in the grand scheme */}
          {/* </Input> */}
        {/* </FormGroup> */}
        {/* <FormGroup>
          <Label for="entry_title">Entry Title</Label>
          <Input type="text" name="entry_title" id="entry_title" />
        </FormGroup> */}
        <Button>Submit</Button>
      </Form>
    </div>
  )
};

export default NewEntryPage