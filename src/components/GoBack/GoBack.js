import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
class GoBack extends Component {
    goback(){
        this.props.history.goBack()
    }
    render() {
        return (
            <div className='goback' onClick={this.goback.bind(this)}>
                返回
            </div>
        )
    }
}
export default withRouter(GoBack)