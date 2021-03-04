import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Navbar, Progressbar, Buttons } from "../components";
import { fetchData } from "../app/redux/actions/progressbar/progressbarActions";

const Homepage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div id="wrapper-main">
                <div id="wrapper-grid">
                    <div className="container">
                        <h3>Progress bars Demo</h3>
                        <br/>
                        <Progressbar />
                        <br/>
                        <Buttons />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;