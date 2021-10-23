import React, { useState, useEffect } from 'react'
import searchstore from '../assets/figma-img/search-store.svg'
import search from '../assets/figma-img/search.svg'
import searchpack from '../assets/figma-img/search-pack.svg'
import { useDispatch, useSelector } from 'react-redux'
import '../SearchBar.css'
import search1 from '../assets/figma-img/Group 1.png'
const SearchBar = () => {
    const getProducts = useSelector(state => state.getProducts)
    const { products } = getProducts

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = products.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };


    return (
        <div className="search-bar">
            {/* style={{ paddingTop: '65px', paddingLeft: '70px', width: '90px', margin: 0, paddingRight: '0.1px' }} */}
            {/* style={{  paddingLeft: '80px', paddingBottom: '100px'}} */}
            <img className="search-label" src={search} />

            {/* {filteredData.length === 0 ? (
                    <img className="search-icon" src={search} />
                ) : (
                    null
                )} */}
            <div className="search-sub">
                <input
                    className="search-input"
                    type="text"
                    placeholder="search here"
                    src={searchstore}
                    onChange={handleFilter}
                />

                {
                    filteredData != 0 &&
                    (
                        <div className="">
                            {
                                filteredData.map((value) => {
                                    return <a key={value._id}
                                        href={`/items/${value.name}-${value._id}`}
                                    >
                                        <p>{value.name}</p>
                                    </a>
                                }
                                )
                            }
                        </div>
                    )
                    // : (
                    //     <div className="">
                    //         {
                    //             products && products.map((value) => {
                    //                 return <a key={value._id}
                    //                     href={`/items/${value.name}-${value._id}`}
                    //                 >
                    //                     <p>{value.name}</p>
                    //                 </a>
                    //             }
                    //             )
                    //         }
                    //     </div> 
                    // )
                }
            </div>




        </div>

        // <div>
        //     <div className="">
        //         <div className="">
        //             <input type="text" placeholder={placeholder} onChange={handleFilter} />
        //             <a href="#" className="search-cancel">
        //                 <i className="fas fa-times"></i>
        //             </a>
        //         </div>
        //         {
        //             filteredData.slice(0, 15).length != 0 && (
        //                 <div className="dataResult">
        //                     {
        //                         products.map((value, key) => {
        //                             return <a
        //                                 className="dataItem"
        //                                 href={`/items/${value.name}-${value.product}`}
        //                                 target="_blank"
        //                             >
        //                                 <p>{value.name}</p>
        //                             </a>
        //                         }
        //                         )
        //                     }
        //                 </div>
        //             )
        //         }


        //     </div>
        // </div>
    )
}

export default SearchBar
