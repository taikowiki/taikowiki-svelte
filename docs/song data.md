# Song Data

## TypeScript Type

The `SongData` type is located in the `src/lib/module/song/index.ts` file.

## Rules

### Title

- `Title` refers to the original Japanese title of the song.
- If the song is included in the **arcade version** and can be found on **Donder-Hiroba**, the song title must be exactly the same as written on **Donder-Hiroba**.

### Song Number (songNo)

- `Song Number` is used to identify a song.
- If the song is included in the **arcade version** and can be found on **Donder-Hiroba**, the song number must be exactly the same as written on **Donder-Hiroba**.
- If the song is not included in the **arcade version**, an arbitrary string is used.

### Korean / English Title

- Korean / English titles are based on the **arcade version**.
- If the song is not included in the **arcade version**, they are based on the **latest console version**.

### Korean / English Alias (Unofficial Translation)

- Since official translations of songs may sometimes be unsatisfactory, aliases (unofficial translations) can be used.
- Example
    | Title | Official Korean Translation | Unofficial Korean Translation |
    | :-: | :-: | :-: |
    | 六兆年と一夜物語 | 로쿠쵸넨토이치야모노가타리 | 육조년과 하룻밤 이야기 |
    | 魑魅魍魎 | Chimi Moryo | 이매망량 |

### Romaji
- `Romaji` is the pronunciation of the original Japanese title written in Latin characters.
- If the original Japanese title is English written in Kana, use English instead of transcribing the Japanese pronunciation into Romaji.
- Example
    | Title | Romaji |
    | :-: | :-: |
    | 束ね糸 | Tabaneito |
    | シ카色デイズ | Shikairo Days |
