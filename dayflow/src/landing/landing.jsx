import React from 'react';
import '../app.css';
import {NavLink} from "react-router-dom";

export function Landing() {
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
                <table className="calendar-table" id="table">
                    <tbody>
                    <tr>
                        <td>6:00am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>6:30am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>7:00am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>7:30am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>8:00am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>8:30am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>9:00am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>9:30am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>10:00am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>10:30am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>11:00am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>11:30am</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>12:00pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>12:30pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>1:00pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>1:30pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2:00pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2:30pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>3:00pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>3:30pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>4:00pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>4:30pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>5:00pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>5:30pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>6:00pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>6:30pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>7:00pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>7:30pm</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>8:00pm</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </main>
    );
}