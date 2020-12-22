import React, {useState, useEffect} from 'react'
import {fetchEntryByID, deleteEntry } from '../api/EntryAPI'
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap'


const EntryDetailPage = (props) => {
  const [entry, setEntry] = useState({})
  const [ redirect, setRedirect ] = React.useState(false);


  useEffect(() => {
    // This useEffect using [] will only run 1 time after initial render/return
    console.log(props)
    const response = fetchEntryByID(props.match.params.id)
    response.then(data => {
      // console.log(data)
      setEntry(data)})
  }, [])

  const handleDelete = (event) => {
    deleteEntry(entry)
    .then(response => {
      if (response.status === 200) {
        setRedirect(true);
      } else {
        console.error("Error deleting entry (EntryDetailPage1)")
      }
    })
  }

  return redirect ? <Redirect to={'/archive'} /> : (
    <div class="Page-body">
      <div>
        <h5> Entry {entry.id} </h5>
        <h2>{entry.entry_title}</h2>
        <p>{entry.created_date}</p>
        {/* <p>Voice recording: {entry.voice_url}</p> */}
        <div>
          {entry.voice_body ? 
          <figure>
              <figcaption>Listen to Entry:</figcaption>
                <audio
                    controls
                    src={entry.voice_body}>
                        Your browser does not support the
                        <code>audio</code> element.
                </audio>
          </figure> :'This entry has no voice recording.'}
        </div>
        <br />
        <p>Written content: {entry.written_body}</p>
        {/* <p>{entry.voice_text}</p> */}
        <p>Relevant locations: {entry.location_tags}</p>
        <br />
        {/* <div>
          <iframe
            width="300"
            height="300"
            frameborder="0"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDKn9Kq1xJWELlYLfjRt4I5QIStbFnuuyg
              &q=${entry.location_tags}`} allowfullscreen>
          </iframe>
        </div> */}
        <div>
          <iframe
            width="300"
            height="300"
            frameborder="0"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDKn9Kq1xJWELlYLfjRt4I5QIStbFnuuyg
            &q=${entry.location_tags}`} allowfullscreen>
          </iframe>
        </div>
        <p>Tags: {entry.text_tags}</p>
        <p>Share setting: {entry.privacy}</p>
      </div>
    <div>
      <Button size="sm" href={`/archive/entry/${entry.id}/edit`}>Edit entry</Button>
      <Button size="sm" onClick={handleDelete} color="danger">Delete entry</Button>
    </div>
  </div>
  )
} 

export default EntryDetailPage 
