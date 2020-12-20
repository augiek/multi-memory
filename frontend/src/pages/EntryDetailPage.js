import React, {useState, useEffect} from 'react'
import {fetchEntryByID} from '../api/EntryAPI'
import { Button } from 'reactstrap'


const EntryDetailPage = (props) => {
  const [entry, setEntry] = useState({})

  useEffect(() => {
    // This useEffect using [] will only run 1 time after initial render/return
    console.log(props)
    const response = fetchEntryByID(props.match.params.id)
    response.then(data => {
      // console.log(data)
      setEntry(data)})
  }, [])

  return (
    <div class="Page-body">
      <div>
        <h1> Entry Detail </h1>
        <h2>{entry.entry_title}</h2>
        <p>Date Created: ??? NEED TO FIX {entry.created_date}</p>
        {/* <p>Voice recording: {entry.voice_url}</p> */}
        <figure>
              <figcaption>Listen to Entry: (need to make conditional)</figcaption>
              <audio
                  controls
                  src={entry.voice_url}>
                      Your browser does not support the
                      <code>audio</code> element.
              </audio>
          </figure>
        <p>Written content: {entry.written_body}</p>
        {/* <p>{entry.voice_text}</p> */}
        <p>Relevant locations: {entry.location_tags} ADD MAP TO THIS</p>
        <p>Tags: {entry.text_tags}</p>
        <p>Share setting: {entry.privacy}</p>
      </div>
    <div>
      <Button size="sm" href={`/archive/entry/${entry.id}/edit`}>Edit entry</Button>
      <Button size="sm" href={`/archive/entry/${entry.id}/delete`} color="danger">Delete entry</Button>
    </div>
  </div>
  )
} 

export default EntryDetailPage;