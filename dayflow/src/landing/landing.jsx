import React, {useEffect, useState} from 'react';
import '../app.css';
import {NavLink} from "react-router-dom";
import DailySchedule from "../components/dailySchedule";
import {useInspirationQuote} from "../components/helper";

export function Landing() {
    const { quote, loading, error } = useInspirationQuote();

    return (
        <main>
            <div className="container">
                <div className="landing-container">
                    <div className="button-container">
                        <NavLink to="/login">
                            <button className="button landing-button">
                                Login
                            </button>
                        </NavLink>
                    </div>
                    <div className="quote-box">
                        <h3 className="quote">Quote:</h3>
                        {/*Quote from 3rd party API*/}
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        {!loading && !error && (
                            <>
                                <p>{quote.quote}</p>
                                <p>- {quote.author}</p>
                            </>
                        )}
                    </div>
                </div>

                <DailySchedule events={[]}/> {}

            </div>
        </main>
    );
}