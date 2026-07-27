# TongssApp/CLAUDE.md

> **문서 소유권:** 이 파일의 최종 수정 권한은 **Store PO(아론)**에게 있습니다. PM(Sara)이 초안을 제시하고, 아론님이 검토·확정·수정합니다.
> **이 문서는 두 독자를 위한 문서입니다.** 👤 아론님(App PO 겸 개발자)이 "왜 이렇게 만드는지"를 알기 위해, 🤖 Claude Code가 실제 코드를 짤 때 규칙을 지키기 위해. 각 항목 앞에 누가 읽는 내용인지 표시했습니다.
> 이 파일은 Claude Code가 TongssApp 폴더에서 작업할 때 **매번 자동으로 읽습니다.** 팀원이 매번 규칙을 복붙하지 않아도 됩니다.
> 루트 규칙은 `../CLAUDE.md` 참조.

---

## 👤🤖 기술 스택 (절대 규칙)

- 순수 HTML + CSS + JS만 사용합니다. React/Vue 등 프레임워크, JSX, 빌드 도구 없음.
- 화면 이동은 실제 `.html` 파일을 이동하는 방식입니다 (화면 하나 = html 파일 하나). React식 "한 페이지 안에서 화면만 바뀌는 방식"은 쓰지 않습니다.
- 아이콘은 Lucide 아이콘만 씁니다. 이모지를 아이콘 대신 쓰지 않습니다.

> 👤 **왜 이 스택인가:** 아론님이 처음 코딩을 시작하는 것과 비슷한 조건입니다 — `npm install`이나 빌드 명령 없이, 파일을 열면 바로 화면이 보이는 가장 단순한 방식입니다. Claude에게 "이 화면 만들어줘"라고 요청하면 결과가 바로 눈에 보입니다.

---

## 👤 화면을 요청하기 전에 알아두면 좋은 것

1. `../docs/00_PRODUCT_GUIDE.md` — 왜 만드는지, 뭘 만드는지 (5분 요약)
2. `docs/03_USER_FLOW.md` — 화면별로 뭐가 있고 뭘 할 수 있는지, **Claude에게 요청할 문장도 여기 그대로 있습니다**
3. `docs/07_DESIGN_SYSTEM.md` — 실제 색·컴포넌트를 눈으로 보려면 `design-system/index.html`을 브라우저로 열어보세요 (Figma 대신 이걸 씁니다)
4. `docs/04_COMPONENT_MAP.md` — 이미 만든 부품이 있는지 확인 (없으면 새로 만들어달라고 요청)

## 🤖 Claude Code 작업 규칙

새 파일을 만들거나 기존 파일을 고치기 전에 확인:
1. `docs/06_ARCHITECTURE.md` — 이 파일이 어디에 들어가야 하는지
2. `docs/07_DESIGN_SYSTEM.md` — 색/글자/간격은 반드시 `assets/css/tokens.css` 변수만
3. `docs/05_DATA.md` — 데이터 구조 (Store, Manual, ChecklistItem, InventoryItem, Staff). **org로 나가는 필드는 `../docs/04_DATA_CONTRACT.md`(shared)가 진실**
4. `docs/04_COMPONENT_MAP.md` — 이미 있는 컴포넌트인지 (재사용 우선, 새로 안 만들기)
5. `../docs/06_VOICE_AND_TONE.md` — 화면 성격(사장 화면 vs 직원 현장 화면)에 따라 문구 톤이 다름

---

## 👤 아론님이 Claude와 함께 개발할 때

1. 가급적 **VS Code + Claude Code 확장**을 사용하세요 — 뭐가 바뀌었는지(diff)를 눈으로 바로 확인할 수 있어서, 코드를 몰라도 "이 부분이 변경됐구나"를 알 수 있습니다.
2. 화면을 요청할 때는 `03_USER_FLOW.md`의 **"🤖 Claude에게 요청할 내용"** 문장을 그대로 복사해서 쓰면 됩니다 — 처음부터 문장을 만들 필요 없습니다.
3. 새 라이브러리를 추가하고 싶으면 팀에 먼저 공유 후 진행하세요.

---

## 👤🤖 하지 않을 것

- `shared/`, `features/`, `utils/`, `components/`(잘못된 위치) 같은 임의 폴더를 프로젝트 루트에 새로 만들지 않는다.
- `data/` 폴더에 `.js` 코드를 넣지 않는다 (json만).
- 컴포넌트 스타일을 `assets/css/components.css` 말고 다른 곳에 중복 정의하지 않는다.
- 이모지를 아이콘으로 쓰지 않는다.
- `04_DATA_CONTRACT.md`에 없는 필드를 org 전송 코드에 임의로 추가/변경하지 않는다.
- 확신이 없으면 새로 만들지 말고 먼저 물어본다 (아래 참고).

## 👤🤖 헷갈리면

작업 방향이 명확하지 않거나 두 가지 방식 중 뭘 골라야 할지 애매하면, **혼자 결정하지 말고 Store PO(또는 PM)에게 먼저 물어본다.** 아론님과 Claude Code 둘 다 이 원칙을 따릅니다. 특히 다음 경우:
- 새로운 최상위 폴더가 필요해 보일 때
- `assets/js/shared/`에 넣을지 `assets/js/features/owner|staff/`에 넣을지 애매할 때
- 디자인 토큰에 없는 색이나 크기가 필요해 보일 때
- `04_DATA_CONTRACT.md`에 없는 데이터를 org로 보내야 할 것 같을 때

---

## 문서 전체 목록

```
TongssApp/docs/
├── 03_USER_FLOW.md       👤 화면별 목적·구성·Claude 요청 문장
├── 04_COMPONENT_MAP.md   👤🤖 부품 지도 (사람용 설명 + AI용 코드 참고)
├── 05_DATA.md            👤🤖 데이터 구조 (사람용 설명 + AI용 코드 참고)
├── 06_ARCHITECTURE.md    👤🤖 폴더 구조 (사람용 설명 + AI용 코드 참고)
└── 07_DESIGN_SYSTEM.md   👤🤖 디자인 값 + 실제 화면 미리보기 링크
```

> ⚠️ `00/01/02` 문서는 여기 두지 않습니다 — 같은 역할을 이미 `../docs/00_PRODUCT_GUIDE.md`, `01_PERSONAS.md`(shared)가 하고 있어서 중복이기 때문입니다. `07_DECISIONS`, `03_PROJECT_GUIDE`도 shared 전용이라 여기 없습니다.

## 문서 소유권 원칙

이 CLAUDE.md를 포함한 `TongssApp/docs/` 전체의 **최종 수정 권한은 Store PO**에게 있습니다. PM(Sara)은 초안과 가이드라인을 제시하지만, 확정·변경은 Store PO의 몫입니다. 트랙을 넘는 결정(데이터 계약 변경 등)은 `../docs/07_DECISIONS.md`에 기록합니다.
