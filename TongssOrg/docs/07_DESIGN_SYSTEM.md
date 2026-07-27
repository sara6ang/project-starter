# 🎨 toss-org/docs/07_DESIGN_SYSTEM — 디자인 시스템 (SLDS 2 버전)

> **문서 소유권:** 최종 수정 권한은 **Org PO**. 아래는 이전 프로젝트(Pepper's Oven) 원칙을 그대로 채택 (스택 지식이라 도메인 무관).
> ⚠️ 이 문서는 **Salesforce 앱 안의 LWC/표준 화면** 전용입니다. store-app은 SLDS를 쓰지 않는 완전히 별도 프로젝트라 `../../store-app/docs/07_DESIGN_SYSTEM.md`에서 자체 토큰을 따로 정의합니다. 헷갈리지 않게 구분!

## 우리가 할 일

Salesforce가 이미 만들어둔 토큰 체계(SLDS 2)를 쓴다. 우리가 할 일은 "그 토큰 값을 Tongss 팔레트로 맞추는 것"뿐이다.

## SLDS 2 Styling Hooks

```css
--slds-g-color-brand-base-50: #111111;   /* primary */
--slds-g-spacing-4: 16px;
```

전역 훅(`--slds-g-*`)을 한 곳에서 바꾸면 앱 전체의 버튼/카드/모달 색이 한 번에 바뀐다.

## 어디서 설정하나

- **관리자 화면(클릭)**: Setup → Themes and Branding → 브랜드 색상 지정 (코드 없이 가능, 가장 쉬움)
- **컴포넌트 안(코드)**: 개별 LWC의 css 파일에서 `:host { --slds-g-color-brand-base-50: #111111; }`로 재정의 가능

## Tongss 팔레트 적용 `[확인필요: Org PO 확정]`

```css
/* store-app의 07_DESIGN_SYSTEM.md 팔레트와 통일할지, org는 SLDS 기본값 유지할지 결정 필요 */
--slds-g-color-brand-base-50: #111111;   /* store-app --color-primary와 동일 값 제안 */
--slds-g-color-accent-1: #ff4f97;         /* store-app --color-accent와 동일 값 제안, 단 이 값 자체가 store-app 쪽에서도 재검토 중 */
```

> 정확한 훅 이름은 SLDS 2 버전에 따라 다를 수 있어, 실제 적용 시 Setup의 Themes and Branding 화면에서 이름을 확인하고 맞출 것을 권장.
> 박세일즈는 매일 여러 다른 Salesforce 앱을 넘나드는 사용자이므로, **브랜드 통일보다 "Salesforce 표준처럼 보이는 것"이 더 중요할 수 있다** — 과감한 커스텀 브랜딩보다 SLDS 기본값에 가깝게 두는 것도 고려 대상.

---

## 새로 안 만들어도 되는 것 (Base Lightning Components)

| 필요해 보이는 것 | Salesforce 기본 제공 |
|---|---|
| 매장 상태 배지 | `<lightning-badge>` (조건부 색상은 커스텀 필요할 수 있음 — 04_COMPONENT_MAP 참조) |
| 매장 목록 | 표준 List View (커스텀 불필요) |
| 매장 상세 필드 표시 | 표준 Lightning Record Page (App Builder로 배치) |
| Empty State (매뉴얼 0개 등) | 직접 만들어야 함 (Base Component 없음) — 필요 시 `sharedEmptyState`로 공용 제작 |
| Loader | `<lightning-spinner>` |
| Toast | `ShowToastEvent` |

**이번 스코프에서 직접 만들어야 할 가능성이 있는 건 `storeHealthBadge`(조건부 배지), 필요하다면 `sharedEmptyState` 정도뿐이다.** Pepper's Oven 때보다 커스텀 컴포넌트가 훨씬 적다 — 02_PRD 스코프가 "조회 중심"이라 표준 기능으로 대부분 해결되기 때문.

---

## 🎯 체크리스트

```
1. 이 부품, Base Lightning Component 또는 표준 List View/Record Page로 되나? → 먼저 확인
2. 색은 SLDS 훅만 사용했는가? (하드코딩 금지)
3. 간격은 SLDS spacing 유틸리티 클래스 사용했는가? (slds-p-around_medium 등)
4. 새 색이 필요하면 → Org PO와 상의 후 Themes and Branding에서 전역 설정
5. store-app 팔레트와 통일할지 여부를 Org PO가 결정했는가?
```