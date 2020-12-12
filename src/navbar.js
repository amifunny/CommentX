import {Content} from './content.js';

// Navigation bar at top of 'App'
class Nav extends React.Component{
	
	constructor(props){
		super (props);
		this.state = {
			// default is index "2" 
			// which is 'Write' Tab
			page:"2"
		}
		this.handlePanel = this.handlePanel.bind(this);
	}


	handlePanel(e){
		// Callback when any of the tabs in "btn-panel is clicked"
		let page_num = e.target.parentNode.getAttribute("index");
		this.setState({ 
			page:page_num
		});
	}

	render(){
		return(

			<div>
				<div className='btn-panel'>

					<div index="0" onClick={this.handlePanel} className="btn">
						<div className="inner-btn">
							<img src='icons/feed.svg' ></img>
						</div>	
					</div>
					<div index="1" onClick={this.handlePanel} className="btn">
						<div className="inner-btn">
							<img src='icons/notif.svg' ></img>
						</div>	
					</div>
					<div index="2" onClick={this.handlePanel} className="btn">
						<div className="inner-btn">
							<img src='icons/write.svg' ></img>
						</div>	
					</div>

				</div>

				{/* Render Content based on current 'page' state*/}
				<Content page={this.state.page} />

			</div>	

		);
	}

}

export {Nav};