# TongssApp/docs/07_DESIGN_SYSTEM — 디자인 값(토큰)

> **문서 소유권:** 최종 수정 권한은 **Store PO(아론)**. 아래는 기존에 확보해둔 토큰 시스템을 그대로 채택한 초안 — 값 자체(색상 등)는 Store PO가 Tongss 브랜드에 맞게 조정할 수 있다.
> 👤 아론님이 읽어야 할 것: 이 문서 대신 **먼저 브라우저로 `design-system/index.html`을 열어보세요.** 헥스코드(`#ff4f97` 등)를 눈으로 읽는 것보다, 실제 색·버튼·카드가 화면에 어떻게 보이는지 직접 보는 게 훨씬 빠릅니다. Figma가 없어도 이 파일이 그 역할을 합니다.
> 🤖 Claude Code 참고: 아래 CSS 변수(토큰)만 사용해서 화면을 만들 것 — 새 색이나 크기를 임의로 추가하지 말 것.
> ⚠️ 색·타이포 **구조**(토큰 방식, 4px 배수, 5단계 글자크기)는 검증된 패턴이라 그대로 두는 걸 권장하지만, **정확한 색상값(특히 accent 핑크)은 이 프로젝트를 위해 새로 정한 게 아니라 이전 프로젝트에서 가져온 값**이다. `../../docs/06_VOICE_AND_TONE.md`의 브랜드 키워드(Instant·Effortless·Reassuring)에 맞는 색인지 Store PO가 한 번 검토할 것.
> 🔄 **2026-07-29 업데이트:** 토스 디자인 시스템(TDS)의 시각 철학을 참고해 토큰·컴포넌트를 리디자인했다 ("TDS-inspired Tongss" — 아래 [디자인 철학](#-디자인-철학--tds-inspired-tongss) 참고). 색상값 자체는 바뀌지 않았고, 여백·모서리·그림자·모션의 **구조**만 더 정돈됐다. 레퍼런스 원본은 `design-system/desin.md`.

---

## 👤 실제 화면으로 먼저 확인하기

```
design-system/index.html 을 브라우저로 열기
→ 실제 색상, 버튼, 카드, 배지가 전부 눈으로 보입니다.
```

아래 CSS 코드는 🤖 Claude가 참고하는 실제 값입니다. 색이 마음에 안 들면 헥스코드를 직접 안 고쳐도 됩니다 — "이 버튼 색을 더 밝게 해줘"처럼 말로 요청하면 됩니다.

---

## 🤖🧭 디자인 철학 — "TDS-inspired Tongss"

토스 디자인 시스템(TDS)을 그대로 베끼는 게 아니라, **Tongss가 원래부터 이런 시스템을 갖고 있었던 것처럼** TDS의 시각 원칙만 가져와 녹였다. React/TDS 컴포넌트를 가져온 게 아니라 순수 HTML/CSS/JS 구조 그대로, 토큰 레이어만 리디자인했다.

가져온 원칙:

1. **넉넉한 Radius** — 각진 4px 대신 8~20px의 넓은 라운드 스케일. 버튼·인풋·카드가 부드럽고 안정적으로 보인다.
2. **평면이 기본, 그림자는 뜨는 표면에만** — 카드는 그림자 없이 헤어라인 보더로만 구분한다. 그림자는 모달·토스트·드롭다운·툴팁처럼 실제로 "떠 있는" 표면에만 쓴다.
3. **최소한의 보더, 절제된 강조** — 기본 보더는 1px 헤어라인, 포커스만 1.5px로 한 단계 강해진다 (2px로 두 배가 되지 않는다).
4. **명확한 Primary Action** — 화면당 강조는 하나. `.btn--primary`(잉크 블랙)가 기본 강조, `.btn--accent`(Tongss 핑크)는 예외적으로 눈에 띄어야 할 때만 예약.
5. **빠르고 절제된 모션** — 튕김(overshoot) 없이 120/200/320ms 안에서만 움직인다.
6. **일관된 포커스 링** — 모든 인터랙티브 요소가 브라우저 기본(파란) 포커스 링 대신 Tongss 잉크 컬러 기반의 `--shadow-focus`를 쓴다.

**가져오지 않은 것:** 토스 블루(`#3182F6` 등), 토스의 금융 서비스 개념, React/TDS 컴포넌트, Emotion, npm 의존성. Tongss의 브랜드 컬러(잉크 블랙 `--color-primary`, 핑크 `--color-accent`)는 그대로 유지된다.

레퍼런스 원본: `design-system/desin.md` (토스 디자인 시스템 조사 문서, 참고용 — 그대로 구현하지 않는다).

---

## 🤖 Tokens (실제 값)

### 색 (Colors) — `[확인필요: Store PO 검토]`

```css
:root {
  --color-primary: #111111;
  --color-accent: #ff4f97;    /* [확인필요] Tongss 브랜드에 맞는 색인지 재검토 */
  --color-neutral: #6b6b6b;

  --color-success: #22a34a;   /* 체크리스트 완료, 학습 완료 등에 사용 */
  --color-warning: #e9a23b;   /* 재고 "부족해요" 표시 등에 사용 */
  --color-error: #df5a5a;
  --color-info: #6f8de8;

  --color-white: #fafaf8;
  --color-black: #111111;

  --gray-50: #fcfcfa;
  --gray-100: #f4f3f1;
  --gray-300: #e7e5e1;
  --gray-500: #6b6b6b;
  --gray-700: #2f2f2f;

  --surface-soft: #f8f7f4;
  --surface-inverse: #24223f;
}
```

**Tongss 적용 지침:** `--color-warning`은 재고 부족 알림, `--color-success`는 체크리스트/학습 완료 표시에 우선 배정. 감정을 과도하게 자극하는 색(강한 빨강 등)은 김스태프 화면에서 "혼나는 느낌"을 줄 수 있으니 지양 (../../docs/06_VOICE_AND_TONE.md §1 Reassuring 원칙).

색상값 자체는 이번 리디자인에서 바꾸지 않았다 — 토스 블루를 들여오지 않고 Tongss 고유 색을 그대로 유지하는 것이 이번 작업의 원칙이었다.

### 글자 (Typography)

```css
:root {
  --fs-12: 12px;  /* 도움말, 보조설명 */
  --fs-14: 14px;  /* 일반 텍스트 */
  --fs-16: 16px;  /* 본문 기본 */
  --fs-20: 20px;  /* 소제목 */
  --fs-28: 28px;  /* 제목 */

  --fw-400: 400; --fw-500: 500; --fw-600: 600; --fw-700: 700;
  --line-height-normal: 1.5; --line-height-tight: 1.2; --line-height-loose: 1.8;

  --font-sans: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Helvetica Neue', sans-serif;

  /* 자간 (신규) */
  --tracking-tight: -0.02em; /* 큰 제목 (fs-20 이상) — TDS의 "타이트한 디스플레이" 인상 */
  --tracking-wide: 0.04em;   /* 대문자 라벨 (eyebrow, 테이블 헤더) */
}
```

**Tongss 적용 지침:** 김스태프 현장 화면(체크리스트, 재고 확인)은 `--fs-16` 이상만 사용 — 현장에서 작은 글자는 안 읽힌다. `--fs-12`는 사장 대시보드의 보조 정보에만. 큰 제목(`--fs-20`, `--fs-28`)에는 `--tracking-tight`를 함께 써서 더 다잡힌 인상을 준다.

### 간격 (Spacing) — 4px 배수만

```css
:root {
  --space-4: 4px; --space-8: 8px; --space-12: 12px; --space-16: 16px;
  --space-20: 20px; --space-24: 24px; --space-32: 32px; --space-40: 40px;
  --space-48: 48px; --space-64: 64px;
}
```

**Tongss 적용 지침:** 김스태프 화면의 터치 타겟(체크박스, +/- 버튼)은 최소 `--space-48`(48px) 이상 확보 — 현장에서 급하게 누르는 상황을 고려. 버튼 컴포넌트는 이제 사이즈별 `min-height`(sm 32 / md 40 / lg 48)를 갖는다 — 터치 타겟이 값이 아니라 토큰으로 보장된다.

### 모서리 (Radius) — 넉넉하게 둥글게

```css
:root {
  --radius-xs: 4px;    /* 코드 칩, 촘촘한 태그 */
  --radius-sm: 8px;    /* 아이콘 버튼, 체크박스, 툴팁, 드롭다운 항목 */
  --radius-md: 12px;   /* 버튼, 인풋, 카드, 토스트, 드롭다운 메뉴 */
  --radius-lg: 16px;   /* 강조 표면 */
  --radius-xl: 20px;   /* 모달 등 가장 도드라진 표면 */
  --radius-full: 9999px;
}
```

기존엔 `sm/md/lg`가 `4/8/16`px로 각졌었다. TDS의 "공격적으로 둥글지만 가볍지 않다"는 인상을 가져와 한 단계씩 넓혔고, 가장 도드라진 표면(모달)을 위한 `--radius-xl`을 새로 추가했다.

### 보더 (Border) — 기본은 헤어라인, 포커스만 한 단계 강하게

```css
:root {
  --border-thin: 1px solid var(--gray-100);
  --border-normal: 1px solid var(--gray-300);
  --border-focus: 1.5px solid var(--color-primary);  /* 기존 2px → 1.5px */
  --border-error: 1.5px solid var(--color-error);     /* 신규 */
}
```

포커스 보더를 2px에서 1.5px로 낮춰 "두 배로 굵어지는" 느낌 대신 "한 단계만 강해지는" 절제된 인상을 준다. 인풋/텍스트영역/셀렉트의 에러 보더도 같은 굵기(`--border-error`)로 통일했다 (기존엔 컴포넌트마다 `2px solid var(--color-error)`를 직접 써서 포커스 보더와 두께가 어긋나 있었다).

### 그림자 (Shadow) — 평면이 기본, 뜨는 표면에만

```css
:root {
  --shadow-sm: 0 4px 12px rgba(17, 17, 17, 0.06), 0 1px 2px rgba(17, 17, 17, 0.04);   /* 툴팁, 스위치 thumb */
  --shadow-md: 0 10px 28px rgba(17, 17, 17, 0.10), 0 2px 6px rgba(17, 17, 17, 0.05);  /* 드롭다운 메뉴 */
  --shadow-lg: 0 16px 40px rgba(17, 17, 17, 0.14), 0 4px 10px rgba(17, 17, 17, 0.06); /* 모달, 토스트 */
  --shadow-focus: 0 0 0 3px rgba(17, 17, 17, 0.12);
}
```

**중요한 변화:**
- 그림자를 검정(`rgba(0,0,0,...)`) 대신 Tongss 잉크 컬러(`rgba(17,17,17,...)`) 기준으로 통일했다.
- **카드는 더 이상 그림자를 갖지 않는다.** 안착된 표면(카드)은 헤어라인 보더로만 구분하고, 실제로 "떠 있는" 표면(모달·토스트·드롭다운·툴팁)에만 그림자를 남겼다 — TDS의 "평면이 기본" 원칙.
- `--shadow-focus`가 기존엔 `rgba(37, 99, 235, 0.1)` — Tongss 팔레트에 없는 **낯선 파란색**이었다 (아마 예전 템플릿에서 그대로 복사돼 남은 값으로 추정). 지금은 `--color-primary` 기준 잉크 컬러로 바로잡았다.

### 오버레이 & 이펙트 (신규)

```css
:root {
  --overlay-scrim: rgba(17, 17, 17, 0.48);            /* 모달 배경 스크림 */
  --overlay-loading-track: rgba(255, 255, 255, 0.45); /* 로딩 스피너 트랙 */
  --shimmer-highlight: rgba(255, 255, 255, 0.6);      /* 스켈레톤 반짝임 */
}
```

기존엔 모달 스크림·로딩 스피너·스켈레톤 반짝임 색이 컴포넌트 CSS 안에 하드코딩돼 있었다. 토큰으로 옮겨서 "모든 값은 토큰을 참조한다" 원칙을 지켰다.

### 모션 (Motion) — 빠르고 절제되게 (신규 확장)

```css
:root {
  --ease-standard: cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-snappy: cubic-bezier(0.16, 1, 0.3, 1);
  --transition-fast: 0.12s var(--ease-standard);   /* 기존 0.15s ease */
  --transition-normal: 0.2s var(--ease-standard);  /* 기존 0.25s ease */
  --transition-slow: 0.32s var(--ease-snappy);     /* 기존 0.4s ease */
}
```

밋밋한 `ease` 대신 TDS가 쓰는 ease-out 계열 커브를 가져왔다. 변수 이름(`--transition-fast/normal/slow`)은 그대로라 기존 컴포넌트 CSS를 한 줄도 안 고치고 자동으로 더 스냅감 있는 모션을 얻었다. 바운스·오버슈트는 쓰지 않는다.

**파일 위치:** `assets/css/tokens.css`가 유일한 원본. 리셋/레이아웃은 `base.css`, 부품 스타일은 `components.css`.

---

## 🤖 컴포넌트별 적용 가이드

토큰 레이어만 바꿔서 자동으로 좋아진 것도 있고, 컴포넌트 CSS(`design-system/assets/css/components.css`)를 직접 고친 것도 있다.

### Button

- 라운드를 `--radius-sm`(4px)에서 `--radius-md`(12px)로 키웠다.
- 사이즈별 `min-height`(sm 32 / md 40 / lg 48)를 추가해 터치 타겟을 토큰으로 보장한다.
- `:active` 상태를 추가했다 — 누르면 `scale(0.98)` + hover와 같은 톤 변화가 함께 일어난다 (기존엔 눌렀을 때 아무 피드백이 없었다).
- 변형(primary/accent/danger/ghost)과 색상은 그대로 — 화면당 강조는 하나(`primary`)라는 원칙을 유지한다.

### Card

- **그림자를 제거했다.** 헤어라인 보더(`--border-normal`)로만 구분한다.
- 라운드는 `--radius-md`(12px)로, 토큰 레이어 변경만으로 자동 적용됐다.
- `design-system/index.html`의 데모 카드도 같은 원칙으로 그림자를 뺐다.

### Input · Textarea · Select

- 라운드를 `--radius-md`(12px)로 키워 텍스트필드다운 인상을 줬다.
- 에러 상태 보더를 `--border-error`(1.5px) 토큰으로 통일 — 기존엔 컴포넌트마다 `2px solid var(--color-error)`를 직접 썼다.

### Badge

- 이미 `--radius-full`(pill) 형태라 TDS의 chip/badge 원칙과 잘 맞아서 변경하지 않았다.

### Modal

- 라운드를 `--radius-xl`(20px)로 키워 "가장 도드라진 표면"이라는 위계를 표현했다.
- 스크림 배경을 하드코딩된 `rgba(17,17,17,0.5)` 대신 `--overlay-scrim` 토큰으로 옮겼다.

### Toast · Dropdown · Tooltip — 그림자 위계 재정렬

- 툴팁: 기존엔 그림자가 아예 없었다 — `--shadow-sm`을 추가해 "떠 있는" 느낌을 살렸다.
- 드롭다운 메뉴: `--shadow-lg`(모달급)를 쓰고 있었는데, 모달보다 가벼운 `--shadow-md`로 낮춰 위계를 정리했다 (툴팁 < 드롭다운 < 모달/토스트).
- 토스트·모달: 스크림이 없는 토스트도 스크림이 있는 모달과 같은 `--shadow-lg`를 공유한다 — 토스트는 배경 도움 없이 혼자 떠야 하므로 그림자가 상대적으로 더 크게 느껴지도록 값을 설계했다.

### Navigation (디자인 시스템 사이드바)

- 링크 hover/active 스타일은 유지, 포커스 링만 아래 항목 참고.

### 포커스 링 일관성 (신규 — 접근성 정리)

기존엔 버튼·인풋·체크박스·스위치만 커스텀 포커스 링을 갖고 있었고, 나머지 클릭 가능한 요소(페이지네이션 버튼, 아코디언 트리거, 탭, 드롭다운 항목, 토스트 닫기 버튼, 사이드바 링크, "디자인 시스템으로" 뒤로가기 링크)는 브라우저 기본 포커스 링에 의존하고 있었다. 크롬/엣지 등 대부분의 브라우저 기본 포커스 링은 **파란색**이라, 키보드로 탭 이동을 하면 Tongss 어디에도 없는 낯선 파란 테두리가 나타나는 문제가 있었다. 모든 인터랙티브 요소에 `:focus-visible { outline: none; box-shadow: var(--shadow-focus); }`를 추가해 잉크 컬러 기반 포커스 링으로 통일했다.

---

## 👤 design-system/ — 컴포넌트 카탈로그

```
design-system/
├─ index.html
├─ desin.md                    ← 토스 디자인 시스템(TDS) 조사 문서 (레퍼런스 전용, 구현 아님)
├─ components/
│  ├─ button.html            ├─ inventory-row.html   ← 신규 (재고 확인 줄: 확인함+부족해요)
│  ├─ input.html              ├─ manual-card.html      ← 신규 (매뉴얼 카드)
│  ├─ checkbox.html            ├─ checklist-row.html    ← 신규
│  ├─ badge.html               ├─ empty-state.html
│  ├─ card.html                 ├─ bottom-nav.html       ← 신규 (직원 화면 탭)
│  └─ ... (기존 목록 유지: modal, toast, table, tabs 등 필요 시)
└─ assets/css/components.css
```

### 컴포넌트 우선순위 (Tongss 기준 재배정)

```
필수: Button, Input, Checkbox, Badge, Card, Manual Card, Checklist Row,
      Inventory Row, Empty State, Bottom Nav, Loader

있으면 좋음: Toast, Tabs, Avatar

이번엔 불필요: Table(대량 데이터 없음), Pagination, Date Picker, File Upload, Drawer
```

### 아이콘: 이모지 금지, Lucide만 (기존 원칙 유지)

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="check"></i>
<script>lucide.createIcons();</script>
```

---

## 👤🤖 체크리스트
```
1. 색 → var(--color-primary) 등 토큰만 사용
2. 글자 크기 → 김스태프 화면은 --fs-16 이상
3. 간격 → var(--space-*) 4배수만
4. 터치 타겟 → 현장 화면은 --space-48 이상 확보 (버튼은 사이즈별 min-height로 이미 보장됨)
5. 모서리/그림자 → var(--radius-*) / var(--shadow-*)만, 카드에 직접 box-shadow 추가하지 않기 (평면이 기본)
6. 포커스 링 → 클릭 가능한 새 요소를 만들면 :focus-visible에 var(--shadow-focus)를 반드시 추가 (브라우저 기본 파란 링 방지)
7. 새 색/크기 필요 시 → tokens.css에 추가 + Store PO 공유 (혼자 추가 금지)
```
