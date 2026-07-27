# TongssApp/docs/00_OVERVIEW — 이 저장소 개요

> 오너: Store PO(아론) / 전체 규칙: `../CLAUDE.md`
> 👤 이 문서는 처음 합류한 사람이 5분 안에 감을 잡도록 만든 안내판입니다. 각 문서의 자세한 내용은 해당 문서로 이동해서 읽으세요.

---

## 이 저장소가 책임지는 것

**TongssApp — 사장·직원이 실제로 쓰는 화면.** 매뉴얼 등록/열람, 체크리스트, 재고 확인, Entry Code 진입까지 — Tongss의 "얼굴"에 해당하는 부분입니다. HTML+CSS+JS로 만들고, 화면에 뭐가 있어야 하는지는 사람이 정하고 실제 코드는 Claude Code와 함께 만듭니다.

## 왜 존재하는가

Tongss의 핵심 가치("운영 지식을 전달하고, 업무 수행을 확인한다")가 실제로 사람 손에 닿는 지점이 여기입니다. TongssOrg(Salesforce)는 이 화면에서 발생한 결과를 비추는 거울일 뿐, 사장·직원은 TongssOrg를 직접 보지 않습니다 — 전부 TongssApp을 통해서만 만납니다.

## 무엇부터 읽어야 하는가

1. `../CLAUDE.md` — 기술 스택 절대 규칙, AI와 함께 개발하는 법
2. `03_USER_FLOW.md` — 화면별로 뭐가 있어야 하는지 (제일 자주 참조하게 될 문서)
3. 새 화면을 만들기 전엔 `04_COMPONENT_MAP.md`에서 재사용할 부품이 있는지 확인

## 문서 요약

| 문서 | 한 줄 요약 |
|---|---|
| `03_USER_FLOW.md` | 화면별 목적·구성·Claude에게 요청할 문장·대략적인 화면 모양 (5단 포맷) |
| `04_COMPONENT_MAP.md` | 이미 있는 부품 지도 — 버튼부터 매뉴얼 카드까지, 어디서 재사용되는지 |
| `05_DATA.md` | 데이터 구조 (Store, Manual, ChecklistItem, InventoryItem, Staff) + Entry Code 조회 로직 |
| `06_ARCHITECTURE.md` | 폴더 구조 — 새 파일이 어디에 들어가야 하는지 |
| `07_DESIGN_SYSTEM.md` | 색·글자·간격 값 + 실제 화면을 눈으로 보는 법(`design-system/index.html`) |

## 추천 읽는 순서

```
CLAUDE.md
  → 03_USER_FLOW.md (이 화면이 왜 필요하고 뭐가 있어야 하는지)
  → 04_COMPONENT_MAP.md (재사용할 부품이 있는지)
  → 05_DATA.md (데이터가 어떻게 생겼는지, 필요할 때)
  → 06_ARCHITECTURE.md, 07_DESIGN_SYSTEM.md (파일 위치·스타일, 헷갈릴 때)
```

대부분의 작업은 `03_USER_FLOW.md`에서 화면을 확인하고 바로 Claude에게 요청하는 것으로 끝납니다 — 나머지 문서는 필요할 때 찾아보는 참고서입니다.
