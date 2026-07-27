# platform-lead/docs/02_ARCHITECTURE_DECISIONS — Architecture Decision Records (ADR)

> **문서 소유권:** 최종 수정 권한은 **Platform Lead(혜준)**, PM(Sara)과 협의.
> `01_PERMISSIONS.md`가 "지금 뭘 해야 하는가"(원칙 + 실제 설정값)를 다룬다면, 이 문서는 **"왜 그렇게 정했고, 그 대가는 무엇인가"**를 다룹니다. 둘은 서로를 대체하지 않습니다.
> 새 ADR을 추가할 때는 아래 Golden Rule을 먼저 통과시키세요.

---

## Golden Rule

> **Platform exists to protect product simplicity.**
> If a platform decision makes the MVP significantly more complex without validating customer value, the platform decision is probably premature.

새 플랫폼 결정을 검토할 때 항상 이 질문으로 돌아옵니다: *"이 결정이 MVP를 눈에 띄게 복잡하게 만드는데, 그만큼 고객 가치를 검증해주는가?"* 아니라면 아직 이르다는 뜻입니다.

---

## ADR-001 — Authentication is intentionally postponed

**Decision**
Tongss MVP does not implement authentication. Users enter through an Entry Code (`S01O`, `S01E01`, etc.) — TongssApp looks up Store and Role directly, without a login system.

**Why**
Authentication does not validate the core product hypothesis. The MVP aims to validate:
- Manual creation
- Employee workflow
- AI-assisted operations

before implementing authentication.

**Consequences**

| Pros | Cons |
|---|---|
| Faster development | Not production-ready |
| Simpler architecture | No real user identity — anyone with a code can act as that role |
| Easier demos | |

**Future**
Authentication can be introduced later without changing the `TongssApp → Integration → TongssOrg` architecture. See `01_PERMISSIONS.md` §미래 인증 도입 시 체크리스트.

---

## ADR-002 — Salesforce is not the frontend

**Decision**
Salesforce stores operational data. TongssApp owns the user experience.

**Why**
TongssOrg's job is to be "a mirror of TongssApp's state" for 박세일즈, not a screen for 사장·직원 (`../../docs/00_PRODUCT_GUIDE.md`, `TongssOrg/docs/01_OBJECT_MODEL.md`). If Salesforce became the store/employee-facing UI, every employee would need a Salesforce license, Experience Cloud complexity, and TongssApp would lose the "3초 안에 보는 화면" mobile-first freedom the product needs.

**Consequences**

| Pros | Cons |
|---|---|
| TongssApp moves fast and cheap (plain HTML/CSS/JS, no per-user Salesforce license) | Two codebases to keep in sync |
| Store PO fully controls UX without Salesforce constraints | An integration layer is required (`integration-lead/`) |

**Future**
If a future version needs Salesforce-native experiences (e.g., 박세일즈 acting on alerts inside org), that's additive on the Org side — it doesn't replace TongssApp as the store/employee frontend.

---

## ADR-003 — Data ownership: operational data vs. working state

**Decision**
Store operational data belongs in TongssOrg. Temporary UI/working state belongs in TongssApp.

**Why**
Matches the existing decision in `TongssOrg/docs/01_OBJECT_MODEL.md`: "매뉴얼/체크리스트 원본 데이터는 org에 저장하지 않는다 — 집계 필드만." TongssApp holds the working data (manual content, checklist items, today's state); TongssOrg holds only the aggregated, durable signal (`../../docs/04_DATA_CONTRACT.md`).

**Consequences**

| Pros | Cons |
|---|---|
| No duplicate content management | TongssOrg alone can't answer "what did manual X say" — by design |
| Data contract stays small and stable | Any future need for raw content in org requires a new, explicit contract change |

**Future**
If TongssOrg ever needs raw content (e.g., compliance/audit trail), that's a deliberate contract addition via `../../docs/07_DECISIONS.md` — never an implicit side effect of a code change.

---

## ADR-004 — Collect data only for actionable insight

**Decision**
We collect data only if it leads to actionable insights for Sales (박세일즈) or Customer Success.

**Why**
Consistent with how `04_DATA_CONTRACT.md` already treats `low_stock_alert_count` as "Nice-to-have, 1순위 컷 후보" — it exists only if there's a Sales/CS action behind it (매장에 연락, 부가서비스 제안 등). This prevents scope creep of "let's also track X" without a clear consumer of that number.

**Consequences**

| Pros | Cons |
|---|---|
| Contract and org schema stay minimal | Some potentially interesting data (e.g., per-manual view counts) won't be collected in MVP |
| Every field has a named reason to exist | Requires discipline to say no to "nice to have" tracking |

**Future**
Before adding a new field to `04_DATA_CONTRACT.md`, answer: *"What will 박세일즈 or CS do differently because of this number?"* If there's no answer, don't add the field yet.

---

## 새 ADR을 추가하는 법

```markdown
## ADR-00N — 제목

**Decision**

**Why**

**Consequences**
| Pros | Cons |
|---|---|

**Future**
```

트랙을 넘는 영향이 있는 ADR은 `../../docs/07_DECISIONS.md`에도 요약을 남기세요.
