// Component handle UI and logic for up and down votes.
// TODO : no logic implemented, if user has already voted.
class VoteBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // all votes for a particular comment,
      // received from server
      total_votes: this.props.vote,
      // Vote given by current user,
      user_vote: 0
    };
    this.upvoteHandle = this.upvoteHandle.bind(this);
    this.downvoteHandle = this.downvoteHandle.bind(this);
    this.updateVoteState = this.updateVoteState.bind(this);
  }

  castVoteRequest(vote) {
    // Send request to update vote count
    // in server.
    fetch('http://127.0.0.1:5000/api/vote', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // sending id and new change in vote
        // for comment
        comment_id: this.props.c_id,
        vote: vote
      })
    }).then(result => result.json()).then(data => {
      console.log(data);
    });
  }

  upvoteHandle() {
    let prev_vote = this.state.user_vote; // if already upvoted remove upvote

    if (prev_vote == 1) {
      var new_vote = 0;
    } else {
      var new_vote = 1;
    }

    this.updateVoteState(new_vote, prev_vote);
  }

  updateVoteState(new_vote, prev_vote) {
    console.log(new_vote);
    let change_in_vote = new_vote - prev_vote; // send to server, new change in vote

    this.castVoteRequest(change_in_vote);
    this.setState(state => ({
      user_vote: new_vote,
      total_votes: state.total_votes + change_in_vote
    }));
  }

  downvoteHandle() {
    let prev_vote = this.state.user_vote; // if already downvoted, remove the downvote

    if (prev_vote == -1) {
      var new_vote = 0;
    } else {
      var new_vote = -1;
    }

    this.updateVoteState(new_vote, prev_vote);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "vote-section",
      "comment-id": this.props.c_id
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: this.upvoteHandle,
      className: "vote-btn " + (this.state.user_vote == 1 && "active-vote")
    }, /*#__PURE__*/React.createElement("img", {
      src: "icons/upvote.svg"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "vote-counter"
    }, this.state.total_votes), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: this.downvoteHandle,
      className: "vote-btn " + (this.state.user_vote == -1 && "active-vote")
    }, /*#__PURE__*/React.createElement("img", {
      src: "icons/downvote.svg"
    }))));
  }

}

export { VoteBlock };