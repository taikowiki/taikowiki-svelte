# Song data

## Type

`SongData` type is in `src/lib/module/song/types.ts`

## Rules

### Title

- `Title` means original Japanese title of a song.
- If the song is in the **arcade version** and can be found in **Donder Hiroba**, the `Title` must be the same as the title written on **Donder Hiroba**.

### Song No.

- `Song No.` is used to specify the song.
- If the song is in the **arcade version** and can be found in **Donder Hiroba**, the `Song No.` must be the same as the song No. written on **Donder Hiroba**.
- If the song is not in the **arcade version**, use a string.

### Korean / English Title

- The Korean / English title is based on the **arcade version**.
- If the song is not in the **arcade version**, use **latest console version** title.

### Korean / English Alias (Unoffical Transalted Title)

- The official translations of titles are unsatisfactory, so we can use `aliases`(unoffical transalted titles).
- Examples
    | Title | Korean | Korean(Unofficial) |
    | :-: | :-: | :-: |
    | 六兆年と一夜物語 | 로쿠쵸넨토이치야모노가타리 | 육조년과 하룻밤 이야기 |
    | 魑魅魍魎 | Chimi Moryo | 이매망량 |

### Romaji
- `Romaji` is the Romanized version of the pronunciation of a Japanese title.
- If the title is written in Kana for English, we use the English pronunciation instead of the Romanized version of Japanese pronunciation.
- Examples
    | Title | Romaji |
    | :-: | :-: |
    | 束ね糸 | Tabaneito |
    | シカ色デイズ | Shikairo Days |