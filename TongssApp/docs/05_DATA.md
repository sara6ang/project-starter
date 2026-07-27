# TongssApp/docs/05_DATA — 데이터 정의

> **문서 소유권:** 최종 수정 권한은 **Store PO(아론)**.
> 👤 아론님이 읽어야 할 것: "어떤 정보가 있고, 어느 화면에서 쓰이는지"만 알면 충분합니다.
> 🤖 Claude Code 참고: 실제 필드 이름과 코드 형태.
> ⚠️ 이 문서는 TongssApp **내부**에서 다루는 데이터 전체를 정의합니다. 이 중 org로 전송되는 필드(집계값)만 뽑은 것이 `../../docs/04_DATA_CONTRACT.md`(shared)입니다. **두 문서는 다른 문서입니다 — 헷갈리지 마세요.**
> - `05_DATA.md` (여기, TongssApp 전용) = TongssApp이 다루는 **모든** 데이터
> - `04_DATA_CONTRACT.md` (shared) = 그중 org로 **나가는** 필드만 (부분집합)

---

## 👤 데이터 종류 5가지 — 어느 화면에서 쓰이나

| 데이터 | 쉽게 말하면 | 어느 화면에서 쓰이나 |
|---|---|---|
| Store | 매장 정보 | 최초 설정 |
| Manual | 매뉴얼 | 매뉴얼 등록·목록(사장), 매뉴얼 뷰어(직원) |
| ChecklistItem / Completion | 체크리스트 항목 / 완료 기록 | 체크리스트 설정(사장), 체크리스트 실행(직원) |
| InventoryItem | 재고 확인 항목 | 재고 확인 항목 설정(사장), 재고 확인(직원) — ⚠️ **수량이 아니라 "확인했는지"를 기록** |
| Staff / ManualProgress | 직원 / 학습 기록 | 직원 현황(사장) |

---

## 🤖 각 데이터의 실제 형태

### 1. Store (매장)

```javascript
{
  id: "store_001",       // 고유 ID — shared 04_DATA_CONTRACT의 store_id와 동일
  name: "이대표 카페",
  createdAt: "2026-08-03T09:00:00+09:00"
}
```

### 2. Manual (매뉴얼)

```javascript
{
  id: "manual_001",
  store_id: "store_001",
  title: "냉장고 청소법",
  photos: ["/uploads/manual_001_1.jpg"],
  content: "월 1회, 문 안쪽까지 닦기",  // 선택
  updatedAt: "2026-08-10T09:00:00+09:00"
}
```
`store_id` 참조로 매장 소속을 표시 (엑셀 VLOOKUP과 같은 개념). `manual_count`, `last_manual_updated_at`은 이 데이터에서 파생되어 org로 전송된다 (04_DATA_CONTRACT §3-1).

### 3. ChecklistItem / ChecklistCompletion

```javascript
// ChecklistItem — 사장이 설정한 항목 (템플릿)
{
  id: "check_001",
  store_id: "store_001",
  label: "냉장고 잠금 확인",
  type: "closing"  // "opening" | "closing"
}

// ChecklistCompletion — 직원이 체크한 기록 (날짜별)
{
  id: "completion_001",
  store_id: "store_001",
  checklist_item_id: "check_001",
  date: "2026-08-10",
  completed: true,
  completed_by: "staff_001"  // [확인필요] 개인 식별 필요 여부
}
```
`checklist_completion_rate`(해당 날짜의 완료 항목 수 / 전체 항목 수)가 org로 전송된다 (04_DATA_CONTRACT §3-3).

### 4. InventoryItem (재고 확인 항목)

> ⚠️ **수량 계산이 아니라 "확인 여부" 기록입니다.** 재고 수량 관리는 토스플레이스가 이미 제공하는 기능이라 Tongss가 다시 만들지 않습니다 (`../../docs/00_PRODUCT_GUIDE.md` §2, §5). 직원이 "오늘 이 품목을 확인했는지", "부족하다고 느꼈는지"만 기록합니다.

```javascript
{
  id: "inv_001",
  store_id: "store_001",
  name: "콜라시럽",
  checkedToday: true,      // 오늘 직원이 확인했는지
  isLow: true,             // 직원이 "부족해요"로 표시했는지
  checkedAt: "2026-08-10T18:00:00+09:00"
}
```
`isLow: true`인 품목 수가 `low_stock_alert_count`로 org에 전송된다 (선택 필드, 04_DATA_CONTRACT §3-4 — 계산 방식만 바뀌고 필드 자체는 그대로).

### 5. Staff / ManualProgress

```javascript
// Staff
{
  id: "staff_001",
  store_id: "store_001",
  name: "김스태프"   // [확인필요] 실명 저장 여부, 익명 코드로 대체할지
}

// ManualProgress — 직원별 "다 봤어요" 기록
{
  staff_id: "staff_001",
  manual_id: "manual_001",
  completedAt: "2026-08-10T15:00:00+09:00"
}
```
`manual_completion_rate`(전체 직원 × 전체 매뉴얼 대비 완료 비율)가 org로 전송된다 (04_DATA_CONTRACT §3-2).

---

## 🤖 데이터 관계도

```mermaid
erDiagram
    STORE ||--o{ MANUAL : has
    STORE ||--o{ CHECKLIST_ITEM : has
    STORE ||--o{ INVENTORY_ITEM : has
    STORE ||--o{ STAFF : has
    STAFF ||--o{ MANUAL_PROGRESS : completes
    MANUAL ||--o{ MANUAL_PROGRESS : tracked_by
    CHECKLIST_ITEM ||--o{ CHECKLIST_COMPLETION : recorded_as

    STORE {
        string id
        string name
    }
    MANUAL {
        string id
        string store_id
        string title
    }
    CHECKLIST_ITEM {
        string id
        string store_id
        string label
    }
    INVENTORY_ITEM {
        string id
        string store_id
        boolean checkedToday
        boolean isLow
    }
    STAFF {
        string id
        string store_id
        string name
    }
```

---

## 👤 TongssApp → TongssOrg로 나가는 필드 (요약)

| TongssApp 데이터 | org로 나가는 파생 필드 |
|---|---|
| Manual 전체 | `manual_count`, `last_manual_updated_at` |
| ManualProgress 전체 | `manual_completion_rate` |
| ChecklistCompletion (당일) | `checklist_completion_rate` |
| InventoryItem (`isLow: true`인 것) | `low_stock_alert_count` (선택) |

상세는 shared `../../docs/04_DATA_CONTRACT.md`. **계약과 다른 필드를 여기서 임의로 추가/변경하지 마세요.** 변경이 필요하면 shared `04_DATA_CONTRACT.md`를 먼저 고치고 `../../docs/07_DECISIONS.md`에 기록.

---

## 🤖 코딩할 때 (참고용, 아론님은 안 읽어도 됩니다)

```javascript
// assets/js/features/staff/manual-viewer.js
import { loadJSON, saveJSON } from '../../shared/data.js';

const manuals = await loadJSON('/data/manuals.json');
const manual = manuals.find(m => m.id === manualId);

// ✅ 이렇게: ID로 참조
const progress = { staff_id: currentStaffId, manual_id: manual.id, completedAt: new Date().toISOString() };

// ❌ 이렇게 하지 않기: 매뉴얼 제목을 Progress에 통째로 복사
```
