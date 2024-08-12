let currentUser;

const getAuthenticatedUser = () => currentUser;


const setAuthenticatedUser = (authenticatedUser) => {
    currentUser = authenticatedUser;
}

const isAuthentificated = () => currentUser !== undefined;


const clearAuthenticatedUser = () => {
    currentUser = undefined;
}

const isAdmin = () => currentUser?.username === 'admin';

export { getAuthenticatedUser, setAuthenticatedUser, isAuthentificated, clearAuthenticatedUser, isAdmin};