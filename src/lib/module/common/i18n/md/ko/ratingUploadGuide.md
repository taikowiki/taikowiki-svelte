동더히로바 데이터가 없습니다. 동더히로바 데이터를 업로드해주세요.

1. 동더 히로바에 로그인 후, 카드를 선택합니다.
2. 주소창을 비운 후, 다음 코드를 주소청에 붙여넣고 엔터 키를 누릅니다.
    **크롬 기반의 브라우저 등은 다음 코드를 붙여넣으면 `javascript:` 부분이 자동으로 지워집니다. `javascript:`는 직접 타이핑 후 나머지 코드를 붙여넣어야합니다.**
    **모바일에서는 크롬을 사용해야합니다.**
```
javascript:(async() => {const fetched = await fetch('https://raw.githubusercontent.com/taikowiki/taiko-rating/main/build/rating.js');const script = await fetched.text();(new Function(script))();})();
```
3. `Upload both clear data and score data.`를 선택하고 `Upload` 버튼을 눌러 점수 데이터를 업로드합니다.
    **위키에 로그인되어있어야 합니다.**
    **모바일에서는 일부 보안 정책으로인해 위키 로그인 확인이 불가능할 수 있습니다. 제 3자 쿠키를 허용해야합니다.**
4. 업로드가 완료되면 레이팅을 확인하실 수 있습니다.