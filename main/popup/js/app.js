var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { UsernameContext } from './user-context.js';
import { Nav } from './navbar.js';
import { UserEnterPage } from './welcome-user.js';

// Root Component is attached to DOM directly,
// all other components are its children.

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.state = {
			// to decide whether to show ,Username Page
			showUserEnter: false,
			// stores current username
			username: ""
		};
		_this.removeUserPage = _this.removeUserPage.bind(_this);
		return _this;
	}

	_createClass(App, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			// Fetch "username" from chrome storage,
			// if already registered.
			chrome.storage.sync.get("username", function (data) {

				if (data.username == "") {
					// In case of empty "username",
					// prompt user to enter new one
					_this2.setState({
						showUserEnter: true
					});
				} else {

					// Update state
					_this2.setState({
						username: data.username
					});
				}
			});
		}

		// Callback function of `UserEnterPage`,
		// when user enter valid input to change state.

	}, {
		key: 'removeUserPage',
		value: function removeUserPage(username) {
			this.setState({
				showUserEnter: false,
				username: username
			});
		}
	}, {
		key: 'render',
		value: function render() {

			if (this.state.showUserEnter) {
				return React.createElement(
					'div',
					{ className: 'main' },
					React.createElement(UserEnterPage, { removeUserPage: this.removeUserPage })
				);
			} else {
				return React.createElement(
					'div',
					{ className: 'main' },
					React.createElement(
						UsernameContext.Provider,
						{ value: this.state.username },
						React.createElement(Nav, null)
					)
				);
			}
		}
	}]);

	return App;
}(React.Component);

// Attach to DOM tree


ReactDOM.render(React.createElement(App, null), document.getElementById('root'));