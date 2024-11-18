import React from 'react';
import './Explore.css'; // Update the path if necessary
import ExploreEvent from '../components/ExploreEvent';

function Explore() {
    return (
        <div className="explore-container">
            <h1 className="explore-title">Upcoming Events in Seattle</h1>
            <ExploreEvent />  
        </div>
    );
}

export default Explore;

