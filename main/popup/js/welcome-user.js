// Page Component displayed when using this extension
// for first time.
// It prompts user to enter "username"
class UserEnterPage extends React.Component {
  constructor(props) {
    super(props);
    this.submitUsername = this.submitUsername.bind(this); // Reference is used to get access to Input tag

    this.userInputRef = React.createRef();
  }

  submitUsername(e) {
    // Handle submit button click
    // Get "username" value from input tag
    let username = this.userInputRef.current.value;

    if (username != "") {
      // Parent callback function, pass non-empty 
      // "username" to it.
      this.props.removeUserPage(username);
      chrome.storage.sync.set({
        'username': username
      });
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "userfull flex-center"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "userfull-welcome"
    }, /*#__PURE__*/React.createElement("div", {
      className: "userfull-welcome-head"
    }, "WELCOME"), /*#__PURE__*/React.createElement("div", {
      className: "userfull-welcome-subtitle"
    }, "A new Web Discussion way.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "username-prompt"
    }, "Enter new Username"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      type: "text",
      ref: this.userInputRef,
      className: "username-input"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: this.submitUsername,
      className: "username-submit"
    }, "Lets start !")))));
  }

}

export { UserEnterPage };