import React, { Component } from 'react'

export default class Spinner extends Component {
    render() {
        return (
            <div class="flex justify-center items-center h-full ">
                <div style={{borderTopColor:'transparent'}}
                    class="w-7 h-7 border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
            </div>
        )
    }
}