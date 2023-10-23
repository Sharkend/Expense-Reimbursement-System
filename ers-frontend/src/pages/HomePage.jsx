import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const HomePage = (props) => {
    const { state } = useLocation();
    console.log("props: " + state );
    console.log("propsString: " + JSON.stringify(state) );
    return ( 
        <>
        <Navbar />
        <p>{props.data}</p>
        </>
     );
}
 
export default HomePage;