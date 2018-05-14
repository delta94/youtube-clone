import React, { Component } from 'react';

class Clock extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            str: this.calculateDiff()
        }

        this.calculateDiff = this.calculateDiff.bind(this); 
        this.calculateDiffAndSetState = this.calculateDiffAndSetState.bind(this);
    }

    componentDidMount() {
        setInterval(this.calculateDiffAndSetState, 30*1000);
    }

    calculateDiff() {
        let now = new Date();
         
        let diff = parseInt((now - new Date(this.props.date)) / (60 * 1000));
        let str = '';
         
        if (diff < 1) str = 'Just now';
        else if (diff < 2) str = 'A minute ago';
        else if (diff < 60) str = parseInt(diff) + ' minutes ago';
        else if (diff < 120) str = 'A hour ago';
        else if (diff < 24 * 60) str = parseInt(diff / 60) + ' hours ago';
        else if (diff < 2 * 24 * 60) str = 'Yesterday';
        else if (diff < 30 * 24 * 60) str = parseInt(diff / (24 * 60)) + ' days ago';
        else if (diff < 2 * 30 * 24 * 60) str = 'A month ago';
        else if (diff < 12 * 30 * 24 * 60) str = parseInt(diff / (30 * 24 * 60)) + ' months ago';
        else str = this.props.date;
        return str;
    }

    calculateDiffAndSetState() {
        let now = new Date();
         
        let diff = (now - new Date(this.props.date))/(60*1000);
        let str = '';
         
        if (diff < 1) str = 'Just now';
        else if (diff < 2) str = 'A minute ago';
        else if (diff < 60) str = parseInt(diff) + ' minutes ago';
        else if (diff < 120) str = 'A hour ago';
        else if (diff < 24 * 60) str = parseInt(diff / 60) + ' hours ago';
        else if (diff < 2 * 24 * 60) str = 'Yesterday';
        else if (diff < 30 * 24 * 60) str = parseInt(diff / (24 * 60)) + ' days ago';
        else if (diff < 2 * 30 * 24 * 60) str = 'A month ago';
        else if (diff < 12 * 30 * 24 * 60) str = parseInt(diff / (30 * 24 * 60)) + ' months ago';
        else str = this.props.date;
        this.setState({ str });
    }

    render() {
        return (
            <span>
                {this.state.str}
            </span>
        );
    }
}

export default Clock;
