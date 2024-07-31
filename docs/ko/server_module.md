# server module

서버(백엔드) 쪽에서 사용하는 모듈들입니다.

## hooks

### allow-origin
```ts
// /src/hooks.server.ts
import allowOrigin from '$lib/module/server/hooks/allow-origin'

const cors = allowOrigin(["https://donderhiroba.jp", "https://google.com"], {credentials: true});

export const handle = sequence(cors);
```

특정 origin으로부터의 cors 요청을 허용합니다. 단, `post, put, patch, delete` 메소드의 경우 `Content-Type` 헤더가`application/x-www-form-urlencoded, multipart/form-data, text/plain`인 요청은 허용할 수 없습니다. 데이터를 받아야 할 경우 `application/json` 형식을 사용해야합니다.

두번째 파라미터에서 `credentials` 프로퍼티가 `true`인 경우 cors 요청을 할 때 쿠키를 같이 보내는 것을 허용합니다. `fetch API`의 `credentials: 'include'`나 `axios`의 `withCredentials: true` 옵션 등을 찾아보세요.

### ban-controller
```ts
// /src/hooks.server.ts
import BanController from '$lib/module/server/hooks/ban-controller'

export const handle = sequence(BanController.checkIp);
```

mysql과 연동하여 밴 리스트에 있는 ip들의 요청을 차단합니다.

### logger `experimental`
```ts
// /src/hooks.server.ts
import logger from '$lib/module/server/hooks/logger'

export const handle = sequence(logger);
```

db에 서버로의 요청을 기록합니다.

### permissionCheck
```ts
// /src/hooks.server.ts
import checkPermissions from '$lib/module/server/hooks/permissionCheck'

const permission = checkPermissions([
    { // '/admin' 으로 시작하는 페이지로의 9등급 미만의 사용자가 접근하는 것을 차단할 수 있습니다.
        path: '/admin',
        level: 9,
        rule: 'startsWith', //'startsWith'를 사용하면 해당 경로로 시작하는 모든 페이지로의 접근을 차단합니다.
        redirectPath: '/login' //로그인하지 않은 사용자의 경우 이곳으로 리다이렉트 시킵니다.
    },
    { // '/special' 로의 로그인하지 않은 사용자의 접근을 차단합니다.
        path: '/special',
        level: 1, //로그인한 사용자의 최소 등급은 1입니다. 따라서 1로 설정하면 로그인하지 않은 유저의 접근만 차단할 수 있습니다.
        rule: 'match' //'match'를 사용하면 정확히 해당 경로에 해당하는 페이지로의 접근을 차단합니다.
    }
])

export const handle = sequence(permission);
```