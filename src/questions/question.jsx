import React from 'react';

export function Question({ userName, text, votes, timePosted }) {
    function timeSince(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) {
            return Math.floor(interval) + (Math.floor(interval) > 1 ? " years" : " year");
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + (Math.floor(interval) > 1 ? " months" : " month");
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + (Math.floor(interval) > 1 ? "  days" : " day");
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + (Math.floor(interval) > 1 ? " hours" : " hour");
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + (Math.floor(interval) > 1 ? " minutes" : " minute");
        }
        return Math.floor(seconds) + (Math.floor(interval) > 1 ? " seconds" : " second");
    }

    return (
        <div className="card app-card my-2">
          <div className="my-3 text-start ps-3">
            <h4>{userName}</h4>
            <p className="fst-italic">{timeSince(timePosted)} ago</p>
            <p>{text}</p>
            <p>
              {votes} {votes === 1 ? 'vote' : 'votes'}
              <a className="ps-2" href="">Upvote</a>
              <a className="ps-2" href="">Downvote</a>
            </p>
          </div>
        </div>
    )
}
