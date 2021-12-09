import React, { Component } from "react";

export default class CategoryCard extends React.Component {
    render() {
        const { data } = this.props
        return (
            <>
                {data.map((i) =>
                    <div>
                        <img className="h-12 w-12" src={i.src} />
                        <div>
                            <div className="text-center tex">
                                {i.name}
                            </div>
                        </div>
                    </div>
                )}
            </>

        )
    }
}

