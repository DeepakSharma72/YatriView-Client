import React, { useContext, useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SnackBarContext } from '../ContextAPI/SnackBar';
import { BASEURL } from "../Utility/Config";

function RatingSystem({ postid }) {
    const { ActiveSnackBar } = useContext(SnackBarContext);
    let initialArr = [{ over: false, color: 'black' }, { over: false, color: 'black' }, { over: false, color: 'black' }, { over: false, color: 'black' }, { over: false, color: 'black' }];
    const [stararr, setStarArray] = useState(initialArr);
    const [submitted, setSubmit] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchRating() {
            try {
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('yatriToken')
                    }
                }
                const res = await axios.get(BASEURL + `/getRating/?postid=${postid}`, config);
                // console.log('rating response: ', res);
                if (res.data.success) {
                    if (!res.data.rating) {
                        setSubmit(false);
                    }
                    else {
                        let tempArr = [];
                        for (let i = 0; i < 5; i++) {
                            if (i < res.data.rating) {
                                tempArr.push({ over: true, color: 'gold' });
                            }
                            else {
                                tempArr.push({ over: false, color: 'black' });
                            }
                        }
                        setStarArray(tempArr);
                    }
                }
            }
            catch(err){
            }
        }
        fetchRating();
    }, [navigate, submitted,  postid])



    function MouseOverFunc(idx) {
        if (submitted) {
            return;
        }
        let tempArr = [...stararr];
        for (let i = 0; i < 5; i++) {
            tempArr[i].color = (i < idx ? 'gold' : 'black');
            tempArr[i].over = (i < idx ? true : false);
        }
        setStarArray(tempArr);
    }

    async function submitRating() {
        try {
            if (submitted) {
                return;
            }
            if (stararr[0].over === false) {
                ActiveSnackBar('Please give rating before submitting', 'error');
                return;
            }
            let value = 0;
            while (value < 5 && stararr[value].over) {
                value++;
            }
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('yatriToken')
                }
            }
            const res = await axios.post(BASEURL + '/ratepost', { ratingValue: value, postid: postid }, config);

            if(res.data.success)
            {
                ActiveSnackBar(res.data.ServerMsg, 'success');
            }
            else
            {
                ActiveSnackBar(res.data.ServerMsg, 'error');
                return;
            }
            // console.log( 'rated the blog: ',res);
            setSubmit(true);
        }
        catch (err) {
            ActiveSnackBar('Unknown Error', 'error');
        }

    }

    return (
        <>
            <span>How would you rate this blog?</span>
            <br></br>
            <div style={submitted ? { cursor: "auto" } : { cursor: 'pointer' }} className="rating-stars">
                <span style={{ color: stararr[0].color }} onMouseOver={() => MouseOverFunc(1)}><StarIcon /></span>
                <span style={{ color: stararr[1].color }} onMouseOver={() => MouseOverFunc(2)}><StarIcon /></span>
                <span style={{ color: stararr[2].color }} onMouseOver={() => MouseOverFunc(3)}><StarIcon /></span>
                <span style={{ color: stararr[3].color }} onMouseOver={() => MouseOverFunc(4)}><StarIcon /></span>
                <span style={{ color: stararr[4].color }} onMouseOver={() => MouseOverFunc(5)}><StarIcon /></span>
            </div>

            <button onClick={submitRating} className= {submitted?"rating-sub-btn-disabled":"rating-sub-btn"}>
                Submit
            </button>
        </>
    )
}

export default RatingSystem;