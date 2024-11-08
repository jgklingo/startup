import React from 'react';

export function Question({ userName, text, votes, timePosted }) {
    function timeSince(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    return (
        <div className="card app-card my-2">
          <div className="my-3 text-start ps-3">
            <h4>{userName}</h4>
            <p className="fst-italic">{timeSince(timePosted)} ago</p>
            <p>{text}</p>
            <p>
              {votes} votes
              <a className="ps-2" href="">Upvote</a>
              <a className="ps-2" href="">Downvote</a>
            </p>
          </div>
        </div>
    )
}
