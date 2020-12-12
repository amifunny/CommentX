var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Component handle UI and logic for up and down votes.
// TODO : no logic implemented, if user has already voted.
var VoteBlock = function (_React$Component) {
	_inherits(VoteBlock, _React$Component);

	function VoteBlock(props) {
		_classCallCheck(this, VoteBlock);

		var _this = _possibleConstructorReturn(this, (VoteBlock.__proto__ || Object.getPrototypeOf(VoteBlock)).call(this, props));

		_this.state = {
			// all votes for a particular comment,
			// received from server
			total_votes: _this.props.vote,
			// Vote given by current user,
			user_vote: 0
		};

		_this.upvoteHandle = _this.upvoteHandle.bind(_this);
		_this.downvoteHandle = _this.downvoteHandle.bind(_this);
		_this.updateVoteState = _this.updateVoteState.bind(_this);

		return _this;
	}

	_createClass(VoteBlock, [{
		key: 'castVoteRequest',
		value: function castVoteRequest(vote) {

			// Send request to update vote count
			// in server.

			fetch('http://127.0.0.1:5000/api/vote', {

				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					// sending id and new change in vote
					// for comment
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
		key: 'upvoteHandle',
		value: function upvoteHandle() {

			var prev_vote = this.state.user_vote;
			// if already upvoted remove upvote
			if (prev_vote == 1) {
				var new_vote = 0;
			} else {
				var new_vote = 1;
			}

			this.updateVoteState(new_vote, prev_vote);
		}
	}, {
		key: 'updateVoteState',
		value: function updateVoteState(new_vote, prev_vote) {

			console.log(new_vote);
			var change_in_vote = new_vote - prev_vote;
			// send to server, new change in vote
			this.castVoteRequest(change_in_vote);

			this.setState(function (state) {
				return {

					user_vote: new_vote,
					total_votes: state.total_votes + change_in_vote

				};
			});
		}
	}, {
		key: 'downvoteHandle',
		value: function downvoteHandle() {

			var prev_vote = this.state.user_vote;
			// if already downvoted, remove the downvote
			if (prev_vote == -1) {
				var new_vote = 0;
			} else {
				var new_vote = -1;
			}
			this.updateVoteState(new_vote, prev_vote);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'vote-section', 'comment-id': this.props.c_id },
				React.createElement(
					'div',
					null,
					React.createElement(
						'button',
						{ onClick: this.upvoteHandle,
							className: "vote-btn " + (this.state.user_vote == 1 && "active-vote") },
						React.createElement('img', { src: 'icons/upvote.svg' })
					)
				),
				React.createElement(
					'div',
					{ className: 'vote-counter' },
					this.state.total_votes
				),
				React.createElement(
					'div',
					null,
					React.createElement(
						'button',
						{ onClick: this.downvoteHandle,
							className: "vote-btn " + (this.state.user_vote == -1 && "active-vote") },
						React.createElement('img', { src: 'icons/downvote.svg' })
					)
				)
			);
		}
	}]);

	return VoteBlock;
}(React.Component);

export { VoteBlock };