import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import React, { Component, useState } from 'react'
import Navbar from "./navbar.component"

export default class Warning extends Component {
    render() {
        return (
                <h1>
                    Hmmm, you do not have permission to access this route :P :P
                </h1>
        )

    }
}