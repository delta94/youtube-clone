import axios from 'axios';

const fetchUser = () =>
    (dispatch) => axios.get('/api/current_user').then((res) => dispatch({ type: 'FETCH_USER', payload: res.data }));

const fetchSubscribedChannels = () => {
     
    return (dispatch) => axios.get('/api/subscribedChannels').then((res) => { });
}

export { fetchUser, fetchSubscribedChannels };