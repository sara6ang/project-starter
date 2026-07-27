# TongssOrg/CLAUDE.md

> **문서 소유권:** 이 파일의 최종 수정 권한은 **Org PO(은영)**에게 있습니다. PM(Sara)이 초안을 제시하고, 은영님이 검토·확정·수정합니다.
> 루트 규칙은 `../CLAUDE.md` 참조 (docs 번호 체계, 팀 공통 AI 규칙).

---

## 이 Repository는 TongssApp과 역할이 다릅니다

TongssApp이 "화면(UI)"을 만드는 프로젝트라면, **TongssOrg는 Salesforce Org 자체를 만드는 프로젝트입니다.**

우리는 다음을 중심으로 개발합니다.

- **Object** — 데이터가 어떤 형태로 존재하는가
- **Field** — 그 안에 어떤 정보를 담는가
- **Flow** — 어떤 자동화가 일어나는가
- **Validation Rule** — 어떤 데이터는 막아야 하는가
- **Permission** — 누가 뭘 볼 수 있는가
- **Report / Dashboard** — 숫자로 어떻게 보여주는가

**UI 구현보다 비즈니스 로직과 데이터 구조가 우선입니다.** 화면(List View, Record Page 배치 등)은 대부분 Salesforce 표준 기능과 클릭 설정으로 해결되고, 커스텀 코드가 필요한 부분은 최소화합니다.

---

## 이 문서는 4명을 위한 문서입니다

TongssApp이 "사람 vs AI" 2분류였다면, TongssOrg는 역할이 하나 더 있습니다 — **결정하는 사람과 실제로 손으로 만드는 사람이 다를 수 있기 때문**입니다. 각 문서·섹션 앞에 아래 4개 중 누가 읽는 내용인지 표시합니다.

| 표시 | 누구 | 무엇을 하는가 |
|---|---|---|
| 👤 | **Org PO (은영)** | 무엇을 만들지 결정 (Object·Field·Relationship·Record Type 여부) |
| 🤖 | **Claude Code** | Metadata 생성 (Setup 클릭 결과를 코드로 저장하거나, 코드 초안을 제안) |
| 👨‍💻 | **Salesforce Developer (은영/혜준)** | 실제 구현 (Setup 클릭, Flow Builder, Apex 작성) — Object/Field 설계는 은영, 권한·Layout·Flow·Org 설정은 혜준이 주로 손으로 만듭니다 |
| 👀 | **PM (Sara)** | 리뷰 (트랙을 넘는 결정인지, 데이터 계약과 맞는지 확인) |

> Salesforce는 "코드를 짜서 배포"가 기본이 아니라 **"Setup 화면에서 클릭으로 만들고, 그 결과를 코드로 받아온다(retrieve)"**는 점이 TongssApp과 가장 다른 점입니다. 그래서 🤖 Claude Code의 역할도 "처음부터 코드를 생성"이 아니라 "클릭으로 만든 결과물(Metadata)을 정리·검증"인 경우가 많습니다.

---

## 👤 Org PO가 결정할 때 먼저 볼 것

1. `../docs/00_PRODUCT_GUIDE.md` — 왜 만드는지, 뭘 만드는지 (5분 요약)
2. `docs/01_OBJECT_MODEL.md` — 지금 어떤 Object가 있고 왜 그렇게 정했는지
3. `docs/02_FIELD_GUIDE.md` — 이미 있는 필드인지 (새로 만들기 전에 확인)
4. `../docs/04_DATA_CONTRACT.md`(shared) — TongssApp과 주고받는 필드의 유일한 진실

## 🤖 Claude Code 작업 규칙

새 Object/Field/Flow를 만들거나 코드를 정리하기 전에 확인:
1. `docs/01_OBJECT_MODEL.md` — Object 구조가 이미 정해져 있는지
2. `docs/02_FIELD_GUIDE.md` — 필드가 이미 있는지 (재사용 우선, 새로 안 만들기)
3. `docs/03_RELATIONSHIP.md` — 다른 Object와의 관계 규칙
4. `docs/04_FLOW.md`, `docs/06_AUTOMATION.md` — 자동화가 Flow인지 Apex인지 이미 정해져 있는지
5. `docs/05_PERMISSION.md` — 새 필드는 어떤 권한 세트에 노출해야 하는지
6. **`../docs/04_DATA_CONTRACT.md`(shared)에 없는 필드를 org에 임의로 추가/변경하지 않는다.**

## 👨‍💻 Salesforce Developer(은영/혜준)가 구현할 때

1. 가급적 **VS Code + Salesforce Extension Pack(SFDX) + Claude Code 확장**을 사용하세요. Setup에서 클릭으로 만든 결과를 `sf project retrieve`로 받아와 diff로 확인하면, 뭐가 바뀌었는지 파악하기 쉽습니다.
2. **책임 분담** (설계와 세팅은 분리하지 않고 함께 진행):

| 작업 | Org PO (은영) | Salesforce Developer 역할 중 혜준 담당 |
|---|:---:|:---:|
| Object / Field / Relationship 설계 | ✅ 책임 | 🤝 구현 관점 검토 |
| Record Type 필요 여부 | ✅ 책임 | 🤝 구현 |
| Validation Rule | 🤝 | ✅ 책임 |
| Page Layout / Permission Set / Profile·Sharing | | ✅ 책임 |
| Flow | 🤝 | ✅ 책임 |
| Org 설정 전반 | | ✅ 책임 |

**✅ 책임** = 결정권과 문서 기록 책임 / **🤝** = 함께 논의, 결정은 책임자가. 상세 근거는 `docs/01_OBJECT_MODEL.md`, `docs/05_PERMISSION.md` 참조.

3. 새 Object/Field가 필요해 보이면 혼자 만들지 말고 Org PO(은영)와 먼저 상의하세요.

## 👀 PM이 리뷰할 때 보는 것

- 트랙을 넘는 결정(데이터 계약 변경 등)이 `../docs/07_DECISIONS.md`에 기록됐는가
- `../docs/04_DATA_CONTRACT.md`와 TongssOrg 필드가 어긋나지 않는가
- Demo Day 한 줄 시나리오(`../docs/00_PRODUCT_GUIDE.md` §3)에 필요한 최소 범위만 만들고 있는가

---

## 하지 않을 것

- `../docs/04_DATA_CONTRACT.md`에 없는 필드를 임의로 추가/변경하지 않는다.
- 표준 List View / Lightning Record Page로 되는 화면을 커스텀 LWC로 새로 만들지 않는다 (`docs/06_AUTOMATION.md` 체크리스트 참조).
- Custom Object를 이유 없이 추가하지 않는다 — 이번 스코프는 Account 필드 확장만으로 충분하다는 게 현재 결정이다 (`docs/01_OBJECT_MODEL.md`).
- TongssApp 연동 권한을 "일단 넓게 열고 나중에 좁히기" 방식으로 열지 않는다 (`docs/05_PERMISSION.md`).

## 헷갈리면

작업 방향이 애매하면 **혼자 결정하지 말고 Org PO(또는 PM)에게 먼저 물어본다.** 특히:
- Object/Field를 새로 만들어야 할 것 같을 때
- Flow로 할지 Apex로 할지 애매할 때
- `../docs/04_DATA_CONTRACT.md`에 없는 데이터를 주고받아야 할 것 같을 때

---

## 문서 전체 목록

```
TongssOrg/docs/
├── 01_OBJECT_MODEL.md        👤 어떤 Object가 있고 왜 그런지
├── 02_FIELD_GUIDE.md         👤🤖 필드 목록·API 이름·화면 표시 위치
├── 03_RELATIONSHIP.md        👤 Object 간 관계 (ERD)
├── 04_FLOW.md                👨‍💻🤖 선언형 자동화(Flow) 목록
├── 05_PERMISSION.md          👨‍💻👀 누가 뭘 볼 수 있는가, 외부(TongssApp) 접근 권한
├── 06_AUTOMATION.md          🤖👨‍💻 Apex/LWC 등 코드 구현, Flow vs Apex 결정 기준
└── 07_REPORT_DASHBOARD.md    👤👀 박세일즈·박오너가 보는 리포트/대시보드
```

> ⚠️ `00/01/02`(WHY/PERSONAS/PRD) 문서는 여기 두지 않습니다 — shared `../docs/00_PRODUCT_GUIDE.md`, `01_PERSONAS.md`가 이미 그 역할을 합니다. `07_DECISIONS`, `03_PROJECT_GUIDE`도 shared 전용이라 여기 없습니다. (TongssApp과 달리 이 스택은 01번부터 시작합니다 — App은 화면 흐름이 03번부터 시작해서 번호를 맞췄지만, Org는 Object 모델이 그 자리를 대신합니다. 헷갈리면 번호보다 문서 제목으로 찾으세요.)

## 문서 소유권 원칙

이 CLAUDE.md를 포함한 `TongssOrg/docs/` 전체의 **최종 수정 권한은 Org PO**에게 있습니다. PM(Sara)은 초안과 가이드라인을 제시하지만, 확정·변경은 Org PO의 몫입니다. 트랙을 넘는 결정(데이터 계약 변경 등)은 `../docs/07_DECISIONS.md`에 기록합니다.
