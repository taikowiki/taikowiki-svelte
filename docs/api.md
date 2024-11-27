# api

taikowiki-svelte provides various API functionalities.

# Publicly Accessible APIs

## Song Data

### /api/song

```ts
method: "GET"
responseType: SongData[]
```

Sends all song data in the database in JSON format.

#### /api/song?after
```ts
method: "GET"
responseType: SongData[]
```
- params
    - `after` can be used to retrieve song data updated after a specific time.

### /api/song/[songNo]

```ts
method: "GET"
responseType: SongData || {}
```

Sends the song data corresponding to the songNo in JSON format. If the song does not exist, an empty object (`{}`) is sent.

### /api/song/recent_update

```ts
method: "GET"
responseType: string
```

Sends the latest update time (UPDATE_TIME) of the \`song\` table in the database as a Unix time in milliseconds.
## User

### /user
```ts
method: "GET"
responseType: {
    logined: boolean,
    nickname: string //user nickname or ip address
}
```
Retrieves the login status and the user's nickname or IP address.

### /user/rating
```ts
method: "GET"
responseType: {
    currentRating: number,
    currentExp: number | null,
    ratingData: { 
        songNo: number,
        difficulty: 'oni' | 'ura', 
        songRating: {
            value: number,
            accuracy: number,
            measureValue: number
        }
    }
}
params: {
    all?: ['true'] // If "true", server will send all song rating datas. If not, server will only send top 50 song rating datas.
}
```

###

# Internal Use APIs

## Song Data

### /api/request

```ts
method: "POST"
data: {
    songNo: string,
    songData: SongData // /src/lib/module/song/types.ts
}
minimumGrade: 2
```

Requests to modify/add song data.

## Game Center

### /api/gamecenter/add-favorite
```ts
method: "POST"
data: {
    gamecenterOrder: number
}
minimumGrade: 1
```

Adds the game center corresponding to `gamecenterOrder` to favorites.

### /api/gamecenter/delete-favorite
```ts
method: "POST"
data: {
    gamecenterOrder: number
}
minimumGrade: 1
```

Removes the game center corresponding to `gamecenterOrder` from favorites.

### /api/gamecenter/favorite
```ts
method: "GET"
responseType: number[]
minimumGrade: 1
```

Retrieves the user's favorite game centers.

### /api/gamecenter/report

```ts
method: "POST"
data: {
    gamecenterData: GameCenterDataWithoutOrderAndFavoriteCount // src/lib/module/common/gamecenter/types.ts
}
minimumGrade: 2
```

Requests to add a game center.

## User

### /api/user/delete
```ts
method: "POST"
data: { //FORM
    UUID: string
}
```

Deletes a user.

### /api/user/lang/get
```ts
method: "GET"
data: string | null
```

Retrieves the user's preferred language.

### /api/user/lang/set
```ts
method: "POST"
data: {
    lang: string
}
```

Sets the user's preferred language.
