# 🧩 TongssOrg/docs/04_COMPONENT_MAP — 컴포넌트 지도 (LWC)

> **문서 소유권:** 최종 수정 권한은 **Org PO**. 아래는 PM이 제시하는 초안 — LWC 개념 설명은 이전 프로젝트(Pepper's Oven) 자료를 그대로 채택(스택 지식이라 도메인 무관), 실제 컴포넌트 목록만 Tongss 기준으로 교체.

---

## LWC 컴포넌트 하나 = 파일 4개 세트 (그대로 채택)

```
myComponent/
├─ myComponent.html         ← 화면 뼈대 (템플릿)
├─ myComponent.js           ← 동작/로직 (컨트롤러)
├─ myComponent.js-meta.xml  ← 설정 (어디서 쓸 수 있는지)
└─ myComponent.css          ← 스타일 (선택)
```

`<template>` 태그로 감싸고, `{fieldName}` 중괄호로 데이터를 화면에 연결한다. 값이 바뀌면 화면도 자동으로 바뀐다.

## 데코레이터 3개 (그대로 채택)

```javascript
import { LightningElement, api, track, wire } from 'lwc';

export default class StoreHealthBadge extends LightningElement {
  @api recordId;              // 부모(레코드 페이지)가 넣어주는 값 — 이 매장의 Account Id
  @track isActive = false;
  @wire(getStoreStatus) status; // Apex에서 데이터를 자동으로 받아옴
}
```

---

## 컴포넌트 레벨 (Tongss 기준)

### Level 1: Base Lightning Component — 새로 안 만듦
```
lightning-datatable   (매장 리스트뷰는 표준 List View라 이것도 불필요할 가능성 높음)
lightning-card        lightning-badge       lightning-formatted-text
lightning-icon        lightning-button
```
👉 00_PRODUCT_GUIDE 스코프상 이번엔 표준 List View + 표준 Lightning Record Page만으로 대부분 해결된다. TongssApp 때와 달리 **커스텀 LWC가 거의 필요 없을 수 있다** — 00_PRODUCT_GUIDE의 In 스코프가 "필드 표시 + 필터"라 표준 기능으로 충분하기 때문.

### Level 2: 커스텀 LWC (공용) — 필요 시에만
```
storeHealthBadge      ← 활성/방치 상태를 조건부 색상 배지로 (Base Component로 안 되는 부분)
sharedEmptyState       ← "매뉴얼 아직 없음" 등 (TongssApp과 개념은 같으나 org 안에서 별도 제작)
```
`[확인필요]` `storeHealthBadge`를 실제로 만들지, 필드 조건부 서식(Setup에서 클릭으로 설정)으로 대체할지 — 03_USER_FLOW 리뷰 세션 안건.

### Level 3: 커스텀 LWC (기능 전용) — 이번 스코프엔 없을 가능성
```
(현재 없음 — 필요해지면 여기 추가)
```

### Level 4: 조립 — FlexiPage / App Builder
매장 레코드 페이지에 표준 필드 + (있다면) `storeHealthBadge`를 배치하는 것은 코드가 아니라 **Salesforce Setup에서 클릭으로 배치**한다 (Lightning App Builder).

---

## 📋 컴포넌트 만들기 전 체크리스트 (그대로 채택)

```markdown
1. Base Lightning Component 또는 표준 List View/Record Page로 되는 거 아닌가? (먼저 확인)
2. 몇 군데에서 쓰나? 1곳만 → 기능 전용 / 2곳 이상 → 공용(shared 접두어)
3. 데이터를 어디서 가져오나? Apex(@wire) 또는 부모가 넘겨줌(@api)
4. 스타일은 SLDS 훅만 사용했는가? (07_DESIGN_SYSTEM.md)
```

---

## VS Code에서 LWC 컴포넌트 만드는 법 (그대로 채택)

```
Cmd+Shift+P (커맨드 팔레트)
→ "SFDX: Create Lightning Web Component"
→ 이름 입력 (camelCase, 예: storeHealthBadge)
→ force-app/main/default/lwc/ 안에 자동 생성됨
```
Salesforce 개발은 VS Code + **Salesforce Extension Pack**(SFDX)이 사실상 표준이다. Claude Code도 이 확장과 함께 VS Code에서 쓰는 걸 권장한다 (`../CLAUDE.md` 참조).