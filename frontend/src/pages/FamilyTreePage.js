import React, {useState, useEffect} from 'react'
import {fetchGroups} from '../api/GroupAPI'
import { Link } from 'react-router-dom'
import {Button} from 'reactstrap'


const FamilyTreePage = (props) => {
  const [groups, setGroups] = useState([])

 useEffect(() => {
    // This useEffect using [] will only run 1 time after initial render/return
    const response = fetchGroups()
    response.then(data => {
      setGroups(data.groups)})
  }, []) 

  return (
    <div class="Page-body">
      <h1> Family Tree Branches </h1>
      {groups.map((group, index) => (
        <div>
          <Link to={`/groups/${group.id}`} >{group.id}. {group.group_name}</Link>
          <br />
        </div>
      ))}
      <div>
          <Button href={`/groups/new`}>Add a branch to your family tree.</Button>
        </div>
    </div>
  )
} 

export default FamilyTreePage