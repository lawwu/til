# Lawrence Wu's TIL

Finally got around to creating a TIL. Was inspired by the prolific [Simon Willison's TIL](https://til.simonwillison.net/).

I'm using Quarto and host this on Github Pages. Was pretty easy to get started. Just need to install Quarto and I was off and running.

```bash
# install quarto
brew install --cask quarto

# create a quarto project that is a blog
quarto create project blog til
```

You can also use the [Quarto VS extension](https://quarto.org/docs/tools/vscode.html) to do this through the command pallete. The Quarto documentation to create a blog is [here](https://quarto.org/docs/websites/website-blog.html). There are multiple ways to publish to Github Pages, I opted to use a Github Action, the instructions are [here](https://quarto.org/docs/publishing/github-pages.html#github-action).

## Deployment Process

I used to run `quarto render` and commit the rendered files. Now, this blog is automatically deployed using GitHub Actions whenever changes are pushed to the main branch. Here's how it works:

1. The workflow is defined in [.github/workflows/publish.yml](.github/workflows/publish.yml)
2. When changes are pushed to `main`, GitHub Actions:
   - Checks out the repository
   - Sets up UV (fast Python package installer)
   - Sets up Python using the version specified in `.python-version`
   - Installs Jupyter and other dependencies (required for Quarto pages that contain code)
   - Sets up Quarto
   - Renders the Quarto documents and publishes to the `gh-pages` branch

The rendered site is then served via GitHub Pages from the `gh-pages` branch.

### Manual Deployment

To manually trigger deployment:
1. Go to the "Actions" tab in the repository
2. Select the "Quarto Publish" workflow
3. Click "Run workflow" and select the branch to deploy from

### Local Preview

To preview the blog locally, run:
```bash
quarto preview
```