var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Content } from './content.js';

// Navigation bar at top of 'App'

var Nav = function (_React$Component) {
	_inherits(Nav, _React$Component);

	function Nav(props) {
		_classCallCheck(this, Nav);

		var _this = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));

		_this.state = {
			// default is index "2" 
			// which is 'Write' Tab
			page: "2"
		};
		_this.handlePanel = _this.handlePanel.bind(_this);
		return _this;
	}

	_createClass(Nav, [{
		key: "handlePanel",
		value: function handlePanel(e) {
			// Callback when any of the tabs in "btn-panel is clicked"
			var page_num = e.target.parentNode.getAttribute("index");
			this.setState({
				page: page_num
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ className: "btn-panel" },
					React.createElement(
						"div",
						{ index: "0", onClick: this.handlePanel, className: "btn" },
						React.createElement(
							"div",
							{ className: "inner-btn" },
							React.createElement("img", { src: "icons/feed.svg" })
						)
					),
					React.createElement(
						"div",
						{ index: "1", onClick: this.handlePanel, className: "btn" },
						React.createElement(
							"div",
							{ className: "inner-btn" },
							React.createElement("img", { src: "icons/notif.svg" })
						)
					),
					React.createElement(
						"div",
						{ index: "2", onClick: this.handlePanel, className: "btn" },
						React.createElement(
							"div",
							{ className: "inner-btn" },
							React.createElement("img", { src: "icons/write.svg" })
						)
					)
				),
				React.createElement(Content, { page: this.state.page })
			);
		}
	}]);

	return Nav;
}(React.Component);

export { Nav };