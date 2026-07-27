# 03_DATA_FLOW — 데이터 이동

> 오너: Integration Lead(승우)

---

## 누가 보내고 누가 받나

| | 보낸다 | 받는다 |
|---|---|---|
| TongssApp | ✅ 매뉴얼·체크리스트·재고 확인 활동 | — |
| TongssOrg | — | ✅ Account 필드 갱신 |

---

## 언제 동기화되나

`[확인필요]` 즉시 전송 vs 배치(일 1회) — Week 2 결정 사항 (`../../docs/04_DATA_CONTRACT.md` §1)

```mermaid
sequenceDiagram
    participant U as 직원(TongssApp)
    participant A as TongssApp
    participant O as TongssOrg(Account)

    U->>A: 체크리스트 완료 / 재고 확인
    A->>O: (동기 시점 확인필요) 활동 데이터 POST
    O-->>A: 200 OK
```

---

## 실패하면?

→ `04_ERROR_HANDLING.md` 참조 (여기서 중복 설명하지 않음)

## 상세 필드 정의

→ `../../docs/04_DATA_CONTRACT.md` (여기서 중복 설명하지 않음)
