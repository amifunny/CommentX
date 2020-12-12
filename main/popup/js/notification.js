var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { NotifTopOptions, NotifBlock } from './notification-util.js';
import { ShowError, ShowLoading, ShowNothingToShow } from './user-message.js';
import { UsernameContext } from './user-context.js';

// Notification Component

var Notification = function (_React$Component) {
	_inherits(Notification, _React$Component);

	function Notification(props) {
		_classCallCheck(this, Notification);

		var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));

		_this.state = {
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

		_this.notif_switch = _this.notif_switch.bind(_this);
		_this.deleteAllNotifs = _this.deleteAllNotifs.bind(_this);
		_this.fetch_notifs = _this.fetch_notifs.bind(_this);

		return _this;
	}

	_createClass(Notification, [{
		key: 'fetch_notifs',
		value: function fetch_notifs() {
			var _this2 = this;

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

			}).then(function (result) {
				return result.json();
			}).then(function (data) {

				// handle recieved notifcations list from server,
				// and update state accordingly
				_this2.setState({
					isLoading: false,
					notifs: data['notifs']
				});
			},

			// handle any eror occured during fetch
			function (error) {

				_this2.setState({
					isLoading: false,
					isError: true
				});
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this3 = this;

			console.log(this.context);

			// On mount get setting from chrome storage
			chrome.storage.sync.get(['allow_notif', 'notif_cache'], function (data) {

				_this3.setState({
					allowNotif: data.allow_notif
				});

				// If Notification are On,
				// that is 'allow_notif' is true,
				// fetch new notifications from server
				// else use already cached in chrome storage
				if (data.allow_notif) {
					_this3.fetch_notifs();
				} else {

					_this3.setState({
						isLoading: false,
						notifs: data.notif_cache
					});
				}
			});
		}
	}, {
		key: 'notif_switch',
		value: function notif_switch(e) {

			// Callback for notification setting switch

			var isNotifAllowed = e.target.checked;

			this.setState({
				allowNotif: isNotifAllowed
			});

			// this will deny any further fetch request to server,
			// instead save current notif cache for future use,
			// if current state is not empty

			chrome.storage.sync.set({
				'allow_notif': isNotifAllowed
			});

			// Only store if current `notifs` list,
			// is not empty.
			if (this.state.notifs != []) {

				chrome.storage.sync.set({
					'notif_cache': this.state.notifs
				});
			}
		}
	}, {
		key: 'sendDeleteRequest',
		value: function sendDeleteRequest() {

			// Send a permanent delete request for notications,
			// with mention of current user, uptill now, to server
			var username = this.context;

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

			}).then(function (result) {
				return result.json();
			}).then(function (data) {}, function (error) {});
		}
	}, {
		key: 'deleteAllNotifs',
		value: function deleteAllNotifs() {

			// Delete state and cache
			this.setState({
				notifs: []
			});

			chrome.storage.sync.set({
				"notif_cache": []
			});

			this.sendDeleteRequest();
		}
	}, {
		key: 'render',
		value: function render() {

			var notif_list = this.state.notifs;
			if (notif_list != []) {
				// Map notif list to render `NotifBlock`
				var notif_blocks = notif_list.map(function (each_notif) {
					return React.createElement(NotifBlock, {
						c_id: each_notif.c_id, text: each_notif.c_text, vote: each_notif.c_vote,
						url: each_notif.c_url,
						type: each_notif.m_type, isRead: each_notif.m_read });
				});
			}

			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					null,
					React.createElement(NotifTopOptions, { allowNotif: this.state.allowNotif,
						notifSwitchCallback: this.notif_switch,
						deleteAllCallback: this.deleteAllNotifs
					})
				),
				notif_list.length != 0 && notif_blocks,
				this.state.isLoading ? React.createElement(ShowLoading, { page_num: 1 }) : this.state.isError ? React.createElement(ShowError, null) : notif_list.length == 0 && React.createElement(ShowNothingToShow, { page_num: 1 })
			);
		}
	}]);

	return Notification;
}(React.Component);

// Assign global 'UsernameContext' to this component,
// to fetch notifications of user


Notification.contextType = UsernameContext;

export { Notification };