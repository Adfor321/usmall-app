import React, { Component } from 'react'
import {Route,Redirect} from 'react-router-dom'

import qs from 'qs'
export default class DefRoute extends Component {
    render() {
        const login = qs.parse(sessionStorage.getItem('user')).uid
        return (
            <div>
                {
                    login?<Route {...this.props}></Route>:<Redirect to='/login'></Redirect>
                }
            </div>
        )
    }
}
