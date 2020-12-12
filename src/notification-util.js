import {VoteBlock} from './vote-block.js'

// Component for top buttons in `Notification` Component,
// Button are "Delete all" : delete all notifications
// uptill now
// and "ON-OFF" switch whether to recieve notifications or not.
class NotifTopOptions extends React.Component{
	
	constructor( props ){
		super( props )
	}

	render(){
		return (

		<div className="notif-setting-bar">
			
			<div className="notif-delete-div">
				{/* Delete all notifications button */}
				<button onClick={this.props.deleteAllCallback} className="notif-delete-btn">
					delete all
				</button>	
			</div>

			<div className="notif-switch-div">	
				<div className="notif-switch-stat">
					{/* Show current state of notification setting */}
					Notifs are { this.props.allowNotif ? "ON" : "OFF"}
				</div>
				<div className="notif-switch">
					{/* Checkbox switch for Notification */}
					<label className="cd-switch">
						<input checked={this.props.allowNotif}
						 onChange={this.props.notifSwitchCallback} type="checkbox"></input>
						<span></span>
					</label>
				</div>	
			</div>
				
			{/* To remove dangling "float" css effect used in above divs*/}	
			<div className="clear-float"></div>
				
		</div>

		)
	}
}

// Component to render and map each notification 
class NotifBlock extends React.Component{
	
	constructor(props){
		super(props)
	}

	getNotifMsg(type){

		// On based of given type return
		// appropriate message
		// Type 0 : Mention
		// Type 1 : Liked
		let msg_str = "";

		if(type==0){
			msg_str = "You were Mentioned"
		}
		else{
			msg_str = "Your comment was Voted"
		}

		return msg_str

	}

	render(){

		const notif_type = this.props.type
		let notif_msg = this.getNotifMsg( notif_type );

		return(

		<div>

			<div className="notif-info-bar">
				{/* Display is notification is about mention or vote*/}
				{notif_msg}
			</div>

			<div className="comment-outer">
				
				<div className="comment-inner">
					{/* This `VoteBlock` is same as for 'Comments' */}
					<VoteBlock c_id={this.props.c_id}  vote={this.props.vote} />

					<div className="text-section">

						{/* Url of comment of which notification is displayed */}
						<div className="comment-info-bar notif-url-bar">
							on url . {this.props.url}
						</div>

						<div className="comment-text">{this.props.text}</div>

					</div>
				</div>	

			</div>

		</div>

		)
	}

}

export {NotifTopOptions};
export {NotifBlock};
