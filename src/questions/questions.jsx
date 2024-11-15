import React from 'react';
import { Button } from 'react-bootstrap';
import { Question } from './question';
import './questions.css';

// TODO: implement unique question ID, votes are not always updating the right question
export function Questions({ activeUser, classCode }) {
  const exampleQuestions = [
    {
      uniqueID: crypto.randomUUID(),
      userName: 'Anonymous Mole Rat',
      text: 'What is the cytoplasm made up of?',
      votes: 4,
      timePosted: new Date(2024, 10, 7, 15, 0)
    },
    {
      uniqueID: crypto.randomUUID(),
      userName: 'Anonymous Giraffe',
      text: 'What is the mitochondria?',
      votes: 0,
      timePosted: new Date(2024, 10, 8, 15, 0)
    }
  ]

  function updateVote(uniqueID, votes) {
    const updatedQuestions = [...questions];   // Create a copy of the questions array
    const changedQuestion = updatedQuestions.find(question => question.uniqueID === uniqueID);
    changedQuestion.votes = votes
    setQuestions(updatedQuestions);
  }

  async function submitQuestion(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const question = {
      userName: activeUser,
      text: newQuestion,
    };
    const response = await fetch(`/api/questions/${classCode}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(question)
    });
    if (response.ok) {
      setNewQuestion('');
      fetchQuestions();
    } else {
      // Handle error
      console.error('Failed to submit question');
    }
  }

  async function fetchQuestions() {
    const response = await fetch(`/api/questions/${classCode}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    data = data.map(question => {
      // Convert the timePosted string to a Date object
      question.timePosted = new Date(question.timePosted);
      return question;
    });
    setQuestions(data);
  }
  React.useEffect(() => {
    fetchQuestions();
  }, []);

  const [questions, setQuestions] = React.useState([]);
  const [newQuestion, setNewQuestion] = React.useState('');
  return (
    <main className='container-fluid text-center'>
      <div className="d-flex flex-column align-items-center mt-3">
        <div className="card app-card my-2">
          <div className="my-3">
            <h2>Ask a Question</h2>
            <form>
              <div className="d-flex justify-content-center">
                <textarea id="question" placeholder="Type your question here..." value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} className="input-group-text mb-3"></textarea>
              </div>
              <p><Button variant='primary' onClick={(e) => submitQuestion(e)} disabled={!newQuestion} className="btn btn-primary">Submit</Button></p>
            </form>
          </div>
        </div>

        {questions.sort((a, b) => b.votes - a.votes).map((question, index) => (
          <Question key={question.uniqueID} userName={question.userName} text={question.text} votes={question.votes} timePosted={question.timePosted} voteFunc={(votes) => updateVote(question.uniqueID, votes)} />
        ))}
      </div>
    </main>
  );
}