document.addEventListener('DOMContentLoaded', () => {
  console.log('GitHub stars script loaded');
  
  // Find all links that point to GitHub repositories
  const githubLinks = document.querySelectorAll('a[href^="https://github.com/"]');
  console.log(`Found ${githubLinks.length} GitHub links`);
  
  githubLinks.forEach(link => {
    const href = link.getAttribute('href');
    console.log(`Processing link: ${href}`);
    
    // Extract owner and repo from GitHub URL - handle more URL patterns
    let owner, repo;
    
    // Remove trailing slashes that might affect parsing
    const cleanHref = href.replace(/\/$/, '');
    
    // Try to parse the URL to get owner and repo
    const githubPath = cleanHref.replace('https://github.com/', '');
    const parts = githubPath.split('/');
    
    // Different patterns of GitHub URLs
    if (parts.length >= 2) {
      owner = parts[0];
      repo = parts[1];
      
      // Skip if this is not a repo URL or matches ignored patterns
      if (repo.includes('#') || repo.includes('?') || 
          href.includes('/blob/') || href.includes('/tree/') || 
          owner === 'orgs' || owner === 'search') {
        console.log(`Skipping non-repo URL: ${href}`);
        return;
      }
      
      console.log(`Adding stars badge for ${owner}/${repo}`);
      
      // Use Shields.io which doesn't have API rate limits
      const badgeImg = document.createElement('img');
      badgeImg.className = 'github-stars';
      badgeImg.alt = 'GitHub stars';
      badgeImg.src = `https://img.shields.io/github/stars/${owner}/${repo}?style=social`;
      badgeImg.style.marginLeft = '4px';
      badgeImg.style.verticalAlign = 'middle';
      
      // Append badge to the link
      link.appendChild(badgeImg);
    } else {
      console.log(`Link doesn't match repository pattern: ${href}`);
    }
  });
}); 