import React from 'react';
import { Link } from 'react-router-dom';
import './Myevent.css';

function MyEvent() {
    return (
        <div className="app-container">
            <header>
                <nav>
                <h1 className="page-title">PNW Connects</h1>
                </nav>
            </header>
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
            <footer>
                <div className="footer-content">
                    <p>INFO 442</p>
                </div>
            </footer>
        </div>
    );
}

export default MyEvent;


