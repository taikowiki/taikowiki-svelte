# server module

서버(백엔드) 쪽에서 사용하는 모듈들입니다.

## hooks

모든 훅은 `$lib/module/hooks`의 `Hooks` 네임스페이스에 정의되어 있습니다.

### allowOrigin
```ts
// /src/hooks.server.ts
import { Hooks } from "$lib/module/hooks";

const cors = Hooks.allowOrigin("https://donderhiroba.jp", "/", { credentials: true });
const apiCors = Hooks.allowOrigin("*", "/api/v1", { credentials: true });

export const handle = sequence(cors, apiCors);
```

특정 origin으로부터의 cors 요청을 허용합니다.

- `allowedOrigin`: 허용할 origin (예: `"https://google.com"`, `"*"` 등)
- `allowedPath`: 허용할 경로 시작 부분 (예: `"/api"`)
- `option`:
    - `credentials`: `true`인 경우 cors 요청을 할 때 쿠키를 같이 보내는 것을 허용합니다.

### checkIp
```ts
// /src/hooks.server.ts
import { Hooks } from "$lib/module/hooks";

export const handle = sequence(Hooks.checkIp);
```

mysql과 연동하여 밴 리스트(`ban/ip` 테이블)에 있는 ip들의 요청을 차단합니다.

### dynamicHtmlLang
```ts
// /src/hooks.server.ts
import { Hooks } from "$lib/module/hooks";

export const handle = sequence(Hooks.dynamicHtmlLang);
```

URL 파라미터(`?lang=`)나 쿠키(`language`)를 확인하여 HTML의 `%lang%` 부분을 현재 언어로 치환합니다.

### logger
```ts
// /src/hooks.server.ts
import { Hooks } from "$lib/module/hooks";

export const handle = sequence(Hooks.logger);
```

`log` 테이블에 서버로의 요청(UUID, IP, Path)을 기록합니다.

### checkPermissions
```ts
// /src/hooks.server.ts
import { Hooks } from "$lib/module/hooks";

const permission = Hooks.checkPermissions([
    {
        path: '/admin',
        level: 7,
        rule: 'match'
    },
    {
        path: '/auth/user',
        level: 1,
        rule: 'startsWith',
        redirectPath: '/auth/login'
    }
])

export const handle = sequence(permission);
```

특정 경로에 대한 유저의 권한 등급을 체크합니다.

- `path`: 대상 경로
- `level`: 필요한 최소 등급 (로그인 유저는 1 이상)
- `rule`: `'match'` (정확히 일치) 또는 `'startsWith'` (해당 경로로 시작)
- `redirectPath`: 권한이 없을 경우 리다이렉트할 경로

### getUserData
```ts
// /src/hooks.server.ts
import { Hooks } from "$lib/module/hooks";

export const handle = sequence(Hooks.getUserData);
```

`locals.user`가 존재할 경우 DB에서 해당 유저의 추가 데이터(`locals.userData`)를 가져옵니다.

### setAssetsCacheControl
```ts
// /src/hooks.server.ts
import { Hooks } from "$lib/module/hooks";

export const handle = sequence(Hooks.setAssetsCacheControl);
```

`/assets`로 시작하는 요청에 대해 7일간의 캐시 헤더를 설정합니다.
