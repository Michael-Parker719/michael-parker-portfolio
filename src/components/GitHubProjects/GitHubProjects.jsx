import React, { useEffect, useState } from "react";
import "./GitHubProjects.css";

const GITHUB_USERNAME = "Michael-Parker719";
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

function GitHubProjects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      if (!GITHUB_TOKEN) {
        setError("GitHub token not set. Please add REACT_APP_GITHUB_TOKEN to your .env file.");
        setLoading(false);
        return;
      }
      const query = `
        {
          user(login: "${GITHUB_USERNAME}") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  id
                  name
                  description
                  url
                  owner {
                    avatarUrl
                  }
                }
              }
            }
          }
        }
      `;
      try {
        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          },
          body: JSON.stringify({ query }),
        });
        const json = await res.json();
        if (json.errors) {
          setError(json.errors[0].message || "GitHub API error");
          setLoading(false);
          return;
        }
        if (!json.data || !json.data.user) {
          setError("Failed to fetch pinned repositories. Check your token and username.");
          setLoading(false);
          return;
        }
        setRepos(json.data.user.pinnedItems.nodes);
        setLoading(false);
      } catch (err) {
        setError("Network error or invalid response from GitHub API.");
        setLoading(false);
      }
    };

    fetchPinnedRepos();
  }, []);

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div className="github-error">{error}</div>;

  return (
    <div className="github-projects-container">
      <div className="github-projects-list">
        {repos.map(repo => (
          <div
            key={repo.id}
            className="github-project-card"
          >
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-project-link"
            >
              <h2 className="github-project-title">{repo.name}</h2>
            </a>
            <img
              src={repo.owner.avatarUrl}
              alt={repo.name}
              className="github-project-avatar"
            />
            <p className="github-project-description">
              {repo.description || "No description provided."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GitHubProjects;