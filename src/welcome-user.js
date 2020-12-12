// Page Component displayed when using this extension
// for first time.
// It prompts user to enter "username"
class UserEnterPage extends React.Component{
	
	constructor(props){
		super(props);
		this.submitUsername = this.submitUsername.bind(this);
		// Reference is used to get access to Input tag
		this.userInputRef = React.createRef();
	}

	submitUsername(e){

		// Handle submit button click

		// Get "username" value from input tag
		let username = this.userInputRef.current.value;

		if(username!=""){

			// Parent callback function, pass non-empty 
			// "username" to it.
			this.props.removeUserPage(username);
			chrome.storage.sync.set({
				'username':username
			});

		}

	}

	render(){
		return (
			<div className="userfull flex-center">
				
				<div>
				
					<div className="userfull-welcome">
						<div className="userfull-welcome-head">WELCOME</div>
						<div className="userfull-welcome-subtitle">
							A new Web Discussion way.
						</div>
					</div>

					<div>
						<div className="username-prompt">
							Enter new Username
						</div>
						<div>
							{/* Input tag for entering "username" */}
							<input type="text" ref={this.userInputRef} className="username-input">
							</input>
						</div>		
						<div>
							{/* Submit after "username" entered */}
							<button onClick={this.submitUsername} className="username-submit">
								Lets start !
							</button>
						</div>
					</div>

				</div>

			</div>
		)
	}

}

export {UserEnterPage};


