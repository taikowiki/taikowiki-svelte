# api

taikowiki-svelte에서는 여러가지 api 기능을 제공합니다.

# 외부 접근 가능 api

## 곡 데이터

### /api/song

```ts
method: "GET"
responseType: SongData[]
```

db에 있는 곡 데이터 전체를 json 형태로 전송합니다.

#### /api/song?after
```ts
method: "GET"
responseType: SongData[]
```
- params
    - `after` 특정 시간 이후로 업데이트된 곡의 데이터를 가져올 수 있습니다.


### /api/song/[songNo]

```ts
method: "GET"
responseType: SongData || {}
```

songNo에 해당하는 곡의 데이터를 json 형태로 전송합니다. 만약 해당 곡이 존재하지 않으면 빈 객체(`{}`)를 전송합니다.

### /api/song/recent_update

```ts
method: "GET"
responseType: string
```

db의 `song` 테이블의 최근 업데이트 시각(UPDATE_TIME)을 ms 단위의 unix 시간으로 전송합니다.

## 유저

### /user
```ts
method: "GET"
responseType: {
    logined: boolean,
    nickname: string //user nickname or ip address
}
```

로그인 여부와 ip주소 또는 유저 닉네임을 가져옵니다.

# 내부 사용용 api

## 곡 데이터

### /api/request

```ts
method: "POST"
data: {
    songNo: string,
    songData: SongData // /src/lib/module/song/types.ts
}
minimumGrade: 2
```

곡 데이터 수정/추가를 요청합니다.

## 오락실

### /api/gamecenter/add-favorite
```ts
method: "POST"
data: {
    gamecenterOrder: number
}
minimumGrade: 1
```

즐겨찾기에 gamecenterOrder에 해당하는 오락실을 추가합니다.

### /api/gamecenter/delete-favorite
```ts
method: "POST"
data: {
    gamecenterOrder: number
}
minimumGrade: 1
```

즐겨찾기에서 gamecenterOrder에 해당하는 오락실을 삭제합니다.

### /api/gamecenter/favorite
```ts
method: "GET"
responseType: number[]
minimumGrade: 1
```

유저의 오락실 즐겨찾기를 가져옵니다.

### /api/gamecenter/report

```ts
method: "POST"
data: {
    gamecenterData: GameCenterDataWithoutOrderAndFavoriteCount // src/lib/module/common/gamecenter/types.ts
}
minimumGrade: 2
```

오락실 추가를 요청합니다.

## 유저

### /api/user/delete
```ts
method: "POST"
data: { //FORM
    UUID: string
}
```

유저를 삭제합니다.

### /api/user/lang/get
```ts
method: "GET"
data: string | null
```

유저의 설정 언어를 가져옵니다.

### /api/user/lang/set
```ts
method: "POST"
data: {
    lang: string
}
```

유저의 언어를 설정합니다.