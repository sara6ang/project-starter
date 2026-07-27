# CLAUDE.md — Tongss 루트 (팀 공통 규칙)

> AI 툴(Claude 등)이 이 프로젝트에서 작업할 때 항상 먼저 읽어야 하는 문서입니다.
> 스택별 세부 규칙은 `TongssApp/CLAUDE.md`, `TongssOrg/CLAUDE.md`를 각각 참고하세요 (3층 구조).

---

## 이 프로젝트가 무엇인가

Tongss — F&B 매장 운영 매뉴얼/재고/직원 관리 앱. 5.5주 부트캠프 프로젝트, 팀 5인 전원 비개발자, AI 툴로 개발.
왜 만드는지, 누구를 위해 만드는지 궁금하면 먼저 `docs/00_PRODUCT_GUIDE.md`와 `docs/01_PERSONAS.md`를 읽으세요. 코드를 만지기 전에 이 두 문서를 컨텍스트로 넣는 것을 권장합니다.

---

## 폴더 구조

전체 그림(파일 트리, 폴더=오너 매핑)은 `docs/05_PROJECT_TREE.md`를 참고. 요약하면 5개 최상위 폴더가 5개 역할과 1:1로 대응한다.

```
Tongss/
├── CLAUDE.md              # 이 파일
├── docs/                  # 공유 — PM 오너 — "무엇을, 왜" (스택 무관)
├── TongssApp/             # Store PO 오너 — 사장/직원용 (React 또는 HTML/CSS/JS)
│   ├── CLAUDE.md
│   └── docs/
├── TongssOrg/               # Org PO 오너 — 토스플레이스용 (Salesforce)
│   ├── CLAUDE.md
│   └── docs/
├── integration-lead/        # Integration Lead 오너 — TongssApp↔TongssOrg 연동 전담 문서
│   ├── CLAUDE.md
│   └── docs/
└── platform-lead/           # Platform Lead 오너 — org 권한/설정 + 전체 QA 전담 문서
    ├── CLAUDE.md
    └── docs/
```

> `integration-lead/`, `platform-lead/`는 TongssApp/TongssOrg 같은 별도 코드베이스가 아니다. 실제 코드는 각자 TongssApp 또는 TongssOrg 안에 들어가고, 이 두 폴더는 **두 스택을 가로지르는 역할이라 어느 한쪽 docs에도 속하기 애매한 문서**의 자리다 (자세한 이유는 05_PROJECT_TREE.md).

## docs 번호 규칙

`docs/`(공유)는 아래 8개 문서로 구성됩니다.

| 번호 | 공유 (`docs/`) |
|---|---|
| 00 | PRODUCT_GUIDE — 왜 만드는지 + 뭘 만드는지 (스코프 포함) |
| 01 | PERSONAS — 사용자 4종 |
| 02 | USER_FLOW — 전체 여정 (두 스택을 가로지르는 흐름) |
| 03 | PROJECT_GUIDE — 일정 + 팀 협업 규칙 |
| 04 | DATA_CONTRACT — 두 시스템 간 데이터 정의 |
| 05 | PROJECT_TREE — 리포지토리 전체 큰 그림 |
| 06 | VOICE_AND_TONE — UX 라이팅 원칙 |
| 07 | DECISIONS — 의사결정 기록 (전 스택 공통) |

⚠️ TongssOrg 스택 docs(03~07번)는 위 공유 번호와 1:1로 대응하지 않습니다. 헷갈리면 번호보다 문서 제목으로 찾으세요.

---

## AI 툴 사용 규칙 (요약 — 전체는 `docs/03_PROJECT_GUIDE.md` §5)

1. **작업 시작 전 docs 먼저.** 코드를 시키기 전에 해당 스택의 CLAUDE.md와 관련 docs(특히 05번 데이터 정의)를 컨텍스트로 제공하세요.
2. **이해 못 한 코드는 커밋하지 않습니다.** AI에게 설명을 요청하거나 금요일 Show & Tell에서 질문하세요.
3. **데이터 계약(04_DATA_CONTRACT)이 진실입니다.** AI가 임의로 필드를 추가/변경하면 계약 문서 기준으로 되돌리세요. 계약을 바꿔야 한다면 코드가 아니라 문서부터 고칩니다.
4. **트랙을 넘는 결정은 `docs/07_DECISIONS.md`에 기록.** 스택 선택, 데이터 계약 변경, 스코프 컷 등은 반드시 문서로 남깁니다.
5. **스코프 판단 기준은 Demo Day 한 줄 시나리오입니다** (00_PRODUCT_GUIDE 참조): "사장이 매뉴얼 등록 → 직원이 봄 → 토스 쪽이 org에서 확인". 여기 기여하지 않는 기능은 우선순위가 아닙니다.

---

## 이 문서를 누가 관리하는가

Sara (PM). 루트 규칙 변경 시 `docs/07_DECISIONS.md`에 이유를 기록하세요. 각 트랙 리드는 자기 스택의 CLAUDE.md를 관리합니다 (아론 → TongssApp, 은영 → TongssOrg).