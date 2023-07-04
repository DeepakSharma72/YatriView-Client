import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../ContextAPI/SearchContext';
import axios from 'axios';
import PostCard from '../Components/PostCard';
import { BASEURL } from '../Utility/Config';

export default function Search() {
    const { searchItem, searchStatus, setSearchStatus } = useContext(SearchContext);
    const [BlogArr, setBlogArr] = useState([]);
    useEffect(() => {
        if (searchItem === '') {
            setSearchStatus(false);
        }   
    }, [searchItem])
    useEffect(() => {
        if (searchStatus === false) {
            return;
        }
        const fetchSearchedItem = async () => {
            try {
                const response = await axios.get(BASEURL + '/search/' + searchItem);
                setBlogArr(response.data.data);
                // console.log("searched result: ", response.data.data);
            }
            catch (err) {
                console.log('error in searching');
            }
        }
        fetchSearchedItem();
    }, [searchStatus]);

    if (BlogArr.length === 0) {
        <h1>No search item found</h1>
    }

    return (
        <>
            <div className="my-4 text-center">
                {
                    searchStatus
                        ?
                        <h4 className="authors-post-heading">Search Result for {searchItem}</h4>
                        :
                        <h4 className="authors-post-heading">Please Search Item</h4>
                }
            </div>
            <div className="row album-section text-center p-3">
                {
                    BlogArr.map((obj) => <PostCard key={obj.Title} blog={obj}></PostCard>)
                }
            </div>
        </>
    )
}
