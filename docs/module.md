# module

Stores modules used across various files. Each module is primarily located in `/src/lib/module/[moduleName]`.

## client side (Browser)

Functionalities for sending requests from the client side to the server are primarily defined in the `[Module].Client` object.
These are typically defined in `[moduleName].client.ts` files.

Example: `Song.Client.submit(...)`

Methods mapped to specific API endpoints on the server are defined using the `defineRequestHandler` function from the [`@yowza/rrequestor`](https://github.com/hotsixman/yowza-regulated-requestor) library.

## server side (Backend)

Functionalities for accessing the DB or performing server logic on the server side are primarily defined in the `[Module].Server` object.
These are typically defined in `[moduleName].server.ts` files.

### DB Controller
Logic for accessing the DB is defined in the `[Module].Server.DBController` object.
These methods are defined using the `defineDBHandler` function from the [`@yowza/db-handler`](https://github.com/hotsixman/yowza-db-handler) library.

Example: `Song.Server.DBController.getSongBySongNo(...)`

## hooks

Hooks acting as server middleware are collected in `$lib/module/hooks`. For details, see [server module](/docs/server_module.md).
