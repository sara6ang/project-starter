# 05_PROJECT_TREE — 전체 리포지토리 지도

> 오너: Sara
> "이 프로젝트에 폴더가 몇 개고, 누구 것인지"에 답하는 문서입니다. 코드 레벨 폴더 규칙은 각 스택의 `06_ARCHITECTURE.md`를 보세요 — 여긴 리포지토리 전체를 한눈에 보여주는 지도입니다.

---

## 전체 트리

```
Tongss/
├── CLAUDE.md                      # 팀 공통 규칙
│
├── docs/                          # 🔵 shared — PM(Sara) 오너 — "무엇을, 왜"
│   ├── 00_PRODUCT_GUIDE.md
│   ├── 01_PERSONAS.md
│   ├── 02_USER_FLOW.md
│   ├── 03_PROJECT_GUIDE.md
│   ├── 04_DATA_CONTRACT.md
│   ├── 05_PROJECT_TREE.md         # 이 문서
│   ├── 06_VOICE_AND_TONE.md
│   └── 07_DECISIONS.md
│
├── archive/                       # ⚪ 참고 자료 — 개발에 필요 없음
│   ├── 01_WHY_RESEARCH.md
│   ├── 02_COMPETITOR_RESEARCH.md
│   ├── 03_INTERVIEW_NOTES.md
│   ├── 04_INITIAL_IDEAS.md
│   └── GLOSSARY.md
│
├── TongssApp/                     # 🟠 Store PO(아론) 오너 — 사장/직원용
│   ├── CLAUDE.md
│   ├── docs/
│   │   ├── 03_USER_FLOW.md
│   │   ├── 04_COMPONENT_MAP.md
│   │   ├── 05_DATA.md
│   │   ├── 06_ARCHITECTURE.md
│   │   └── 07_DESIGN_SYSTEM.md
│   └── (pages/, assets/, data/, design-system/ 등)
│
├── TongssOrg/                     # 🔷 Org PO(은영) 오너 — 토스플레이스 실무자용 (Salesforce)
│   ├── CLAUDE.md
│   ├── docs/
│   │   ├── 03_USER_FLOW.md
│   │   ├── 04_COMPONENT_MAP.md
│   │   ├── 05_DATA.md
│   │   ├── 06_ARCHITECTURE.md
│   │   └── 07_DESIGN_SYSTEM.md
│   └── force-app/
│
├── integration-lead/               # 🟣 Integration Lead(승우) 오너 — 연동 전담
│   ├── CLAUDE.md
│   └── docs/
│       ├── ENVIRONMENTS.md
│       ├── INTEGRATION_CHECKLIST.md
│       └── TROUBLESHOOTING.md
│
└── platform-lead/                  # 🟤 Platform Lead(혜준) 오너 — org 권한/설정 + QA
    ├── CLAUDE.md
    └── docs/
        ├── PERMISSIONS.md
        ├── QA_CHECKLIST.md
        └── TEST_PLAN.md
```

---

## 폴더 = 오너 매핑

| 폴더 | 오너 | 성격 |
|---|---|---|
| `docs/` | Sara (PM) | 왜·누구를 위해·무엇을·언제 — 전 트랙 공통 |
| `archive/` | Sara (PM) | 개발과 무관한 조사 자료 |
| `TongssApp/` | 아론 (Store PO) | 사장·직원용 제품 코드 + 문서 |
| `TongssOrg/` | 은영 (Org PO) | 토스플레이스용 Salesforce 코드 + 문서 |
| `integration-lead/` | 승우 | TongssApp·TongssOrg 연동 자체에 대한 문서 (별도 코드베이스 없음) |
| `platform-lead/` | 혜준 | org 권한/설정 + 전체 QA 문서 (별도 코드베이스 없음) |

`integration-lead/`, `platform-lead/`의 실제 코드는 TongssApp 또는 TongssOrg 안에 들어갑니다. 이 두 폴더는 **두 스택을 가로지르는 역할**이라 어느 한쪽 docs에도 자연스럽게 속하지 않는 문서의 자리입니다.

---

## 문서 소유권 원칙

각 폴더의 최종 수정 권한은 그 폴더의 오너에게 있습니다. Sara는 전 폴더에 초안·가이드라인을 제시할 수 있지만, 확정은 오너의 몫입니다. 트랙을 넘는 결정은 `07_DECISIONS.md`에 기록합니다.
