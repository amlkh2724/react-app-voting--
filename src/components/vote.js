import React, { useState, useEffect } from 'react';
import { PAGES } from '../constants';
import Wrapper from '../styles/styled/Main.styled';

const animalNames = ['Dog', 'Cat', 'Elephant', 'Tiger'];


const VotingPage = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));


  const [votes, setVotes] = useState({
    option1: 0,
    option2: 0,
    option3: 0,
    option4: 0,
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (option) => {
    setSelectedOption(option);

    setVotes((prevState) => {
      const newVotes = { ...prevState };
      newVotes[option] += 1;
      return newVotes;
    });
  };

  const handleChangeVote = (option) => {
    option--
    setVotes((prevState) => {
      const newVotes = { ...prevState };

      if (selectedOption !== option) {
        newVotes[selectedOption] -= 1;
      }
      if (newVotes[option] >= 0) {
        newVotes[option] += 1;
      }
      return newVotes;
    });
    setSelectedOption(null);
  };

  const handleDone = () => {
    handleChangeVote()
    setHasVoted(true);
    // Save votes to localStorage for the current user
    const userId = userData.id;
    const savedVotes = JSON.parse(localStorage.getItem('votes')) || {};
    savedVotes[userId] = votes;
    localStorage.setItem('votes', JSON.stringify(savedVotes));
  };

  // Load the saved votes for the current user when the component mounts
  useEffect(() => {
    const userId = userData.id;
    const savedVotes = JSON.parse(localStorage.getItem('votes')) || {};
    if (savedVotes[userId]) {
      setVotes(savedVotes[userId]);
    }
  }, []);

  if (hasVoted) {
    return (
      <div>
        <h2>Thank you for voting!</h2>
      </div>
    );
  }

  // If the user is an admin, display the voting results as a chart
  if (userData.type === 'admin') {
    // Calculate the total votes for all users
    const savedVotes = JSON.parse(localStorage.getItem('votes')) || {};
    const totalVotes = Object.values(savedVotes).reduce((acc, userVotes) => {
      return acc + Object.values(userVotes).reduce((acc2, curr) => acc2 + curr, 0);
    }, 0);

    const data = [
      { option: animalNames[0], votes: 0 },
      { option: animalNames[1], votes: 0 },
      { option: animalNames[2], votes: 0 },
      { option: animalNames[3], votes: 0 },
    ];

    // Calculate the votes for each option across all users
    Object.values(savedVotes).forEach((userVotes) => {
      Object.keys(userVotes).forEach((option) => {
        data[parseInt(option.slice(-1)) - 1].votes += userVotes[option];
      });
    });

    return (
      <div>
        <h2>Voting Results</h2>
        <p>Total Votes
        </p>
        <p>{totalVotes}</p>
        <div>
          {data.map((option, index) => (
            <div key={option.option}>
              <span>{`Option ${index + 1}: ${option.option}`}</span>
              <span>{`Votes: ${option.votes}`}</span>
            </div>
          ))}
        </div>

      </div>
    );
  }

  return (
    <Wrapper>
      <h2>Vote for your favorite animal!</h2>
      <div>
        <button className='vote' disabled={selectedOption === 'option1'} onClick={() => handleVote('option1')}>
          {animalNames[0]}
        </button>
        <button className='vote' disabled={selectedOption === 'option2'} onClick={() => handleVote('option2')}>
          {animalNames[1]}
        </button>
        <button className='vote' disabled={selectedOption === 'option3'} onClick={() => handleVote('option3')}>
          {animalNames[2]}
        </button>
        <button className='vote' disabled={selectedOption === 'option4'} onClick={() => handleVote('option4')}>
          {animalNames[3]}
        </button>
      </div>
      <button className='vote' disabled={selectedOption === null} onClick={() => handleChangeVote(selectedOption)}>
        ChangeVote
      </button>

      <button className='vote' disabled={selectedOption === null} onClick={handleDone}>
        Done
      </button>
    </Wrapper>
  );
};

export default VotingPage;









































