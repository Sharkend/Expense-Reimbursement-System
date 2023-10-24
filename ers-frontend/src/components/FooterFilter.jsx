import { Link } from "react-router-dom";
const FooterFilter = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-bottom">
            <Link className="navbar-brand" to="#">Filter: </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="#">All </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Pending</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Resolved</Link>
                    </li>
                </ul>
                <button className="btn btn-light float-right">Create</button>
            </div>
        </nav>
    );
}

export default FooterFilter;