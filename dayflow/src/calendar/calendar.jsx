import React from 'react';
import {NavLink} from "react-router-dom";

export function Calendar() {
    return (
        <main className="main_container">
            <div style="flex:1">
                <div className="username">
                    <p>Hello Spencer!</p>
                </div>
                <div className="multi-button-container">
                    <NavLink to="event">
                        <button style="font-size: 20px" className="button">
                            Create Event
                        </button>
                    </>
                    <NavLink to="task">
                        <button style="font-size: 20px" className="button">
                            Create Task
                        </button>
                    </NavLink>
                </div>
                <div
                    style="border: 1px solid black; padding: 10px; width:75%; margin-left: auto; margin-right: auto; margin-top: 12px">
                    <h3 style="padding-top: 30px; border-color: black">Quote:</h3>
                    <p>Activity leads to productivity.</p>
                    <p>-Jim Rohn</p>
                </div>
            </div>
            <table style="margin-right: 7%; margin-top: 10px; margin-bottom: 10px" id="table" className="calendar">
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
                    <!--Existing event from database-->
                    <td className="event">Class</td>
                </tr>
                <tr>
                    <td>3:30pm</td>
                    <td className="event">Class</td>
                </tr>
                <tr>
                    <td>4:00pm</td>
                    <td className="event">Class</td>
                </tr>
                <tr>
                    <td>4:30pm</td>
                    <td className="event">Class</td>
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

        </main>
    );
}