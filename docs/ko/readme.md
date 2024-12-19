# Taikowiki-svelte 

이 프로젝트는 태고의 달인을 위한 위키 프로젝트입니다. 오픈소스로 개발되며, 모든 기여는 환영입니다. 코드 뿐 아니라 번역, 디자인 등도 기여하실 수 있습니다.

Setup
----------
Taikowiki-svelte는 [MariaDB 10.3.39](https://mariadb.com/kb/en/mariadb-10-3-39-release-notes/)와 [Node.js v18.18.1](https://nodejs.org/en/download/package-manager)을 기반으로 구성되었습니다.

### Env
```dotenv
DB_HOST=localhost
DB_DATABASE=
DB_USER=
DB_PASSWORD=
DB_SERVICE=mysql

# 랜덤한 32바이트 값을 hex로 표현한 값
# require('crypto').randomBytes(32).toString('hex')
# openssl rand -base64 32
AUTH_KEY=

# github oauth용 (로그인 안쓸거면 안넣어도 됨)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# kakao oauth용 (로그인 안쓸거면 안넣어도 됨)
KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
```

----------

## 기여하기

이 프로젝트는 `dev/main` 분기에서 개발되고, 이후에 `main` 브랜치로 병합됩니다. 따라서 풀 리퀘스트는 `dev/main` 브랜치로 보내주십시오.

- [번역(i18n)](/docs/ko/i18n.md)
- [API](/docs/ko/api.md)
- [모듈](/docs/ko/module.md)
    - [서버 모듈](/docs/ko/server_module.md)
- [곡 데이터](/docs/ko/song%20data.md)

## 후원하기

- [오픈채팅](https://open.kakao.com/me/hotsixman)
- [Buy me a coffee](https://buymeacoffee.com/hotsixman)