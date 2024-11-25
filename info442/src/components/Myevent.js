import React from 'react';
import { Link } from 'react-router-dom';
import './Myevent.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


function MyEvent() {
    return (
        <div className="app-container">
            <div className="container">
                <aside>
                    <ul>
                        <li><Link to="/notification">Notification Center</Link></li>
                    </ul>
                </aside>
                <main>
                    <section className="welcome">
                        <h1>Welcome to My Event</h1>
                    </section>
                    <section className="upcoming">
                        <h2>Upcoming Events</h2>
                        <div className="events">
                            <div className="event">
                                <h3>Event Title</h3>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>

    );
}

export default MyEvent;


