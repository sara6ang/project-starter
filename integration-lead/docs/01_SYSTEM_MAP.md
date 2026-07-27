# 01_SYSTEM_MAP — App ↔ Org 전체 구조

> 오너: Integration Lead(승우)

---

## 전체 구조

```mermaid
flowchart LR
    subgraph App["TongssApp — 화면 (Store PO 소유)"]
        Activity["매뉴얼 등록 / 체크리스트 / 재고 확인"]
    end

    subgraph Bridge["연동 구간 — Integration Lead 소유"]
        Guest["Guest Site (인증 없음)"]
        REST["Apex REST"]
    end

    subgraph Org["TongssOrg — 비즈니스 로직 (Org PO 소유)"]
        Account[("Account")]
        Views["리스트뷰 / 레코드 페이지"]
    end

    Activity -->|HTTPS POST| Guest --> REST --> Account --> Views
```

---

## 누가 뭘 소유하나

| 구간 | 소유 | 상세 문서 |
|---|---|---|
| 화면, 데이터 발생 | Store PO | `TongssApp/docs/03_USER_FLOW.md`, `05_DATA.md` |
| Guest Site, Apex REST (연동 구간) | Integration Lead | `02_API_CONTRACT.md`, `03_DATA_FLOW.md` |
| Account 필드·권한 | Org PO / Platform Lead | `TongssOrg/docs/02_FIELD_GUIDE.md`, `05_PERMISSION.md` |

---

## 이 문서가 다루지 않는 것

- 화면 디자인 → `TongssApp/docs/`
- Object/필드 설계 이유 → `TongssOrg/docs/01_OBJECT_MODEL.md`, `02_FIELD_GUIDE.md`
- 필드 목록 자체 → `../../docs/04_DATA_CONTRACT.md`
