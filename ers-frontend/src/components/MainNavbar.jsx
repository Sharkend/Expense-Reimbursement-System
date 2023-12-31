import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const MainNavbar = () => {
    const empId = Cookies.get("empId");
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link class="navbar-brand mb-0 h1" to="#">Expense Reimbursement System</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto ">
                    <li class="nav-item">
                        {(!empId)
                            ? (<Link class="nav-link" to="/login">Login</Link>)

                            : (<Link class="nav-link" to="/home"> Home </Link>)
                        }
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default MainNavbar;
