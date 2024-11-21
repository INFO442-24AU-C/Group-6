import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Event from '../components/Event';

function Home() {
    return (
        <div className="app-container">
            <main className="main">

                <h1 className="text-dark mb-4 text-start fs-2">Featured Events</h1> {/* Added margin-bottom for space */}
                <Event /> 

            </main>

            <footer>
                <p>Created By Anica Na, Sabrina Chan, Sarah Haworth, Nathan Davis © 2024</p>
            </footer>
        </div>
    );
}

export default Home;



