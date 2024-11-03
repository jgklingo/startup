import React from 'react';
import './questions.css';

// TODO: question cards are not responsive at all and look awful on mobile
export function Questions() {
  return (
    <main className='container-fluid text-center'>
      <div className="d-flex flex-column align-items-center mt-3">
        <div className="card app-card my-2">
          <div className="my-3">
            <h2>Ask a Question</h2>
            <form>
              <div className="d-flex justify-content-center">
                <textarea id="question" placeholder="Type your question here..." className="input-group-text mb-3"></textarea>
              </div>
              <p><button type="submit" className="btn btn-primary">Submit</button></p>
            </form>
          </div>
        </div>
        <div className="card app-card my-2">
          <div className="my-3 text-start ps-3">
            <h4>Anonymous Mole Rat</h4>
            <p className="fst-italic">3 min ago</p>
            <p>What is the cytoplasm made up of?</p>
            <p>
              4 votes
              <a href="">Upvote</a>
              <a href="">Downvote</a>
            </p>
          </div>
        </div>
        <div className="card app-card my-2">
          <div className="my-3 text-start ps-3">
            <h4>Anonymous Giraffe</h4>
            <p className="fst-italic">4 sec ago</p>
            <p className="">What is the mitochondria?</p>
            <p>
              0 votes
              <a href="">Upvote</a>
              <a href="">Downvote</a>
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}