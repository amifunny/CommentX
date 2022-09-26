import { ShowError, ShowLoading, ShowNothingToShow } from './user-message.js';
import { VoteBlock } from './vote-block.js'; // Component to show all comments on,
// particular url.

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // If fetch from server is in process
      isLoading: true,
      // store fetched comments
      comments: [],
      // If any error occurs
      isError: false
    };
    this.fetchComments = this.fetchComments.bind(this);
  }

  componentDidMount() {
    // Fetch from server as soon as component
    // is mounted.
    this.fetchComments();
  }

  fetchComments() {
    fetch('http://127.0.0.1:5000/api/show_comments', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // send url as data
        url: this.props.url
      })
    }).then(result => result.json()).then(data => {
      // Here handle when data is recieved
      this.setState({
        isLoading: false,
        comments: data['comments']
      });
    }, // To catch any error
    error => {
      this.setState({
        isError: true,
        isLoading: false
      });
    });
  }

  render() {
    // Get list of comments in state
    const comments = this.state.comments; // Check if list is not empty,
    // as mapping empty array will produce error.

    if (comments.length != 0) {
      var comment_blocks = comments.map(block => {
        // each element in list is passed to `CommentBlock`
        return /*#__PURE__*/React.createElement(CommentBlock, {
          username: block.c_username,
          c_id: block.c_id,
          text: block.c_text,
          vote: block.c_vote,
          datetime: block.c_date
        });
      });
    }

    return /*#__PURE__*/React.createElement("div", null, comments.length != 0 && comment_blocks, this.state.isLoading ? /*#__PURE__*/React.createElement(ShowLoading, {
      page_num: 0
    }) : this.state.isError ? /*#__PURE__*/React.createElement(ShowError, null) : comments.length == 0 && /*#__PURE__*/React.createElement(ShowNothingToShow, {
      page_num: 0
    }));
  }

} // Controls UI of each comment


class CommentBlock extends React.Component {
  constructor(props) {
    super(props);
    this.getRelativeTime = this.getRelativeTime.bind(this);
    this.state = {
      // store current time to track relative time
      datetime: new Date()
    };
  } // To show relative time of a comment


  getRelativeTime() {
    let current_dt = new Date();
    let comm_dt = new Date(this.props.datetime + "+05:30"); // Get absolute difference between datime time attributes

    let diff_tuple = [Math.abs(current_dt.getYear() - comm_dt.getYear()), Math.abs(current_dt.getMonth() - comm_dt.getMonth()), Math.abs(current_dt.getDate() - comm_dt.getDate()), Math.abs(current_dt.getHours() - comm_dt.getHours()), Math.abs(current_dt.getMinutes() - comm_dt.getMinutes())];
    let time_marks = ["year", "month", "day", "hour", "minute"]; // if all `diff_tuple` elements are zero
    // Show "just now"

    let relative_str = "just now"; // Iterate to find first non zero element,
    // as we only show biggest measure of time
    // Eg. Realtive time may be 1 year, 5 months, 7days
    // But only show 1 year

    for (var i = 0; i < diff_tuple.length; i++) {
      if (diff_tuple[i] > 0) {
        relative_str = `${diff_tuple[i]} ${time_marks[i]} ago`;
        break;
      }
    }

    return relative_str;
  }

  render() {
    const relative_dt = this.getRelativeTime();
    return /*#__PURE__*/React.createElement("div", {
      className: "comment-outer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "comment-inner"
    }, /*#__PURE__*/React.createElement(VoteBlock, {
      c_id: this.props.c_id,
      vote: this.props.vote
    }), /*#__PURE__*/React.createElement("div", {
      className: "text-section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "comment-info-bar"
    }, "By.", this.props.username, ".", relative_dt), /*#__PURE__*/React.createElement("div", {
      className: "comment-text"
    }, this.props.text))));
  }

}

export { Comments };