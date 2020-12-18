import React, {useState, useEffect} from 'react'
import {fetchEntryByID} from '../api/EntryAPI'


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
    <div>
      <h1> Entry Detail </h1>
      <h2>{entry.entry_title}</h2>
      <p>Date Created: {entry.created_date} NEED TO FIX THIS</p>
      <p>Voice recording: {entry.voice_url}</p>
      <figure>
            <figcaption>Listen to Entry:</figcaption>
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
  )
} 

export default EntryDetailPage;