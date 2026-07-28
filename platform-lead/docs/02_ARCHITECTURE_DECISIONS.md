# platform-lead/docs/02_ARCHITECTURE_DECISIONS — 아키텍처 결정 기록 (ADR)

> **문서 소유권:** 최종 수정 권한은 **Platform Lead(혜준)**, PM(Sara)과 협의합니다.
> `01_PERMISSIONS.md`가 "지금 뭘 해야 하는가"(원칙 + 실제 설정값)를 다룬다면, 이 문서는 **"왜 그렇게 정했고, 그 대가는 무엇인가"**를 다룹니다. 두 문서는 서로를 대체하지 않습니다.
> 새 ADR(Architecture Decision Record, 아키텍처 결정 기록)을 추가할 때는 아래 골든 룰을 먼저 통과시키세요.

---

## 골든 룰 (Golden Rule)

> **플랫폼은 제품의 단순함을 지키기 위해 존재합니다.**
> 어떤 플랫폼 결정이 고객 가치를 검증해주는 것도 없이 MVP를 눈에 띄게 복잡하게 만든다면, 그 결정은 아마 너무 이른 결정입니다.

새 플랫폼 결정을 검토할 때 항상 이 질문으로 돌아오세요: *"이 결정이 MVP를 눈에 띄게 복잡하게 만드는데, 그만큼 고객 가치를 검증해주는가?"* 아니라면 아직 이르다는 뜻입니다.

당장 완벽한 아키텍처를 만들 필요는 없습니다. ¡No problemo! 지금은 MVP니까요. 🌮

---

## ADR-001 — 인증은 의도적으로 미룬다 (Authentication is Intentionally Postponed)

**결정 (Decision)**
Tongss MVP는 인증(Authentication)을 구현하지 않습니다. 사용자는 입장 코드(Entry Code, 예: `S01O`, `S01E01`)로 들어옵니다 — TongssApp이 로그인 시스템 없이 매장과 역할을 바로 조회합니다.

**이유 (Why)**
인증은 이 제품의 핵심 가설을 검증해주지 않습니다. MVP가 검증하려는 건 다음 세 가지입니다.
- 매뉴얼 작성
- 직원 업무 흐름
- AI 기반 운영 지원

인증을 구현하기 전에 이것부터 검증합니다.

**결과 (Consequences)**

| 장점 | 단점 |
|---|---|
| 개발 속도가 빠름 | 실제 서비스에 바로 쓸 수준은 아님 |
| 아키텍처가 단순함 | 진짜 사용자 신원 확인이 없음 — 코드만 있으면 누구나 그 역할로 행동 가능 |
| 데모하기 쉬움 | |

**다음 (Future)**
인증은 `TongssApp → Integration → TongssOrg` 구조를 바꾸지 않고도 나중에 추가할 수 있습니다. `01_PERMISSIONS.md`의 "미래 인증 도입 시 체크리스트" 참고.

---

## ADR-002 — Salesforce는 프론트엔드가 아니다 (Salesforce is Not the Frontend)

**결정 (Decision)**
Salesforce는 운영 데이터(Operational Data)를 저장하고, TongssApp이 사용자 경험(UX)을 책임집니다.

**이유 (Why)**
TongssOrg의 역할은 박세일즈를 위해 "TongssApp 상태를 비추는 거울"이 되는 것이지(`../../docs/00_PRODUCT_GUIDE.md`, `TongssOrg/docs/01_OBJECT_MODEL.md`), 사장님·직원을 위한 화면이 아닙니다. 만약 Salesforce가 매장·직원용 화면까지 맡는다면, 직원 한 명 한 명마다 Salesforce 라이선스가 필요해지고 Experience Cloud만큼 복잡해집니다. 그러면 TongssApp이 지켜야 할 "3초 안에 보는 화면"이라는 모바일 우선(Mobile-first) 자유도를 잃게 됩니다.

**결과 (Consequences)**

| 장점 | 단점 |
|---|---|
| TongssApp을 빠르고 저렴하게 만들 수 있음 (순수 HTML/CSS/JS, 직원당 Salesforce 라이선스 불필요) | 두 코드베이스를 계속 맞춰야 함 |
| Store PO가 Salesforce 제약 없이 UX를 완전히 통제 | 통합(Integration) 레이어가 별도로 필요 (`integration-lead/`) |

**다음 (Future)**
나중에 Salesforce 안에서 직접 처리하는 화면이 필요해지면(예: 박세일즈가 org 안에서 알림에 바로 대응) — 그건 Org 쪽에 더하는 것이지, TongssApp을 매장·직원용 프론트엔드 자리에서 밀어내는 게 아닙니다.

---

## ADR-003 — 데이터 소유권: 운영 데이터 vs 작업 상태 (Operational Data vs. Working State)

**결정 (Decision)**
매장의 운영 데이터(Operational Data)는 TongssOrg가 갖고, 임시로 쓰이는 작업 상태(Working State)는 TongssApp이 갖습니다.

**이유 (Why)**
`TongssOrg/docs/01_OBJECT_MODEL.md`에 이미 있는 결정과 같습니다: "매뉴얼·체크리스트 원본 데이터는 org에 저장하지 않는다 — 집계 필드만." TongssApp은 실제로 작업이 이뤄지는 데이터(매뉴얼 내용, 체크리스트 항목, 오늘의 진행 상태)를 갖고, TongssOrg는 그중 오래 남아야 하는 집계 신호만 갖습니다 (`../../docs/04_DATA_CONTRACT.md`).

**결과 (Consequences)**

| 장점 | 단점 |
|---|---|
| 콘텐츠를 이중으로 관리하지 않아도 됨 | TongssOrg만 봐서는 "매뉴얼 X에 뭐라고 적혀 있는지" 알 수 없음 — 의도된 설계 |
| 데이터 계약(Data Contract)이 작고 안정적으로 유지됨 | 나중에 org에 원본 콘텐츠가 필요해지면 계약을 새로 바꿔야 함 |

**다음 (Future)**
TongssOrg에 원본 콘텐츠가 필요해지는 순간이 온다면(예: 컴플라이언스·감사 기록) — 그건 `../../docs/07_DECISIONS.md`를 거치는 명시적인 계약 추가여야지, 코드 수정의 부수 효과로 조용히 생겨서는 안 됩니다.

---

## ADR-004 — 실행 가능한 인사이트가 있을 때만 데이터를 수집한다 (Collect Data Only for Actionable Insight)

**결정 (Decision)**
Sales(박세일즈)나 Customer Success(고객 성공)에 실행 가능한 인사이트(Actionable Insight)를 주는 데이터만 수집합니다.

**이유 (Why)**
실제로 `04_DATA_CONTRACT.md`에서 `low_stock_alert_count`를 Sales Summary Contract(요약 데이터 계약)에서 뺀 것과 같은 논리입니다 — 이 숫자는 Sales의 어떤 질문에도 답하지 않았고(박세일즈가 이걸로 딱히 할 수 있는 행동이 없음), "있으면 좋으니까" 남겨두는 대신 아예 뺐습니다. 이 원칙 덕분에 "이것도 같이 추적하자"는 식의 스코프 확장을 막을 수 있습니다 — 그 숫자를 누가 실제로 쓸지가 분명하지 않다면요.

**결과 (Consequences)**

| 장점 | 단점 |
|---|---|
| 계약과 org 스키마가 최소한으로 유지됨 | 매뉴얼별 조회수처럼, 흥미로울 수 있는 데이터를 MVP에서는 안 모음 |
| 모든 필드가 존재하는 이유를 설명할 수 있음 | "있으면 좋잖아" 식의 추적 요청을 거절할 규율이 필요함 |

**다음 (Future)**
`04_DATA_CONTRACT.md`에 새 필드를 추가하기 전에 항상 먼저 답하세요: *"이 숫자 때문에 박세일즈나 CS가 뭘 다르게 할 수 있는가?"* 답이 없으면 아직 추가할 때가 아닙니다.

---

## 새 ADR을 추가하는 법

```markdown
## ADR-00N — 제목 (Title in English)

**결정 (Decision)**

**이유 (Why)**

**결과 (Consequences)**
| 장점 | 단점 |
|---|---|

**다음 (Future)**
```

트랙을 넘는 영향이 있는 ADR은 `../../docs/07_DECISIONS.md`에도 요약을 남기세요.

문서는 여기까지입니다. 새 ADR이 생기면 계속 추가해주세요 — ¡vamos! 🌮
