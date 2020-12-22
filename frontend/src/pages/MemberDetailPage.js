// import React, {useState, useEffect} from 'react'
// import {fetchEntryByID, deleteEntry } from '../api/EntryAPI'
// import { Redirect } from 'react-router-dom';
// import { Button } from 'reactstrap'


// const EntryDetailPage = (props) => {
//   const [entry, setEntry] = useState({})
//   const [ redirect, setRedirect ] = React.useState(false);


//   useEffect(() => {
//     // This useEffect using [] will only run 1 time after initial render/return
//     console.log(props)
//     const response = fetchMemberByID(props.match.params.id)
//     response.then(data => {
//       // console.log(data)
//       setEntry(data)})
//   }, [])

//   const handleDelete = (event) => {
//     deleteMember(entry)
//     .then(response => {
//       if (response.status === 200) {
//         setRedirect(true);
//       } else {
//         console.error("Error deleting member (MemberDetailPage1)")
//       }
//     })
//   }

//   return redirect ? <Redirect to={'/groups'} /> : (
//     <div class="Page-body">
//       <div>
//         <h1> Member Detail </h1>
//         <h2>{member.first_name} {member.last_name}</h2>
//         <p>{member.relationship-to-you}</p>
//         <p>picture and additional info (parents, DOB, etc.) of group member</p>
//     <div>
//       <Button size="sm" href={`/groups/${group.id}/${member.id}/edit`}>Edit entry</Button>
//       <Button size="sm" onClick={handleDelete} color="danger">Delete member</Button>
//     </div>
//   </div>
//   )
// } 

// export default MemberDetailPage 
