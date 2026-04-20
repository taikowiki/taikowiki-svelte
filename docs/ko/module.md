# module

여러 파일들에서 사용 하는 모듈들을 저장합니다. 각 모듈은 주로 `/src/lib/module/[moduleName]`에 위치합니다.

## client side (브라우저)

클라이언트 사이드에서 서버로 요청을 보내는 기능들은 주로 `[Module].Client` 객체에 정의되어 있습니다. 
주로 `[moduleName].client.ts` 파일에 정의됩니다.

예시: `Song.Client.submit(...)`

서버의 특정 API 엔드포인트와 매핑되는 메소드들은 [`@yowza/rrequestor`](https://github.com/hotsixman/yowza-regulated-requestor) 라이브러리의 `defineRequestHandler` 함수를 통해 정의됩니다.

## server side (백엔드)

서버 사이드에서 DB에 접근하거나 서버 로직을 수행하는 기능들은 주로 `[Module].Server` 객체에 정의되어 있습니다.
주로 `[moduleName].server.ts` 파일에 정의됩니다.

### DB Controller
DB에 접근하는 로직은 `[Module].Server.DBController` 객체에 정의됩니다.
이 메소드들은 [`@yowza/db-handler`](https://github.com/hotsixman/yowza-db-handler) 라이브러리의 `defineDBHandler` 함수를 통해 정의됩니다.

예시: `Song.Server.DBController.getSongBySongNo(...)`

## hooks

서버의 미들웨어 역할을 하는 훅들은 `$lib/module/hooks`에 모여 있습니다. 자세한 내용은 [server module](/docs/ko/server_module.md)를 참고하세요.
