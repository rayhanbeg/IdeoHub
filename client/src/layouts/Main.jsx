import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {Outlet} from "react-router-dom"

const Main = () => {
    return (
        <div>
            {/* nav-- */}
              <Navbar/>
            {/* outlet-- */}
           <div className="min-h-[calc(100vh-306px)]">
           <Outlet/>
           </div>
            {/* footer-- */}
            <Footer/>
        </div>
    );
};

export default Main;