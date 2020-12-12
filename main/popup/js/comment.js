var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { ShowError, ShowLoading, ShowNothingToShow } from './user-message.js';
import { VoteBlock } from './vote-block.js';

// Component to show all comments on,
// particular url.

var Comments = function (_React$Component) {
	_inherits(Comments, _React$Component);

	function Comments(props) {
		_classCallCheck(this, Comments);

		var _this = _possibleConstructorReturn(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).call(this, props));

		_this.state = {
			// If fetch from server is in process
			isLoading: true,
			// store fetched comments
			comments: [],
			// If any error occurs
			isError: false
		};
		_this.fetchComments = _this.fetchComments.bind(_this);

		return _this;
	}

	_createClass(Comments, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			// Fetch from server as soon as component
			// is mounted.
			this.fetchComments();
		}
	}, {
		key: 'fetchComments',
		value: function fetchComments() {
			var _this2 = this;

			fetch('http://127.0.0.1:5000/api/show_comments', {

				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					// send url as data
					url: this.props.url
				})

			}).then(function (result) {
				return result.json();
			}).then(function (data) {

				// Here handle when data is recieved

				_this2.setState({
					isLoading: false,
					comments: data['comments']
				});
			},

			// To catch any error
			function (error) {
				_this2.setState({
					isError: true,
					isLoading: false
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {

			// Get list of comments in state
			var comments = this.state.comments;

			// Check if list is not empty,
			// as mapping empty array will produce error.
			if (comments.length != 0) {

				var comment_blocks = comments.map(function (block) {
					// each element in list is passed to `CommentBlock`
					return React.createElement(CommentBlock, { username: block.c_username,
						c_id: block.c_id,
						text: block.c_text, vote: block.c_vote,
						datetime: block.c_date
					});
				});
			}

			return React.createElement(
				'div',
				null,
				comments.length != 0 && comment_blocks,
				this.state.isLoading ? React.createElement(ShowLoading, { page_num: 0 }) : this.state.isError ? React.createElement(ShowError, null) : comments.length == 0 && React.createElement(ShowNothingToShow, { page_num: 0 })
			);
		}
	}]);

	return Comments;
}(React.Component);

// Controls UI of each comment


var CommentBlock = function (_React$Component2) {
	_inherits(CommentBlock, _React$Component2);

	function CommentBlock(props) {
		_classCallCheck(this, CommentBlock);

		var _this3 = _possibleConstructorReturn(this, (CommentBlock.__proto__ || Object.getPrototypeOf(CommentBlock)).call(this, props));

		_this3.getRelativeTime = _this3.getRelativeTime.bind(_this3);

		_this3.state = {
			// store current time to track relative time
			datetime: new Date()
		};
		return _this3;
	}

	// To show relative time of a comment


	_createClass(CommentBlock, [{
		key: 'getRelativeTime',
		value: function getRelativeTime() {

			var current_dt = new Date();
			var comm_dt = new Date(this.props.datetime);

			// Get absolute difference between datime time attributes
			var diff_tuple = [Math.abs(current_dt.getYear() - comm_dt.getYear()), Math.abs(current_dt.getMonth() - comm_dt.getMonth()), Math.abs(current_dt.getDate() - comm_dt.getDate()), Math.abs(current_dt.getHours() - comm_dt.getHours()), Math.abs(current_dt.getMinutes() - comm_dt.getMinutes())];

			var time_marks = ["year", "month", "day", "hour", "minute"];

			// if all `diff_tuple` elements are zero
			// Show "just now"
			var relative_str = "just now";

			// Iterate to find first non zero element,
			// as we only show biggest measure of time
			// Eg. Realtive time may be 1 year, 5 months, 7days
			// But only show 1 year
			for (var i = 0; i < diff_tuple.length; i++) {
				if (diff_tuple[i] > 0) {
					relative_str = diff_tuple[i] + ' ' + time_marks[i] + ' ago';
					break;
				}
			}

			return relative_str;
		}
	}, {
		key: 'render',
		value: function render() {

			var relative_dt = this.getRelativeTime();

			return React.createElement(
				'div',
				{ className: 'comment-outer' },
				React.createElement(
					'div',
					{ className: 'comment-inner' },
					React.createElement(VoteBlock, { c_id: this.props.c_id, vote: this.props.vote }),
					React.createElement(
						'div',
						{ className: 'text-section' },
						React.createElement(
							'div',
							{ className: 'comment-info-bar' },
							'By.',
							this.props.username,
							'.',
							relative_dt
						),
						React.createElement(
							'div',
							{ className: 'comment-text' },
							this.props.text
						)
					)
				)
			);
		}
	}]);

	return CommentBlock;
}(React.Component);

export { Comments };