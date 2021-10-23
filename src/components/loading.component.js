import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BabelLoading } from 'react-loadingg';
import { HeartBoomLoading } from 'react-loadingg';
import { EatLoading } from 'react-loadingg';
import LinearProgress from '@material-ui/core/LinearProgress';

export default class Loading extends Component {
    render() {
        return(
            <div className="loader">
                {/* <div className="loader--dot">Loading..</div> */}
                <LinearProgress/>
             
            </div>
        )
    }
}