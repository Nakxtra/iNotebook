import React from 'react'
import { useHistory } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();
    const history = useHistory();
    // console.log(location);

    const logout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${(location.pathname === '/') ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${(location.pathname === '/About') ? 'active' : ''}`} to="/About">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link className="btn btn-primary mx-1" to='/login' role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to='/signup' role="button">Signup</Link>
                        </form> : <div className="d-flex" style={{
                            alignItems: "center"
                        }}><i className="far fa-user" style={{
                            color: "white",
                            marginRight: "1rem",
                            fontSize: "1.5rem"
                        }}
                        ></i> <button className='btn btn-danger' onClick={logout}>Logout</button></div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
