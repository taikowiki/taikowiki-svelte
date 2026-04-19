<p align="center">
  <img src="static/assets/img/logo.webp" alt="Taikowiki Logo" width="300">
</p>

<h1 align="center">Taikowiki-svelte</h1>

<p align="center">
  <strong>An open-source wiki project for 太鼓の達인 (Taiko no Tatsujin)</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" alt="Svelte">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white" alt="MariaDB">
</p>

---

## 🌟 Overview

**Taikowiki-svelte** is a modern, community-driven wiki for Taiko no Tatsujin. This project aims to provide comprehensive information about songs, Dani Dojo, and more, all wrapped in a sleek and performant web interface.

> [!IMPORTANT]
> **[Notice about Site operation and update roadmap](https://taiko.wiki/notice/58)**

🌐 **Languages:** [English (Current)] | [한국어](/docs/ko/readme.md)

---

## ✨ Key Features

- 🥁 **Comprehensive Song Database**: Detailed information and difficulty charts for Taiko no Tatsujin songs.
- 🥋 **Dani Dojo Support**: Dedicated pages for Dani Dojo challenges with plate designs.
- 📊 **Rating System**: Advanced rating calculations for players.
- 📝 **Interactive Wiki**: Editable documentation and community-contributed content.
- 🔍 **Powerful Search**: Quickly find songs and information.
- 🗺️ **Game Center Map**: Locate places to play.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Svelte 5](https://svelte.dev/) & [SvelteKit](https://kit.svelte.dev/)
- **State Management:** Svelte Runes
- **Styling:** [styled-svelte5](https://github.com/n670/styled-svelte5), SCSS
- **Editor:** [Toast UI Editor](https://ui.toast.com/tui-editor)

### Backend & Data
- **Runtime:** Node.js
- **Database:** MariaDB (via `@yowza/db-handler`)
- **API:** SvelteKit Server Routes
- **Validation:** [Zod](https://zod.dev/)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** v18.18.1 or higher
- **MariaDB:** 10.3.39 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hotsixman/taikowiki-svelte.git
   cd taikowiki-svelte
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Copy `.env.example` to `.env` and fill in your database and OAuth credentials.
   ```bash
   cp .env.example .env
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

---

## 🤝 Contributing

We welcome all kinds of contributions! Whether it's code, translation, design, or song data updates.

> [!NOTE]
> This project is being developed on the **`dev/main`** branch. Please submit your Pull Requests to `dev/main`.

### Resources
- [Translation (i18n)](/docs/i18n.md)
- [API Documentation](/docs/api.md)
- [Module Architecture](/docs/module.md)
- [Song Data Guide](/docs/song%20data.md)

---

## 💎 Contributors

- **[Mahlerian](https://x.com/IchBinMahlerian)**: Dani plate design & Logo design.
- And all our wonderful contributors!

---

## ☕ Support the Project

If you find this project useful, consider supporting the developer:

- [Kakaotalk Open Chat](https://open.kakao.com/me/hotsixman)
- [Buy me a coffee](https://buymeacoffee.com/hotsixman)

---

<p align="center">
  Built with ❤️ for the Taiko community.
</p>
