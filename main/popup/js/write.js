var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { SubmitBtn } from './write-submit.js';

// Comment Writing Component

var Write = function (_React$Component) {
	_inherits(Write, _React$Component);

	function Write(props) {
		_classCallCheck(this, Write);

		return _possibleConstructorReturn(this, (Write.__proto__ || Object.getPrototypeOf(Write)).call(this, props));
	}

	_createClass(Write, [{
		key: "render",
		value: function render() {

			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ className: "switch-write-url" },
					React.createElement(
						"div",
						null,
						"Switch to Parent"
					),
					React.createElement(
						"div",
						{ className: "switch-url-div" },
						React.createElement(
							"label",
							{ className: "cd-switch" },
							React.createElement("input", { checked: this.props.isParentChecked,
								onChange: this.props.switchCallback, type: "checkbox" }),
							React.createElement("span", null)
						)
					)
				),
				React.createElement(
					"div",
					null,
					React.createElement("input", { readonly: true, className: "write-url-show",
						value: this.props.url })
				),
				React.createElement(WriteArea, { url: this.props.url })
			);
		}
	}]);

	return Write;
}(React.Component);

var WriteArea = function (_React$Component2) {
	_inherits(WriteArea, _React$Component2);

	function WriteArea(props) {
		_classCallCheck(this, WriteArea);

		// limit of allowed charecters in single comment
		var _this2 = _possibleConstructorReturn(this, (WriteArea.__proto__ || Object.getPrototypeOf(WriteArea)).call(this, props));

		_this2.char_limit = 140;

		_this2.state = {
			// Store current input in textarea
			input: '',
			// State for progress bar that indicates
			// percentage of character quota used
			progress: "0%",
			// color of character bar, default green
			// switch to red if character limit exceeded
			bar_color: 'green'
		};

		_this2.handleInput = _this2.handleInput.bind(_this2);
		_this2.setSavedState = _this2.setSavedState.bind(_this2);

		return _this2;
	}

	_createClass(WriteArea, [{
		key: "setSavedState",
		value: function setSavedState(data) {
			// Set cached data to current state
			this.setState({
				input: data.saved_comment
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {

			// Check if there is incomplete or prevoius comment
			// and get it from chrome storage.
			chrome.storage.sync.get("saved_comment", this.setSavedState);
		}
	}, {
		key: "handleInput",
		value: function handleInput(e) {

			// Handles input given to textarea
			var input = e.target.value;
			// Calculate percent to chacter quota used
			var curr_percent = input.length / this.char_limit * 100;
			// Set 100 percent as upper bound limit
			var percent = Math.min(100, curr_percent);

			if (percent >= 100) {
				// When percent become 100 or greater
				// make color of bar red
				var color = 'red';
			} else {
				var color = 'green';
			}

			// Change state
			this.setState({
				input: input,
				percent: percent.toString() + "%",
				bar_color: color
			});

			// Also store input in chrome storage
			chrome.storage.sync.set({
				'saved_comment': input
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "write-div" },
				React.createElement(
					"div",
					{ className: "write-div-inner" },
					React.createElement(
						"div",
						{ className: "progress-bar" },
						React.createElement("div", { style: { width: this.state.percent, backgroundColor: this.state.bar_color },
							className: "progress-bar-inner" })
					),
					React.createElement("textarea", { value: this.state.input, onInput: this.handleInput,
						placeholder: "Write Comment here ...", "class": "write-area" })
				),
				React.createElement(SubmitBtn, { comment: this.state.input, url: this.props.url })
			);
		}
	}]);

	return WriteArea;
}(React.Component);

export { Write, WriteArea };