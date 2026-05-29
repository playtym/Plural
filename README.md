# Deploy this site to GitHub Pages

Steps to publish this repository's static HTML on GitHub Pages:

1. Create a GitHub repository (or use an existing one) and push this code to `main`.

2. The included GitHub Actions workflow will automatically deploy the repository root to the `gh-pages` branch on push to `main`.

3. Push your code (example commands):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

4. After the push, GitHub Actions will run and publish to GitHub Pages. Your site will be available at:

`https://YOUR_USERNAME.github.io/YOUR_REPO/`

Notes:
- If you want the site at `https://YOUR_USERNAME.github.io/`, name the repository exactly `YOUR_USERNAME.github.io`.
- To use a custom domain, add a `CNAME` file with your domain name and configure DNS.
