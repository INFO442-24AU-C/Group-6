import React from 'react';
import { Link } from 'react-router-dom';
import Event from './Event';

function Home() {
    return (
        <div>
            <main>

                <div>
                    <h1 className="text-dark mb-4 text-start fs-2">Featured Events</h1>
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        <Event /> 
                    </div>
                </div>

                <div>
                    <h1 className="text-dark mb-4 text-start fs-4">Our Purpose</h1>
                    <p className="text-start">
                        We strive to connect people across the Pacific Northwest 
                        and help them form lasting friendships in a way that is accessible, stress-free, 
                        and fun. By fostering a sense of community, we aim to create opportunities for 
                        people to engage in meaningful social interactions and experience the joy of shared 
                        experiences.
                    </p>

                    <h1 className="text-dark mb-4 text-start fs-4">How It Works</h1>
                    <p className="text-start">
                        First, find an event that interests you! PNW Connects offers
                        opportunities at a wide range of events, from concerts to sports games. Once you 
                        find an event, purchase your tickets. All events posted on our site are linked to
                        third-party vendors where you can securely buy your ticket.
                    </p>
                    <p className="text-start">
                        After purchasing your ticket, RSVP for the event on our 
                        platform. You will receive confirmation that we have received your RSVP, ensuring 
                        you’re officially part of the fun. During the week of the event, we will send you 
                        an email with details about a designated check-in location and your mission instructions.
                    </p>

                    <h1 className="text-dark mb-4 text-start fs-4">What is a Mission?</h1>
                    <p className="text-start">
                        A mission is a mini-adventure designed to help you break
                        the ice, enjoy a new experience, and connect with others. Think of it as a fun side 
                        quest that is low pressure and helps you meet new people along the way. Each 
                        mission consists of tasks and activities tailored to the event, encouraging 
                        interaction and collaboration with fellow attendees that have registered through 
                        PNW Connects.
                    </p>
                    <p className="text-start">
                        Missions are designed to ease the process of meeting new
                        people and spark meaningful conversations while keeping things casual and enjoyable.
                        Whether you're exploring clues at a museum event, joining a team challenge at a 
                        sports game, or spotting hidden gems at a festival, missions give you a unique way
                        to bond with others.
                    </p>
                </div>
                
            </main>

            <footer>
                <p>Created By Anica Na, Sabrina Chan, Sarah Haworth, Nathan Davis © 2024</p>
            </footer>
        </div>
    );
}

export default Home;



