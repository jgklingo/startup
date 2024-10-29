import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../app.css';

export default function App() {
  return (
        <div className="text-dark">
            <header className="container-fluid">
                <nav className="navbar fixed-top navbar-dark bg-dark text-light">
                    <h1><img src="public/icon_large_white.svg" className="logo" />OpenQuestion</h1>
                    <menu className="navbar-nav">
                        <li className="nav-item"><a href="index.html" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="app.html" className="nav-link active">Questions</a></li>
                    </menu>
                    <div className="session-info">
                        <p>Class Code: ABC123</p>
                        <p>User: Josh Klingonsmith</p>
                    </div>
                </nav>
            </header>
            
            <main>App components go here</main>
            {/* <main className="container-fluid text-center">
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
            </main> */}

            <footer className="bg-secondary text-light">
                <div className="container-fluid">
                    <span className="text-reset">Josh Klingonsmith</span>
                    <a className="text-reset" href="https://github.com/jgklingo/startup">GitHub</a>
                </div>
            </footer>
        </div>
  )
}