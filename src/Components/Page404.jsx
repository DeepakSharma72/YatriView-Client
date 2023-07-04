import React from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
    return (
        <div className='row'>
            <div className='col-11 col-md-10 col-lg-8 col-xl-6 text-center mx-auto my-3'>
                <h3>Page not found</h3>
                <img className='img-fluid' src='/assets/404.png' alt='404 page icon' width='100%'>
                </img>
                <Link to = '/'>
                    <button className='px-4 py-2 mb-3' style={{ color: 'white', fontWeight: 'bold', backgroundColor: 'goldenrod', border: 'none', boxShadow: '2px 2px 3px #00000054', borderRadius: '8px' }}>
                        Back to Home page
                    </button>
                </Link>
            </div>
        </div>
    )
}
