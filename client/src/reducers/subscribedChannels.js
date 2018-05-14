export default (state = null, action) => {
    switch (action.type) {
        case 'FETCH_SUBSCRIBED_CHANNELS':
            return action.payload || false;
        default:
            return state;
    }
}