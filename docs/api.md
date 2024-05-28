#api

taikowiki-svelde offers a number of api features.

## song data

### /api/song

```json
{
"method": "GET",
"Content-Type": "application/json"
}
```

Send the entire song data in db in json format.

### /api/song/[songNo]

```json
{
"method": "GET",
"Content-Type": "application/json"
}
```

Send the data of the song corresponding to songNo in json format. If the song does not exist, send an empty object.

### /api/song/recent_update

```json
{
"method": "GET",
"Content-Type": "text/plain"
}
```

Send the latest update time (UPDATE_TIME) of the 'song' table in db as unix time in ms.