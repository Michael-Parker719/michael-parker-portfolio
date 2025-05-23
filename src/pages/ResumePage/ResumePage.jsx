import "./ResumePage.css";
import "../pages.css";
import Navbar from "../../components/Navbar/Navbar";

function ResumePage() {
    return (
        <div className="ResumePage">
            <Navbar />
            <div className="content-box">
                <h1 className="header">My Resume</h1>
                <p className="text">Click the link below to download my resume.</p>
                <embed src="MichaelParkerResume.pdf" width="800px" height="2100px" />
            </div>
        </div>
    );
}

export default ResumePage;