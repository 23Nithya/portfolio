# Nithya Shree V | Portfolio

A static portfolio site (HTML, CSS, and a little JavaScript). No build step, so it runs directly on GitHub Pages.

## Publish on GitHub Pages

1. Create a new **public** repository named `23Nithya.github.io` (this exact name gives you the clean URL `https://23nithya.github.io`).
2. Upload everything in this folder to the repository root: `index.html`, `styles.css`, `script.js`, and the `assets/` folder.
3. In the repository go to **Settings, then Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select the `main` branch and the `/ (root)` folder, then save.
4. Wait a minute or two, then open `https://23nithya.github.io`.

Using git from a terminal:

```bash
git init
git add .
git commit -m "Add portfolio site"
git branch -M main
git remote add origin https://github.com/23Nithya/23Nithya.github.io.git
git push -u origin main
```

## Adding the AI study assistant link later

Open `index.html`, find the link with `id="studyLink"`, and replace `href="#"` with your URL, for example:

```html
<a class="btn btn-small btn-primary link-pending" id="studyLink" href="https://your-study-app-url" ...>
```

The button turns active automatically and the "coming soon" text changes to "Open project".

## Other things you can edit

- **Text and numbers:** all in `index.html`. The Quick facts numbers use `data-count` for the animated count-up.
- **Colors:** the variables at the top of `styles.css` (`--primary`, `--tint`, `--bg`, and others).
- **Resume:** replace `assets/Nithya_Shree_Resume.pdf` with a newer file of the same name.
- **Photo:** replace `assets/profile.jpg`.
- **Availability:** update the badge in the hero and the Contact section once your notice period ends.

## Privacy note

Your phone number is not shown anywhere on the site, and it has been removed from the resume PDF in `assets/`. If you replace that PDF with a newer version, remove the phone number from it first, because anyone can download the file.
