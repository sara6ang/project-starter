# TongssOrg/docs/00_OVERVIEW — 이 저장소 개요

> 오너: Org PO(은영) / 전체 규칙: `../CLAUDE.md`
> 👤 이 문서는 처음 합류한 사람이 5분 안에 감을 잡도록 만든 안내판입니다.

---

## 이 저장소가 책임지는 것

**TongssOrg — Salesforce Org 자체.** TongssApp에서 발생한 활동(매뉴얼 등록, 체크리스트, 재고 확인)의 결과를 받아 저장하고, 박세일즈가 그 매장이 잘 쓰고 있는지 확인할 수 있게 합니다. 화면(UI)보다 **Object · Field · Flow · Permission · Report** 같은 데이터/비즈니스 로직이 중심입니다.

## 왜 존재하는가

`../CLAUDE.md`에 있듯, TongssOrg는 "TongssApp의 상태를 비추는 거울"입니다 — 매뉴얼 내용이나 체크리스트 항목 같은 원본 데이터는 여기 없고, 집계된 숫자(매뉴얼 수, 완료율 등)만 있습니다. 이 거울이 있어야 박세일즈가 37만 매장 중 어디를 챙겨야 할지 판단할 수 있습니다.

## 무엇부터 읽어야 하는가

1. `../CLAUDE.md` — 4가지 독자(Org PO/Claude Code/Salesforce Developer/PM)가 각자 뭘 하는지
2. `01_OBJECT_MODEL.md` — 왜 Custom Object 없이 Account만 쓰는지 (가장 중요한 설계 결정)
3. `02_FIELD_GUIDE.md` — 실제로 어떤 필드가 있는지

## 문서 요약

| 문서 | 한 줄 요약 |
|---|---|
| `01_OBJECT_MODEL.md` | Store=표준 Account, Custom Object를 안 만드는 이유 |
| `02_FIELD_GUIDE.md` | Account 필드 목록·API 이름·화면 어디에 보이는지 |
| `03_RELATIONSHIP.md` | Object 관계도(ERD) — 자식 Object가 없는 이유 |
| `04_FLOW.md` | 선언형 자동화(Flow) — Is_Active 자동 계산 등 |
| `05_PERMISSION.md` | 박세일즈 권한 + TongssApp↔Org 연동 권한 원칙 (Guest User 세팅 문서 아님) |
| `06_AUTOMATION.md` | Apex REST(StoreRestService), 필요시 LWC 구현 |
| `07_REPORT_DASHBOARD.md` | 박세일즈 화면 + 박오너용 Report/Dashboard |

## 추천 읽는 순서

```
CLAUDE.md
  → 01_OBJECT_MODEL.md (뭐가 있는지)
  → 02_FIELD_GUIDE.md (필드 상세)
  → 03_RELATIONSHIP.md (관계, 필요할 때)
  → 04_FLOW.md / 06_AUTOMATION.md (자동화를 만들 때)
  → 05_PERMISSION.md (연동 작업할 때)
  → 07_REPORT_DASHBOARD.md (박오너 관점이 궁금할 때)
```

Object/Field(01~02)가 기초이고, 나머지는 실제로 그 작업을 할 때 찾아보는 참고서입니다.
