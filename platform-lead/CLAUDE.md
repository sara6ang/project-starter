# platform-lead/CLAUDE.md

> **문서 소유권:** 이 폴더 전체의 최종 수정 권한은 **Platform Lead**에게 있습니다. 아래는 PM이 제시하는 초안 포맷이며, Platform Lead가 채우고 확정합니다.
> 루트 규칙은 `../CLAUDE.md` 참조. 이 폴더는 `docs/05_PROJECT_TREE.md`에서 설명하듯, org 권한/설정과 제품 전체 QA — **두 스택을 가로지르는 역할**을 위한 공간입니다.

---

## 이 폴더가 무엇인가

TongssOrg의 권한·설정을 관리하는 기록과, Week 4부터 맡는 전체 제품 QA(TongssApp+TongssOrg 통합 시나리오 검증)를 모아두는 곳. Object/필드 자체의 구조는 `TongssOrg/docs/01_OBJECT_MODEL.md` · `TongssOrg/docs/02_FIELD_GUIDE.md`(Org PO 소유)에 있고, 여기는 **누가 뭘 볼 수 있는가(권한)**와 **제대로 도는가(QA)**를 다룬다.

작업 전에 먼저 읽을 것: `TongssOrg/docs/05_PERMISSION.md`(Guest User 권한 구조), `../docs/00_PRODUCT_GUIDE.md`(Demo Day 성공 기준), `../docs/02_USER_FLOW.md`(전체 여정).

## 문서 목록

```
platform-lead/docs/
├── PERMISSIONS.md     # 권한 세트, Guest User 프로필 범위
├── QA_CHECKLIST.md    # Demo Day 한 줄 시나리오 기준 QA 체크리스트
└── TEST_PLAN.md       # Week 4 QA 주간 테스트 계획
```

## AI 툴 사용 시 지켜야 할 것

1. **가급적 VS Code + Salesforce Extension Pack + Claude Code 확장을 사용할 것.** 권한 세트·프로필 설정은 대부분 Setup 화면(웹)에서 하지만, 그 결과를 `sf project retrieve`로 받아 diff를 확인할 때 VS Code가 유리하다.
2. QA 체크리스트는 **00_PRODUCT_GUIDE의 Demo Day 성공 기준**과 **01_PERSONAS의 각 페르소나 성공 정의**를 기준으로 작성 — 임의의 테스트케이스를 추가하기보다 이 두 문서에서 도출할 것.
3. 권한 변경(특히 Guest User)은 Integration Lead·Org PO와 합의 후 진행.

## 하지 않을 것

- Guest User 권한을 "일단 넓게 열고 나중에 좁히기" 방식으로 설정하지 않는다 — 처음부터 필요한 최소 범위만.
- QA에서 발견한 버그를 이 문서에만 적고 각 트랙 담당자에게 알리지 않는 일이 없도록 한다 (일일 스탠드업/Show & Tell에서 공유).

## 헷갈리면

권한 범위나 QA 우선순위가 애매하면 **혼자 정하지 말고 PM·Org PO·Integration Lead와 상의.**