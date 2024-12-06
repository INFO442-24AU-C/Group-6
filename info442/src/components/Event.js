import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth, database } from '../index';
import { doc, setDoc, getDoc } from "firebase/firestore";
import './Event.css';

const Events = () => {
    const [events, setEvents] = useState({
        Music: { featured: null },
        Art: { featured: null },
        Party: { featured: null },
        Sports: { featured: null }
    });
    const [rsvpedEventIds, setRsvpedEventIds] = useState(new Set());  // Track RSVPs
    const apiKey = 'Q6ByjvXjuntp7jwlg4Amx6L3vbdykPrd';
    const categories = ['Music', 'Art', 'Party', 'Sports'];

    // Fetch events for each category
    useEffect(() => {
        categories.forEach(category => {
            axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&classificationName=${encodeURIComponent(category)}&city=Seattle&stateCode=WA&countryCode=US&size=5`)
                .then(response => {
                    setEvents(prevEvents => ({
                        ...prevEvents,
                        [category]: {
                            featured: response.data._embedded.events[0] // Only use the first event as featured
                        }
                    }));
                })
                .catch(error => console.error(`Error fetching ${category} events:`, error));
        });
    }, []);

    // Fetch RSVP status for events
    const fetchRSVPStatus = async (eventIds) => {
        const rsvpedIds = [];
        for (const eventId of eventIds) {
            const rsvpDocRef = doc(database, "RSVP", `${auth.currentUser.uid}_${eventId}`);
            const rsvpDocSnap = await getDoc(rsvpDocRef);
            if (rsvpDocSnap.exists()) {
                rsvpedIds.push(eventId);
            }
        }
        return rsvpedIds;
    };

    // Handle RSVP action
    const handleRSVP = async (eventId, eventName) => {
        if (!auth.currentUser) {
            alert("Please log in to RSVP");
            return;
        }
        const rsvpRef = doc(database, "RSVP", `${auth.currentUser.uid}_${eventId}`);
        await setDoc(rsvpRef, {
            userId: auth.currentUser.uid,
            eventId: eventId,
            eventName: eventName,
        }, { merge: true });
        setRsvpedEventIds((prev) => new Set(prev).add(eventId));
        alert("RSVP successful!");
    };

    return (
        <div className="container py-4">
            <div className="row row-cols-2 row-cols-md-4 g-4">
                {categories.map(category => (
                    <div key={category} className="col">
                        <div className="card border-1 shadow-sm text-center">
                            <div className="card-body">
                                <h2 className="card-title">{category}</h2>
                                {events[category].featured ? (
                                    <div>
                                        <img
                                            src={events[category].featured.images[0]?.url}
                                            alt={category}
                                            className="card-img-top rounded img-custom"
                                        />
                                        <p className="card-text mt-2">{events[category].featured.name}</p>
                                        <p className="card-text mb-3">
                                            {new Date(events[category].featured.dates.start.localDate).toLocaleDateString()}
                                        </p>
                                        <div className="button-container mt-auto">
                                            {/* Get Tickets button links to the ticketmaster page */}
                                            <a
                                                href={events[category].featured.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-success"
                                            >
                                                Get Tickets
                                            </a>

                                            {/* RSVP button */}
                                            <button
                                                onClick={() => handleRSVP(events[category].featured.id, events[category].featured.name)}
                                                className={`btn btn-primary ${!auth.currentUser ? 'disabled-btn' : ''}`}
                                            >
                                                RSVP
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="card-text">Loading...</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
