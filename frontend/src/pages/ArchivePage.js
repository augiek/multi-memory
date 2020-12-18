import React, {useState, useEffect} from 'react'
import {fetchEntries} from '../api/EntryAPI'


const ArchivePage = (props) => {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    // This useEffect using [] will only run 1 time after initial render/return
    const response = fetchEntries()
    response.then(data => {
      // console.log(data)
      setEntries(data.entries)})
  }, [])

  return (
    <div>
      <h1> Archive Page </h1>
      {entries.map((entry, index) => (
        <p>{entry.entry_title}</p>
    ))}
    </div>
  )
} 

export default ArchivePage