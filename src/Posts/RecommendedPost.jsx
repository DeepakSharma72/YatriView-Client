import React, { useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from "axios";
import DateFormat from "../Utility/DateFormat";
import { BASEURL } from "../Utility/Config";
import { useNavigate } from "react-router-dom";

function RecommendedPost({ obj }) {
    return (
        <>
            <div className="post-rec-section">
                <img alt='recomended-blog' src={obj.BlogImage}></img>
                <span>
                    {obj.Title.toUpperCase()}
                    <br>
                    </br>
                    <div className="content-highlighter">
                        <div>
                            {obj.Rating} <span><StarIcon /></span>
                        </div>
                        <div>
                            {obj.Views} <span><VisibilityIcon /></span>
                        </div>
                        <div>
                            {DateFormat(obj.createdAt)} <span><CalendarMonthIcon /></span>
                        </div>
                    </div>
                </span>
            </div>
        </>
    )
}

function RecommendedPosts({ postid }) {
    const [recPosts, setRecPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchRecommendedPosts() {
            const resData = await axios.get(BASEURL + '/recommend/' + postid);
            if (resData.data.success === true) {
                console.log(resData.data.data);
                setRecPosts(resData.data.data);
            }
        }
        fetchRecommendedPosts();
    }, []);

    const handleClick = (id) => {
        const url = '/posts/' + id;
        navigate(url);
    }


    return (
        <>
            <div className="col-md-4 col-12 post-recommendation p-2">
                <h6>Blogs recommended for you</h6>
                <hr></hr>
                {
                    !recPosts.length
                        ?
                        <h4>fetching recommended post for you</h4>
                        :
                        recPosts.map((obj, idx) => {
                            return (
                                <span onClick={() => handleClick(obj._id)}>
                                    <RecommendedPost obj={obj} key={idx} />
                                </span>
                            )
                        })
                }
            </div>
        </>
    )
}


export default RecommendedPosts;