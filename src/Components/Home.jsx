import React from "react";
import './../Style/home.css';
import Album from './Album';
import { BASEURL } from "../Utility/Config";

function TopSection() {
    return (
        <div className="home-top-section">
            <div className="home-top-img-section">
            </div>
            <div className="home-top-content">
                <h2>YatriView</h2>
                <hr />
                <p>
                    Welcome to YatriView, your one-stop destination for all travel experiences. Here, travelers from all around the world come together to share their unique journeys and insights, offering a diverse range of perspectives on destinations and cultures. Whether you are an avid traveler or simply a curious reader, YatriView is the perfect place to explore new places, gain inspiration for your next adventure, and connect with fellow travel enthusiasts.
                </p>
            </div>
        </div>
    )
}

function Home() {
    return (
        <>
            <TopSection></TopSection>
            <Album URL={BASEURL + '/getblogs'} />
        </>
    )
}

export default Home;