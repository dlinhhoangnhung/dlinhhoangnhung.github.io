import React, { Component } from 'react'
import "../../App.css"
import { SidebarItem } from "./sidebar-item.component"

export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <ul className="my-sidebar-list">
                    {SidebarItem.map((val, key) => {
                        return (
                            <li key={key} id={window.location.pathname == val.link ? "active" : ""} className="my-sidebar-item" onClick={() => {window.location.pathname = val.link}}>
                                <div id="icon" >{val.icon}</div>
                                <div id="title">{val.title}</div>
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
        )
    }
}