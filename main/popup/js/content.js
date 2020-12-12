var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Notification } from './notification.js';
import { Comments } from './comment.js';
import { Write } from './write.js';

// Component that display different pages on based,
// of navigation button selected in 'Nav'

var Content = function (_React$Component) {
	_inherits(Content, _React$Component);

	function Content(props) {
		_classCallCheck(this, Content);

		var _this = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

		_this.state = {
			// store current url of active tab
			current_url: '',
			// If parent switch in `Write` component is checked or not,
			// Parent refers to origin of url i.e main website name,
			// without any extra attributes.
			isParentChecked: false
		};

		_this.setUrl = _this.setUrl.bind(_this);
		_this.setParentUrl = _this.setParentUrl.bind(_this);
		_this.switchBtnCallback = _this.switchBtnCallback.bind(_this);

		return _this;
	}

	_createClass(Content, [{
		key: 'setUrl',
		value: function setUrl(tabs) {
			// use `url` attribute to change state
			this.setState({
				current_url: tabs[0].url,
				isParentChecked: false
			});
		}
	}, {
		key: 'setTabUrl',
		value: function setTabUrl() {
			// chrome api for accessing current tab
			chrome.tabs.query({ active: true, currentWindow: true }, this.setUrl);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setTabUrl();
		}
	}, {
		key: 'setParentUrl',
		value: function setParentUrl() {
			// create URL object
			var url_obj = new URL(this.state.current_url);
			// get origin or root url
			var parent_name = url_obj.origin + "/";

			this.setState({
				current_url: parent_name,
				isParentChecked: true
			});
		}
	}, {
		key: 'switchBtnCallback',
		value: function switchBtnCallback(e) {
			// Callback of checkbox in 'Write' Component
			if (e.target.checked) {
				this.setParentUrl();
			} else {
				this.setTabUrl();
			}
		}
	}, {
		key: 'render',
		value: function render() {

			{/* Check 'page' prop against different index number to
    display correct page component. */}
			if (this.props.page == "0") {

				return React.createElement(
					'div',
					{ className: 'content' },
					React.createElement(Comments, { url: this.state.current_url })
				);
			} else if (this.props.page == "1") {

				return React.createElement(
					'div',
					{ className: 'content' },
					React.createElement(Notification, null)
				);
			} else {

				return React.createElement(
					'div',
					{ className: 'content' },
					React.createElement(Write, { isParentChecked: this.state.isParentChecked,
						switchCallback: this.switchBtnCallback, url: this.state.current_url })
				);
			}
		}
	}]);

	return Content;
}(React.Component);

export { Content };