function ShowNothingToShow(props) {
  // return JSX for with appropriate message
  // on appropriate page
  // For Comments Page
  if (props.page_num == 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "display-msg"
    }, /*#__PURE__*/React.createElement("div", null, "No Comments on this URL!"), /*#__PURE__*/React.createElement("div", null, "Be the first to comment!"));
  } else {
    // For Notification Page
    return /*#__PURE__*/React.createElement("div", {
      className: "display-msg"
    }, /*#__PURE__*/React.createElement("div", null, "No Notifactions Yet!"), /*#__PURE__*/React.createElement("div", null, "Comment to get mentions and votes."));
  }
}

function ShowLoading(props) {
  // Return JSX for loading spinner
  return /*#__PURE__*/React.createElement("div", {
    className: "flex-center loading-container"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex-center spinner-outer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "spinner"
  })), props.page_num == 0 ? /*#__PURE__*/React.createElement("div", {
    className: "display-msg"
  }, "Fetching Comments") : /*#__PURE__*/React.createElement("div", {
    className: "display-msg"
  }, "Fetching Notifications")));
}

function ShowError(props) {
  // Return Error appropriate Message
  return /*#__PURE__*/React.createElement("div", {
    className: "flex-center loading-container"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex-center spinner-outer"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "icons/internet_error.svg"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "display-msg"
  }, /*#__PURE__*/React.createElement("div", null, "Something went wrong!"), /*#__PURE__*/React.createElement("div", null, "Check your connection & try again."))));
}

export { ShowNothingToShow };
export { ShowLoading };
export { ShowError };