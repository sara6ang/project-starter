# store-app/CLAUDE.md

> **문서 소유권:** 이 파일의 최종 수정 권한은 **Store PO**에게 있습니다. 아래는 PM이 제시하는 초안 가이드라인이며, Store PO가 검토·확정·수정합니다.
> 이 파일은 Claude Code가 이 프로젝트(store-app 폴더)에서 작업할 때 **매번 자동으로 읽습니다.** 팀원이 매번 규칙을 복붙하지 않아도, Claude Code는 이 내용을 항상 알고 있는 상태로 시작합니다.
> 루트 규칙은 `../CLAUDE.md` 참조 (docs 번호 체계, 팀 공통 AI 규칙).

---

## 기술 스택 (절대 규칙) `[확인필요: Week 1 08_DECISIONS.md에서 최종 확정]`

- 순수 HTML + CSS + JS만 사용한다. React/Vue 등 프레임워크 금지. JSX 금지. 빌드 도구 없음.
- Live Server로 그냥 열어서 바로 보이는 상태여야 한다 (npm install, 빌드 명령 없이).
- 화면 이동은 실제 `.html` 파일 이동 (MPA). SPA 라우터 쓰지 않는다.
- 아이콘은 Lucide만 사용한다. 이모지를 아이콘 대용으로 쓰지 않는다.

## 폴더 규칙 (한 문장)

> **마크업은 `pages/owner/`·`pages/staff/`, 로직은 `assets/js/features/`, 공용 코드는 `assets/js/shared/`, 데이터는 `data/`(json만), 문서는 `docs/`.**

자세한 폴더 트리와 이유는 `docs/06_ARCHITECTURE.md`를 반드시 먼저 읽는다.

## 작업 전 항상 확인

새 파일을 만들거나 기존 파일을 고치기 전에:
1. `docs/06_ARCHITECTURE.md` — 이 파일이 어디에 들어가야 하는지
2. `docs/07_DESIGN_SYSTEM.md` — 색/글자/간격은 반드시 `assets/css/tokens.css` 변수만
3. `docs/05_DATA.md` — 데이터 구조 (Store, Manual, ChecklistItem, InventoryItem, Staff). **org로 나가는 필드는 `../docs/05_DATA_CONTRACT.md`(shared)가 진실**
4. `docs/04_COMPONENT_MAP.md` — 이미 있는 컴포넌트인지 (새로 만들기 전에 재사용 가능한지 확인)
5. `../docs/07_VOICE_AND_TONE.md` — 화면 성격(사장 화면 vs 직원 현장 화면)에 따라 문구 톤이 다르다

## AI 툴 사용 시 지켜야 할 것

1. **가급적 VS Code + Claude Code 확장을 사용할 것.** 코드 diff를 눈으로 확인하고 파일을 @-mention할 수 있어 "이해 못 한 코드는 커밋하지 않는다"는 팀 규칙을 지키기 쉽다. claude.ai 채팅에 코드를 짜달라고 해서 복사-붙여넣기하는 방식은 여러 파일 간 일관성이 깨지기 쉬우니 지양한다. (터미널 CLI, 데스크톱 앱의 Code 탭도 능력은 동일 — 편한 것을 쓰되, 팀 리뷰가 쉬운 diff 기반 방식을 권장)
2. **05_DATA_CONTRACT.md(shared)와 05_DATA.md를 컨텍스트로 항상 포함할 것.**
3. 새 라이브러리 추가는 Store PO 승인 후.

## 하지 않을 것

- `shared/`, `features/`, `utils/`, `components/`(잘못된 위치) 같은 임의 폴더를 프로젝트 루트에 새로 만들지 않는다.
- `data/` 폴더에 `.js` 코드를 넣지 않는다 (json만).
- 컴포넌트 스타일을 `assets/css/components.css` 말고 다른 곳에 중복 정의하지 않는다.
- 이모지를 아이콘으로 쓰지 않는다.
- `05_DATA_CONTRACT.md`에 없는 필드를 org 전송 코드에 임의로 추가/변경하지 않는다.
- 확신이 없으면 새로 만들지 말고 먼저 물어본다 (아래 참고).

## 헷갈리면

작업 방향이 명확하지 않거나 두 가지 방식 중 뭘 골라야 할지 애매하면, **혼자 결정하지 말고 Store PO(또는 PM)에게 먼저 물어본다.** 특히 다음 경우:
- 새로운 최상위 폴더가 필요해 보일 때
- `assets/js/shared/`에 넣을지 `assets/js/features/owner|staff/`에 넣을지 애매할 때
- 디자인 토큰에 없는 색이나 크기가 필요해 보일 때
- 05_DATA_CONTRACT.md에 없는 데이터를 org로 보내야 할 것 같을 때

## 문서 전체 목록

```
store-app/docs/
├── 03_USER_FLOW.md
├── 04_COMPONENT_MAP.md
├── 05_DATA.md
├── 06_ARCHITECTURE.md
├── 07_DESIGN_SYSTEM.md

```

> ⚠️ `00_PROJECT_START` / `01_MUST_PREPARE` / `02_BEFORE_CODE`는 여기 두지 않는다 — 같은 역할을 이미 `../docs/00_WHY.md`, `01_PERSONAS.md`, `02_PRD.md`(shared)가 하고 있어서 중복이기 때문이다. 프로젝트 배경·페르소나·스코프가 궁금하면 그쪽을 먼저 읽을 것.

## 문서 소유권 원칙

이 CLAUDE.md를 포함한 `store-app/docs/` 전체의 **최종 수정 권한은 Store PO**에게 있다. PM(Sara)은 초안과 가이드라인을 제시하지만, 확정·변경은 Store PO의 몫이다. 트랙을 넘는 결정(데이터 계약 변경 등)은 `../docs/08_DECISIONS.md`에 기록.