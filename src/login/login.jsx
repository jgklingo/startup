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
    fetch('/api/auth', {
      method: 'delete',
    })
    .catch(() => {
      // Logout failed, assuming offline
    })
    .finally(() => {
      localStorage.removeItem('userName');
      localStorage.removeItem('classCode');
      props.onLogout();
    })
  }

  const [quoteData, setQuoteData] = React.useState({quote: '', author: ''});
  React.useEffect(() => {
    fetch('https://quote.cs260.click')
      .then(response => response.json())
      .then(data => setQuoteData(data))
  }, []);

  return (
    <main className='container-fluid text-center sign-in'>
      <div className="pt-3">
            <h2>Welcome, {props.userName}!</h2>
            <p>Class Code: {props.classCode}</p>
            <p className="fst-italic">{quoteData.quote} - {quoteData.author}</p>
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

  async function loginUser(create) {
    let method;
    if (create) {
      method = 'post';
    } else {
      method = 'put';
    }
    const response = await fetch('/api/auth', {
      method: method,
      body: JSON.stringify({ email: userName, password, classCode }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      localStorage.setItem('classCode', classCode);
      props.onLogin(userName, classCode);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
      <div className="pt-3">
        <h2>Sign In</h2>
          <div className="input-group mb-3">
              <span className="input-group-text bg-secondary text-light"><label htmlFor="email">Email:</label></span>
              <input className="form-control" id="email" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="your@email.com" />
          </div>
          <div className="input-group mb-3">
              <span className="input-group-text bg-secondary text-light"><label htmlFor="pass">Password:</label></span>
              <input className="form-control" id="pass" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          </div>
          <div className="input-group mb-3">
              <span className="input-group-text bg-secondary text-light"><label htmlFor="code">Class Code:</label></span>
              <input className="form-control" id="code" type="text" value={classCode} onChange={(e) => setClassCode(e.target.value)} placeholder="ABC123" />
          </div>
        <Button variant='primary' className='mx-1' onClick={() => loginUser(false)} disabled={!userName || !password || !classCode}>
          Login
        </Button>
        <Button variant='primary' className='mx-1' onClick={() => loginUser(true)} disabled={!userName || !password || !classCode}>
          Create
        </Button>
      </div>
      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  )
}