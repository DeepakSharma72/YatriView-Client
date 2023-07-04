import React, { createContext, useState } from 'react'


export const SearchContext = createContext();

export function SearchContextProvider(props) {

    const [searchItem, setSearchItem] = useState('');
    const [searchStatus, setSearchStatus] = useState(false);

    function updateSearchField(val) {
        setSearchItem(val);
    }

    function clearSearchField() {
        setSearchItem('');
        setSearchStatus(false);
    }

    return (
        <SearchContext.Provider value={{ searchItem, updateSearchField, clearSearchField, searchStatus, setSearchStatus }}>
            {props.children}
        </SearchContext.Provider>
    )
}
