import React, {useState} from 'react';
import '../app.css';
import {NavLink} from "react-router-dom";
import DailySchedule from "../components/dailySchedule";

export function Landing() {
    const [events] = useState([]);

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
                        <p>Activity leads to productivity.</p>
                        <p>-Jim Rohn</p>
                    </div>
                </div>

                <DailySchedule events={events}/> {}

            </div>
        </main>
    );
}