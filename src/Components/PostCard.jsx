import React from "react";
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link } from "react-router-dom";
import DateFormat from "../Utility/DateFormat";


function PostCard({ blog }) {
    // console.log('kuch abhi rha ya nhi', blog);
    // console.log(blog);
    let blogDate = new Date(blog.date); 
    blogDate = DateFormat(blogDate);
    const posturl = '/posts/' + blog._id;
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="row album-inner-section">
                <div className="col-12 col-sm-11 mx-auto post-card" style={{height: '480px'}}>
                    <img src={blog.BlogImage}></img>
                    <div className="post-card-content">
                        <h5>
                            {blog.Title}
                        </h5>
                        <div className="content-highlighter">
                            <div>
                                {Math.round(blog.Rating)} <span><StarIcon /></span>
                            </div>
                            <div>
                                {blog.Views} <span><VisibilityIcon /></span>
                            </div>
                            <div>
                                {blogDate} <span><CalendarMonthIcon /></span>
                            </div>
                        </div>
                        <p>
                            {blog.Content}
                        </p>

                        <div className="read-post-btn">
                            <Link to={posturl}><button>Read More</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PostCard;