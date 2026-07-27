# 04_DATA_CONTRACT — TongssApp ↔ TongssOrg 데이터 계약

> 오너: Sara / 상태: 초안 — Week 2에 아론(TongssApp) + 은영(TongssOrg) + 승우(Integration)와 필드 레벨로 확정
> **이 문서는 두 시스템이 주고받는 데이터의 유일한 진실입니다.** 코드가 이 문서와 다르면 코드가 틀린 것입니다 (`03_PROJECT_GUIDE.md` 의사결정 규칙 참조).
> 근거: `00_PRODUCT_GUIDE.md` §4 (페르소나별 기능), `02_USER_FLOW.md` 3단계

---

## 왜 이 문서가 필요한가

TongssApp에서 생기는 활동(매뉴얼 등록, 체크리스트 완료, 재고 실사, 학습 완료)을 TongssOrg의 매장(Account) 레코드에 반영해야 박세일즈가 "이 매장이 잘 운영되고 있는지"를 볼 수 있습니다. 이 흐름이 Demo Day 한 줄 시나리오의 마지막 구간입니다.

> 아래 필드에 넣을 실제 값(더미 데이터)이 필요하면 임의로 짓지 말고 `examples/MASHITA_BURGER.md`(기준 매장) §9의 시드 데이터를 쓰세요.

---

## 1. 전송 방식 (초안)

- **방향:** TongssApp → TongssOrg (단방향, org → TongssApp 역방향 없음)
- **방식:** Apex REST 엔드포인트 (`OrderRestService` 패턴 재활용)
- **인증:** `[확인필요]` Guest User 권한 범위 확정 (Week 2 스파이크에서 결정)
- **트리거 시점:** `[확인필요]` 이벤트 발생 즉시 vs 배치(일 1회) — 데모 목적상 즉시 전송을 우선 검토

---

## 2. 매장(Store) 식별자

두 시스템이 "같은 매장"임을 인식할 공통 키가 필요합니다.

| 필드명 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `store_id` | String | ✅ | TongssApp에서 생성한 매장 고유 ID. TongssOrg의 Account 레코드와 1:1 매핑 |

`[확인필요]` TongssOrg의 Account가 이미 존재하는 매장(실제 가맹점)과 매핑되는지, 데모용으로 신규 생성하는지 — Week 2 스파이크 전에 승우·은영이 결정

---

## 3. 전송 데이터 필드 (초안 — Week 2 확정 대상)

### 3-1. 매뉴얼 등록 현황

| 필드명 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `store_id` | String | ✅ | 매장 식별자 |
| `manual_count` | Integer | ✅ | 등록된 매뉴얼 총 개수 |
| `last_manual_updated_at` | DateTime | ✅ | 마지막 매뉴얼 등록/수정 시각 (방치 매장 판별 근거) |

### 3-2. 직원 학습 현황

| 필드명 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `store_id` | String | ✅ | 매장 식별자 |
| `staff_count` | Integer | ✅ | 등록된 직원 수 |
| `manual_completion_rate` | Decimal (0~1) | ✅ | 직원 전체의 매뉴얼 "다 봤어요" 완료율 |

### 3-3. 체크리스트 완료 현황

| 필드명 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `store_id` | String | ✅ | 매장 식별자 |
| `checklist_date` | Date | ✅ | 체크리스트 기준일 |
| `checklist_completion_rate` | Decimal (0~1) | ✅ | 오픈/마감 체크리스트 완료율 |

### 3-4. 재고 알림 현황 (Nice-to-have)

| 필드명 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `store_id` | String | ✅ | 매장 식별자 |
| `low_stock_alert_count` | Integer | ⚠️ | 현재 "부족" 상태인 품목 수 — Week 3 스코프 조정 시 1순위 컷 후보 |

### 3-5. 매장 활성 상태

| 필드명 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `is_active` | Boolean | TongssOrg 계산 | `last_manual_updated_at` 또는 `checklist_completion_rate` 기준으로 org가 판정할지, TongssApp이 직접 보낼지 `[확인필요]` |

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

`[확인필요]` 필드를 하나의 페이로드로 묶어 보낼지, 이벤트별로 나눠 보낼지 — Week 2에 아론·은영·승우가 결정

---

## 5. TongssOrg 쪽 Object/필드 매핑 (초안)

| TongssOrg 필드 (Account 커스텀 필드) | TongssApp 필드 매핑 |
|---|---|
| `Manual_Count__c` | `manual_count` |
| `Last_Manual_Updated__c` | `last_manual_updated_at` |
| `Manual_Completion_Rate__c` | `manual_completion_rate` |
| `Checklist_Completion_Rate__c` | `checklist_completion_rate` |
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

---

## Week 2에 결정할 것

- [ ] 전송 방식 (즉시 vs 배치)
- [ ] Account 매핑 방식 (기존 가맹점 vs 데모용 신규)
- [ ] 재고 알림 필드가 Week 3 스코프 컷 대상인지 최종 확정
- [ ] 페이로드 단위 (통합 vs 이벤트별)
