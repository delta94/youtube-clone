import './PublishForm.css';
import React, { Component } from 'react';

class PublishForm extends Component {
    renderContent() {
        if (this.props.isLoading) {
            return <div className="loader-container"><div className="loader" /></div>;
        } else {
            console.log(this.props.imageUrl);
            return <img src={"/images/" + this.props.imageUrl} style={{ borderRadius: 3, boxShadow: "0 8px 6px -6px black", width: "100%", height: "auto"}}/>;
        } 
    }

    render() {
        return (
            <div className="main">

                <div className="col-sm-2 thumbnail-container">
 
                        {this.renderContent()}
  
                    {this.props.isLoading && <p>Uploading your video...</p>}
                    {!this.props.isLoading && <p>Your video url: <a style={{ color: "#3498db" }}>domain.com/123</a></p>}
                </div>    
                <div className="col-sm-6">    
                    <div style={{ paddingLeft: 10 }} className="btn-container">
                        
                        <button
                            onClick={this.props.handlePublishButtonOnClick} className="btn btn-primary" id="publish-btn"><i style={{ fontSize: "16px" }} className="ion-earth"
                            />&ensp;Save</button>

                        <button className="btn btn-primary" id="cancel-btn"
                            onClick={this.props.handleCancelButtonOnClick}
                        ><i className="ion-close-round" style={{ fontSize: "15px" }}/>&ensp;Cancel</button>

                    </div>
                    <br />

                    <div id="upload-form">
                        <form >

                            <div className="form-group">
                                <label for="formGroupExampleInput">Video name</label>
                                <input type="text"  className="form-control" id="formGroupExampleInput" onChange={this.props.handleVideoNameOnChange} />
                            </div>
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">Description</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.props.handleDesciptionOnChange}></textarea>
                            </div>
                            <div className="form-group">
                                <label for="inputState">State</label>
                                <select id="inputState" className="form-control" onChange={this.props.handleStateOnChange}>
                                    <option selected>Public</option>
                                    <option>Private</option>
                                    <option>Protected</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">Tag</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" onChange={this.props.handleTagOnChange}/>
                            </div>
                        </form>
                        </div>
                    </div>    
            </div>    
        );
    }
}

export default PublishForm;
