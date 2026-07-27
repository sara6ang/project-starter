# TongssApp/docs/06_ARCHITECTURE — 폴더 구조 & 규칙

> **문서 소유권:** 최종 수정 권한은 **Store PO(아론)**.
> 👤 아론님이 읽어야 할 것: "왜 이렇게 폴더가 나뉘어 있는지", "새 화면을 만들 때 파일이 어디에 생기는지".
> 🤖 Claude Code 참고: 실제 폴더 경로, 구현 패턴.
> **스택: HTML + CSS + JS만 (프레임워크 없음, 빌드 없음, Live Server로 바로 실행)** `[확인필요]` Week 1에 React 여부 최종 확정 (`../../docs/07_DECISIONS.md`)

---

## 👤 왜 이렇게 폴더를 나누나

- **화면(생김새)과 로직(동작)을 분리**했습니다 — 화면 디자인을 바꿀 때 동작 코드를 안 건드리고, 동작을 바꿀 때 화면을 안 건드리기 위해서입니다.
- **사장 화면(owner)과 직원 화면(staff)을 폴더로 분리**했습니다 — 두 화면은 성격이 완전히 다릅니다. 사장은 여유 있게 보는 화면, 직원은 바쁠 때 3초 안에 봐야 하는 화면입니다. 섞이면 나중에 헷갈립니다.
- **여러 화면에서 같이 쓰는 코드만 `shared/`에** 둡니다 — 아무거나 다 넣으면 나중에 뭐가 어디서 쓰이는지 찾기 어려워집니다.

## 👤 한 문장 규칙

> **화면 생김새는 `pages/`, 화면 동작은 `assets/js/features/`, 공용 코드는 `assets/js/shared/`, 데이터는 `data/`(json만), 문서는 `docs/`.**

---

## 🤖 폴더 구조 (Claude 참고)

```
TongssApp/
├── README.md
├── CLAUDE.md
│
├── index.html                 # 진입점 (역할 선택 또는 사장/직원 분기)
├── pages/
│   ├── owner/
│   │   ├── dashboard.html
│   │   ├── manual-list.html
│   │   ├── manual-edit.html
│   │   ├── checklist-setting.html
│   │   ├── inventory-setting.html   ← 재고 확인 항목 설정
│   │   └── staff-status.html
│   └── staff/
│       ├── today.html
│       ├── manual-viewer.html
│       ├── checklist-run.html
│       └── inventory-input.html     ← 재고 확인
│
├── components/                # 여러 페이지 공유 html 조각
│   ├── header.html             # 사장 화면용
│   └── bottom-nav.html         # 직원 화면용 (모바일 탭 내비게이션)
│
├── assets/
│   ├── css/
│   │   ├── tokens.css          # 색·글자·간격·radius 변수 — 유일한 원본
│   │   ├── base.css
│   │   ├── components.css
│   │   └── pages/
│   ├── js/
│   │   ├── vendor/
│   │   │   └── lucide.js
│   │   ├── shared/
│   │   │   ├── dom.js
│   │   │   ├── keys.js
│   │   │   ├── data.js         # json fetch + 캐시 + 저장(로컬 목업)
│   │   │   ├── include.js
│   │   │   ├── nav.js
│   │   │   ├── context.js      # 현재 시간대(오픈/피크/마감) 판별 — 오늘 할 일 정렬용
│   │   │   ├── ui/
│   │   │   └── composite/
│   │   └── features/
│   │       ├── owner/
│   │       └── staff/
│   └── img/
│
├── data/                       # json만
│   ├── stores.json
│   ├── manuals.json
│   ├── checklist_items.json
│   ├── checklist_completions.json
│   ├── inventory_items.json
│   ├── staff.json
│   └── manual_progress.json
│
├── design-system/               # 컴포넌트 카탈로그 (07_DESIGN_SYSTEM.md 참조)
│
└── docs/
    ├── 03_USER_FLOW.md
    ├── 04_COMPONENT_MAP.md
    ├── 05_DATA.md
    ├── 06_ARCHITECTURE.md      # 이 문서
    └── 07_DESIGN_SYSTEM.md
```

> ⚠️ 이 스택엔 `00/01/02` 문서를 별도로 두지 않는다. shared `docs/00_PRODUCT_GUIDE`, `01_PERSONAS`가 그 역할을 이미 하고 있어 중복이기 때문이다. `07_DECISIONS`, `03_PROJECT_GUIDE`도 shared 전용이라 여기 없다.

---

## 👤 폴더별 한 줄 역할

| 폴더 | 역할 | 규칙 |
|---|---|---|
| `pages/owner/`, `pages/staff/` | 화면 마크업 | html만. 로직은 features를 불러오기만 |
| `components/` | 공용 조각 | header(사장), bottom-nav(직원). `data-include`로 삽입 |
| `assets/css/` | 스타일 | tokens.css 변수만 사용 |
| `assets/js/shared/` | 공용 로직 | 특정 화면 이름 모름. 2곳 이상에서 쓰는 것만 |
| `assets/js/features/owner/`, `features/staff/` | 화면별 로직 | 서로 import 금지 |
| `data/` | 데이터 원본 | json만 |
| `design-system/` | 컴포넌트 카탈로그 | 실제 앱이 참조하는 스타일 원본 — 브라우저로 열면 실제 화면 미리보기 |

---

## 🤖 header / bottom-nav 붙이는 법 (구현 패턴)

👤 간단히 말하면: 화면 파일에 아래처럼 한 줄만 넣으면 실제 헤더/하단메뉴 내용이 자동으로 채워집니다. **이미 만들어져 있으니 새로 짤 필요 없습니다.**

```html
<header data-include="/components/header.html"></header>
```

<details>
<summary>펼쳐서 보기 — 실제 구현 코드 (참고용)</summary>

```javascript
// assets/js/shared/include.js — 그대로 채택
(function () {
  async function includeComponents() {
    const targets = Array.from(document.querySelectorAll('[data-include]'));
    await Promise.all(targets.map(async (el) => {
      const res = await fetch(el.getAttribute('data-include'));
      el.innerHTML = await res.text();
    }));
    document.dispatchEvent(new CustomEvent('components:ready'));
  }
  document.addEventListener('DOMContentLoaded', includeComponents);
})();
```

</details>

---

## 👤🤖 하지 않을 것

```
❌ 루트에 shared/, features/, utils/ 등 새 폴더 만들기
❌ data/ 폴더에 .js 파일 넣기
❌ features끼리(owner ↔ staff) import
❌ 컴포넌트 스타일 중복 정의
❌ React, Vue, 빌드 도구 도입 (스택 결정 전까지)
❌ 이모지를 아이콘으로 사용 (Lucide만)
❌ 04_DATA_CONTRACT.md에 없는 필드를 org 전송 코드에 임의 추가
```

---

## 👤🤖 헷갈리면

새 폴더가 필요해 보이거나 shared/features 어디 넣을지 애매하면 — **혼자 정하지 말고 Store PO(또는 PM)에게 먼저 물어보기.**
