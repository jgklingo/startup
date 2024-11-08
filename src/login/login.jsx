import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AuthState } from './authState';
import { MessageDialog } from './messageDialog';
import './login.css';

export function Login({ userName, classCode, authState, onAuthChange }) {
  return (
    <main className='container-fluid text-center sign-in'>
      <div className="pt-3">
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} classCode={classCode} onLogout={() => onAuthChange(userName, classCode, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName, loginClassCode) => {
              onAuthChange(loginUserName, loginClassCode, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}

function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('classCode');
    props.onLogout();
  }

  return (
    <main className='container-fluid text-center sign-in'>
      <div className="pt-3">
            <h2>Welcome, {props.userName}!</h2>
            <p>Class Code: {props.classCode}</p>
            <Button variant='primary' className='mx-1' onClick={() => navigate('/questions')}>Questions</Button>
            <Button variant='secondary' className='mx-1' onClick={logout}>Logout</Button>
        </div>
    </main>
  );
}

function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [classCode, setClassCode] = React.useState(props.classCode);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem('userName', userName);
    localStorage.setItem('classCode', classCode);
    props.onLogin(userName, classCode);
  }

  async function createUser() {
    loginUser();  // to be changed once a database is implemented
  }

  return (
    <>
      <div className="pt-3">
        <h2>Sign In</h2>
          <div className="input-group mb-3">
              <span className="input-group-text bg-secondary text-light"><label for="email">Email:</label></span>
              <input className="form-control" id="email" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="your@email.com" />
          </div>
          <div className="input-group mb-3">
              <span className="input-group-text bg-secondary text-light"><label for="pass">Password:</label></span>
              <input className="form-control" id="pass" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          </div>
          <div className="input-group mb-3">
              <span className="input-group-text bg-secondary text-light"><label for="code">Class Code:</label></span>
              <input className="form-control" id="code" type="text" value={classCode} onChange={(e) => setClassCode(e.target.value)} placeholder="ABC123" />
          </div>
        <Button variant='primary' className='mx-1' onClick={() => loginUser()} disabled={!userName || !password || !classCode}>
          Login
        </Button>
        <Button variant='primary' className='mx-1' onClick={() => createUser()} disabled={!userName || !password || !classCode}>
          Create
        </Button>
      </div>
      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  )
}