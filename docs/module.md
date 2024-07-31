# Module

Stores modules used across various files.

## Server Modules

These are modules stored in `/src/lib/module/server`. Refer to the [server module](/docs/ko/server_module.md) documentation.

## Requestor

These are objects named `~~Requestor`. They are mainly found in `~~.client.ts` files. These objects contain methods responsible for making HTTP requests to the server. These methods should be defined using the `defineRequestHandler` function from the [`@yowza/rrequestor`](https://github.com/hotsixman/yowza-regulated-requestor) library.

## DB Controller

These are objects named `~~DBController`. They are mainly found in `~~.server.ts` files. These objects contain methods responsible for making requests to the MySQL database from the server. These methods should be defined using the `defineDBHandler` function from the [`@yowza/db-handler`](https://github.com/hotsixman/yowza-db-handler) library.
