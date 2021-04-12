import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import App from '../App'
import "../App.css"

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand nav-bar" href="/">Guccdesis</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
                        <Link className="nav-item nav-link" to="">Shopping</Link>
                        <Link className="nav-item nav-link" to="">Shipping</Link>
                        <Link className="nav-item nav-link" to="">Cart</Link>
                        <Link className="right-side nav-item nav-link" to="/register">Sign Up</Link>
                    </div>
                </div>
            </nav>
        )
    }
}