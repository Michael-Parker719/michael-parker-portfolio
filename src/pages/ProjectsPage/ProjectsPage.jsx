import Navbar from "../../components/Navbar/Navbar";
import "./ProjectsPage.css";
import "../pages.css";
import GitHubProjects from "../../components/GitHubProjects/GitHubProjects";

  function ProjectsPage() {
    return (
      <div className="ProjectsPage">
        <Navbar />
        <div className="content-box">
          <h1 className="ProjectsPage-header">My GitHub Projects</h1>
          <GitHubProjects />
        </div>
      </div>
    );
}

export default ProjectsPage;
