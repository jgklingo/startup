import React, { act } from 'react';
import { Button } from 'react-bootstrap';
import { Question } from './question';
import './questions.css';

// TODO: implement unique question ID, votes are not always updating the right question
export function Questions({ activeUser }) {
  const exampleQuestions = [
    {
      userName: 'Test User',
      text: 'Test question text',
      votes: 1,
      timePosted: new Date(1970, 0, 1, 0, 1)
    },
    {
      userName: 'Anonymous Mole Rat',
      text: 'What is the cytoplasm made up of?',
      votes: 4,
      timePosted: new Date(1970, 0, 1, 0, 0)
    },
    {
      userName: 'Anonymous Giraffe',
      text: 'What is the mitochondria?',
      votes: 0,
      timePosted: new Date(2024, 10, 8, 15, 0)
    }
  ]

  function updateVote(timePosted, votes) {
    const updatedQuestions = [...questions];   // Create a copy of the questions array
    const changedQuestion = updatedQuestions.find(question => question.timePosted === timePosted);
    changedQuestion.votes = votes
    setQuestions(updatedQuestions);
  }

  function submitQuestion(e) {
    // this function will be replaced with a web service call
    e.preventDefault();  // don't think I need this
    setQuestions([...questions, {
      userName: activeUser,
      text: newQuestion,
      votes: 4,
      timePosted: new Date()
    }]);
    setNewQuestion('');
  }
  const [questions, setQuestions] = React.useState(exampleQuestions);  // the example array will be replaced with a web service call
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
          <Question key={question.timePosted} userName={question.userName} text={question.text} votes={question.votes} timePosted={question.timePosted} voteFunc={(votes) => updateVote(question.timePosted, votes)} />
        ))}
      </div>
    </main>
  );
}