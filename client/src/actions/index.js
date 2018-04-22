import axios from 'axios';

const fetchUser = () =>
    (dispatch) => axios.get('/api/current_user').then((res) => dispatch({ type: 'FETCH_USER', payload: res.data }));

export { fetchUser };