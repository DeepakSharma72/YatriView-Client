import React, { useContext, useEffect, useState } from "react";
import './../Style/home.css';
import './../Style/profile.css';
import PostCard from "../Components/PostCard";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SnackBarContext } from "../ContextAPI/SnackBar";

function Posts(props) {
    const { ActiveSnackBar } = useContext(SnackBarContext);
    const navigate = useNavigate();
    const [offset, setOffset] = useState(0);
    const [BlogArr, setBlogArr] = useState([]);
    useEffect(() => {
        async function fetchPosts() {
            try {
                if (offset !== -1) {
                    const config = {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('yatriToken')
                        }
                    }
                    const url = props.URL + '/' + offset;
                    const result = await axios.get(url, config);
                    const blogArr = await result.data.blogArr;
                    const newARR = [...BlogArr, ...blogArr];
                    setBlogArr([...BlogArr, ...blogArr]);
                    if (result.data.EOF) {
                        if (offset > 0)
                            ActiveSnackBar('No more Blogs available...', 'warning');
                        setOffset(-1);
                    }
                }
            }
            catch (err) {
                console.log('facing a problem in fetching authors blogs');
            }
        }
        fetchPosts();
    }, [offset, navigate]);

    if (BlogArr.length === 0) {
        return (
            <>
                <div className="row">
                    <div className="col-11 col-md-9 col-lg-6 mx-auto text-center my-4 loading-section">
                        <span>{!offset ? 'loading.....' : "you haven't posted any blogs"}</span>
                        <br></br>
                        {
                            !offset
                                ?
                                <img height={150} src='/assets/loading.gif' alt='loading gif' />
                                :
                                <div>
                                    <img className="img-fluid" height={150} src='/assets/empty_blogs.png' alt='loading gif' />
                                    <button className='write-blog-btn'>
                                        <Link to='/writepost' style={{ textDecoration: 'none', color: 'inherit' }}>write your first blog</Link>
                                    </button>
                                </div>
                        }
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>

                <div className="my-4 text-center">
                    <h4 className="authors-post-heading">Your Blogs Repository</h4>
                </div>
                <div className="row album-section text-center p-3">
                    {
                        BlogArr.map((obj) => <PostCard key={obj.Title} blog={obj}></PostCard>)
                    }
                </div>
                {
                    offset !== -1
                    &&
                    <div className="load-more-btn mb-3 text-center">
                        <input onClick={() => setOffset(offset + 1)} type='button' value='Load More...'></input>
                    </div>
                }
            </>
        )
    }
}

export default Posts;