import './Home.css';
import Navbar from '../../components/Navbar/Navbar';

function Home() {
  return (
    <div className="Home">
      <Navbar />
      <div className="content-box">
        <header className="Home-header">
          <h1>Welcome to My Portfolio</h1>
          <p>Hi, I'm Michael Parker. I graduated from UCF in 2025 with a Bachelors Degree in Computer Science. My main focuses during my undergrad were AI and Software Development. On this website you can find some of my projects I've worked on with links to my GitHub.</p>
          <footer>
            <p>Connect with me on <a target="_blank" rel="noopener noreferrer" className="link" href="https://www.linkedin.com/in/michael-parker-672167294/">LinkedIn</a> or <a target="_blank" rel="noopener noreferrer" className="link" href="https://github.com/Michael-Parker719">GitHub</a>.</p>
          </footer>
        </header>
      </div>
    </div>
  );
}

export default Home;
