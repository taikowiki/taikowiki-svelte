# module

여러 파일들에서 사용 하는 모듈들을 저장합니다.

## server modules

`/src/lib/module/server` 에 저장되는 모듈들입니다. [server module](/docs/ko/server_module.md)를 참고하세요.

## requestor

`~~Requestor` 라고 이름붙은 객체들입니다. 주로 `~~.client.ts` 파일에 존재합니다. 이 객체들은 서버로의 http 요청을 담당하는 메소드들을 가지고 있습니다. 이 메소드들은 [`@yowza/rrequestor`](https://github.com/hotsixman/yowza-regulated-requestor) 라이브러리의 `defineRequestHandler` 함수를 통해 정의해야합니다.

## db controller
`~~DBConroller` 라고 이름붙은 객체들입니다. 주로 `~~.server.ts` 파일에 존재합니다. 이 객체들은 서버에서 mysql db로의 요청을 담당하는 메소드들을 가지고 있습니다. 이 메소드들은 [`@yowza/db-handler`](https://github.com/hotsixman/yowza-db-handler) 라이브러리의 `defineDBHandler` 함수를 통해 정의해야합니다.