import React, { useState, useEffect } from 'react';
import { PAGES } from '../constants';
import Wrapper from '../styles/styled/Main.styled';
// import { Logo } from '../components';
// import main from '../assets/images/main.svg';
// import Wrapper from '../styles/styled/Landing.styled';


const VotingPage = ({ user, setUser, setPage }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  const [landing, login, main, vote, admin] = PAGES;

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
  };

  const handleChangeVote = (option) => {
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
    // setPage(admin);

    const data = [
      { option: 'Option 1', votes: 0 },
      { option: 'Option 2', votes: 0 },
      { option: 'Option 3', votes: 0 },
      { option: 'Option 4', votes: 0 },
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
        <p>Total Votes: {totalVotes}</p>
        <ul>
          {data.map((option) => (
            <li key={option.option}>
              {option.option}: {option.votes} ({((option.votes / totalVotes) * 100).toFixed(
                2)}%)
            </li>
          ))}
        </ul>
        <button onClick={() => setPage(login)}>Go to Admin Page</button>
      </div>
    );
  }

  return (
    <Wrapper>
      <h2>Welcome to the Voting Page!</h2>
      <p>Please select your preferred option:</p>
      <ul>
        <li>
          Option 1
          <button disabled={selectedOption === 'option1'} onClick={() => handleVote('option1')}>
            {selectedOption === 'option1' ? 'Selected' : 'Vote'}
          </button>
        </li>
        <li>
          Option 2
          <button disabled={selectedOption === 'option2'} onClick={() => handleVote('option2')}>
            {selectedOption === 'option2' ? 'Selected' : 'Vote'}
          </button>
        </li>
        <li>
          Option 3
          <button disabled={selectedOption === 'option3'} onClick={() => handleVote('option3')}>
            {selectedOption === 'option3' ? 'Selected' : 'Vote'}
          </button>
        </li>
        <li>
          Option 4
          <button disabled={selectedOption === 'option4'} onClick={() => handleVote('option4')}>
            {selectedOption === 'option4' ? 'Selected' : 'Vote'}
          </button>
        </li>
      </ul>
      <button disabled={!selectedOption} onClick={() => handleChangeVote(selectedOption)}>
        Submit Vote
      </button>
      <button onClick={handleDone} disabled={!selectedOption}>
        Done
      </button>
    </Wrapper>
  );
};

export default VotingPage;











// const VotingPage = ({ user, setUser, setPage }) => {
//   const userData = JSON.parse(localStorage.getItem('userData'));

//   const [landing, login, main, vote, admin] = PAGES;
//   const [votes, setVotes] = useState({
//     option1: 0,
//     option2: 0,
//     option3: 0,
//     option4: 0,
//   });

//   const [selectedOption, setSelectedOption] = useState(null);
//   const [hasVoted, setHasVoted] = useState(false);

//   const handleVote = (option) => {
//     setSelectedOption(option);
//   };

//   const handleChangeVote = (option) => {
//     setVotes((prevState) => {
//       const newVotes = { ...prevState };
//       if (selectedOption !== option) {
//         newVotes[selectedOption] -= 1;
//       }
//       if (newVotes[option] >= 0) {
//         newVotes[option] += 1;
//       }
//       return newVotes;
//     });
//     setSelectedOption(null);
//   };

//   const handleDone = () => {
//     setHasVoted(true);
//   };

//   // const handleBackToLogin = () => {
//   //   setUser('');
//   //   localStorage.removeItem('userData');
//   //   setPage(PAGES[0]); // Go back to the login page
//   // };

//   useEffect(() => {
//     const savedVotes = JSON.parse(localStorage.getItem('votes'));
//     if (savedVotes) {
//       setVotes(savedVotes);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('votes', JSON.stringify(votes));
//   }, [votes]);

//   if (hasVoted) {
//     return (
//       <div>
//         <h2>Thank you for voting!</h2>
//       </div>
//     );
//   }

//   // If the user is an admin, display the voting results as a chart
//   if (userData === 'admin') {
//     const totalVotes = Object.values(votes).reduce((acc, curr) => acc + curr, 0);
//     const data = [
//       { option: 'Option 1', votes: votes.option1 },
//       { option: 'Option 2', votes: votes.option2 },
//       { option: 'Option 3', votes: votes.option3 },
//       { option: 'Option 4', votes: votes.option4 },
//     ];

//     return (
//       <div>
//         <h2>Voting Results</h2>
//         <p>Total Votes: {totalVotes}</p>
//         <ul>
//           {data.map((option) => (
//             <li key={option.option}>
//               {option.option}: {option.votes} ({((option.votes / totalVotes) * 100).toFixed(2)}%)
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>Voting Page</h2>
//       <p>Select an option to vote:</p>
//       <div>
//         {!selectedOption && (
//           <>
//             <button onClick={() => handleVote('option1')}>Option 1</button>
//             <button onClick={() => handleVote('option2')}>Option 2</button>
//             <button onClick={() => handleVote('option3')}>Option 3</button>
//             <button onClick={() => handleVote('option4')}>Option 4</button>
//           </>
//         )}
//         {selectedOption && (
//           <>
//             <p>You have selected {selectedOption}. Are you sure?</p>
//             <button onClick={() => handleChangeVote('option1')}>
//               Change Vote to Option 1
//             </button>
//             <button onClick={() => handleChangeVote('option2')}>
//               Change Vote to Option 2
//             </button>
//             <button onClick={() => handleChangeVote('option3')}>
//               Change Vote to Option 3
//             </button>
//             <button onClick={() => handleChangeVote('option4')}>
//               Change Vote to Option 4
//             </button>
//             <button onClick={handleDone}>Done</button>
//           </>
//         )}
//       </div>
//       <p>Current Votes:</p>
//       <ul>
//         <li>Option 1: {votes.option1}</li>
//         <li>Option 2: {votes.option2}</li>
//         <li>Option 3: {votes.option3}</li>
//         <li>Option 4: {votes.option4}</li>
//       </ul>
//       {user === 'admin' && (
//         <div>
//           <h3>Vote Summary:</h3>
//           <p>Total Votes: {votes.option1 + votes.option2 + votes.option3 + votes.option4}</p>
//           <ul>
//             <li>Option 1: {votes.option1}</li>
//             <li>Option 2: {votes.option2}</li>
//             <li>Option 3: {votes.option3}</li>
//             <li>Option 4: {votes.option4}</li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VotingPage;



























// const VotingPage = ({ user, setUser, setPage }) => {
//   const [landing, login, main, vote, admin] = PAGES;
//   const [votes, setVotes] = useState({
//     option1: 0,
//     option2: 0,
//     option3: 0,
//     option4: 0,
//   });

//   const [selectedOption, setSelectedOption] = useState(null);
//   const [hasVoted, setHasVoted] = useState(false);

//   const handleVote = (option) => {
//     setSelectedOption(option);
//   };

//   const handleChangeVote = (option) => {
//     setVotes((prevState) => {
//       const newVotes = { ...prevState };
//       if (selectedOption !== option) {
//         newVotes[selectedOption] -= 1;
//       }
//       if (newVotes[option] >= 0) {
//         newVotes[option] += 1;
//       }
//       return newVotes;
//     });
//     setSelectedOption(null);
//   };

//   const handleDone = () => {
//     setHasVoted(true);
//   };

//   const handleBackToLogin = () => {
//     setUser('');
//     localStorage.removeItem('userData');
//     setPage(PAGES[0]); // Go back to the login page
//   };

//   useEffect(() => {
//     const savedVotes = JSON.parse(localStorage.getItem('votes'));
//     if (savedVotes) {
//       setVotes(savedVotes);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('votes', JSON.stringify(votes));
//   }, [votes]);

//   if (hasVoted) {
//     return (
//       <div>
//         <h2>Thank you for voting!</h2>
//       </div>
//     );
//   }

//   // If the user is an admin, redirect them to the admin page
//   if (user === 'admin') {
//     setPage(PAGES[2]); // Assumes the admin page is at index 2 of the PAGES constant
//     return null; // Return null to prevent rendering the VotingPage component
//   }

//   return (
//     <div>
//       <h2>Voting Page</h2>
//       <p>Select an option to vote:</p>
//       <div>
//         {!selectedOption && (
//           <>
//             <button onClick={() => handleVote('option1')}>Option 1</button>
//             <button onClick={() => handleVote('option2')}>Option 2</button>
//             <button onClick={() => handleVote('option3')}>Option 3</button>
//             <button onClick={() => handleVote('option4')}>Option 4</button>
//           </>
//         )}
//         {selectedOption && (
//           <>
//             <p>You have selected {selectedOption}. Are you sure?</p>
//             <button onClick={() => handleChangeVote('option1')}>
//               Change Vote to Option 1
//             </button>
//             <button onClick={() => handleChangeVote('option2')}>
//               Change Vote to Option 2
//             </button>
//             <button onClick={() => handleChangeVote('option3')}>
//               Change Vote to Option 3
//             </button>
//             <button onClick={() => handleChangeVote('option4')}>
//               Change Vote to Option 4
//             </button>
//             <button onClick={handleDone}>Done</button>
//           </>
//         )}
//       </div>
//       <p>Current Votes:</p>
//       <ul>
//         <li>Option 1: {votes.option1}</li>
//         <li>Option 2: {votes.option2}</li>
//         <li>Option 3: {votes.option3}</li>
//         <li>Option 4: {votes.option4}</li>
//       </ul>
//     </div>
//   );
// };


// export default VotingPage;