# docs/06_PROJECT_TREE — 전체 리포지토리 큰 그림

> 오너: PM / 상태: 초안
> ⚠️ 이 문서는 **shared 06번 자리**에 들어간다. TongssApp/TongssOrg의 06_ARCHITECTURE.md(코드 레벨 폴더 규칙)와는 다르다 — 여기는 **리포지토리 전체를 한눈에 보여주는 지도**다. "이 파일이 어느 폴더에 있어야 하지?"보다 "이 프로젝트에 폴더가 몇 개고 누구 것인지"에 답하는 문서.

---

## 전체 트리

```
Tongss/
├── CLAUDE.md                      # 팀 공통 규칙 (docs 번호 체계, AI 사용 규칙)
│
├── docs/                          # 🔵 shared — PM 오너 — "무엇을, 왜" (스택 무관)
│   ├── 00_WHY.md
│   ├── 01_PERSONAS.md
│   ├── 02_PRD.md
│   ├── 03_USER_FLOW.md
│   ├── 04_ROADMAP.md
│   ├── 05_DATA_CONTRACT.md
│   ├── 06_PROJECT_TREE.md         # 이 문서
│   ├── 07_VOICE_AND_TONE.md
│   ├── 08_DECISIONS.md
│   └── 09_TEAM_GUIDE.md
│
├── TongssApp/                     # 🟠 Store PO 오너 — 사장/직원용 (React 또는 HTML/CSS/JS)
│   ├── CLAUDE.md
│   ├── docs/
│   │   ├── 03_USER_FLOW.md
│   │   ├── 04_COMPONENT_MAP.md
│   │   ├── 05_DATA.md
│   │   ├── 06_ARCHITECTURE.md
│   │   └── 07_DESIGN_SYSTEM.md
│   └── (pages/, assets/, data/, design-system/ 등)
│
├── TongssOrg/                       # 🔷 Org PO 오너 — 박세일즈용 (Salesforce)
│   ├── CLAUDE.md
│   ├── docs/
│   │   ├── 03_USER_FLOW.md
│   │   ├── 04_COMPONENT_MAP.md
│   │   ├── 05_DATA.md
│   │   ├── 06_ARCHITECTURE.md
│   │   └── 07_DESIGN_SYSTEM.md
│   └── force-app/
│
├── integration-lead/               # 🟣 Integration Lead 오너 — TongssApp ↔ TongssOrg 연동 전담
│   ├── CLAUDE.md
│   └── docs/
│       ├── ENVIRONMENTS.md         # 배포 도메인, 엔드포인트, CORS 등록 현황
│       ├── INTEGRATION_CHECKLIST.md # 연동 착수 전/중/후 체크리스트
│       └── TROUBLESHOOTING.md       # 만난 벽과 해결법 기록 (Guest User, CORS 등)
│
└── platform-lead/                  # 🟤 Platform Lead 오너 — org 설정/권한 + QA 전담
    ├── CLAUDE.md
    └── docs/
        ├── PERMISSIONS.md          # 권한 세트, Guest User 프로필 범위
        ├── QA_CHECKLIST.md         # Demo Day 한 줄 시나리오 기준 QA 체크리스트
        └── TEST_PLAN.md            # Week 4 QA 주간 테스트 계획
```

---

## 폴더 = 오너 매핑 (5개 역할, 5개 폴더)

| 폴더 | 오너 | 성격 |
|---|---|---|
| `docs/` (shared) | PM | 왜, 누구를 위해, 무엇을, 언제 — 전 트랙 공통 |
| `TongssApp/` | Store PO | 사장·직원용 제품 코드 + 문서 |
| `TongssOrg/` | Org PO | 토스플레이스용 Salesforce 코드 + 문서 |
| `integration-lead/` | Integration Lead | TongssApp·TongssOrg 어디에도 속하지 않는, **연동 자체에 대한** 문서 |
| `platform-lead/` | Platform Lead | org 권한/설정 + 전체 제품 QA에 대한 문서 |

`integration-lead/`, `platform-lead/`는 TongssApp이나 TongssOrg처럼 별도 코드베이스를 갖지 않는다(실제 코드는 각자 TongssApp 또는 TongssOrg 안에 들어간다). 대신 **두 스택을 가로지르는 역할이라 어느 한쪽 docs에도 자연스럽게 속하지 못하는 문서**를 위한 자리다.

---

## 왜 이 두 폴더가 필요한가

- Integration Lead는 TongssApp의 API 호출 코드와 TongssOrg의 Apex REST 코드를 둘 다 만지지만, "그 연동 자체가 지금 어떤 상태인지, 어떤 벽을 만났었는지"는 TongssApp/docs에도 TongssOrg/docs에도 어색하게 들어간다. 이번 프로젝트의 가장 큰 리스크(04_ROADMAP 리스크 레지스터 참조)를 다루는 역할이니 전용 공간이 있는 게 맞다.
- Platform Lead는 org 설정/권한(이건 TongssOrg 쪽 일)과 Week 4~5의 전체 제품 QA(이건 TongssApp+TongssOrg를 가로지르는 일)를 겸한다. QA는 특정 스택 소유가 아니라 "제품 전체가 한 줄 시나리오대로 도는가"를 보는 일이라 별도 폴더가 자연스럽다.

---

## 문서 소유권 원칙 (전체 공통)

각 폴더의 최종 수정 권한은 그 폴더의 오너에게 있다. PM은 전 폴더에 초안·가이드라인을 제시할 수 있지만, 확정은 오너의 몫이다. 트랙을 넘는 결정은 `docs/08_DECISIONS.md`에 기록한다 (09_TEAM_GUIDE §6).