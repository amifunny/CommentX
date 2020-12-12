var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Page Component displayed when using this extension
// for first time.
// It prompts user to enter "username"
var UserEnterPage = function (_React$Component) {
	_inherits(UserEnterPage, _React$Component);

	function UserEnterPage(props) {
		_classCallCheck(this, UserEnterPage);

		var _this = _possibleConstructorReturn(this, (UserEnterPage.__proto__ || Object.getPrototypeOf(UserEnterPage)).call(this, props));

		_this.submitUsername = _this.submitUsername.bind(_this);
		// Reference is used to get access to Input tag
		_this.userInputRef = React.createRef();
		return _this;
	}

	_createClass(UserEnterPage, [{
		key: "submitUsername",
		value: function submitUsername(e) {

			// Handle submit button click

			// Get "username" value from input tag
			var username = this.userInputRef.current.value;

			if (username != "") {

				// Parent callback function, pass non-empty 
				// "username" to it.
				this.props.removeUserPage(username);
				chrome.storage.sync.set({
					'username': username
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "userfull flex-center" },
				React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						{ className: "userfull-welcome" },
						React.createElement(
							"div",
							{ className: "userfull-welcome-head" },
							"WELCOME"
						),
						React.createElement(
							"div",
							{ className: "userfull-welcome-subtitle" },
							"A new Web Discussion way."
						)
					),
					React.createElement(
						"div",
						null,
						React.createElement(
							"div",
							{ className: "username-prompt" },
							"Enter new Username"
						),
						React.createElement(
							"div",
							null,
							React.createElement("input", { type: "text", ref: this.userInputRef, className: "username-input" })
						),
						React.createElement(
							"div",
							null,
							React.createElement(
								"button",
								{ onClick: this.submitUsername, className: "username-submit" },
								"Lets start !"
							)
						)
					)
				)
			);
		}
	}]);

	return UserEnterPage;
}(React.Component);

export { UserEnterPage };