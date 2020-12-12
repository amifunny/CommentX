// Global context to avoid "prop drilling",
// that is of passing props iteratively,
// context provide simple method to pass
// props from parent to desired child without
// intermediate components.

// This context will be used for components requiring,
// "username" of current user.
var UsernameContext = React.createContext();
export { UsernameContext };