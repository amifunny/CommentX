function ShowNothingToShow(props){

	// return JSX for with appropriate message
	// on appropriate page

	// For Comments Page
	if(props.page_num==0){
		return (
			<div className="display-msg">
				<div>No Comments on this URL!</div>
				<div>Be the first to comment!</div>
			</div>
		);	
	}
	else {
		// For Notification Page
		return (
			<div className="display-msg">
				<div>No Notifactions Yet!</div>
				<div>Comment to get mentions and votes.</div>
			</div>
		);
	}
	
}

function ShowLoading(props){
	// Return JSX for loading spinner
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
	// Return Error appropriate Message
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

export {ShowNothingToShow};
export {ShowLoading};
export {ShowError};