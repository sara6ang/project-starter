# 05_DATA_CONTRACT — store-app ↔ toss-org 데이터 계약

> 오너: Sara / 상태: **초안 샘플 — Week 2에 아론(store-app) + 은영(toss-org) + 승우(Integration)와 필드 레벨로 확정**
> 이 문서는 두 시스템이 주고받는 데이터의 유일한 진실이다. 코드가 이 문서와 다르면 코드가 틀린 것이다 (09_TEAM_GUIDE §5).
> 근거: 02_PRD §1 (기능 매핑), 03_USER_FLOW (3단계)

---

## 왜 이 문서가 필요한가

store-app에서 발생하는 활동(매뉴얼 등록, 체크리스트 완료, 재고 실사, 학습 완료)을 toss-org의 매장(Account) 레코드에 반영해야 박세일즈가 "이 매장이 잘 운영되고 있는지"를 볼 수 있다. 이 흐름이 Demo Day 한 줄 시나리오의 마지막 구간이다.

---

## 1. 전송 방식 (초안)

- **방향:** store-app → toss-org (단방향, 이번 스코프에서는 org → store-app 역방향 없음)
- **방식:** Apex REST 엔드포인트 (`OrderRestService` 패턴 재활용 — 04_ROADMAP Week 3 참조)
- **인증:** `[확인필요]` Guest User 권한 범위 확정 (Week 2 스파이크에서 결정)
- **트리거 시점:** `[확인필요]` 이벤트 발생 즉시 vs 배치(일 1회) — 데모 목적상 즉시 전송을 우선 검토

---

## 2. 매장(Store) 식별자

두 시스템이 "같은 매장"임을 인식할 공통 키가 필요하다.

| 필드명 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `store_id` | String | ✅ | store-app에서 생성한 매장 고유 ID. toss-org의 Account 레코드와 1:1 매핑 |

`[확인필요]` toss-org의 Account가 이미 존재하는 매장(토스플레이스 실제 가맹점)과 매핑되는지, 데모용으로 신규 생성하는지 — Week 2 스파이크 전에 승우·은영이 결정

---

## 3. 전송 데이터 필드 (초안 — Week 2 확정 대상)

### 3-1. 매뉴얼 등록 현황

| 필드명 | 타입 | 필수 | 설명 | 근거 (02_PRD) |
|---|---|---|---|---|
| `store_id` | String | ✅ | 매장 식별자 | — |
| `manual_count` | Integer | ✅ | 등록된 매뉴얼 총 개수 | 박세일즈: "매장별 히스토리" |
| `last_manual_updated_at` | DateTime | ✅ | 마지막 매뉴얼 등록/수정 시각 | 방치 매장 판별 근거 |

### 3-2. 직원 학습 현황

| 필드명 | 타입 | 필수 | 설명 | 근거 |
|---|---|---|---|---|
| `store_id` | String | ✅ | 매장 식별자 | — |
| `staff_count` | Integer | ✅ | 등록된 직원 수 | |
| `manual_completion_rate` | Decimal (0~1) | ✅ | 직원 전체의 매뉴얼 "다 봤어요" 완료율 | 박세일즈: "직원 학습 완료율" |

### 3-3. 체크리스트 완료 현황

| 필드명 | 타입 | 필수 | 설명 | 근거 |
|---|---|---|---|---|
| `store_id` | String | ✅ | 매장 식별자 | — |
| `checklist_date` | Date | ✅ | 체크리스트 기준일 | |
| `checklist_completion_rate` | Decimal (0~1) | ✅ | 오픈/마감 체크리스트 완료율 | 이대표: "누가 뭘 했는지" / 박세일즈: 활성도 판단 |

### 3-4. 재고 알림 현황 (Nice-to-have, In 스코프 최소 범위)

| 필드명 | 타입 | 필수 | 설명 | 근거 |
|---|---|---|---|---|
| `store_id` | String | ✅ | 매장 식별자 | — |
| `low_stock_alert_count` | Integer | ⚠️ | 현재 "부족" 상태인 품목 수 | 02_PRD Out에 가까움 — Week 3 스코프 조정 시 1순위 컷 후보 |

### 3-5. 매장 활성 상태 (toss-org에서 파생, store-app이 직접 보내지 않을 수 있음)

| 필드명 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `is_active` | Boolean | toss-org 계산 | `last_manual_updated_at` 또는 `checklist_completion_rate` 기준으로 org 쪽에서 판정할지, store-app이 직접 보낼지 `[확인필요]` |

---

## 4. 페이로드 예시 (초안)

```json
{
  "store_id": "store_001",
  "manual_count": 5,
  "last_manual_updated_at": "2026-08-10T09:00:00+09:00",
  "staff_count": 3,
  "manual_completion_rate": 0.67,
  "checklist_date": "2026-08-10",
  "checklist_completion_rate": 0.8,
  "low_stock_alert_count": 1
}
```

`[확인필요]` 필드를 하나의 페이로드로 묶어 보낼지, 이벤트별로 나눠 보낼지 — Week 2에 아론·은영·승우가 결정 (09_TEAM_GUIDE 협업 매트릭스 참조)

---

## 5. toss-org 쪽 Object/필드 매핑 (초안)

| toss-org 필드 (Account 커스텀 필드) | store-app 필드 매핑 |
|---|---|
| `Manual_Count__c` | `manual_count` |
| `Last_Manual_Updated__c` | `last_manual_updated_at` |
| `Manual_Completion_Rate__c` | `manual_completion_rate` |
| `Checklist_Completion_Rate__c` | `checklist_completion_rate` |
| `Is_Active__c` | `is_active` (파생 또는 직접 수신) |

`[확인필요]` 필드 API 이름은 은영이 Object 설계 시 확정 (04_ROADMAP Week 1~2)

---

## 6. 변경 관리

이 문서 확정 후 필드를 추가/변경하려면:
1. 관련자(아론, 은영, 승우, Sara) 합의
2. 이 문서를 먼저 수정
3. `08_DECISIONS.md`에 이유 기록
4. 그 다음에 코드 수정

계약과 다른 코드가 발견되면 계약 기준으로 되돌린다 (임의로 계약을 코드에 맞추지 않는다).

---

## 리뷰 세션 안건 (Week 2)
1. 전송 방식 (즉시 vs 배치) 결정
2. Account 매핑 방식 (기존 가맹점 vs 데모용 신규) 결정
3. 재고 알림 필드가 Week 3 스코프 컷 대상인지 최종 확정
4. 페이로드 단위 (통합 vs 이벤트별) 결정