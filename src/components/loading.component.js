import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BabelLoading } from 'react-loadingg';
import { HeartBoomLoading } from 'react-loadingg';
import { EatLoading } from 'react-loadingg';

export default class Loading extends Component {
    render() {
        return (
            <div class="h-screen flex justify-center items-center">
                <div
                    class="
                        animate-spin
                        rounded-full
                        h-32
                        w-32
                        border-t-2 border-b-2 border-purple-500
                        "
                ></div>
            </div>
        )
    }
}