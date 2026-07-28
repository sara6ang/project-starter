# 04_DATA_CONTRACT — Sales Summary Contract (TongssApp → TongssOrg)

> 오너: Sara / 상태: 초안 — Week 2에 아론(TongssApp) + 은영(TongssOrg) + 승우(Integration)와 필드 레벨로 확정
> **이 문서는 두 시스템이 주고받는 데이터의 유일한 진실입니다.** 코드가 이 문서와 다르면 코드가 틀린 것입니다 (`03_PROJECT_GUIDE.md` 의사결정 규칙 참조).
> 근거: `00_PRODUCT_GUIDE.md` §4 (페르소나별 기능), `02_USER_FLOW.md` 3단계

---

## 이 문서가 무엇인가 (그리고 무엇이 아닌가)

> **이 문서는 TongssApp의 모든 데이터를 정의하는 문서가 아닙니다.**
> **Tongss Sales(박세일즈)가 고객(매장)의 상태를 확인하기 위해 필요한 요약(Summary) 데이터를, TongssApp에서 TongssOrg로 전달하기 위한 계약입니다.**

데이터를 보는 사람은 크게 4갈래입니다 — **① TongssApp**(사장·직원이 매일 씀), **② Product Admin**(Tongss 팀 내부 운영), **③ TongssOrg CRM**(토스플레이스의 고객 관계 관리), **④ Sales Dashboard**(박세일즈가 실제로 보는 화면). 이 문서는 이 중 **①에서 ④로 가는 딱 한 구간만** 다룹니다. ②, ③은 이 계약과 무관합니다 — 지금 스코프에 없습니다.

| 궁금한 것 | 이 문서가 아니라 여기를 보세요 |
|---|---|
| TongssApp이 다루는 데이터 전체 | `TongssApp/docs/05_DATA.md` |
| TongssOrg의 Object/Field 설계 이유 | `TongssOrg/docs/01_OBJECT_MODEL.md`, `02_FIELD_GUIDE.md` |
| 실제 API·연동 방식 | `integration-lead/docs/02_API_CONTRACT.md` |

이 문서는 위 세 가지의 **교집합 중에서도, Sales Dashboard에 실제로 필요한 요약 값만** 다룹니다.

---

## Raw Data vs Summary Data — 이 계약의 철학

**TongssApp에는 Raw Data가 있습니다:**
- 직원 (이름, Entry Code)
- 매뉴얼 (사진, 텍스트 내용)
- 체크리스트 (항목별 완료 기록)
- 재고 확인 (품목별 확인/부족 여부)
- 학습 이력 (누가 어떤 매뉴얼을 언제 봤는지)

**TongssOrg는 이 중 어느 것도 원본 그대로 저장하지 않습니다.** 직원 이름, 매뉴얼 내용, 체크리스트 항목, 재고 품목 목록 — 전부 TongssOrg에는 없습니다.

TongssOrg가 받는 건 딱 하나, **Sales가 매장 건강도를 판단하는 데 필요한 집계된 숫자(Summary)** 뿐입니다.

> "직원이 몇 명인지"는 필요해도 "직원이 누구인지"는 필요 없습니다.
> "체크리스트를 몇 % 완료했는지"는 필요해도 "체크리스트에 뭐라고 적혀있는지"는 필요 없습니다.

이 원칙이 지켜지는 한 TongssOrg 스키마는 Account 필드 몇 개로 충분합니다 (`TongssOrg/docs/01_OBJECT_MODEL.md` 참조) — Custom Object도, 원본 데이터 저장소도 필요 없습니다.

---

## 1. 전송 방식 (초안)

- **방향:** TongssApp → TongssOrg (단방향, org → TongssApp 역방향 없음)
- **방식:** Apex REST 엔드포인트 (`OrderRestService` 패턴 재활용)
- **인증:** 없음 — 로그인 없이 호출되는 공개 엔드포인트. **TongssApp 사용자의 Entry Code(`S01O` 등)와는 무관한 별개의 통로**입니다 — Entry Code는 사람이 앱에 들어가는 방식이고, 이 엔드포인트는 TongssApp 서버가 TongssOrg에 데이터를 보내는 통로입니다. 실제 구현 방식은 `TongssOrg/docs/05_PERMISSION.md`(Org 기술 상세), 연동 관점 요약은 `integration-lead/docs/02_API_CONTRACT.md` 참조
- **트리거 시점:** `[확인필요]` 이벤트 발생 즉시 vs 배치(일 1회) — 데모 목적상 즉시 전송을 우선 검토

---

## 2. 매장(Store) 식별자

두 시스템이 "같은 매장"임을 인식할 공통 키가 필요합니다.

| 필드명 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `store_id` | String | ✅ | TongssApp에서 생성한 매장 고유 ID. TongssOrg의 Account 레코드와 1:1 매핑 |

`[확인필요]` TongssOrg의 Account가 이미 존재하는 매장(실제 가맹점)과 매핑되는지, 데모용으로 신규 생성하는지 — Week 2 스파이크 전에 승우·은영이 결정

---

## 3. Sales Summary Contract — 핵심 KPI

### Sales가 실제로 던지는 질문 3가지

이 계약의 모든 필드는 아래 셋 중 하나에 답하기 위해 존재합니다. 답하지 못하는 필드는 계약에 없습니다.

| Sales의 질문 | 답이 되는 KPI |
|---|---|
| 이 매장은 최근에도 사용하고 있는가? | Last Activity, Weekly Active Staff, Is Active |
| 직원 교육이 잘 되고 있는가? | Manual Completion Rate, Checklist Completion Rate |
| 계약 연장이 위험한가? | Is Active, Last Content Update, Last Activity 추이 |

### 핵심 KPI (질문에 직접 답함)

| KPI | 필드명 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| Manual Completion Rate | `manual_completion_rate` | Decimal (0~1) | ✅ | 직원 전체의 매뉴얼 "다 봤어요" 완료율 |
| Checklist Completion Rate | `checklist_completion_rate` | Decimal (0~1) | ✅ | 오늘 오픈/마감 체크리스트 완료율 |
| Last Content Update | `last_manual_updated_at` | DateTime | ✅ | 마지막 매뉴얼 등록/수정 시각 — **콘텐츠**가 방치되고 있는지 판단 |
| Last Activity | `last_activity_at` | DateTime | ✅ | 매뉴얼 학습·체크리스트 완료·재고 확인 중 가장 최근 활동 시각 — **매장**이 실제로 쓰고 있는지 판단 (`last_manual_updated_at`과는 다른 질문에 답함) |
| Weekly Active Staff | `weekly_active_staff` | Integer | ⚠️ Nice-to-have | 최근 7일 내 하나 이상의 활동(학습/체크리스트/재고 확인)을 한 고유 직원 수 |
| Is Active | `is_active` | Boolean | ✅ | 방치 매장 판별 플래그. `last_activity_at` 기준으로 org가 계산할지, TongssApp이 직접 보낼지 `[확인필요]` |

### Context (참고 데이터 — 그 자체로 질문에 답하지 않음)

| KPI | 필드명 | 타입 | 필수 | 왜 "핵심"이 아닌가 |
|---|---|---|---|---|
| Store ID | `store_id` | String | ✅ | KPI가 아니라 두 시스템을 잇는 식별자 (§2) |
| Staff Count | `staff_count` | Integer | ⚠️ | "몇 명인지" 자체는 질문에 답 안 함 — Manual/Checklist Completion Rate를 해석할 때 곁들이는 참고 숫자 |
| Manual Count | `manual_count` | Integer | ⚠️ | 마찬가지로 "몇 개인지"는 답이 아니라 참고 |

### 이 계약에서 뺀 것

| KPI | 왜 뺐나 |
|---|---|
| Low Stock Alert Count | 계산은 쉽지만 **Sales의 질문이 아닙니다.** "재고가 부족한지"는 사장님(Owner Dashboard)이 이미 TongssApp 안에서 보고 있는 정보이고, 박세일즈가 이 숫자로 뭘 다르게 하지 않습니다 (`platform-lead/docs/02_ARCHITECTURE_DECISIONS.md` ADR-004). Product Admin 관점에서는 의미가 있을 수 있지만 이 문서(Sales 계약)의 범위가 아닙니다 |

### 이번 계약 밖 (Future KPI)

아래는 Sales가 원할 수 있는 KPI지만, **지금 TongssApp에 그 데이터를 만들 방법이 없어서** 이번 계약에 넣지 않습니다. 새 instrumentation이 필요한 항목은 별도 스코프 결정을 거쳐야 합니다 (`07_DECISIONS.md`).

| KPI | 왜 아직인가 |
|---|---|
| Average App Usage Time | TongssApp에 세션(접속 시간) 추적 자체가 없습니다. 새로 만들어야 하는 기능이라 이번 MVP 스코프 밖입니다 |
| Health Score (optional) | 위 지표들을 조합한 파생 점수입니다. TongssApp이 원본으로 보내는 값이 아니라 **TongssOrg에서 계산**해야 하는 값 — 계산식이 합의되면 그때 Account Formula/Flow로 추가합니다 |

---

## 4. 페이로드 예시 (초안)

```json
{
  "store_id": "store_001",
  "staff_count": 3,
  "manual_count": 5,
  "manual_completion_rate": 0.67,
  "checklist_completion_rate": 0.8,
  "last_manual_updated_at": "2026-08-10T09:00:00+09:00",
  "last_activity_at": "2026-08-12T18:00:00+09:00",
  "weekly_active_staff": 2
}
```

`[확인필요]` 필드를 하나의 페이로드로 묶어 보낼지, 이벤트별로 나눠 보낼지 — Week 2에 아론·은영·승우가 결정

---

## 5. TongssOrg 쪽 Object/필드 매핑 (초안)

| TongssOrg 필드 (Account 커스텀 필드) | TongssApp 필드 매핑 |
|---|---|
| `Staff_Count__c` | `staff_count` |
| `Manual_Count__c` | `manual_count` |
| `Manual_Completion_Rate__c` | `manual_completion_rate` |
| `Checklist_Completion_Rate__c` | `checklist_completion_rate` |
| `Last_Manual_Updated__c` | `last_manual_updated_at` |
| `Last_Activity__c` | `last_activity_at` |
| `Weekly_Active_Staff__c` | `weekly_active_staff` |
| `Is_Active__c` | `is_active` (파생 또는 직접 수신) |

`[확인필요]` 필드 API 이름은 은영이 Object 설계 시 확정

---

## 6. 변경 관리

이 문서 확정 후 필드를 추가/변경하려면:

1. 관련자(아론, 은영, 승우, Sara) 합의
2. 이 문서를 먼저 수정
3. `07_DECISIONS.md`에 이유 기록
4. 그다음에 코드 수정

계약과 다른 코드가 발견되면 계약 기준으로 되돌립니다 (임의로 계약을 코드에 맞추지 않습니다).

**새 필드를 추가하기 전에 항상 이 질문에 먼저 답하세요:** *"박세일즈가 이 숫자로 뭘 다르게 할 수 있는가?"* 답이 없으면 아직 추가할 때가 아닙니다 (`platform-lead/docs/02_ARCHITECTURE_DECISIONS.md` ADR-004 참조).

---

## Responsibility

한 문장씩, 쉽게.

**PM (Sara)**
> "Sales팀이 어떤 정보를 보고 싶어 하는지 결정합니다."

**TongssApp Developer (아론)**
> "앱에서 필요한 데이터를 저장하고 제공합니다."

**Integration Lead (승우)**
> "앱의 데이터를 Sales가 보기 좋은 형태로 바꿔 Org로 전달합니다."

**TongssOrg Developer (은영)**
> "전달받은 데이터를 Salesforce에 저장하고 화면에 보여줍니다."
ㅌㄴ
**UI/UX Designer (Hyejun)**

> "Sales와 관리자가 필요한 정보를 쉽고 보기 좋게 확인할 수 있도록 화면을 구성합니다."

---

이 네 문장을 순서대로 이으면 이 문서 전체의 흐름이 됩니다:

```
Sara가 정한다 → 아론이 만든다 → 승우가 옮긴다 → 은영이 보여준다
```

트랙을 넘는 결정(필드 추가/변경, 계산 로직 등)은 위 네 사람의 합의 후 `07_DECISIONS.md`에 기록합니다.

---

## Week 2에 결정할 것

- [ ] 전송 방식 (즉시 vs 배치)
- [ ] Account 매핑 방식 (기존 가맹점 vs 데모용 신규)
- [ ] `weekly_active_staff` 계산 기준(최근 7일 정의) 확정
- [ ] `is_active` 계산 주체 (TongssApp vs TongssOrg)
- [ ] 페이로드 단위 (통합 vs 이벤트별)
