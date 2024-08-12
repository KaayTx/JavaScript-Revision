let currentUser;

const STORE_NAME = 'user';

const getAuthenticatedUser = () => {
    if(currentUser !== undefined) return currentUser;

    const serializedUser = localStorage.getItem(STORE_NAME);
    if(!serializedUser) return undefined;

    currentUser = JSON.parse(serializedUser);
    return currentUser;
};


const setAuthenticatedUser = (authenticatedUser) => {
    localStorage.setItem(STORE_NAME, JSON.stringify(authenticatedUser));
    currentUser = authenticatedUser;
}

const isAuthentificated = () => currentUser !== undefined;


const clearAuthenticatedUser = () => {
    localStorage.removeItem(STORE_NAME);
    currentUser = undefined;
}

const isAdmin = () => currentUser?.username === 'admin';

export { getAuthenticatedUser, setAuthenticatedUser, isAuthentificated, clearAuthenticatedUser, isAdmin};