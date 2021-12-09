import { Component } from "react";


export default class Filter extends Component{
    getDefaultProps() {
        return {
            filterList: [],
            name: '',
            id: '',
            props: []
        };
    }

    render() {
        return (
            <div id={this.props.id} className="filterCloud quarter-section">
                <h3>{this.props.name}</h3>
                <ul>
                    {this.props.filterList.map(function (listValue, i) {
                        return <li onClick={() => this.props.onClick(listValue)} key={i}> {listValue} </li>;
                    }.bind(this))}
                </ul>
            </div>
        )
    }
};