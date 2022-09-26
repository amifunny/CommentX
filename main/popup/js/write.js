import { SubmitBtn } from './write-submit.js'; // Comment Writing Component

class Write extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "switch-write-url"
    }, /*#__PURE__*/React.createElement("div", null, "Switch to Parent"), /*#__PURE__*/React.createElement("div", {
      className: "switch-url-div"
    }, /*#__PURE__*/React.createElement("label", {
      className: "cd-switch"
    }, /*#__PURE__*/React.createElement("input", {
      checked: this.props.isParentChecked,
      onChange: this.props.switchCallback,
      type: "checkbox"
    }), /*#__PURE__*/React.createElement("span", null)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      readonly: true,
      className: "write-url-show",
      value: this.props.url
    })), /*#__PURE__*/React.createElement(WriteArea, {
      url: this.props.url
    }));
  }

}

class WriteArea extends React.Component {
  constructor(props) {
    super(props); // limit of allowed charecters in single comment

    this.char_limit = 140;
    this.state = {
      // Store current input in textarea
      input: '',
      // State for progress bar that indicates
      // percentage of character quota used
      progress: "0%",
      // color of character bar, default green
      // switch to red if character limit exceeded
      bar_color: 'green'
    };
    this.handleInput = this.handleInput.bind(this);
    this.setSavedState = this.setSavedState.bind(this);
  }

  setSavedState(data) {
    // Set cached data to current state
    this.setState({
      input: data.saved_comment
    });
  }

  componentDidMount() {
    // Check if there is incomplete or prevoius comment
    // and get it from chrome storage.
    chrome.storage.sync.get("saved_comment", this.setSavedState);
  }

  handleInput(e) {
    // Handles input given to textarea
    let input = e.target.value; // Calculate percent to chacter quota used

    let curr_percent = input.length / this.char_limit * 100; // Set 100 percent as upper bound limit

    let percent = Math.min(100, curr_percent);

    if (percent >= 100) {
      // When percent become 100 or greater
      // make color of bar red
      var color = 'red';
    } else {
      var color = 'green';
    } // Change state


    this.setState({
      input: input,
      percent: percent.toString() + "%",
      bar_color: color
    }); // Also store input in chrome storage

    chrome.storage.sync.set({
      'saved_comment': input
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "write-div"
    }, /*#__PURE__*/React.createElement("div", {
      className: "write-div-inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-bar"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: this.state.percent,
        backgroundColor: this.state.bar_color
      },
      className: "progress-bar-inner"
    })), /*#__PURE__*/React.createElement("textarea", {
      value: this.state.input,
      onInput: this.handleInput,
      placeholder: "Write Comment here ...",
      class: "write-area"
    })), /*#__PURE__*/React.createElement(SubmitBtn, {
      comment: this.state.input,
      url: this.props.url
    }));
  }

}

export { Write, WriteArea };