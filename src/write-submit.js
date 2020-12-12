import {UsernameContext} from './user-context.js'

// Handle sending and publishing comment for a url
class SubmitBtn extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			// Button state if ready for submit
			btnActive : true,
			// default error code is -1
			// 0 for successful comment
			// 1 for failed comment
			errorCode : -1
		}	
		
		this.submitComment = this.submitComment.bind(this);
		this.setFlashTimeout = this.setFlashTimeout.bind(this);
	}


	submitComment(){

		// Return and go not futher if button is not active,
		// and comment is empty.
		if(!this.state.btnActive || (this.props.comment).length<1){
			return
		}else{

			// Deactive the button as 
			// request is sent to server
			this.setState({
				btnActive:false
			});
	
		}

		let username = this.context;

		fetch('http://127.0.0.1:5000/api/add_comment',{
			method:'POST',
			mode:'cors',
			cache:'no-cache',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({
		    	// - send username from context
				username:username,
				// - comment written by user
				comment:this.props.comment,
				// - url on which to publish comment
				url:this.props.url
			})
		}).then( resp => {

			this.setState({
				// Reactivate button for further comments,
				btnActive:true,
				// Set succes errorCode : 0
				errorCode:0
			});

			},

			(error) => {

				this.setState({
					// Reactivate button for further comments,
					btnActive:true,
					// Set failed errorCode
					errorCode:1
				});
			}

		);

	}

	setFlashTimeout(){

		// Timeout to set errorCode back to default :-1
		// This also makes any error or success message dissappear
		const timer = setTimeout(() => {
    		this.setState({
    			errorCode : -1
    		})
  		}, 10000);

	}

	render(){

		return (

		<div>
			<div className="submit-btn-outer">
				<button disabled={!this.state.btnActive}
				onClick={this.submitComment} className="submit-btn">
					Comment
				</button>

				{/* Show a load spinner if button not active*/}
				<div className="flex-center">
					{!this.state.btnActive && <div className="spinner"></div>}
				</div>

			</div>

			{/* Comment status */}
			<div className="comment-status-msg">
				{ this.state.errorCode==0 ?
				  ( <div id="current_msg" className="success-flash">Comment Successfull</div> ):
				  ( this.state.errorCode==1 &&
				  	 <div className="error-flash">An error occured. Check connection.</div> )
				}
				{ this.state.errorCode!=-1 && this.setFlashTimeout() }	
			</div>
			
		</div>	


		);

	}
	
}

// Add context to get "username" in this component
SubmitBtn.contextType = UsernameContext;

export {SubmitBtn};
