# platform-lead/docs/00_OVERVIEW — 이 폴더 개요

> 오너: Platform Lead(혜준) / 전체 규칙: `../CLAUDE.md`

---

## 이 저장소가 책임지는 것

TongssOrg의 **권한·설정**과, Week 4부터 맡는 **제품 전체 QA**(TongssApp+TongssOrg 통합 시나리오 검증). Object/필드 설계 자체는 여기 책임이 아닙니다 — 그건 `TongssOrg/docs/`(Org PO 소유)입니다. 여기는 "누가 뭘 볼 수 있는가"와 "제대로 도는가"만 다룹니다.

## 왜 존재하는가

권한 설정과 QA는 TongssApp에도, TongssOrg에도 딱 속하지 않는 **두 스택을 가로지르는 일**입니다. 한쪽 트랙 문서에 억지로 끼워 넣으면 어색해지므로 별도 폴더를 둡니다 (`../../docs/05_PROJECT_TREE.md` 참조).

## 무엇부터 읽어야 하는가

1. `../CLAUDE.md` — 이 폴더의 Golden Rule과 하지 않을 것
2. `01_PERMISSIONS.md` §보안 원칙 — 지금 무엇을 지켜야 하는지
3. 실제 작업 시작 전: `../../docs/00_PRODUCT_GUIDE.md`(Demo Day 성공 기준), `TongssApp/docs/03_USER_FLOW.md` §0(Entry Code)

## 문서 요약

| 문서 | 한 줄 요약 |
|---|---|
| `01_PERMISSIONS.md` | 플랫폼 보안 원칙(구현이 아니라 원칙으로) + 팀원 권한 + 연동 계정 최소 권한 + 실제 설정값 기록 |
| `02_ARCHITECTURE_DECISIONS.md` | ADR — Golden Rule + "왜 인증을 미뤘는지" 등 4개 결정과 그 대가(Consequences) |
| `03_QA_CHECKLIST.md` | Demo Day 한 줄 시나리오가 전부 통과하는지 확인하는 체크리스트 |
| `04_TEST_PLAN.md` | Week 4 QA 주간 일정, 테스트 범위, 버그 기록 양식 |

## 추천 읽는 순서

```
CLAUDE.md (Golden Rule)
  → 01_PERMISSIONS.md (지금 뭘 지켜야 하는가)
  → 02_ARCHITECTURE_DECISIONS.md (왜 그렇게 정했는가— 궁금할 때)
  → 03_QA_CHECKLIST.md (Week 4에 이걸로 확인)
  → 04_TEST_PLAN.md (Week 4 QA 일정)
```

`01`과 `02`는 평소에, `03`과 `04`는 Week 4부터 주로 씁니다.
