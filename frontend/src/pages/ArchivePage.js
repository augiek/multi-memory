import React, {useState, useEffect} from 'react'
import {fetchEntries} from '../api/EntryAPI'
import { Link } from 'react-router-dom';


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
      <h1> Archived Entries </h1>
      {entries.map((entry, index) => (
        // <p>{entry.entry_title}, {entry.created_date} ADD CREATED_DATE HERE</p>
        <div>
          <Link to={`/archive/entry/${entry.id}`} >{entry.id}. {entry.entry_title}, {entry.created_date}</Link>
          <br />
        </div>
      ))}
    </div>
  )
} 

export default ArchivePage