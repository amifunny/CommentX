var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nav = function (_React$Component) {
	_inherits(Nav, _React$Component);

	function Nav(props) {
		_classCallCheck(this, Nav);

		return _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));
	}

	_createClass(Nav, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "btn-panel" },
				React.createElement(
					"div",
					{ index: "0", onClick: this.props.clickHandle, className: "btn" },
					React.createElement(
						"div",
						{ className: "inner-btn" },
						React.createElement("img", { src: "icons/feed.svg" })
					)
				),
				React.createElement(
					"div",
					{ index: "1", onClick: this.props.clickHandle, className: "btn" },
					React.createElement(
						"div",
						{ className: "inner-btn" },
						React.createElement("img", { src: "icons/notif.svg" })
					)
				),
				React.createElement(
					"div",
					{ index: "2", onClick: this.props.clickHandle, className: "btn" },
					React.createElement(
						"div",
						{ className: "inner-btn" },
						React.createElement("img", { src: "icons/write.svg" })
					)
				)
			);
		}
	}]);

	return Nav;
}(React.Component);

var Content = function (_React$Component2) {
	_inherits(Content, _React$Component2);

	function Content(props) {
		_classCallCheck(this, Content);

		var _this2 = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

		_this2.state = {
			current_url: '',
			isParentChecked: false
		};

		_this2.setUrl = _this2.setUrl.bind(_this2);
		_this2.setParentUrl = _this2.setParentUrl.bind(_this2);
		_this2.switchBtnCallback = _this2.switchBtnCallback.bind(_this2);

		return _this2;
	}

	_createClass(Content, [{
		key: "setUrl",
		value: function setUrl(tabs) {

			this.setState({
				current_url: tabs[0].url,
				isParentChecked: false
			});
		}
	}, {
		key: "setTabUrl",
		value: function setTabUrl() {
			chrome.tabs.query({ active: true, currentWindow: true }, this.setUrl);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.setTabUrl();
		}
	}, {
		key: "setParentUrl",
		value: function setParentUrl() {
			var url_obj = new URL(this.state.current_url);
			var parent_name = url_obj.origin;

			this.setState({
				current_url: parent_name,
				isParentChecked: true
			});
		}
	}, {
		key: "switchBtnCallback",
		value: function switchBtnCallback(e) {

			if (e.target.checked) {
				this.setParentUrl();
			} else {
				this.setTabUrl();
			}
		}
	}, {
		key: "render",
		value: function render() {

			return React.createElement(
				"div",
				{ className: "content" },
				this.props.page == "0" ? React.createElement(Comments, { url: this.state.current_url }) : this.props.page == "1" ? React.createElement(Notification, null) : React.createElement(Write, { isParentChecked: this.state.isParentChecked,
					switchCallback: this.switchBtnCallback, url: this.state.current_url })
			);
		}
	}]);

	return Content;
}(React.Component);

function ShowNothingToShow(props) {

	// For Comments Page
	if (props.page_num = 0) {
		return React.createElement(
			"div",
			{ className: "display-msg" },
			React.createElement(
				"div",
				null,
				"No Comments on this URL!"
			),
			React.createElement(
				"div",
				null,
				"Be the first to comment!"
			)
		);
	} else if (props.page_num == 1) {
		// For Notification Page
		return React.createElement(
			"div",
			{ className: "display-msg" },
			React.createElement(
				"div",
				null,
				"No Notifactions Yet!"
			),
			React.createElement(
				"div",
				null,
				"Comment to get mentions and votes."
			)
		);
	}
}

function ShowLoading(props) {
	return React.createElement(
		"div",
		{ className: "flex-center loading-container" },
		React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "flex-center spinner-outer" },
				React.createElement("div", { className: "spinner" })
			),
			props.page_num == 0 ? React.createElement(
				"div",
				{ className: "display-msg" },
				"Fetching Comments"
			) : React.createElement(
				"div",
				{ className: "display-msg" },
				"Fetching Notifications"
			)
		)
	);
}

function ShowError(props) {
	return React.createElement(
		"div",
		{ className: "flex-center loading-container" },
		React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "flex-center spinner-outer" },
				React.createElement(
					"div",
					null,
					React.createElement("img", { src: "icons/internet_error.svg" })
				)
			),
			React.createElement(
				"div",
				{ className: "display-msg" },
				React.createElement(
					"div",
					null,
					"Something went wrong!"
				),
				React.createElement(
					"div",
					null,
					"Check your connection & try again."
				)
			)
		)
	);
}

var Comments = function (_React$Component3) {
	_inherits(Comments, _React$Component3);

	function Comments(props) {
		_classCallCheck(this, Comments);

		var _this3 = _possibleConstructorReturn(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).call(this, props));

		_this3.state = {
			isLoading: true,
			comments: [],
			isError: false
		};

		return _this3;
	}

	_createClass(Comments, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.fetchComments();
		}
	}, {
		key: "fetchComments",
		value: function fetchComments() {
			var _this4 = this;

			fetch('http://127.0.0.1:5000/api/show_comments', {

				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					url: this.props.url
				})

			}).then(function (result) {
				return result.json();
			}).then(function (data) {

				_this4.setState({
					isLoading: false,
					comments: data['comments']
				});
			}, function (error) {
				_this4.setState({
					isError: true,
					isLoading: false
				});
			});
		}
	}, {
		key: "render",
		value: function render() {

			var comments = this.state.comments;

			if (comments != []) {
				comment_blocks = comments.map(function (block) {
					return React.createElement(CommentBlock, { username: block.c_username,
						c_id: block.c_id,
						text: block.c_text, vote: block.c_vote,
						datetime: block.c_date
					});
				});
			}

			return React.createElement(
				"div",
				null,
				comments != [] && comment_blocks,
				this.state.isLoading ? React.createElement(ShowLoading, { page_num: 0 }) : this.state.isError ? React.createElement(ShowError, null) : comments == [] && React.createElement(ShowNothingToShow, { page_num: 0 })
			);
		}
	}]);

	return Comments;
}(React.Component);

var CommentBlock = function (_React$Component4) {
	_inherits(CommentBlock, _React$Component4);

	function CommentBlock(props) {
		_classCallCheck(this, CommentBlock);

		var _this5 = _possibleConstructorReturn(this, (CommentBlock.__proto__ || Object.getPrototypeOf(CommentBlock)).call(this, props));

		_this5.state = {
			username: _this5.props.username,
			datetime: new Date()

			// To show relative time of a comment
		};

		_this5.getRelativeTime = _this5.getRelativeTime.bind(_this5);
		return _this5;
	}

	_createClass(CommentBlock, [{
		key: "getRelativeTime",
		value: function getRelativeTime() {

			current_dt = new Date();
			comm_dt = new Date(this.props.datetime);

			diff_tuple = [Math.abs(current_dt.getYear() - comm_dt.getYear()), Math.abs(current_dt.getMonth() - comm_dt.getMonth()), Math.abs(current_dt.getDate() - comm_dt.getDate()), Math.abs(current_dt.getHours() - comm_dt.getHours()), Math.abs(current_dt.getMinutes() - comm_dt.getMinutes())];

			time_marks = ["year", "month", "day", "hour", "minutes"];

			// if all `diff_tuple` elements are zero
			// Show "just now"
			relative_str = "just now";

			for (var i = 0; i < diff_tuple.length; i++) {
				if (diff_tuple[i] > 0) {
					relative_str = diff_tuple[i] + " " + time_marks[i] + " ago";
					break;
				}
			}

			return relative_str;
		}
	}, {
		key: "render",
		value: function render() {

			var relative_dt = this.getRelativeTime();

			return React.createElement(
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
							{ className: "comment-info-bar" },
							"By.",
							this.state.username,
							".",
							relative_dt
						),
						React.createElement(
							"div",
							{ className: "comment-text" },
							this.props.text
						)
					)
				)
			);
		}
	}]);

	return CommentBlock;
}(React.Component);

var VoteBlock = function (_React$Component5) {
	_inherits(VoteBlock, _React$Component5);

	function VoteBlock(props) {
		_classCallCheck(this, VoteBlock);

		var _this6 = _possibleConstructorReturn(this, (VoteBlock.__proto__ || Object.getPrototypeOf(VoteBlock)).call(this, props));

		_this6.state = {
			total_votes: _this6.props.vote,
			user_vote: 0
		};

		_this6.upvoteHandle = _this6.upvoteHandle.bind(_this6);
		_this6.downvoteHandle = _this6.downvoteHandle.bind(_this6);

		return _this6;
	}

	_createClass(VoteBlock, [{
		key: "castVoteRequest",
		value: function castVoteRequest(vote) {

			fetch('http://127.0.0.1:5000/api/vote', {

				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					comment_id: this.props.c_id,
					vote: vote
				})

			}).then(function (result) {
				return result.json();
			}).then(function (data) {

				console.log(data);
			});
		}
	}, {
		key: "upvoteHandle",
		value: function upvoteHandle() {

			prev_vote = this.state.user_vote;
			if (prev_vote == 1) {
				new_vote = 0;
			} else {
				new_vote = 1;
			}

			change_in_vote = new_vote - prev_vote;
			this.castVoteRequest(change_in_vote);

			this.setState(function (state) {
				return {

					user_vote: new_vote,
					total_votes: state.total_votes + change_in_vote

				};
			});
		}
	}, {
		key: "downvoteHandle",
		value: function downvoteHandle() {

			prev_vote = this.state.user_vote;
			if (prev_vote == -1) {
				new_vote = 0;
			} else {
				new_vote = -1;
			}

			change_in_vote = new_vote - prev_vote;
			this.castVoteRequest(change_in_vote);

			this.setState(function (state) {
				return {

					user_vote: new_vote,
					total_votes: state.total_votes + change_in_vote

				};
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "vote-section", "comment-id": this.props.c_id },
				React.createElement(
					"div",
					null,
					React.createElement(
						"button",
						{ onClick: this.upvoteHandle,
							className: "vote-btn " + (this.state.user_vote == 1 && "active-vote") },
						React.createElement("img", { src: "icons/upvote.svg" })
					)
				),
				React.createElement(
					"div",
					{ className: "vote-counter" },
					this.state.total_votes
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"button",
						{ onClick: this.downvoteHandle,
							className: "vote-btn " + (this.state.user_vote == -1 && "active-vote") },
						React.createElement("img", { src: "icons/downvote.svg" })
					)
				)
			);
		}
	}]);

	return VoteBlock;
}(React.Component);

// Notification Component

var Notification = function (_React$Component6) {
	_inherits(Notification, _React$Component6);

	function Notification(props) {
		_classCallCheck(this, Notification);

		var _this7 = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));

		_this7.state = {
			notifs: [],
			isLoading: true,
			isError: false
		};
		_this7.notif_switch = _this7.notif_switch.bind(_this7);
		_this7.deleteAllNotifs = _this7.deleteAllNotifs.bind(_this7);
		return _this7;
	}

	_createClass(Notification, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this8 = this;

			fetch('http://127.0.0.1:5000/api/get_notif', {

				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: "hemsa"
				})

			}).then(function (result) {
				return result.json();
			}).then(function (data) {

				_this8.setState({
					isLoading: false,
					notifs: data['notifs']
				});
			}, function (error) {

				_this8.setState({
					isLoading: false,
					isError: true
				});
			});
		}
	}, {
		key: "notif_switch",
		value: function notif_switch(e) {

			console.log(e);

			// this will deny and further fetch request to server,
			// instead save current notif cache for future use
			chrome.storage.sync.set({
				'allow_notif': true,
				'notif_cache': this.state.notifs
			});
		}
	}, {
		key: "sendDeleteRequest",
		value: function sendDeleteRequest() {
			var _this9 = this;

			this.setState({
				isLoading: true
			});

			fetch('http://127.0.0.1:5000/api/delete_notifs', {

				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: "hemsa"
				})

			}).then(function (result) {
				return result.json();
			}).then(function (data) {

				_this9.setState({
					isLoading: false
				});
			}, function (error) {

				_this9.setState({
					isLoading: false,
					isError: true
				});
			});
		}
	}, {
		key: "deleteAllNotifs",
		value: function deleteAllNotifs() {

			// delete state and cache
			this.setState({
				notif: []
			});

			chrome.storage.sync.set({
				"notif_cache": []
			});

			sendDeleteRequest();
		}
	}, {
		key: "render",
		value: function render() {

			var notif_list = this.state.notifs;
			if (notif_list != []) {
				notif_blocks = notif_list.map(function (each_notif) {
					return React.createElement(NotifBlock, {
						c_id: each_notif.c_id, text: each_notif.c_text, vote: each_notif.c_vote,
						url: each_notif.c_url,
						type: each_notif.m_type, isRead: each_notif.m_read });
				});
			}

			return React.createElement(
				"div",
				null,
				React.createElement("div", null),
				notif_list != [] && notif_blocks,
				this.state.isLoading ? React.createElement(ShowLoading, { page_num: 1 }) : this.state.isError ? React.createElement(ShowError, null) : comments == [] && React.createElement(ShowNothingToShow, { page_num: 1 })
			);
		}
	}]);

	return Notification;
}(React.Component);

var NotifTopOptions = function (_React$Component7) {
	_inherits(NotifTopOptions, _React$Component7);

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
					null,
					React.createElement(
						"button",
						{ className: true },
						"delete all"
					)
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						null,
						"Turn off notifs"
					),
					React.createElement(
						"div",
						{ className: "notif-switch" },
						React.createElement(
							"label",
							{ className: "cd-switch" },
							React.createElement("input", { checked: this.props.isNotifAllowed,
								onChange: this.props.notifSwitchCallback, type: "checkbox" }),
							React.createElement("span", null)
						)
					)
				)
			);
		}
	}]);

	return NotifTopOptions;
}(React.Component);

var NotifBlock = function (_React$Component8) {
	_inherits(NotifBlock, _React$Component8);

	function NotifBlock(props) {
		_classCallCheck(this, NotifBlock);

		return _possibleConstructorReturn(this, (NotifBlock.__proto__ || Object.getPrototypeOf(NotifBlock)).call(this, props));
	}

	_createClass(NotifBlock, [{
		key: "getNotifMsg",
		value: function getNotifMsg(type) {
			// Type 0 : Mention
			// Type 1 : Liked
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
			notif_msg = this.getNotifMsg(notif_type);

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

// Comment Writing Component


var Write = function (_React$Component9) {
	_inherits(Write, _React$Component9);

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
						value: this.props.url
					})
				),
				React.createElement(WriteArea, { url: this.props.url })
			);
		}
	}]);

	return Write;
}(React.Component);

var WriteArea = function (_React$Component10) {
	_inherits(WriteArea, _React$Component10);

	function WriteArea(props) {
		_classCallCheck(this, WriteArea);

		var _this13 = _possibleConstructorReturn(this, (WriteArea.__proto__ || Object.getPrototypeOf(WriteArea)).call(this, props));

		_this13.char_limit = 140;

		_this13.state = {
			input: '',
			progress: "0%",
			bar_color: 'green'
		};

		_this13.handleInput = _this13.handleInput.bind(_this13);
		_this13.setSavedState = _this13.setSavedState.bind(_this13);

		return _this13;
	}

	_createClass(WriteArea, [{
		key: "setSavedState",
		value: function setSavedState(data) {
			this.setState({
				input: data.saved_comment
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {

			chrome.storage.sync.get("saved_comment", this.setSavedState);
		}
	}, {
		key: "handleInput",
		value: function handleInput(e) {

			input = e.target.value;
			curr_percent = input.length / this.char_limit * 100;
			percent = Math.min(100, curr_percent);

			if (percent >= 100) {
				color = 'red';
			} else {
				color = 'green';
			}

			this.setState({
				input: input,
				percent: percent.toString() + "%",
				bar_color: color
			});

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

var SubmitBtn = function (_React$Component11) {
	_inherits(SubmitBtn, _React$Component11);

	function SubmitBtn(props) {
		_classCallCheck(this, SubmitBtn);

		var _this14 = _possibleConstructorReturn(this, (SubmitBtn.__proto__ || Object.getPrototypeOf(SubmitBtn)).call(this, props));

		_this14.state = {
			btnActive: true,
			errorCode: -1
		};

		_this14.submitComment = _this14.submitComment.bind(_this14);
		_this14.setFlashTimeout = _this14.setFlashTimeout.bind(_this14);

		return _this14;
	}

	_createClass(SubmitBtn, [{
		key: "submitComment",
		value: function submitComment() {
			var _this15 = this;

			if (!this.state.btnActive || this.props.comment.length < 1) {
				return;
			} else {

				this.setState({
					btnActive: false
				});
			}

			fetch('http://127.0.0.1:5000/api/add_comment', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: "hemsa",
					comment: this.props.comment,
					url: this.props.url
				})
			}).then(function (resp) {

				_this15.setState({
					btnActive: true,
					errorCode: 0
				});
			}, function (error) {

				_this15.setState({
					btnActive: true,
					errorCode: 1
				});
			});
		}
	}, {
		key: "setFlashTimeout",
		value: function setFlashTimeout() {
			var _this16 = this;

			var timer = setTimeout(function () {
				_this16.setState({
					errorCode: -1
				});
			}, 10000);
		}
	}, {
		key: "render",
		value: function render() {

			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ className: "submit-btn-outer" },
					React.createElement(
						"button",
						{ disabled: !this.state.btnActive,
							onClick: this.submitComment, className: "submit-btn" },
						"Comment"
					),
					React.createElement(
						"div",
						{ className: "flex-center" },
						!this.state.btnActive && React.createElement("div", { className: "spinner" })
					)
				),
				React.createElement(
					"div",
					{ className: "comment-status-msg" },
					this.state.errorCode == 0 ? React.createElement(
						"div",
						{ id: "current_msg", className: "success-flash" },
						"Comment Successfull"
					) : this.state.errorCode == 1 && React.createElement(
						"div",
						{ className: "error-flash" },
						"An error occured. Check connection."
					),
					this.state.errorCode != -1 && this.setFlashTimeout()
				)
			);
		}
	}]);

	return SubmitBtn;
}(React.Component);

var App = function (_React$Component12) {
	_inherits(App, _React$Component12);

	function App(props) {
		_classCallCheck(this, App);

		var _this17 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this17.state = {
			page: "2"
		};
		_this17.handlePanel = _this17.handlePanel.bind(_this17);
		return _this17;
	}

	_createClass(App, [{
		key: "handlePanel",
		value: function handlePanel(e) {
			page_num = e.target.parentNode.getAttribute("index");
			this.setState({
				page: page_num
			});
		}
	}, {
		key: "render",
		value: function render() {

			return React.createElement(
				"div",
				{ className: "main" },
				React.createElement(Nav, { clickHandle: this.handlePanel }),
				React.createElement(Content, { page: this.state.page })
			);
		}
	}]);

	return App;
}(React.Component);

var UserEnterPage = function (_React$Component13) {
	_inherits(UserEnterPage, _React$Component13);

	function UserEnterPage(props) {
		_classCallCheck(this, UserEnterPage);

		return _possibleConstructorReturn(this, (UserEnterPage.__proto__ || Object.getPrototypeOf(UserEnterPage)).call(this, props));
	}

	_createClass(UserEnterPage, [{
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
						null,
						"Enter new Username"
					),
					React.createElement(
						"div",
						null,
						React.createElement("input", { type: "text", className: "username-input" })
					),
					React.createElement(
						"div",
						null,
						React.createElement(
							"button",
							{ className: "username-submit" },
							"Lets start !"
						)
					)
				)
			);
		}
	}]);

	return UserEnterPage;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));