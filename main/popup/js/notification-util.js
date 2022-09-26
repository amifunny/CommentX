import { VoteBlock } from './vote-block.js'; // Component for top buttons in `Notification` Component,
// Button are "Delete all" : delete all notifications
// uptill now
// and "ON-OFF" switch whether to recieve notifications or not.

class NotifTopOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "notif-setting-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "notif-delete-div"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: this.props.deleteAllCallback,
      className: "notif-delete-btn"
    }, "delete all")), /*#__PURE__*/React.createElement("div", {
      className: "notif-switch-div"
    }, /*#__PURE__*/React.createElement("div", {
      className: "notif-switch-stat"
    }, "Notifs are ", this.props.allowNotif ? "ON" : "OFF"), /*#__PURE__*/React.createElement("div", {
      className: "notif-switch"
    }, /*#__PURE__*/React.createElement("label", {
      className: "cd-switch"
    }, /*#__PURE__*/React.createElement("input", {
      checked: this.props.allowNotif,
      onChange: this.props.notifSwitchCallback,
      type: "checkbox"
    }), /*#__PURE__*/React.createElement("span", null)))), /*#__PURE__*/React.createElement("div", {
      className: "clear-float"
    }));
  }

} // Component to render and map each notification 


class NotifBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  getNotifMsg(type) {
    // On based of given type return
    // appropriate message
    // Type 0 : Mention
    // Type 1 : Liked
    let msg_str = "";

    if (type == 0) {
      msg_str = "You were Mentioned";
    } else {
      msg_str = "Your comment was Voted";
    }

    return msg_str;
  }

  render() {
    const notif_type = this.props.type;
    let notif_msg = this.getNotifMsg(notif_type);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "notif-info-bar"
    }, notif_msg), /*#__PURE__*/React.createElement("div", {
      className: "comment-outer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "comment-inner"
    }, /*#__PURE__*/React.createElement(VoteBlock, {
      c_id: this.props.c_id,
      vote: this.props.vote
    }), /*#__PURE__*/React.createElement("div", {
      className: "text-section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "comment-info-bar notif-url-bar"
    }, "on url . ", this.props.url), /*#__PURE__*/React.createElement("div", {
      className: "comment-text"
    }, this.props.text)))));
  }

}

export { NotifTopOptions };
export { NotifBlock };