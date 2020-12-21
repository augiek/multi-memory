import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';




const HomePage = (props) => {
    return (
    <div class="Page-body">
      <div>
        <h1> Home Page </h1>
        <h5>Hi /user.first_name/, you've made /entry.count/ journal entries so far. Let's add to your legacy.</h5>
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