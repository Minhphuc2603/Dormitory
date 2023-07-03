import Footer from "../component/Footer";
import HeaderApp from "../component/HeaderApp";
import SideBar from "../component/SideBar";


export default function TemplateUser({title="", children}){
    return(
        <div className = "container">
            
            <SideBar/>
                                         
            <div className=" content2 col-12">           
                <div >{children}</div>
            </div>
            
            
            
        </div>

    );
}