# TongssApp/docs/04_COMPONENT_MAP — 화면 부품 지도

> **문서 소유권:** 최종 수정 권한은 **Store PO(아론)**.
> 👤 아론님이 읽어야 할 것: "이런 부품들이 있고, 어디서 재사용되는지"만 알면 충분합니다.
> 🤖 Claude Code 참고: 실제 함수 이름·코드 형태 — 아론님은 몰라도 됩니다.
> 이 문서를 보기 전에 `03_USER_FLOW.md`를 먼저 읽으세요 — 거기서 화면을 정하고, 여기서 "그 화면을 만들 부품이 이미 있는지"만 확인합니다.

---

## 👤 이 문서를 왜 보는가

새 화면을 Claude에게 요청하기 전에, "이미 만들어둔 부품이 있나?"를 여기서 확인하세요. 있으면 "이 부품 재사용해줘"라고 요청하고, 없으면 새로 만들어 달라고 하면 됩니다. 부품이 화면마다 따로 만들어지면 나중에 디자인이 제각각이 되는 문제가 생깁니다.

---

## 👤 부품은 3단계로 나뉩니다

| 단계 | 쉽게 말하면 | 예시 |
|---|---|---|
| 기본 부품 | 어디서나 쓰는 가장 작은 조각 | 버튼, 입력창, 체크박스, 배지, 카드 |
| Tongss 전용 조각 | 기본 부품을 조합한, 이 프로젝트에서만 쓰는 뭉치 | 매뉴얼 카드, 체크리스트 줄, 재고 확인 줄 |
| 공용 레이아웃 | 여러 화면에 통째로 붙는 것 | 사장용 상단 헤더, 직원용 하단 탭 메뉴 |

실제 화면(페이지)은 이 부품들을 조립해서 만듭니다. 아래로 갈수록 "Tongss만의 것"에 가까워집니다.

---

## 👤 기본 부품 목록

| 부품 | 어디서 쓰이나 |
|---|---|
| 버튼 | 거의 모든 화면 |
| 입력창 | 매뉴얼 등록, 체크리스트 설정 |
| 체크박스 | 체크리스트 실행, 재고 확인 |
| 배지 | "부족", "완료" 같은 상태 표시 |
| 카드 | 매뉴얼 목록, 대시보드 요약 |

🤖 **Claude 참고 — 실제 함수 (위치: `assets/js/shared/ui/`)**
```javascript
export function createButton({ label, variant = 'primary', onClick }) { /* ... */ }
```
나머지: `createInput()`, `createLabel()`, `createIcon()`, `createCard()`, `createBadge()`, `createCheckbox()`, `createCounterInput()`(재고 관련 화면이 확인 체크리스트 방식으로 바뀌며 사용 빈도 낮아짐)

---

## 👤 Tongss 전용 화면 조각

| 부품 | 무엇을 위한 것인가 | 어디서 쓰이나 |
|---|---|---|
| 매뉴얼 카드 | 사진+제목으로 매뉴얼 하나를 보여줌 | 매뉴얼 목록(사장), 매뉴얼 뷰어(직원) |
| 체크리스트 줄 | 항목 하나 + 체크박스 | 체크리스트 설정(사장), 체크리스트 실행(직원) |
| 재고 확인 줄 | 품목 하나 + "확인함" 체크 + "부족해요" 토글 | 재고 확인 항목 설정(사장), 재고 확인(직원) |
| 직원 현황 줄 | 이름 + 학습률/수행 배지 | 직원 현황(사장) |
| 요약 카드 | 숫자 하나를 크게 보여줌 | 홈 대시보드(사장) |
| 빈 상태 안내 | "아직 없어요" 문구 | 매뉴얼이 0개일 때 등 |

🤖 **Claude 참고 — 실제 함수 (위치: `assets/js/shared/composite/`)**
```
createManualCard()   createChecklistItemRow()   createInventoryRow()
createStaffStatusRow()   createStatCard()   createEmptyState()
```

---

## 👤 공용 레이아웃

| 조각 | 쓰이는 화면 | 왜 이렇게 나눴나 |
|---|---|---|
| 사장용 상단 헤더 (로고+메뉴) | 사장 화면 전체 | 여유 있게 훑어보는 화면이라 위쪽 메뉴가 자연스러움 |
| 직원용 하단 탭 메뉴 | 직원 화면 전체 | 폰으로 현장에서 쓰므로 엄지로 누르기 편한 하단 탭이 적합 |

🤖 **Claude 참고:** `components/header.html`, `components/bottom-nav.html` — `data-include`로 삽입, `assets/js/shared/nav.js`가 동작 연결. 이미 구현되어 있으니 새로 만들 필요 없음.

---

## 👤 어떤 부품이 여러 화면에서 재사용되는지

| 부품 | 재사용되는 화면 |
|---|---|
| 매뉴얼 카드 | 매뉴얼 목록(사장) + 매뉴얼 뷰어(직원) |
| 체크리스트 줄 | 체크리스트 설정(사장) + 체크리스트 실행(직원) |
| 재고 확인 줄 | 재고 확인 항목 설정(사장) + 재고 확인(직원) |
| 하단 탭 메뉴 | 직원 화면 전체 |
| 상단 헤더 | 사장 화면 전체 |

같은 부품을 두 번 새로 만들지 않도록, Claude에게 요청할 때 **"이 부품 재사용해줘"**라고 명시하세요.

---

## 🤖 실제 페이지 파일 목록 (Claude 참고)

```
index.html                              assets/js/features/entry/entry.js         ← Entry Code 입력 (사장·직원 공통 진입점)

pages/owner/dashboard.html              assets/js/features/owner/dashboard.js
pages/owner/manual-list.html            assets/js/features/owner/manual-list.js
pages/owner/manual-edit.html            assets/js/features/owner/manual-edit.js
pages/owner/checklist-setting.html      assets/js/features/owner/checklist-setting.js
pages/owner/inventory-setting.html      assets/js/features/owner/inventory-setting.js  ← 재고 확인 항목 설정
pages/owner/staff-status.html           assets/js/features/owner/staff-status.js

pages/staff/today.html                  assets/js/features/staff/today.js
pages/staff/manual-viewer.html          assets/js/features/staff/manual-viewer.js
pages/staff/checklist-run.html          assets/js/features/staff/checklist-run.js
pages/staff/inventory-input.html        assets/js/features/staff/inventory-input.js  ← 재고 확인
```

---

## 🤖 구현 코드 예시 (참고용, 아론님은 안 읽어도 됩니다)

<details>
<summary>펼쳐서 보기 — 실제 코드는 이미 코드베이스에 있고, 이건 Claude가 일관된 패턴으로 짜도록 돕는 참고 스니펫입니다</summary>

### 매뉴얼 등록 (사장)
```html
<!-- pages/owner/manual-edit.html -->
<body>
  <header data-include="/components/header.html"></header>
  <main>
    <h1>매뉴얼 등록</h1>
    <div id="photo-upload-slot"></div>
    <input id="title-input" placeholder="제목 (예: 냉장고 청소법)" />
    <div id="save-btn-slot"></div>
  </main>
  <script src="/assets/js/shared/include.js"></script>
  <script type="module" src="/assets/js/features/owner/manual-edit.js"></script>
</body>
```

```javascript
// assets/js/features/owner/manual-edit.js
import { createButton } from '../../shared/ui/button.js';
import { saveManual } from '../../shared/data.js';

const saveBtn = createButton({ label: '등록', onClick: handleSave });
document.getElementById('save-btn-slot').appendChild(saveBtn);

async function handleSave() {
  const title = document.getElementById('title-input').value;
  await saveManual({ title, photos: [...], updatedAt: new Date().toISOString() });
  window.location.href = '/pages/owner/manual-list.html';
}
```

### 체크리스트 실행 (직원)
```javascript
// assets/js/features/staff/checklist-run.js
import { createChecklistItemRow } from '../../shared/composite/checklist-item-row.js';
import { loadJSON, saveChecklistCompletion } from '../../shared/data.js';

const items = await loadJSON('/data/checklist_items.json');

items.forEach(item => {
  document.getElementById('list-slot').appendChild(
    createChecklistItemRow({
      label: item.label,
      onCheck: (checked) => saveChecklistCompletion(item.id, checked)
    })
  );
});
```

### 오늘 할 일 (직원, 시간대 기반 정렬)
```javascript
// assets/js/features/staff/today.js
import { getCurrentTimeContext } from '../../shared/context.js';

const context = getCurrentTimeContext(); // 'opening' | 'peak' | 'closing'

if (context === 'closing') {
  // 마감 체크리스트 카드를 최상단에 배치
}
```

</details>

---

## 👤🤖 새 부품을 만들 때 체크리스트

1. 몇 군데에서 쓸 것인가? 2곳 이상 → 공용 부품으로
2. 기본 부품인지, Tongss 전용 화면 조각인지 구분
3. 디자인 값(토큰, `07_DESIGN_SYSTEM.md`)만 사용
4. 문구는 `../../docs/06_VOICE_AND_TONE.md`의 화면 성격별 톤 원칙을 따를 것
