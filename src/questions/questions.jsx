import React from 'react';
import { Question } from './question';
import './questions.css';

export function Questions() {
  const exampleQuestions = [
    {
      userName: 'Test User',
      text: 'Test question text',
      votes: 1,
      timePosted: new Date(1970, 0, 1, 0, 0)
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

  function submitQuestion(e) {
    // this function will be replaced with a web service call
    e.preventDefault();
    setQuestions([...questions, {
      userName: 'Test User',
      text: newQuestion,
      votes: 5,
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
              <p><button type="submit" onClick={(e) => submitQuestion(e)} className="btn btn-primary">Submit</button></p>
            </form>
          </div>
        </div>

        {questions.sort((a, b) => b.votes - a.votes).map((question, index) => (
          <Question key={index} userName={question.userName} text={question.text} votes={question.votes} timePosted={question.timePosted} />
        ))}
      </div>
    </main>
  );
}