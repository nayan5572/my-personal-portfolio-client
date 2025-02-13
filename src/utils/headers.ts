export const getAccessToken = () => {
    return localStorage.getItem('accessToken') || '';
};

export const headers = () => {
    const token = getAccessToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};
