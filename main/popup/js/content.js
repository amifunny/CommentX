import { Notification } from './notification.js';
import { Comments } from './comment.js';
import { Write } from './write.js'; // Component that display different pages on based,
// of navigation button selected in 'Nav'

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // store current url of active tab
      current_url: '',
      // If parent switch in `Write` component is checked or not,
      // Parent refers to origin of url i.e main website name,
      // without any extra attributes.
      isParentChecked: false
    };
    this.setUrl = this.setUrl.bind(this);
    this.setParentUrl = this.setParentUrl.bind(this);
    this.switchBtnCallback = this.switchBtnCallback.bind(this);
  }

  setUrl(tabs) {
    // use `url` attribute to change state
    this.setState({
      current_url: tabs[0].url,
      isParentChecked: false
    });
  }

  setTabUrl() {
    // chrome api for accessing current tab
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, this.setUrl);
  }

  componentDidMount() {
    this.setTabUrl();
  }

  setParentUrl() {
    // create URL object
    let url_obj = new URL(this.state.current_url); // get origin or root url

    let parent_name = url_obj.origin + "/";
    this.setState({
      current_url: parent_name,
      isParentChecked: true
    });
  }

  switchBtnCallback(e) {
    // Callback of checkbox in 'Write' Component
    if (e.target.checked) {
      this.setParentUrl();
    } else {
      this.setTabUrl();
    }
  }

  render() {
    {
      /* Check 'page' prop against different index number to
      display correct page component. */
    }

    if (this.props.page == "0") {
      return /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, /*#__PURE__*/React.createElement(Comments, {
        url: this.state.current_url
      }));
    } else if (this.props.page == "1") {
      return /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, /*#__PURE__*/React.createElement(Notification, null));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, /*#__PURE__*/React.createElement(Write, {
        isParentChecked: this.state.isParentChecked,
        switchCallback: this.switchBtnCallback,
        url: this.state.current_url
      }));
    }
  }

}

export { Content };