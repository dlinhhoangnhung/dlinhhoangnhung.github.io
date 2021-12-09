import React from 'react'

export const Search = ({isInput, catchInputSearch}) => {

    return (
        <div className="w-44">
            <input
                className={`${isInput === 1 ? '' : 'hidden'} `}
                type="text"
                placeholder="search here"
                onChange={event => { catchInputSearch(event.target.value) }}
            />
            <svg onClick={() => console.log(1)} xmlns="http://www.w3.org/2000/svg" className={` h-7 w-7 stroke-current stroke-2 ${isInput === 1 ? 'hidden' : ''} `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    )
}
