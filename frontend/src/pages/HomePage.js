import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import App from '../App';
import EntryAPI, { fetchEntries } from '../api/EntryAPI';


const HomePage = (props) => {
  const [entries, setEntries] = useState(false)
  let username = localStorage.getItem("username")
  useEffect(() => {
    setEntries(fetchEntries())
  }, [])
  console.log(entries)
  console.log(entries.entries)

    // //if statement:
    //   when entries is set, display count
    //   when it's not, display "loading"

  return (
    <div class="Page-body">
      <div>
        <h1> multiMemories </h1>
        <h5>Hi {username}, welcome back to multiMemories. Let's make your life unforgettable.</h5>
        <p>What did you do this week? </p>
        <p>What are you looking forward to over the next month? </p>
        <p>What's happening in current events? Local? National? Global? How do you feel about it?</p>
        <p>Is anything new with anyone from your Family Tree? </p>
        <p>Have you seen any good movies or read any good books recently?</p>
        <p>What were some of your favorite things to do with your parents when you were a kid? </p>
      </div>
      <div>
        <Button href={`/new`} >Tell your story, in your own voice.</Button>
      </div>
    </div>
    )
  }

export default HomePage