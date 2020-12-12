var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { UsernameContext } from './user-context.js';

// Handle sending and publishing comment for a url

var SubmitBtn = function (_React$Component) {
	_inherits(SubmitBtn, _React$Component);

	function SubmitBtn(props) {
		_classCallCheck(this, SubmitBtn);

		var _this = _possibleConstructorReturn(this, (SubmitBtn.__proto__ || Object.getPrototypeOf(SubmitBtn)).call(this, props));

		_this.state = {
			// Button state if ready for submit
			btnActive: true,
			// default error code is -1
			// 0 for successful comment
			// 1 for failed comment
			errorCode: -1
		};

		_this.submitComment = _this.submitComment.bind(_this);
		_this.setFlashTimeout = _this.setFlashTimeout.bind(_this);
		return _this;
	}

	_createClass(SubmitBtn, [{
		key: 'submitComment',
		value: function submitComment() {
			var _this2 = this;

			// Return and go not futher if button is not active,
			// and comment is empty.
			if (!this.state.btnActive || this.props.comment.length < 1) {
				return;
			} else {

				// Deactive the button as 
				// request is sent to server
				this.setState({
					btnActive: false
				});
			}

			var username = this.context;

			fetch('http://127.0.0.1:5000/api/add_comment', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					// - send username from context
					username: username,
					// - comment written by user
					comment: this.props.comment,
					// - url on which to publish comment
					url: this.props.url
				})
			}).then(function (resp) {

				_this2.setState({
					// Reactivate button for further comments,
					btnActive: true,
					// Set succes errorCode : 0
					errorCode: 0
				});
			}, function (error) {

				_this2.setState({
					// Reactivate button for further comments,
					btnActive: true,
					// Set failed errorCode
					errorCode: 1
				});
			});
		}
	}, {
		key: 'setFlashTimeout',
		value: function setFlashTimeout() {
			var _this3 = this;

			// Timeout to set errorCode back to default :-1
			// This also makes any error or success message dissappear
			var timer = setTimeout(function () {
				_this3.setState({
					errorCode: -1
				});
			}, 10000);
		}
	}, {
		key: 'render',
		value: function render() {

			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'submit-btn-outer' },
					React.createElement(
						'button',
						{ disabled: !this.state.btnActive,
							onClick: this.submitComment, className: 'submit-btn' },
						'Comment'
					),
					React.createElement(
						'div',
						{ className: 'flex-center' },
						!this.state.btnActive && React.createElement('div', { className: 'spinner' })
					)
				),
				React.createElement(
					'div',
					{ className: 'comment-status-msg' },
					this.state.errorCode == 0 ? React.createElement(
						'div',
						{ id: 'current_msg', className: 'success-flash' },
						'Comment Successfull'
					) : this.state.errorCode == 1 && React.createElement(
						'div',
						{ className: 'error-flash' },
						'An error occured. Check connection.'
					),
					this.state.errorCode != -1 && this.setFlashTimeout()
				)
			);
		}
	}]);

	return SubmitBtn;
}(React.Component);

// Add context to get "username" in this component


SubmitBtn.contextType = UsernameContext;

export { SubmitBtn };