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