import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Questions } from './questions/questions';

export default function App() {
  return (
    <BrowserRouter>
        <div className="body text-dark">
            <header className="container-fluid">
                <nav className="navbar fixed-top navbar-dark bg-dark text-light">
                    <h1><img src="icon_large_white.svg" className="logo" />OpenQuestion</h1>
                    <menu className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to=''>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='questions'>Questions</NavLink>
                        </li>
                    </menu>
                    <div className="session-info">
                        <p>Class Code: ABC123</p>
                        <p>User: Josh Klingonsmith</p>
                    </div>
                </nav>
            </header>
            
            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='questions' element={<Questions />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="bg-secondary text-light">
                <div className="container-fluid">
                    <span className="text-reset">Josh Klingonsmith</span>
                    <a className="text-reset" href="https://github.com/jgklingo/startup">GitHub</a>
                </div>
            </footer>
        </div>
    </BrowserRouter>
  )
}

function NotFound() {
    return <main className='container-fluid text-center'>404: Return to sender. Address unknown.</main>;
}