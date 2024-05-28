# api

taikowiki-svelte에서는 여러가지 api 기능을 제공합니다.

## 곡 데이터

### /api/song

```json
{
    "method": "GET",
    "Content-Type": "application/json"
}
```

db에 있는 곡 데이터 전체를 json 형태로 전송합니다.

### /api/song/[songNo]

```json
{
    "method": "GET",
    "Content-Type": "application/json"
}
```

songNo에 해당하는 곡의 데이터를 json 형태로 전송합니다. 만약 해당 곡이 존재하지 않으면 빈 객체를 전송합니다.

### /api/song/recent_update

```json
{
    "method": "GET",
    "Content-Type": "text/plain"
}
```

db의 `song` 테이블의 최근 업데이트 시각(UPDATE_TIME)을 ms 단위의 unix 시간으로 전송합니다.