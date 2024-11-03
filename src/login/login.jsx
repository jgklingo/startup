import React from 'react';
import './login.css';

export function Login() {
  return (
    <main className='container-fluid text-center sign-in'>
      <div className="pt-3">
            <h2>Sign In</h2>
            <form method="get" action="app.html">
                <div className="input-group mb-3">
                    <span className="input-group-text bg-secondary text-light"><label for="email">Email:</label></span>
                    <input className="form-control" id="email" type="text" placeholder="your@email.com" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text bg-secondary text-light"><label for="pass">Password:</label></span>
                    <input className="form-control" id="pass" type="password" placeholder="password" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text bg-secondary text-light"><label for="code">Class Code:</label></span>
                    <input className="form-control" id="code" type="text" value="ABC123" />
                </div>
                <button type="submit" className="btn btn-primary mx-1">Login</button>
                <button type="submit" className="btn btn-primary mx-1">Create Account</button>
            </form>
        </div>
    </main>
  );
}