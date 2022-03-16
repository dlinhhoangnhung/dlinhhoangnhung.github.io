import React, { Component, useEffect } from "react";
import SideBar from '../../SideBar'
//import CarouseBar from '../CarouseBar'
import Navbar from '../navbar.component'
import { getProducts as listProducts } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from 'react-redux'
import SlideView from '../SlideView'

const HomeScreen = () => {
  const index = useSelector(state => state.getIndex.index)
  console.log(index)
  const dispatch = useDispatch();
  const getProducts = useSelector(state => state.getProducts)
  const { products, loading, error } = getProducts

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <SlideView class="overscroll-none" index={index}/>
    // <CarouseBar/>frsg
  )
}

export default HomeScreen
