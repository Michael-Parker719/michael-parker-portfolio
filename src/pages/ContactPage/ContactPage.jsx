import "./ContactPage.css";
import "../pages.css";
import Navbar from "../../components/Navbar/Navbar";

function ContactPage() {
  return (
    <div className="ContactPage">
        <Navbar />
        <div className="content-box">
        <h1 className="header">Contact Me</h1>
        <p className="text">If you have any questions, feel free to reach out!</p>
        <p className="text">TO DO - Add contact form</p>
        <p className="text">You can also find me on: <a target="_blank" rel="noopener noreferrer" className="link" href="https://www.linkedin.com/in/michael-parker-672167294/">LinkedIn</a> or <a target="_blank" rel="noopener noreferrer" className="link" href="https://github.com/Michael-Parker719">GitHub</a>.</p>
        </div>
    </div>
  );
}

export default ContactPage;