import React, {useState, useEffect} from 'react'
import {fetchEntries, searchEntries} from '../api/EntryAPI'
import { Link } from 'react-router-dom'
import { Input, InputGroup } from 'reactstrap'
import { addGroup } from '../api/GroupAPI'
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'



const ArchivePage = (props) => {
  const [entries, setEntries] = useState([])

 useEffect(() => {
    // This useEffect using [] will only run 1 time after initial render/return
    const response = fetchEntries()
    response.then(data => {
      // console.log(data)
      setEntries(data.entries)})
  }, []) 

  const handleSearch = async (event) => {
    const textToSearchFor = event.target.value;
    try {
      let entriesJson;
      if (!textToSearchFor) {
        entriesJson = await fetchEntries();
      } else {
        entriesJson = await searchEntries(textToSearchFor);
      }
      this.setState({ entries: entriesJson });
    } catch (e) {
      console.error('error searching entries: ', e);
    }
  };

  return (
    <div class="Page-body">
      <div>
        <InputGroup>
          <Input onChange={(e) => this.handleSearch(e)} type="text" placeholder="Search" />
        </InputGroup>
        {/* <EntryList articles={this.state.articles} /> */}
      </div>
      <div class="archive-body">
        <h1> Archived Entries </h1>
        <div class='archive-map'>
          {entries.map((entry, index) => (
            <div>
              <Link to={`/archive/entry/${entry.id}`} >{entry.id}. {entry.entry_title}, {entry.created_date}</Link>
              <br />
            </div>
          ))}
        </div>
        <div class='archive-map' id="mapid">
          <iframe
              width="300"
              height="300"
              frameborder="0"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDKn9Kq1xJWELlYLfjRt4I5QIStbFnuuyg
              &q=chicago_bean`} allowfullscreen>
            </iframe>
        </div>
      </div>
    </div>
  )
} 

export default ArchivePage