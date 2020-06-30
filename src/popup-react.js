class Nav extends React.Component{
	
	constructor(props){
		super (props);
	}

	render(){
		return(

			<div className='btn-panel'>

				<div index="0" onClick={this.props.clickHandle} className="btn">
					<div className="inner-btn">
						<img src='icons/feed.svg' ></img>
					</div>	
				</div>
				<div index="1" onClick={this.props.clickHandle} className="btn">
					<div className="inner-btn">
						<img src='icons/notif.svg' ></img>
					</div>	
				</div>
				<div index="2" onClick={this.props.clickHandle} className="btn">
					<div className="inner-btn">
						<img src='icons/write.svg' ></img>
					</div>	
				</div>

			</div>

		);
	}

}

class Content extends React.Component{

	constructor(props){
		
		super (props);
		
		this.state = {
			current_url : '',
			isParentChecked:false
		}	
		
		this.setUrl = this.setUrl.bind(this);
		this.setParentUrl = this.setParentUrl.bind(this);
		this.switchBtnCallback = this.switchBtnCallback.bind(this);


	}

	setUrl(tabs){
		
		this.setState({
			current_url:tabs[0].url,
			isParentChecked:false
		});

	}

	setTabUrl(){
		chrome.tabs.query( {active: true, currentWindow: true}, this.setUrl );
	}

	componentDidMount(){
		this.setTabUrl()
	}


	setParentUrl(){
		let url_obj = new URL( this.state.current_url );
		let parent_name = url_obj.origin

		this.setState({
			current_url : parent_name,
			isParentChecked:true
		});
	}

	switchBtnCallback(e){

		if(e.target.checked ){
			this.setParentUrl();
		}else{
			this.setTabUrl();
		}

	}


	render(){


		return(

			<div className='content'>
				{ (this.props.page=="0" ? <Comments url={this.state.current_url}/> 
				  :(this.props.page=="1" ? <Notification /> 
				  :<Write isParentChecked={this.state.isParentChecked}
				  switchCallback={this.switchBtnCallback} url={this.state.current_url}/>)) }
			</div>

		);

	}

}

function ShowNothingToShow(props){

	// For Comments Page
	if(props.page_num=0){
		return (
			<div className="display-msg">
				<div>No Comments on this URL!</div>
				<div>Be the first to comment!</div>
			</div>
		);	
	}
	else if(props.page_num==1){
		// For Notification Page
		return (
			<div className="display-msg">
				<div>No Notifactions Yet!</div>
				<div>Comment to get mentions and votes.</div>
			</div>
		)	
	}
	
}

function ShowLoading(props){
	return (
		<div className="flex-center loading-container">
			<div>
				<div className="flex-center spinner-outer">
					<div className='spinner'></div>
				</div>
				{ props.page_num==0 ? 	
				  ( <div className="display-msg">Fetching Comments</div> ):
				  ( <div className="display-msg">Fetching Notifications</div> )
				}
			</div>	
		</div>	
	)
}

function ShowError(props){
	return (
		<div className="flex-center loading-container">
			<div>
				<div className="flex-center spinner-outer">
					<div>
						<img src="icons/internet_error.svg"></img>
					</div>
				</div>	
				<div className="display-msg">
					<div>Something went wrong!</div>
					<div>Check your connection & try again.</div>
				</div>
			</div>	
		</div>	
	)
}



class Comments extends React.Component{
	
	constructor(props){
	
		super (props);
		this.state = {
			isLoading:true,
			comments : [],
			isError:false
		}

	}


	componentDidMount(){
		this.fetchComments()	
	}

	fetchComments(){
		
		fetch('http://127.0.0.1:5000/api/show_comments',{
		
			method:'POST',
			mode:'cors',
			cache:'no-cache',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({
				url:this.props.url
			})
		
		})
      	.then(
	        (result) => result.json()
        )
        .then( (data) => {

    		this.setState({
				isLoading:false,
				comments:data['comments']
			});

        	},

        	(error) => {
        		this.setState({
        			isError:true,
					isLoading:false
        		});
        	}

        );

	}

	
	render(){

		const comments = this.state.comments;
		
		if(comments!=[]){
			comment_blocks = comments.map( (block)=>{
				return <CommentBlock username={block.c_username}
					c_id={block.c_id}
					text={block.c_text} vote={block.c_vote}
					datetime={block.c_date}
				 />
			})
		}	

		return(

			<div>

				{comments!=[] && comment_blocks}
				{( this.state.isLoading ? <ShowLoading page_num={0} /> : 
					( this.state.isError ? <ShowError /> :
					( comments==[] && <ShowNothingToShow page_num={0} /> )) 
				)}

			</div>

		);
	}

}


class CommentBlock extends React.Component{
	constructor(props){
		super(props)
		this.getRelativeTime = this.getRelativeTime.bind(this);
	}

	state = {
		username:this.props.username,
		datetime:new Date()
	}

	// To show relative time of a comment
	getRelativeTime(){

		current_dt = new Date()
		comm_dt = new Date( this.props.datetime )

		diff_tuple = [
				Math.abs(current_dt.getYear() - comm_dt.getYear()),
				Math.abs(current_dt.getMonth() - comm_dt.getMonth()),
				Math.abs(current_dt.getDate() - comm_dt.getDate()),
				Math.abs(current_dt.getHours() - comm_dt.getHours()),
				Math.abs(current_dt.getMinutes() - comm_dt.getMinutes()),
		]

		time_marks = ["year","month","day","hour","minutes"]

		// if all `diff_tuple` elements are zero
		// Show "just now"
		relative_str = "just now"


		for (var i = 0; i < diff_tuple.length; i++) {
			if(diff_tuple[i]>0){
				relative_str = `${diff_tuple[i]} ${time_marks[i]} ago`
				break
			}
		}

		return relative_str

	}

	render(){

		const relative_dt = this.getRelativeTime();

		return (

			<div className="comment-outer">
				
				<div className="comment-inner">
					<VoteBlock c_id={this.props.c_id} vote={this.props.vote} />

					<div className="text-section">

						<div className="comment-info-bar">
							By.{this.state.username}.{relative_dt}
						</div>
						<div className="comment-text">{this.props.text}</div>
					</div>
				</div>	

			</div>

		);
	}

}

class VoteBlock extends React.Component{
	
	constructor(props){
		super(props)
		this.state = {
			total_votes:this.props.vote,
			user_vote:0
		}
		
		this.upvoteHandle = this.upvoteHandle.bind(this);
		this.downvoteHandle = this.downvoteHandle.bind(this);

	}

	castVoteRequest(vote){

		fetch('http://127.0.0.1:5000/api/vote',{
		
			method:'POST',
			mode:'cors',
			cache:'no-cache',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({
				comment_id:this.props.c_id,
				vote:vote
			})
		
		})
      	.then(
	        (result) => result.json()
        )
        .then( (data) => {

        	console.log( data )

        });


	}

	upvoteHandle(){
		
		prev_vote = this.state.user_vote
		if(prev_vote==1){
			new_vote = 0
		}
		else{
			new_vote = 1
		}

		change_in_vote = new_vote-prev_vote
		this.castVoteRequest( change_in_vote );

		this.setState( (state)=>({
	
			user_vote:new_vote,
			total_votes:state.total_votes+change_in_vote
	
		}));

	}

	downvoteHandle(){
		
		prev_vote = this.state.user_vote
		if(prev_vote==-1){
			new_vote = 0
		}
		else{
			new_vote = -1
		}

		change_in_vote = new_vote-prev_vote
		this.castVoteRequest( change_in_vote );

		this.setState( (state)=>({
	
			user_vote:new_vote,
			total_votes:state.total_votes+change_in_vote
	
		}));

	}

	render(){
		return(

			<div className="vote-section" comment-id={this.props.c_id}>
				<div>
					<button onClick={this.upvoteHandle} 
					className={"vote-btn "+ (this.state.user_vote==1 && "active-vote")}>
						<img src='icons/upvote.svg'></img>
					</button>
				</div>	
				<div className="vote-counter">{this.state.total_votes}</div>
				<div>
					<button onClick={this.downvoteHandle}
					 className={"vote-btn "+ (this.state.user_vote==-1 && "active-vote")}>
						<img src='icons/downvote.svg'></img>
					</button>
				</div>	
			</div>

		)
	}

}

// Notification Component

class Notification extends React.Component{

	constructor(props){
		super (props);
		this.state = {
			notifs:[],
			isLoading:true,
			isError:false
		}
		this.notif_switch = this.notif_switch.bind(this);
		this.deleteAllNotifs = this.deleteAllNotifs.bind(this);
	}

	componentDidMount(){

		fetch('http://127.0.0.1:5000/api/get_notif',{
		
			method:'POST',
			mode:'cors',
			cache:'no-cache',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({
				username:"hemsa",
			})
		
		})
      	.then(
	        (result) => result.json()
        )
        .then( (data) => {

    		this.setState({
    			isLoading:false,
				notifs:data['notifs']
			});	

        	},

        	(error) => {

        		this.setState({
        			isLoading:false,
        			isError:true
        		});

        	}	

        );

	}


	notif_switch(e){

		console.log(e)

		// this will deny and further fetch request to server,
		// instead save current notif cache for future use
		chrome.storage.sync.set({
			'allow_notif':true,
			'notif_cache':this.state.notifs
		});

	}

	sendDeleteRequest(){

		this.setState({
			isLoading:true,
		});	

		fetch('http://127.0.0.1:5000/api/delete_notifs',{
		
			method:'POST',
			mode:'cors',
			cache:'no-cache',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({
				username:"hemsa",
			})
		
		})
      	.then(
	        (result) => result.json()
        )
        .then( (data) => {

    		this.setState({
    			isLoading:false,
			});	

        	},

        	(error) => {

        		this.setState({
        			isLoading:false,
        			isError:true
        		});

        	}	

        );

	}

	deleteAllNotifs(){

		// delete state and cache
		this.setState({
			notif : []
		})

		chrome.storage.sync.set({
			"notif_cache":[]
		})

		sendDeleteRequest();

	}

	render(){

		const notif_list = this.state.notifs;
		if( notif_list!=[] ){
			notif_blocks = notif_list.map( (each_notif)=>(
				<NotifBlock
				c_id={each_notif.c_id} text={each_notif.c_text} vote={each_notif.c_vote}
				url={each_notif.c_url}
				type={each_notif.m_type} isRead={each_notif.m_read} />

			) );
		}	

		return(

			<div>
				<div>

				</div>
				
				{ notif_list!=[] && notif_blocks}
				{( this.state.isLoading ? <ShowLoading page_num={1} /> : 
					( this.state.isError ? <ShowError /> :
					( comments==[] && <ShowNothingToShow page_num={1} /> )) 
				)}

			</div>

		);
	}

}


class NotifTopOptions extends React.Component{
	
	constructor( props ){
		super( props )
	}

	render(){
		return (

		<div className="notif-setting-bar">
			
			<div>
				<button className>
					delete all
				</button>	
			</div>

			<div>	
				<div>
					Turn off notifs
				</div>
				<div className="notif-switch">
					<label className="cd-switch">
						<input checked={this.props.isNotifAllowed}
						 onChange={this.props.notifSwitchCallback} type="checkbox"></input>
						<span></span>
					</label>
				</div>	
			</div>
				
		</div>

		)
	}
}



class NotifBlock extends React.Component{
	constructor(props){
		super(props)
	}

	getNotifMsg(type){
		// Type 0 : Mention
		// Type 1 : Liked
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
		notif_msg = this.getNotifMsg( notif_type );

		return(

		<div>

			<div className="notif-info-bar">
				{notif_msg}
			</div>

			<div className="comment-outer">
				
				<div className="comment-inner">
					{/* This `VoteBlock` is same for 'Comments' */}
					<VoteBlock c_id={this.props.c_id}  vote={this.props.vote} />

					<div className="text-section">

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


// Comment Writing Component
class Write extends React.Component{

	constructor(props){
		super (props);
	}	

	render(){

		return (

			<div>

				<div className="switch-write-url">
					<div>
						Switch to Parent
					</div>
					<div className="switch-url-div">
						<label className="cd-switch">
							<input checked={this.props.isParentChecked}
							 onChange={this.props.switchCallback} type="checkbox"></input>
							<span></span>
						</label>
					</div>	
				</div>

				<div>
					<input readonly className='write-url-show'
						value={this.props.url}
					></input>
				</div>

				<WriteArea url={this.props.url}/>
			</div>	
		);
	}


}


class WriteArea extends React.Component{

	constructor(props){
		super (props);
		this.char_limit = 140;
		
		this.state = {
			input:'',
			progress:"0%",
			bar_color:'green'
		}

		this.handleInput = this.handleInput.bind(this);
		this.setSavedState = this.setSavedState.bind(this);


	}

	setSavedState(data){
		this.setState({
			input:data.saved_comment
		}); 	
	}

	componentDidMount(){
		
		chrome.storage.sync.get("saved_comment",this.setSavedState);	

	}

	handleInput(e){

		input = e.target.value;
		curr_percent = ( input.length/ this.char_limit )*100;
		percent = Math.min( 100 , curr_percent );

		if(percent>=100){
			color = 'red';
		}else{
			color = 'green';
		}	

		this.setState({
			input : input,
			percent: percent.toString()+"%",
			bar_color:color
		});

		chrome.storage.sync.set({
			'saved_comment':input
		});

	}

	render(){
		return(

			<div className="write-div">

				<div className="write-div-inner">
					<div className="progress-bar">
						<div style={{width:this.state.percent,backgroundColor:this.state.bar_color}}
						 className="progress-bar-inner"></div>
					</div>
					
					<textarea value={this.state.input} onInput={this.handleInput}
					 placeholder="Write Comment here ..." class="write-area">
					</textarea>
				</div>

				<SubmitBtn comment={this.state.input} url={this.props.url} />

			</div>


		);
	}

}

class SubmitBtn extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			btnActive : true,
			errorCode : -1
		}	
		
		this.submitComment = this.submitComment.bind(this);
		this.setFlashTimeout = this.setFlashTimeout.bind(this);

	}
	
	submitComment(){

		if(!this.state.btnActive || (this.props.comment).length<1){
			return
		}else{

			this.setState({
				btnActive:false
			});
	
		}

		
		fetch('http://127.0.0.1:5000/api/add_comment',{
			method:'POST',
			mode:'cors',
			cache:'no-cache',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({
				username:"hemsa",
				comment:this.props.comment,
				url:this.props.url
			})
		}).then( resp => {

			this.setState({
				btnActive:true,
				errorCode:0
			});

			},

			(error) => {

				this.setState({
					btnActive:true,
					errorCode:1
				});
			}

		);

	}

	setFlashTimeout(){

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

				<div className="flex-center">
					{!this.state.btnActive && <div className="spinner"></div>}
				</div>

			</div>

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

class App extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			page:"2"
		}
		this.handlePanel = this.handlePanel.bind(this);
	}

	handlePanel(e){
		page_num = e.target.parentNode.getAttribute("index");
		this.setState({ 
			page:page_num
		});
	}

	render(){

		return(
			<div className='main'>		
				<Nav clickHandle={this.handlePanel} />
				<Content page={this.state.page} />
			</div>
		);	
	}

}

class UserEnterPage extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="userfull flex-center">
				<div>
					<div>
						Enter new Username
					</div>
					<div>
						<input type="text" className="username-input">
						</input>
					</div>		
					<div>
						<button className="username-submit">
							Lets start !
						</button>
					</div>
				</div>
			</div>
		)
	}

}


ReactDOM.render(<App />, document.getElementById('root'));























