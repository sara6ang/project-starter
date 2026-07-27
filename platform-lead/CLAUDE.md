# platform-lead/CLAUDE.md

> **문서 소유권:** 이 폴더 전체의 최종 수정 권한은 **Platform Lead(혜준)**에게 있습니다. 아래는 PM이 제시하는 초안 포맷이며, Platform Lead가 채우고 확정합니다.
> 루트 규칙은 `../CLAUDE.md` 참조. 이 폴더는 `../docs/05_PROJECT_TREE.md`에서 설명하듯, org 설정과 제품 전체 QA — **두 스택을 가로지르는 역할**을 위한 공간입니다.

---

## Golden Rule

> **Platform exists to protect product simplicity.**
> If a platform decision makes the MVP significantly more complex without validating customer value, the platform decision is probably premature.

새 권한·설정·아키텍처 결정을 내리기 전에 항상 이 질문으로 돌아옵니다: *"이 결정이 MVP를 눈에 띄게 복잡하게 만드는데, 그만큼 고객 가치를 검증해주는가?"* 아니라면 아직 이릅니다. 구체적인 결정 기록은 `docs/ARCHITECTURE_DECISIONS.md`.

---

## 이 폴더가 무엇인가

**Tongss MVP는 인증을 의도적으로 만들지 않습니다.** 사장·직원은 Entry Code(`S01O`, `S01E01` 등)로 TongssApp에 들어가고, 이건 TongssApp 자체 로직입니다 (`TongssApp/docs/03_USER_FLOW.md` §0 참조). **Salesforce는 로그인을 책임지지 않습니다** — 운영 데이터를 저장하는 백엔드일 뿐입니다.

이 폴더의 역할은 "Guest User 권한 세팅"이 아니라 아래 5가지입니다.

| 역할 | 무엇을 하는가 |
|---|---|
| 플랫폼 아키텍처 정의 | TongssApp → Integration → TongssOrg 경계가 왜 이렇게 나뉘는지 |
| 연동 계약 정의 | 무엇이 오가는지 (필드 정의 자체의 진실은 `../docs/04_DATA_CONTRACT.md`) |
| 운영 원칙 정의 | 누가 뭘 책임지는지 |
| 데이터 오너십 정의 | 어떤 시스템이 어떤 데이터의 주인인지 |
| MVP에 맞는 보안 원칙 정의 | Salesforce 인증 구현이 아니라 **원칙**으로 (`docs/PERMISSIONS.md` §보안 원칙) |

Week 4부터는 여기에 **전체 제품 QA**(TongssApp+TongssOrg 통합 시나리오 검증)도 더해집니다. Object/필드 자체의 구조는 `TongssOrg/docs/01_OBJECT_MODEL.md` · `02_FIELD_GUIDE.md`(Org PO 소유)에 있습니다.

작업 전에 먼저 읽을 것: `../docs/00_PRODUCT_GUIDE.md`(Demo Day 성공 기준, Entry Code 스코프), `TongssApp/docs/03_USER_FLOW.md` §0(Entry Code), `TongssOrg/docs/05_PERMISSION.md`(연동 권한 원칙).

## 문서 목록

```
platform-lead/docs/
├── PERMISSIONS.md              # 플랫폼/보안 원칙 + 실제 설정 기록 (Guest User 세팅 문서 아님)
├── ARCHITECTURE_DECISIONS.md   # ADR — 왜 그렇게 정했고, 그 대가는 무엇인가
├── QA_CHECKLIST.md             # Demo Day 한 줄 시나리오 기준 QA 체크리스트
└── TEST_PLAN.md                # Week 4 QA 주간 테스트 계획
```

> 💡 **Future Improvement:** `PERMISSIONS.md`는 지금 "원칙 + 실제 설정 기록"을 한 파일에 담고 있습니다. 실제 설정값(Page Layout, Permission Set 등)이 크게 늘어나면 `PLATFORM_PRINCIPLES.md`(원칙)와 `CONFIG_LOG.md`(설정 기록)로 분리하는 걸 고려하세요. 지금은 분량이 작아 나눌 필요 없습니다.

## AI 툴 사용 시 지켜야 할 것

1. **가급적 VS Code + Salesforce Extension Pack + Claude Code 확장을 사용할 것.** 설정은 대부분 Setup 화면(웹)에서 하지만, 그 결과를 `sf project retrieve`로 받아 diff를 확인할 때 VS Code가 유리하다.
2. QA 체크리스트는 **00_PRODUCT_GUIDE의 Demo Day 성공 기준**과 **01_PERSONAS의 각 페르소나 성공 정의**를 기준으로 작성 — 임의의 테스트케이스를 추가하기보다 이 두 문서에서 도출할 것.
3. **인증 기능을 임의로 설계하거나 앞당겨 만들지 않는다.** MVP는 Entry Code로 끝입니다. Salesforce 로그인 화면, Guest User, Experience Cloud Site 같은 걸 "나중에 필요할 것 같아서" 지금 만들지 않습니다. 실제 인증이 필요해지는 시점이 오면 그때 별도 결정을 거칩니다 (`../docs/07_DECISIONS.md`).
4. 연동 계정 권한 변경은 Integration Lead·Org PO와 합의 후 진행.

## 하지 않을 것

- **Salesforce 로그인, Guest User, Experience Cloud Site를 이번 스코프에 만들지 않는다.** 인증은 의도적으로 미뤄졌습니다 (`../docs/00_PRODUCT_GUIDE.md` §5 Out 참조).
- 연동 계정 권한을 "일단 넓게 열고 나중에 좁히기" 방식으로 설정하지 않는다 — 처음부터 필요한 최소 범위만.
- QA에서 발견한 버그를 이 문서에만 적고 각 트랙 담당자에게 알리지 않는 일이 없도록 한다 (일일 스탠드업/Show & Tell에서 공유).

## 헷갈리면

권한 범위나 QA 우선순위가 애매하면 **혼자 정하지 말고 PM·Org PO·Integration Lead와 상의.**
