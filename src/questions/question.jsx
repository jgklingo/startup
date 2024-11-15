import React from 'react';
import { Button } from 'react-bootstrap';

export function Question(props) {
    function timeSince(date) {
        let seconds = 0;
        if (Math.floor((new Date() - date) / 1000) >= 0) {
            seconds = Math.floor((new Date() - date) / 1000);
        }
        let interval = seconds / 31536000;
        if (interval > 1) {
            return Math.floor(interval) + (Math.floor(interval) !== 1 ? " years" : " year");
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + (Math.floor(interval) !== 1 ? " months" : " month");
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + (Math.floor(interval) !== 1 ? "  days" : " day");
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + (Math.floor(interval) !== 1 ? " hours" : " hour");
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + (Math.floor(interval) !== 1 ? " minutes" : " minute");
        }
        return Math.floor(seconds) + (Math.floor(interval) !== 1 ? " seconds" : " second");
    }

    const [upvote, setUpvote] = React.useState(false);
    const [downvote, setDownvote] = React.useState(false);

    function trackVote(type) {
        if (type === 'up' && !downvote){
            setUpvote(!upvote);
            if (upvote) {
                props.voteFunc(props.votes - 1);
            } else {
                props.voteFunc(props.votes + 1);
            }
        } else if (type === 'down' && !upvote) {
            setDownvote(!downvote);
            if (downvote) {
                props.voteFunc(props.votes + 1);
            } else {
                props.voteFunc(props.votes - 1);
            }
        }
    }

    return (
        <div className="card app-card my-2">
          <div className="my-3 text-start ps-3">
            <h4>{props.userName}</h4>
            <p className="fst-italic">{timeSince(props.timePosted)} ago - {props.votes} {props.votes === 1 ? 'vote' : 'votes'}</p>
            <p>{props.text}</p>
            <p>
              <Button variant={upvote ? 'info' : 'secondary'} onClick={() => trackVote('up')}>Upvote</Button>
              <Button variant={downvote ? 'info' : 'secondary'} className='mx-3' onClick={() => trackVote('down')}>Downvote</Button>
            </p>
          </div>
        </div>
    )
}
