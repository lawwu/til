document.addEventListener('DOMContentLoaded', () => {
  // Find all links that point to GitHub repositories
  const githubLinks = document.querySelectorAll('a[href^="https://github.com/"]');
  
  githubLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Only process links to repositories, not other GitHub pages
    if (href.split('/').length >= 5 && !href.includes('/blob/') && !href.includes('/tree/')) {
      const parts = href.replace('https://github.com/', '').split('/');
      if (parts.length >= 2) {
        const owner = parts[0];
        const repo = parts[1];
        
        // Fetch star count from GitHub API
        fetch(`https://api.github.com/repos/${owner}/${repo}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('GitHub API request failed');
            }
            return response.json();
          })
          .then(data => {
            if (data.stargazers_count !== undefined) {
              // Create star icon element
              const starIcon = document.createElement('span');
              starIcon.className = 'github-stars';
              starIcon.title = `${data.stargazers_count} GitHub stars`;
              starIcon.innerHTML = ` &#9733; ${formatStarCount(data.stargazers_count)}`;
              
              // Append star count to the link
              link.appendChild(starIcon);
            }
          })
          .catch(error => {
            console.error('Error fetching GitHub stars:', error);
          });
      }
    }
  });
});

// Format star count (e.g., 1000 -> 1k)
function formatStarCount(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count;
} 