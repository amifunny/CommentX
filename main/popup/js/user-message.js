function ShowNothingToShow(props) {

	// return JSX for with appropriate message
	// on appropriate page

	// For Comments Page
	if (props.page_num == 0) {
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
	} else {
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
	// Return JSX for loading spinner
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
	// Return Error appropriate Message
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

export { ShowNothingToShow };
export { ShowLoading };
export { ShowError };