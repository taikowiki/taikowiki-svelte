<p align="center">
  <img src="../../static/assets/img/logo.webp" alt="Taikowiki 로고" width="300">
</p>

<h1 align="center">Taikowiki-svelte (한국어)</h1>

<p align="center">
  <strong>태고의 달인을 위한 오픈소스 위키 프로젝트</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" alt="Svelte">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white" alt="MariaDB">
</p>

---

## 🌟 개요

**Taikowiki-svelte**는 태고의 달인을 사랑하는 유저들을 위한 현대적인 커뮤니티 기반 위키입니다. 곡 정보, 단위도장 정보 등 태고의 달인에 관한 방대한 데이터를 세련되고 빠른 웹 인터페이스로 제공하는 것을 목표로 합니다.

> [!IMPORTANT]
> **[사이트 운영 및 업데이트 로드맵 안내](https://taiko.wiki/notice/58)**

🌐 **언어:** [English](/README.md) | [한국어 (현재)]

---

## ✨ 주요 기능

- 🥁 **방대한 곡 데이터베이스**: 태고의 달인 수록곡의 상세 정보 및 보면 정보를 제공합니다.
- 🥋 **단위도장 지원**: 단위도장 과제곡 및 전용 플레이트 디자인 페이지를 제공합니다.
- 📊 **레이팅 시스템**: 유저의 실력을 객관적으로 확인할 수 있는 레이팅 계산 기능을 지원합니다.
- 📝 **인터랙티브 위키**: 누구나 문서를 수정하고 기여할 수 있는 커뮤니티 공간입니다.
- 🔍 **강력한 검색**: 원하는 곡이나 정보를 빠르게 찾을 수 있습니다.
- 🗺️ **오락실 맵**: 주변의 태고의 달인 설치 업소를 찾을 수 있습니다.

---

## 🛠️ 기술 스택

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

## 🚀 시작하기

### 요구 사항
- **Node.js:** v18.18.1 이상
- **MariaDB:** 10.3.39 이상

### 설치 방법

1. **저장소 클론:**
   ```bash
   git clone https://github.com/hotsixman/taikowiki-svelte.git
   cd taikowiki-svelte
   ```

2. **의존성 설치:**
   ```bash
   npm install
   ```

3. **환경 변수 설정:**
   `.env.example` 파일을 `.env`로 복사하고 데이터베이스 및 OAuth 정보를 입력합니다.
   ```bash
   cp .env.example .env
   ```

4. **개발 서버 실행:**
   ```bash
   npm run dev
   ```

---

## 🤝 기여하기

코드, 번역, 디자인, 곡 데이터 업데이트 등 모든 형태의 기여를 환영합니다!

> [!NOTE]
> 이 프로젝트는 **`dev/main`** 브랜치에서 개발됩니다. 모든 풀 리퀘스트(PR)는 `dev/main` 브랜치로 보내주시기 바랍니다.

### 관련 문서
- [번역 안내 (i18n)](/docs/ko/i18n.md)
- [API 문서](/docs/ko/api.md)
- [모듈 구조](/docs/ko/module.md)
- [곡 데이터 가이드](/docs/ko/song%20data.md)

---

## 💎 기여자

- **[Mahlerian](https://x.com/IchBinMahlerian)**: 단위도장 플레이트 디자인 및 로고 디자인.
- 그리고 모든 소중한 기여자분들께 감사드립니다!

---

## ☕ 후원하기

이 프로젝트가 도움이 되었다면 개발자를 후원해 주세요:

- [카카오톡 오픈채팅](https://open.kakao.com/me/hotsixman)
- [Buy me a coffee](https://buymeacoffee.com/hotsixman)

---

<p align="center">
  태고 커뮤니티를 위해 ❤️로 제작되었습니다.
</p>
