import React, { Component, useState, useEffect } from "react"
import searchstore from '../assets/figma-img/search-store.svg'
import search from '../assets/figma-img/search.svg'
import searchpack from '../assets/figma-img/search-pack.svg'
import search1 from '../assets/figma-img/Group 1.png'

import { getProducts as listProducts } from "../redux/actions/productAction"
import { useDispatch, useSelector } from 'react-redux'

const FilterByCate = ({id} ) => {
    const dispatch = useDispatch();
    const getProducts = useSelector(state => state.getProducts)
    const { products, loading, error } = getProducts

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);



    return (
        <div className="search-bar">
            <div className="search-sub">
                {/* <input
          className="search-input"
          type="text"
          placeholder="search here"
          src={searchstore}
          onChange={event => { setSearchTerm(event.target.value) }}
        /> */}
                {
                    <div className="">
                        {
                            id && products.filter((val) => {
                                if (id == "") {
                                    return val
                                } else if (val.cateid.toLowerCase().includes(id.toLowerCase())) {
                                    return val
                                }
                            }).map((value) => {
                                return <div className="">
                                    <img className=" w-72 h-64 rounded-sm bg-gray-500" src={`http://localhost:3003/assets/imgs/products/${value.thumbnail[0]}`} />
                                    {value.name}
                                </div>
                            }
                            )
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default FilterByCate
