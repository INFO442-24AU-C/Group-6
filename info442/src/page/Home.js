import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="app-container">
            <header>
                <nav>
                <h1 className="page title">PNW Connects</h1>
                </nav>
            </header>
            <main className="main">
            <h1 className="main-title">PNW Connects</h1>
                <section className="container">
                    {['Music', 'Art', 'Party', 'Sports'].map((category) => (
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title m-0">{category}</h2>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="container featured-event">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title m-0">Featured Event</h2>
                            <a href="#" className="btn btn-dark">Event Details  </a>
                            <a href="#" className="btn btn-dark">  RSVP Now</a>
                        </div>
                    </div>
                </section>
                
                <h2>Embedded YouTube Video</h2>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/11coqrn9ubk" 
                  title="YouTube video player" frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
                </iframe>
            
            </main>
            <footer>
                <p>Created By Anica Na, Sabrina Chan, Sarah Haworth, Nathan Davis © 2024</p>
            </footer>
        </div>
    );
}

export default Home;
