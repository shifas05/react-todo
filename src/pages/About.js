import React, { Component } from 'react'

class About extends Component {
    constructor() {
        super();
        this.state = {
            pageTitle : 'About Page'
        }
    }
    componentDidMount() {
        this.setState({
            pageTitle : 'this is about'
        });
    }
    render() {
        return (
            <div>
                <h2>{this.state.pageTitle}</h2>
            </div>
        )
    }
}

export default About;