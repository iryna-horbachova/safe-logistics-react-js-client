import React from 'react'
import {Link, Route} from "react-router-dom";

const Navbar = (props) => {
    const onClick = e => {
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Safe logistics</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/drivers"} className="nav-link">Drivers</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/routes"} className="nav-link">Routes</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/designated-routes"} className="nav-link">Designated Routes</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;