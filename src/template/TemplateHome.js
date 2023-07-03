import Banner from "../component/Banner";
import Footer from "../component/Footer";
import HeaderApp from "../component/HeaderApp";
import Ktx from "../component/Ktx";

export default function TemplateHome({ title = "", children }) {
    return (
        <>
            <div className="container-fluid">
                <HeaderApp />
                <div className="banner">
                    <Banner />
                </div>
                <div className="ktx">
                    <Ktx />
                </div>
                <div className="row content1">
                    <div >{children}</div>
                </div>
                <br></br>
                <Footer />
            </div>
            
        </>
    );
}