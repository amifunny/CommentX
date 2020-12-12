var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { VoteBlock } from './vote-block.js';

// Component for top buttons in `Notification` Component,
// Button are "Delete all" : delete all notifications
// uptill now
// and "ON-OFF" switch whether to recieve notifications or not.

var NotifTopOptions = function (_React$Component) {
	_inherits(NotifTopOptions, _React$Component);

	function NotifTopOptions(props) {
		_classCallCheck(this, NotifTopOptions);

		return _possibleConstructorReturn(this, (NotifTopOptions.__proto__ || Object.getPrototypeOf(NotifTopOptions)).call(this, props));
	}

	_createClass(NotifTopOptions, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "notif-setting-bar" },
				React.createElement(
					"div",
					{ className: "notif-delete-div" },
					React.createElement(
						"button",
						{ onClick: this.props.deleteAllCallback, className: "notif-delete-btn" },
						"delete all"
					)
				),
				React.createElement(
					"div",
					{ className: "notif-switch-div" },
					React.createElement(
						"div",
						{ className: "notif-switch-stat" },
						"Notifs are ",
						this.props.allowNotif ? "ON" : "OFF"
					),
					React.createElement(
						"div",
						{ className: "notif-switch" },
						React.createElement(
							"label",
							{ className: "cd-switch" },
							React.createElement("input", { checked: this.props.allowNotif,
								onChange: this.props.notifSwitchCallback, type: "checkbox" }),
							React.createElement("span", null)
						)
					)
				),
				React.createElement("div", { className: "clear-float" })
			);
		}
	}]);

	return NotifTopOptions;
}(React.Component);

// Component to render and map each notification 


var NotifBlock = function (_React$Component2) {
	_inherits(NotifBlock, _React$Component2);

	function NotifBlock(props) {
		_classCallCheck(this, NotifBlock);

		return _possibleConstructorReturn(this, (NotifBlock.__proto__ || Object.getPrototypeOf(NotifBlock)).call(this, props));
	}

	_createClass(NotifBlock, [{
		key: "getNotifMsg",
		value: function getNotifMsg(type) {

			// On based of given type return
			// appropriate message
			// Type 0 : Mention
			// Type 1 : Liked
			var msg_str = "";

			if (type == 0) {
				msg_str = "You were Mentioned";
			} else {
				msg_str = "Your comment was Voted";
			}

			return msg_str;
		}
	}, {
		key: "render",
		value: function render() {

			var notif_type = this.props.type;
			var notif_msg = this.getNotifMsg(notif_type);

			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ className: "notif-info-bar" },
					notif_msg
				),
				React.createElement(
					"div",
					{ className: "comment-outer" },
					React.createElement(
						"div",
						{ className: "comment-inner" },
						React.createElement(VoteBlock, { c_id: this.props.c_id, vote: this.props.vote }),
						React.createElement(
							"div",
							{ className: "text-section" },
							React.createElement(
								"div",
								{ className: "comment-info-bar notif-url-bar" },
								"on url . ",
								this.props.url
							),
							React.createElement(
								"div",
								{ className: "comment-text" },
								this.props.text
							)
						)
					)
				)
			);
		}
	}]);

	return NotifBlock;
}(React.Component);

export { NotifTopOptions };
export { NotifBlock };