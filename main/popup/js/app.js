import { UsernameContext } from './user-context.js';
import { Nav } from './navbar.js';
import { UserEnterPage } from './welcome-user.js'; // Root Component is attached to DOM directly,
// all other components are its children.

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // to decide whether to show ,Username Page
      showUserEnter: false,
      // stores current username
      username: ""
    };
    this.removeUserPage = this.removeUserPage.bind(this);
  }

  componentDidMount() {
    // Fetch "username" from chrome storage,
    // if already registered.
    chrome.storage.sync.get("username", data => {
      if (data.username == "") {
        // In case of empty "username",
        // prompt user to enter new one
        this.setState({
          showUserEnter: true
        });
      } else {
        // Update state
        this.setState({
          username: data.username
        });
      }
    });
  } // Callback function of `UserEnterPage`,
  // when user enter valid input to change state.


  removeUserPage(username) {
    this.setState({
      showUserEnter: false,
      username: username
    });
  }

  render() {
    if (this.state.showUserEnter) {
      return /*#__PURE__*/React.createElement("div", {
        className: "main"
      }, /*#__PURE__*/React.createElement(UserEnterPage, {
        removeUserPage: this.removeUserPage
      }));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: "main"
      }, /*#__PURE__*/React.createElement(UsernameContext.Provider, {
        value: this.state.username
      }, /*#__PURE__*/React.createElement(Nav, null)));
    }
  }

} // Attach to DOM tree


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));