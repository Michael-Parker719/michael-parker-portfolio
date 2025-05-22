import React, { useEffect, useState } from "react";

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
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="github-projects-container" style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {repos.map(repo => (
          <div
            key={repo.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "1rem",
              width: 280,
              background: "#222",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#61dafb" }}
            >
              <h2 style={{ margin: "0 0 0.5rem 0" }}>{repo.name}</h2>
            </a>
            <img
              src={repo.owner.avatarUrl}
              alt={repo.name}
              style={{
                width: "100%",
                height: 120,
                objectFit: "cover",
                borderRadius: 4,
                marginBottom: "0.5rem"
              }}
            />
            <p style={{ fontSize: "1rem", minHeight: 48 }}>
              {repo.description || "No description provided."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GitHubProjects;