import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Event from '../components/Event';

function Home() {
    return (
        <div className="app-container">
            <main className="main">
                <Event /> 

                <h1 className="text-dark mb-4 text-start fs-2">Featured Events</h1> {/* Added margin-bottom for space */}
                
                {/* Card Row */}
                <div className="row row-cols-1 row-cols-sm-3 row-cols-md-6 g-4">
                    {/* Card 1 */}
                    <div className="col">
                        <div className="card h-100"> 
                            <div className="card-body d-flex flex-column">
                                <h2 className="card-title">Event Name</h2>
                                <div className="mt-auto">
                                    {/* Button Container */}
                                    <a href="#" className="btn btn-dark btn-sm w-100 mb-2">Event Details</a>
                                    <a href="#" className="btn btn-dark btn-sm w-100">RSVP Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="col">
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column">
                                <h2 className="card-title">Event Name</h2>
                                <div className="mt-auto">
                                    <a href="#" className="btn btn-dark btn-sm w-100 mb-2">Event Details</a>
                                    <a href="#" className="btn btn-dark btn-sm w-100">RSVP Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="col">
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column">
                                <h2 className="card-title">Event Name</h2>
                                <div className="mt-auto">
                                    <a href="#" className="btn btn-dark btn-sm w-100 mb-2">Event Details</a>
                                    <a href="#" className="btn btn-dark btn-sm w-100">RSVP Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card 4 */}
                    <div className="col">
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column">
                                <h2 className="card-title">Event Name</h2>
                                <div className="mt-auto">
                                    <a href="#" className="btn btn-dark btn-sm w-100 mb-2">Event Details</a>
                                    <a href="#" className="btn btn-dark btn-sm w-100">RSVP Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <p>Created By Anica Na, Sabrina Chan, Sarah Haworth, Nathan Davis © 2024</p>
            </footer>
        </div>
    );
}

export default Home;



