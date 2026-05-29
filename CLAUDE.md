# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A multi-page static website for a fictional minimalist fashion brand, "UNIQDO", built as a university Web Development final assessment. It is plain HTML/CSS/vanilla JavaScript with no build step, framework, or dependencies. Authentication is simulated entirely in the browser via `localStorage` — there is no backend or database.

## Running

There is no build, lint, or test tooling. Open the `.html` files directly in a browser, or serve the folder over HTTP (e.g. `python -m http.server`) and visit the pages. All pages link CSS/JS and images with relative paths, so they must be served/opened from the project root for assets to resolve.

## Pages & asset wiring

- `login.html` — login form + side panel linking to account creation.
- `CreateAccount.html` — registration form.
- `index.html` — homepage (navbar, hero, featured-products grid); session-guarded.
- `about.html` — brand story + values strip.
- `support.html` — feedback form.

Two stylesheets and two scripts, linked per page:
- **`login.css`** — base styles (reset, Poppins font, form controls, `.btn`, footer). Linked on **every** page.
- **`home.css`** — layout for the homepage and about page only (`index.html`, `about.html`).
- **`login.js`** — all auth/validation/session logic. Linked on **every** page.
- **`home.js`** — `logOut()` and `addToBag()`; linked on `index.html` and `about.html`.

When adding a page that needs auth or the session guard, link `login.js`. When it needs the homepage/about layout classes, link `home.css`.

## Auth & session model (login.js)

State lives in two `localStorage` keys:
- `users` — JSON array of `{ email, password, birthday, gender }` (passwords in plaintext — fine for this assessment, never for production).
- `currentUser` — the signed-in user's email; absence means logged out.

Flow:
- `Register()` validates the form, rejects duplicate emails, appends to `users`, then redirects to **`login.html`** (it does NOT auto-login).
- `LogIn()` validates credentials against `users`, sets `currentUser`, redirects to `index.html`. Distinguishes "no account found" from "incorrect password".
- `logOut()` (in home.js) removes `currentUser` and returns to `login.html`.
- `checkSession()` runs on `DOMContentLoaded` (bottom of login.js) and redirects to `login.html` if `currentUser` is absent **and** the current page is `index.html`. To protect another page, add its filename to that check.

Validation uses shared regex constants at the top of login.js: `EMAIL_REGEX`, `PASSWORD_REGEX` (8+ chars, at least one letter and one number), `PHONE_REGEX` (Malaysian, `0\d{1,2}-\d{7,8}`). `SubmitFunction()` (support form) reports errors via `alert`; `LogIn`/`Register` write messages into `#login-error` / `#register-error` `<p>` elements via the `showError(id, message)` helper, clearing them at the start of each call.

## Conventions (follow these when editing)

- **Inline `onclick` only** — handlers are wired in the HTML (`onclick="LogIn()"`), never `addEventListener`. Keep this pattern.
- The password field uses **`id="Show"` on every page**; `showPassword()` (which toggles its `type`) depends on that exact id. Each page has at most one.
- Login/register buttons are `type="button"` (not `submit`) so the form's default submit/reload doesn't fire before the JS redirect. Keep them `button`. The support form's button is still `type="submit"`, so a valid submission alerts then reloads.
- Login/CreateAccount layout uses container classes `container1`/`container2`/`container3`; `login.html` lays out its two panels with a `<table>`. Homepage/about layout uses `.navbar`, `.hero`, `.product-grid`/`.product-card`/`.product-img`, `.about-section`/`.about-img`, `.values-strip`/`.value-card` (all in home.css).
- Footer pattern repeated on every page: `COPYRIGHT © UNIQDO CO., LTD. ALL RIGHTS RESERVED.`, centered Helvetica 14px bold.

## Notes

- `uniqdo.png` is the brand logo; product images are `essential_tee.png`, `tailored_trousers.png`, `wool_overcoat.png`; the about photo is `story.png`. `CreateAccount.html` omits the header logo the other pages include.
- The about page's "Shop" nav link points to `#featured`, which only exists on `index.html` (dead anchor on about.html).
- `login and support.zip` is an old archived copy and is not part of the live site.
