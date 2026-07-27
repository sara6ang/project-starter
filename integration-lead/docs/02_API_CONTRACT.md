# 02_API_CONTRACT — API 목록

> 오너: Integration Lead(승우)
> 필드 하나하나의 정의는 여기 없습니다 — `../../docs/04_DATA_CONTRACT.md`(shared)가 유일한 진실입니다.

---

## API 목록

| API | 방향 | 인증 | 상태 | 상세 |
|---|---|---|---|---|
| `POST /services/apexrest/tongss/store-status/*` | TongssApp → TongssOrg | Guest User (인증 없음) | `[확인필요]` | `TongssOrg/docs/06_AUTOMATION.md` (StoreRestService) |

역방향(Org → App) API는 없습니다 (`../../docs/04_DATA_CONTRACT.md` §1).

---

## 호출 순서

```mermaid
sequenceDiagram
    TongssApp->>Guest Site: POST store-status
    Guest Site->>Apex REST: Guest User 권한으로 실행
    Apex REST->>Account: 필드 update
```

---

## 체크

- [ ] 이 표의 엔드포인트가 실제 `urlMapping`과 일치하는가
- [ ] 계약에 없는 필드를 주고받고 있지 않은가 (`../../docs/04_DATA_CONTRACT.md` 기준)
