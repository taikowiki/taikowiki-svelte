# server module

Modules used on the server (backend) side.

## hooks

All hooks are defined in the `Hooks` namespace in `$lib/module/hooks`.

### allowOrigin
```ts
// /src/hooks.server.ts
import { Hooks } from "$lib/module/hooks";

const cors = Hooks.allowOrigin("https://donderhiroba.jp", "/", { credentials: true });
const apiCors = Hooks.allowOrigin("*", "/api/v1", { credentials: true });

export const handle = sequence(cors, apiCors);
```

Allows CORS requests from specific origins.

- `allowedOrigin`: Origin to allow (e.g., `"https://google.com"`, `"*"` etc.)
- `allowedPath`: Path prefix to allow (e.g., `"/api"`)
- `option`:
    - `credentials`: If `true`, allows sending cookies with CORS requests.

### checkIp
```ts
// /src/hooks.server.ts
import { Hooks } from "$lib/module/hooks";

export const handle = sequence(Hooks.checkIp);
```

Blocks requests from IPs in the ban list (`ban/ip` table) in integration with MySQL.

### dynamicHtmlLang
```ts
// /src/hooks.server.ts
import { Hooks } from "$lib/module/hooks";

export const handle = sequence(Hooks.dynamicHtmlLang);
```

Checks URL parameters (`?lang=`) or cookies (`language`) and replaces the `%lang%` part of the HTML with the current language.

### logger
```ts
// /src/hooks.server.ts
import { Hooks } from "$lib/module/hooks";

export const handle = sequence(Hooks.logger);
```

Logs requests (UUID, IP, Path) to the `log` table.

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

Checks the user's permission level for specific paths.

- `path`: Target path
- `level`: Minimum required level (logged-in users are 1 or higher)
- `rule`: `'match'` (exact match) or `'startsWith'` (starts with the path)
- `redirectPath`: Path to redirect if unauthorized.

### getUserData
```ts
// /src/hooks.server.ts
import { Hooks } from "$lib/module/hooks";

export const handle = sequence(Hooks.getUserData);
```

If `locals.user` exists, retrieves additional user data (`locals.userData`) from the database.

### setAssetsCacheControl
```ts
// /src/hooks.server.ts
import { Hooks } from "$lib/module/hooks";

export const handle = sequence(Hooks.setAssetsCacheControl);
```

Sets a 7-day cache header for requests starting with `/assets`.
