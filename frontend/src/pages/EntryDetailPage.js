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
      <h1> Entry Detail Page </h1>
      <p>{entry.entry_title}</p>
      <p>{entry.voice_url}</p>
      <figure>
            <figcaption>Listen to the Voice Entry:</figcaption>
            <audio
                controls
                src={entry.voice_url}>
                    Your browser does not support the
                    <code>audio</code> element.
            </audio>
        </figure>
    </div>
  )
} 

export default EntryDetailPage;