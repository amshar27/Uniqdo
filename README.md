# UNIQDO

A minimalist fashion retail website built as a Foundation in Computer Technology **Web Development** final assessment. It is a multi-page static site — plain HTML, CSS, and vanilla JavaScript with **no framework, no build step, and no backend**. User accounts and login sessions are simulated entirely in the browser using `localStorage`.

## Features

- **Login & Registration** with client-side validation (email format, password strength, required fields, duplicate-account detection).
- **Browser-based auth** — registered users and the active session are stored in `localStorage`; no server or database.
- **Session guard** — the homepage redirects to the login page if no user is signed in.
- **Homepage** with a hero banner and a featured-products grid.
- **About page** with a brand story and values strip.
- **Support / feedback form** with name, email, and Malaysian phone-number validation.
- **Show/hide password** toggle and **log out** that clears the session.

## Pages

| File | Purpose |
|------|---------|
| `login.html` | Login form + entry point to account creation |
| `CreateAccount.html` | Registration form |
| `index.html` | Homepage (hero + featured products) — requires a signed-in session |
| `about.html` | Brand story and values |
| `support.html` | Feedback form |

## Project structure

```
├── login.html          # Login
├── CreateAccount.html  # Registration
├── index.html          # Homepage
├── about.html          # About page
├── support.html        # Feedback form
├── login.css           # Base styles (shared by all pages)
├── home.css            # Styles for homepage & about page
├── login.js            # Auth, validation, and session logic (shared by all pages)
├── home.js             # Homepage / about helpers (logout, add to bag)
├── uniqdo.png          # Brand logo
├── essential_tee.png   # Product image
├── tailored_trousers.png
├── wool_overcoat.png
└── story.png           # About-page brand photo
```

## How it works

- **`login.css`** holds the base styles (reset, fonts, form controls, the `.btn` button, footer). It is linked on every page. **`home.css`** adds layout for the homepage and about page and is linked only on those two pages.
- **`login.js`** contains all auth and validation logic and is linked on every page:
  - `Register()` validates the form, stores the new user in the `users` array, and redirects to the login page.
  - `LogIn()` validates credentials against `users`, sets `currentUser`, and redirects to the homepage.
  - `SubmitFunction()` validates the support form.
  - `checkSession()` runs on `DOMContentLoaded` and protects `index.html`.
  - `showPassword()` toggles the password field visibility.
- **`home.js`** provides `logOut()` (clears `currentUser`) and `addToBag()`.

### localStorage data

```js
// registered users
localStorage.getItem('users')        // JSON array of { email, password, birthday, gender }
// active session
localStorage.getItem('currentUser')  // the signed-in user's email
```

## Running locally

No build or install step is required. Either:

- Open `login.html` directly in a web browser, **or**
- Serve the folder over HTTP and visit the pages (recommended, so relative paths resolve cleanly):

```bash
# Python 3
python -m http.server
# then open http://localhost:8000/login.html
```

Open files from the project root so the shared `login.css` / `login.js` and images resolve correctly.

## Usage

1. Open `login.html` and click **Create an account** to register.
2. After registering you are returned to the login page — sign in with the same credentials.
3. On success you land on the homepage; browse the featured products and the About page.
4. Use the **Support** page to send feedback, and **Log Out** to end the session.

## Notes

- This is an educational project. Passwords are stored in plaintext in `localStorage` and there is no real authentication — never use this approach in production.
- Tested in modern desktop browsers.

---

COPYRIGHT © UNIQDO CO., LTD. ALL RIGHTS RESERVED.
