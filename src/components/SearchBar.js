import React, { Component, useState, useEffect } from "react"
import searchstore from '../assets/figma-img/search-store.svg'
import search from '../assets/figma-img/search.svg'
import searchpack from '../assets/figma-img/search-pack.svg'
import search1 from '../assets/figma-img/Group 1.png'

import { getProducts as listProducts } from "../redux/actions/productAction"
import { useDispatch, useSelector } from 'react-redux'

const SearchBar = () => {
  const dispatch = useDispatch();
  const getProducts = useSelector(state => state.getProducts)
  const { products, loading, error } = getProducts

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');



  return (
    <div className="search-bar">
      <div className="search-sub">
        <input
          className="search-input"
          type="text"
          placeholder="search here"
          src={searchstore}
          onChange={event => { setSearchTerm(event.target.value) }}
        />
        {
          <div className="">
            {
              searchTerm && products.filter((val) => {
                if (searchTerm == "") {
                  return val
                } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val
                }
              }).map((value) => {
                return <a key={value._id}
                  href={`/items/${value.name}-${value._id}`}
                >
                  <p>{value.name}</p>
                </a>
              }
              )
            }
          </div>
        }
      </div>
    </div>
  )
}

export default SearchBar
