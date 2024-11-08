import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Questions } from './questions/questions';
import { AuthState } from './login/authState';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const [classCode, setClassCode] = React.useState(localStorage.getItem('classCode') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);


  return (
    <BrowserRouter>
        <div className="body text-dark">
            <header className="container-fluid">
                <nav className="navbar fixed-top navbar-dark bg-dark text-light">
                    <div className="container-fluid py-2 d-flex align-items-center">
                        <h1 className="d-flex align-items-center mb-0">
                            <img src="icon_large_white.svg" className="logo me-2" alt="Logo" />
                            OpenQuestion
                        </h1>
                        {authState === AuthState.Authenticated && (
                            <div className="session-info ms-auto d-flex flex-column align-items-end">
                                <p className="mb-0">Class Code: {classCode}</p>
                                <p className="mb-0">User: {userName}</p>
                            </div>
                        )}
                    </div>

                    <div className="container-fluid second-row">
                        <menu className="navbar-nav d-flex flex-row">
                            <li className="nav-item">
                                <NavLink className="nav-link" to=''>Home</NavLink>
                            </li>
                            {authState === AuthState.Authenticated && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='questions'>Questions</NavLink>
                                </li>
                            )}
                        </menu>
                    </div>
                </nav>
            </header>
            
            <main className="content">
                <Routes>
                    <Route path='/' element={
                        <Login 
                            userName={userName}
                            classCode={classCode}
                            authState={authState}
                            onAuthChange={(userName, classCode, authState) => {
                                setUserName(userName);
                                setClassCode(classCode);
                                setAuthState(authState);
                            }}
                        />
                        } 
                        exact 
                    />
                    <Route path='questions' element={<Questions />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </main>

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