# TongssApp/docs/04_COMPONENT_MAP — 컴포넌트 지도

> **문서 소유권:** 최종 수정 권한은 **Store PO**. 아래는 PM이 제시하는 초안.
> **스택: HTML + CSS + JS (프레임워크 없음)** — 폴더/패턴은 기존 템플릿 구조를 그대로 채택, 내용은 Tongss 도메인으로 교체.
> 이 문서를 만들기 전에 `03_USER_FLOW.md`를 먼저 읽을 것.

---

## 컴포넌트 형태 (2가지, 기존 패턴 유지)

**A. 정적 조각 (`components/` + `data-include`)** — header, bottom-nav처럼 여러 화면에 통째로 붙는 것. 마크업만.
**B. 만드는 함수 (js 함수 하나)** — 데이터에 따라 여러 번 찍어내는 것 (버튼, 카드, 체크리스트 행).

```javascript
// assets/js/shared/ui/button.js
export function createButton({ label, variant = 'primary', onClick }) {
  const btn = document.createElement('button');
  btn.className = `btn btn--${variant}`;
  btn.textContent = label;
  btn.addEventListener('click', onClick);
  return btn;
}
```

---

## 컴포넌트 레벨

### Level 1: 기본 컴포넌트 (패턴 B)
```
createButton()   createInput()   createLabel()
createIcon()     createCard()    createBadge()
createCheckbox() createCounterInput()   ← 재고 수량 +/- 조작용
```
위치: `assets/js/shared/ui/`

### Level 2: 합성 컴포넌트 — Tongss 도메인 (패턴 B)
```
createManualCard()        ← createCard + 사진 썸네일 + 제목 (매뉴얼 목록/뷰어에서 사용)
createChecklistItemRow()  ← createCheckbox + 라벨 (체크리스트 실행 화면)
createInventoryRow()      ← createCounterInput + "부족" createBadge
createStaffStatusRow()    ← 직원 이름 + 학습률/체크리스트 완료 badge
createStatCard()          ← createCard + 숫자 (대시보드 요약)
createEmptyState()        ← 매뉴얼 0개일 때 등 (VOICE_AND_TONE.md 문구 원칙 따름)
```
위치: `assets/js/shared/composite/`

### Level 3: 정적 조각 (패턴 A)
```
components/header.html       ← 사장 화면용 (로고 + 메뉴)
components/bottom-nav.html    ← 직원 화면용 (오늘 할 일/매뉴얼/체크리스트/재고 탭) — 모바일 우선
```
> 기존 템플릿은 `sidebar.html`이었지만, 김스태프는 폰으로 현장에서 쓰므로 **하단 탭 내비게이션**이 더 적합하다고 판단해 교체함. `[확인필요]` Store PO 확정 필요.
동작 연결은 `assets/js/shared/nav.js`가 `components:ready` 이벤트 이후 담당.

### Level 4: 페이지 (마크업/로직 분리, 기존 패턴 유지)
```
pages/owner/dashboard.html              assets/js/features/owner/dashboard.js
pages/owner/manual-list.html            assets/js/features/owner/manual-list.js
pages/owner/manual-edit.html            assets/js/features/owner/manual-edit.js
pages/owner/checklist-setting.html      assets/js/features/owner/checklist-setting.js
pages/owner/inventory-setting.html      assets/js/features/owner/inventory-setting.js
pages/owner/staff-status.html           assets/js/features/owner/staff-status.js

pages/staff/today.html                  assets/js/features/staff/today.js
pages/staff/manual-viewer.html          assets/js/features/staff/manual-viewer.js
pages/staff/checklist-run.html          assets/js/features/staff/checklist-run.js
pages/staff/inventory-input.html        assets/js/features/staff/inventory-input.js
```

---

## 페이지별 컴포넌트 분해 예시

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
  // 사진 업로드 처리 후
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

### 오늘 할 일 (직원, 맥락 기반 정렬)
```javascript
// assets/js/features/staff/today.js
import { getCurrentTimeContext } from '../../shared/context.js';

const context = getCurrentTimeContext(); // 'opening' | 'peak' | 'closing'

if (context === 'closing') {
  // 마감 체크리스트 카드를 최상단에 배치
}
```

---

## 컴포넌트 재사용 지도
```
createManualCard():       manual-list.js (owner), manual-viewer.js (staff) → 공용
createChecklistItemRow(): checklist-setting.js (owner, 미리보기), checklist-run.js (staff) → 공용
createCounterInput():     inventory-setting.js (owner), inventory-input.js (staff) → 공용
components/bottom-nav.html: staff/*.html 전체
components/header.html:    owner/*.html 전체
```

---

## 체크리스트: 컴포넌트 만들 때 (기존 원칙 유지)
```
1. 몇 군데에서 쓸 것인가? 2곳 이상 → shared/
2. 패턴 A(정적 조각) vs 패턴 B(js 함수) 구분
3. 디자인 토큰(07_DESIGN_SYSTEM.md)만 사용
4. 문구는 VOICE_AND_TONE.md 원칙(화면 성격별 톤 강도) 따를 것
```