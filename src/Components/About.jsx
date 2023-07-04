import React from 'react'
import '../Style/about.css';

function AboutYatriView() {
    return (
        <div className='row'>
            <div className='col-11 mx-auto py-5'>
                <h2 className='text-center about-sub-heading'>
                    <div className='heading-icon'>
                        <i class="bi bi-pie-chart"></i>
                    </div>
                    <span className='mx-2'>About YatriView</span>
                    <div className='heading-icon'>
                        <i class="bi bi-pie-chart"></i>
                    </div>
                </h2>
                <div className='row'>
                    <div className='col-12 col-lg-6 about-img'>
                        <img className='img-fluid' src='./assets/travelmap.png'></img>
                    </div>
                    <div className='col-12 col-lg-6 about-para'>
                        <p>
                            Welcome to YatriView, your ultimate travel companion, designed to ignite your wanderlust and feed your curiosity about the world. At YatriView, we believe that travel is a transformative experience that enriches our lives in countless ways. Our platform is a vibrant community of globetrotters, storytellers, and culture seekers who come together to share their remarkable travel journeys and insights.

                            With YatriView, you can explore a vast array of destinations and immerse yourself in the diverse tapestry of global cultures. Our passionate travelers provide firsthand accounts, tips, and recommendations that will inspire your next adventure and help you make the most of every moment. Whether you're a seasoned explorer or a novice dreaming of distant lands, our platform caters to all levels of wanderlust.

                            Join the YatriView community to connect with fellow travel enthusiasts, exchange ideas, and find answers to your burning travel questions. From awe-inspiring natural wonders to bustling cities teeming with history, YatriView is your go-to resource for uncovering hidden gems and discovering the world's most captivating places.

                            Embark on a virtual journey with YatriView and let the spirit of adventure ignite your soul. Get ready to explore, learn, and share the beauty of our planet through the eyes of passionate travelers just like you.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function AboutDeveloper() {
    return (
        <div className='row'>
            <div className='col-11 mx-auto py-5'>
                <h2 className='text-center about-sub-heading'>
                    <div className='heading-icon'>
                        <i class="bi bi-pie-chart"></i>
                    </div>
                    <span className='mx-2'>About Me</span>
                    <div className='heading-icon'>
                        <i class="bi bi-pie-chart"></i>
                    </div>
                </h2>
                <div className='row'>
                    <div className='col-12 col-lg-6 about-img order-1 order-md-2 text-center'>
                        <img width='60%' className='developer-photo' src='./assets/profilePic.jpeg'></img>
                    </div>
                    <div className='col-12 col-lg-6 about-para order-2 order-md-1'>
                        <p>
                            <strong>Deepak Sharma</strong> is a highly skilled and driven final year Computer Science Engineering student at National Institute of Technology, Delhi. With a passion for web development and expertise in the <strong>MERN</strong> (MongoDB, Express.js, React.js, Node.js) stack, Deepak is the talented developer behind YatriView, a travel blogging website he meticulously built from scratch. From designing captivating user interfaces to developing robust backend systems and integrating databases, Deepak's dedication and proficiency shine through every aspect of YatriView. His ability to seamlessly translate ideas into functional and aesthetically pleasing websites is evident in his previous project, <strong><a href='https://mathpirates.netlify.app/' target='_space'>Math ∏rates</a></strong>, a comprehensive platform for numerical methods. Deepak's commitment to excellence and his ability to deliver exceptional results make him a valuable asset to any development team.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function About() {
    return (
        <>
            <AboutYatriView />
            <hr></hr>
            <AboutDeveloper />
        </>
    )
}
