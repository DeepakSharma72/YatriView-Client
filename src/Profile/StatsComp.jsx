import React, { useEffect, useState } from 'react';
import '../Style/stats.css';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BookIcon from '@mui/icons-material/Book';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../Utility/Config';

function StatsComp() {
  const navigate = useNavigate();
  const [statsObj, setStatsObj] = useState(-1);
  useEffect(() => {
    const fetchStats = async () => {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('yatriToken')
        }
      }
      const res = await axios.get(BASEURL + '/getblogstats', config);
      console.log('stats data: ', res.data.data);
      setStatsObj(res.data.data);
    }
    fetchStats();
  }, [navigate]);

  function getReadTimeString(val)
  {
      let ans = '';
      if(val >= 60)
      {
        ans += `${Math.floor(val/60)}Hrs `
      }
      if(val === 0 || val%60 !== 0)
      {
        ans += `${val%60}Min`
      }
      return ans;
  }

  if (statsObj === -1) {
    return (
      <>
        <div className="row">
          <div className="col-11 col-md-9 col-lg-6 mx-auto text-center my-4 loading-section">
            <span>loading.....</span>
            <br></br>
            <img height={150} src='/assets/loading.gif' alt='loading gif' />
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='row'>
      <div className='col-md-8 col-12 mx-auto mt-md-5 mt-3'>
        <div className='row'>
          <div className='col-sm-6 col-11'>
            <div className='stat-item' id='stat-box-1'>
              <span>Views &nbsp; <RemoveRedEyeIcon fontSize='large' /></span>
              <span>{statsObj.views}+</span>
            </div>
          </div>
          <div className='col-sm-6 col-11'>
            <div className='stat-item' id='stat-box-2'>
              <span>Posts &nbsp; <BookIcon fontSize='large' /></span>
              <span>{statsObj.posts}+</span>
            </div>
          </div>
          <div className='col-sm-6 col-11'>
            <div className='stat-item' id='stat-box-3'>
              <span>Rating &nbsp; <StarIcon fontSize='large' /></span>
              <span>{statsObj.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className='col-sm-6 col-11'>
            <div className='stat-item' id='stat-box-4'>
              <span>Read Time &nbsp; <AccessTimeFilledIcon fontSize='large' /></span>
              <span>{getReadTimeString(statsObj.readTime)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsComp;
