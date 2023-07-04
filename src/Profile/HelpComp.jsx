import React from 'react'
import FAQs from './FAQs';
import './../Style/profile.css';
import { Link } from 'react-router-dom';

function HelpComp() {
  return (
    <>
      <div className='profile-help-section my-3 mx-3 p-2 mx-md-5 my-md-5 '>
        <div className='profile-help-section-header'>
          <div>
            <p><strong>The FAQ's</strong></p>
            <h2 className='my-3'>Help centre</h2>
            <p>Everything you need to know about YatriView features and functionality</p>
          </div>
        </div>

        <div className='row my-3'>
          <div className='col-12 m-0 p-0 mb-3 mb-md-5'>
            <FAQs />
          </div>
          <div>
            <button className='write-blog-btn'>
            <Link to='/writepost' style={{textDecoration: 'none', color: 'inherit'}}>Write Blog</Link>
            </button>
          </div>
        </div>
      </div>
    </>

  )
}

export default HelpComp;
