import { NotifTopOptions, NotifBlock } from './notification-util.js';
import { ShowError, ShowLoading, ShowNothingToShow } from './user-message.js';
import { UsernameContext } from './user-context.js'; // Notification Component

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Store fetched or cached notifs
      notifs: [],
      // If fetch from server is in process
      isLoading: true,
      // If any error occured during fetch
      isError: false,
      // Store setting option, whether to fetch new notifications,
      // or use cached
      allowNotif: true
    };
    this.notif_switch = this.notif_switch.bind(this);
    this.deleteAllNotifs = this.deleteAllNotifs.bind(this);
    this.fetch_notifs = this.fetch_notifs.bind(this);
  }

  fetch_notifs() {
    var username = this.context;
    fetch('http://127.0.0.1:5000/api/get_notif', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    }).then(result => result.json()).then(data => {
      // handle recieved notifcations list from server,
      // and update state accordingly
      this.setState({
        isLoading: false,
        notifs: data['notifs']
      });
    }, // handle any eror occured during fetch
    error => {
      this.setState({
        isLoading: false,
        isError: true
      });
    });
  }

  componentDidMount() {
    console.log(this.context); // On mount get setting from chrome storage

    chrome.storage.sync.get(['allow_notif', 'notif_cache'], data => {
      this.setState({
        allowNotif: data.allow_notif
      }); // If Notification are On,
      // that is 'allow_notif' is true,
      // fetch new notifications from server
      // else use already cached in chrome storage

      if (data.allow_notif) {
        this.fetch_notifs();
      } else {
        this.setState({
          isLoading: false,
          notifs: data.notif_cache
        });
      }
    });
  }

  notif_switch(e) {
    // Callback for notification setting switch
    let isNotifAllowed = e.target.checked;
    this.setState({
      allowNotif: isNotifAllowed
    }); // this will deny any further fetch request to server,
    // instead save current notif cache for future use,
    // if current state is not empty

    chrome.storage.sync.set({
      'allow_notif': isNotifAllowed
    }); // Only store if current `notifs` list,
    // is not empty.

    if (this.state.notifs != []) {
      chrome.storage.sync.set({
        'notif_cache': this.state.notifs
      });
    }
  }

  sendDeleteRequest() {
    // Send a permanent delete request for notications,
    // with mention of current user, uptill now, to server
    let username = this.context;
    fetch('http://127.0.0.1:5000/api/delete_notifs', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // get context value which is current "username"
        username: username
      })
    }).then(result => result.json()).then(data => {}, error => {});
  }

  deleteAllNotifs() {
    // Delete state and cache
    this.setState({
      notifs: []
    });
    chrome.storage.sync.set({
      "notif_cache": []
    });
    this.sendDeleteRequest();
  }

  render() {
    const notif_list = this.state.notifs;

    if (notif_list != []) {
      // Map notif list to render `NotifBlock`
      var notif_blocks = notif_list.map(each_notif => /*#__PURE__*/React.createElement(NotifBlock, {
        c_id: each_notif.c_id,
        text: each_notif.c_text,
        vote: each_notif.c_vote,
        url: each_notif.c_url,
        type: each_notif.m_type,
        isRead: each_notif.m_read
      }));
    }

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NotifTopOptions, {
      allowNotif: this.state.allowNotif,
      notifSwitchCallback: this.notif_switch,
      deleteAllCallback: this.deleteAllNotifs
    })), notif_list.length != 0 && notif_blocks, this.state.isLoading ? /*#__PURE__*/React.createElement(ShowLoading, {
      page_num: 1
    }) : this.state.isError ? /*#__PURE__*/React.createElement(ShowError, null) : notif_list.length == 0 && /*#__PURE__*/React.createElement(ShowNothingToShow, {
      page_num: 1
    }));
  }

} // Assign global 'UsernameContext' to this component,
// to fetch notifications of user


Notification.contextType = UsernameContext;
export { Notification };