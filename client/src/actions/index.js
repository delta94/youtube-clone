import axios from 'axios';

const fetchUser = () =>
    (dispatch) => axios.get('/api/current_user').then((res) => dispatch({ type: 'FETCH_USER', payload: res.data }));

const fetchSubscribedChannels = () => {
    console.log('fetch new sub');
    return (dispatch) => axios.get('/api/subscribedChannels').then((res) => { console.log('dispatch', res.data); dispatch({ type: 'FETCH_SUBSCRIBED_CHANNELS', payload: res.data }) });    

}

export { fetchUser, fetchSubscribedChannels };