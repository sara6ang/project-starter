# TongssApp/docs/07_DESIGN_SYSTEM — 디자인 시스템

> **문서 소유권:** 최종 수정 권한은 **Store PO**. 아래는 기존에 확보해둔 토큰 시스템을 그대로 채택한 초안 — 값 자체(색상 등)는 Store PO가 Tongss 브랜드에 맞게 조정할 수 있다.
> ⚠️ 색·타이포 **구조**(토큰 방식, 4px 배수, 5단계 글자크기)는 검증된 패턴이라 그대로 두는 걸 권장하지만, **정확한 색상값(특히 accent 핑크)은 이 프로젝트를 위해 새로 정한 게 아니라 이전 프로젝트에서 가져온 값**이다. ../../docs/06_VOICE_AND_TONE.md의 브랜드 키워드(Instant·Effortless·Reassuring)에 맞는 색인지 Store PO가 한 번 검토할 것.

---

## Tokens

### 색 (Colors) — `[확인필요: Store PO 검토]`

```css
:root {
  --color-primary: #111111;
  --color-accent: #ff4f97;    /* [확인필요] Tongss 브랜드에 맞는 색인지 재검토 */
  --color-neutral: #6b6b6b;

  --color-success: #22a34a;   /* 체크리스트 완료, 학습 완료 등에 사용 */
  --color-warning: #e9a23b;   /* 재고 부족 알림 등에 사용 */
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
}
```

**Tongss 적용 지침:** 김스태프 현장 화면(체크리스트, 재고 입력)은 `--fs-16` 이상만 사용 — 현장에서 작은 글자는 안 읽힌다. `--fs-12`는 사장 대시보드의 보조 정보에만.

### 간격 (Spacing) — 4px 배수만

```css
:root {
  --space-4: 4px; --space-8: 8px; --space-12: 12px; --space-16: 16px;
  --space-20: 20px; --space-24: 24px; --space-32: 32px; --space-40: 40px;
  --space-48: 48px; --space-64: 64px;
}
```

**Tongss 적용 지침:** 김스태프 화면의 터치 타겟(체크박스, +/- 버튼)은 최소 `--space-48`(48px) 이상 확보 — 현장에서 급하게 누르는 상황을 고려.

### 모서리 / 보더 / 그림자 / 트랜지션

```css
:root {
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 16px; --radius-full: 9999px;
  --border-thin: 1px solid var(--gray-100);
  --border-normal: 1px solid var(--gray-300);
  --border-focus: 2px solid var(--color-primary);
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 10px 24px rgba(0,0,0,0.12);
  --shadow-focus: 0 0 0 3px rgba(17,17,17,0.1);
  --transition-fast: 0.15s ease;
  --transition-normal: 0.25s ease;
  --transition-slow: 0.4s ease;
}
```

**파일 위치:** `assets/css/tokens.css`가 유일한 원본. 리셋/레이아웃은 `base.css`, 부품 스타일은 `components.css`.

---

## design-system/ — 컴포넌트 카탈로그

```
design-system/
├─ index.html
├─ components/
│  ├─ button.html          ├─ counter-input.html   ← 재고 수량 +/-, 신규
│  ├─ input.html            ├─ manual-card.html      ← 신규 (매뉴얼 카드)
│  ├─ checkbox.html          ├─ checklist-row.html    ← 신규
│  ├─ badge.html             ├─ empty-state.html
│  ├─ card.html               ├─ bottom-nav.html       ← 신규 (직원 화면 탭)
│  └─ ... (기존 목록 유지: modal, toast, table, tabs 등 필요 시)
└─ assets/css/components.css
```

### 컴포넌트 우선순위 (Tongss 기준 재배정)

```
필수: Button, Input, Checkbox, Badge, Card, Manual Card, Checklist Row,
      Counter Input, Empty State, Bottom Nav, Loader

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

## 체크리스트
```
1. 색 → var(--color-primary) 등 토큰만 사용
2. 글자 크기 → 김스태프 화면은 --fs-16 이상
3. 간격 → var(--space-*) 4배수만
4. 터치 타겟 → 현장 화면은 --space-48 이상 확보
5. 새 색/크기 필요 시 → tokens.css에 추가 + Store PO 공유 (혼자 추가 금지)
```