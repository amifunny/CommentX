import { Content } from './content.js'; // Navigation bar at top of 'App'

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // default is index "2" 
      // which is 'Write' Tab
      page: "2"
    };
    this.handlePanel = this.handlePanel.bind(this);
  }

  handlePanel(e) {
    // Callback when any of the tabs in "btn-panel is clicked"
    let page_num = e.target.parentNode.getAttribute("index");
    this.setState({
      page: page_num
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "btn-panel"
    }, /*#__PURE__*/React.createElement("div", {
      index: "0",
      onClick: this.handlePanel,
      className: "btn"
    }, /*#__PURE__*/React.createElement("div", {
      className: "inner-btn"
    }, /*#__PURE__*/React.createElement("img", {
      src: "icons/feed.svg"
    }))), /*#__PURE__*/React.createElement("div", {
      index: "1",
      onClick: this.handlePanel,
      className: "btn"
    }, /*#__PURE__*/React.createElement("div", {
      className: "inner-btn"
    }, /*#__PURE__*/React.createElement("img", {
      src: "icons/notif.svg"
    }))), /*#__PURE__*/React.createElement("div", {
      index: "2",
      onClick: this.handlePanel,
      className: "btn"
    }, /*#__PURE__*/React.createElement("div", {
      className: "inner-btn"
    }, /*#__PURE__*/React.createElement("img", {
      src: "icons/write.svg"
    })))), /*#__PURE__*/React.createElement(Content, {
      page: this.state.page
    }));
  }

}

export { Nav };