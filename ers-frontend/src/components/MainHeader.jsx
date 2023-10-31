import ers from '../images/ers.png';

const MainHeader = () => {
    return (
        <div class="jumbotron jumbotron-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <h2>Effortlessly streamline your reimbursements with our Expense Reimbursement System</h2>
                        <br />
                        <p class="lead">Organize. Simplify. Achieve. Repeat.</p>
                    </div>
                    <div className="col-md-3">
                        <img src={ers} alt="ers" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainHeader;