# Server Module

These are modules used on the server (backend) side.

## hooks

### allow-origin
```ts
// /src/hooks.server.ts
import allowOrigin from '$lib/module/server/hooks/allow-origin'

const cors = allowOrigin(["https://donderhiroba.jp", "https://google.com"], {credentials: true});

export const handle = sequence(cors);
```

Allows CORS requests from specific origins. However, for methods `post, put, patch, delete` requests with `Content-Type` headers of `application/x-www-form-urlencoded, multipart/form-data, text/plain` cannot be allowed. To receive data, you must use the `application/json` format.

When the `credentials` property in the second parameter is set to `true`, cookies are allowed to be sent with CORS requests. See options like `credentials: 'include'` for the fetch API or `withCredentials: true` for axios.

### ban-controller
```ts
// /src/hooks.server.ts
import BanController from '$lib/module/server/hooks/ban-controller'

export const handle = sequence(BanController.checkIp);
```

Block requests from IPs on the ban list in database.

### logger `experimental`
```ts
// /src/hooks.server.ts
import logger from '$lib/module/server/hooks/logger'

export const handle = sequence(logger);
```

Logs requests to the server in the database.

### permissionCheck
```ts
// /src/hooks.server.ts
import checkPermissions from '$lib/module/server/hooks/permissionCheck'

const permission = checkPermissions([
    { // Prevents users with a grade lower than 9 from accessing pages starting with '/admin'.
        path: '/admin',
        level: 9,
        rule: 'startsWith', // Using 'startsWith' blocks access to all pages starting with this path.
        redirectPath: '/login' // Redirects users who are not logged in to this path.
    },
    { // Blocks access to '/special' for users who are not logged in.
        path: '/special',
        level: 1, // The minimum grade for logged-in users is 1. Therefore, setting it to 1 blocks only users who are not logged in.
        rule: 'match' // Using 'match' blocks access to the page that exactly matches this path.
    }
])

export const handle = sequence(permission);
```