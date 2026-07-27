# platform-lead/docs/PERMISSIONS — 플랫폼 원칙 & 실제 설정 기록

> **문서 소유권:** 최종 수정 권한은 **Platform Lead(혜준)**. PM이 제시하는 초안 — 값이 정해지는 대로 채울 것.
> ⚠️ 이 문서는 "Guest User 권한 세팅 문서"가 아닙니다. **Tongss MVP는 인증을 의도적으로 만들지 않습니다** — 사장·직원은 Entry Code로 TongssApp에 들어가고 (`TongssApp/docs/03_USER_FLOW.md` §0), Salesforce는 로그인을 책임지지 않습니다. 이 문서는 그 위에서 **플랫폼이 지켜야 할 원칙**과 **실제로 설정한 값**을 기록합니다.

---

## 보안 원칙 (구현이 아니라 원칙으로)

Salesforce 기능 이름(Guest User Profile, Sharing Rule 등)으로 설명하는 대신, 아래 원칙으로 보안을 설명합니다. 실제 구현 방법은 이 원칙을 지키는 선에서 Platform Lead가 구현 시점에 정합니다.

| 원칙 | 의미 |
|---|---|
| **TongssApp은 Salesforce에 직접 쓰지 않는다** | TongssApp → Integration(연동 엔드포인트) → TongssOrg 순서를 항상 거친다. TongssApp이 Salesforce Object를 직접 조작하는 경로는 없다 |
| **연동은 들어오는 요청을 검증한다** | 계약(`../../docs/04_DATA_CONTRACT.md`)에 없는 필드·형식은 거부한다 |
| **TongssOrg가 운영 데이터의 주인이다** | 매장 상태(활성 여부, 완료율 등)의 최종 값은 항상 TongssOrg 기준. TongssApp은 발생시킬 뿐, 저장의 주인이 아니다 |
| **연동 계정 권한은 최소로만 연다** | "일단 넓게 열고 나중에 좁히기"는 하지 않는다. 계약에 정의된 필드만, Edit 권한만 |
| **인증은 나중에, 구조는 그대로** | 실제 로그인 시스템이 도입되어도 위 3단계(App → Integration → Org) 구조 자체는 바뀌지 않는다. 인증은 그 구조 위에 얹는 계층이다 |

> 이 표는 "지금 뭘 지켜야 하는가"의 요약입니다. **왜 이렇게 정했고, 어떤 대가를 감수했는지**는 `ARCHITECTURE_DECISIONS.md`(ADR-001~004)에 기록되어 있습니다.

---

## 이 문서가 다루는 범위 (Org PO와의 경계)

org 데이터 모델은 **설계와 세팅을 분리하지 않고** 은영(Org PO)·혜준(Platform Lead)이 함께 진행한다. 전체 책임 분담표는 `../../TongssOrg/CLAUDE.md`(👨‍💻 Salesforce Developer 구현 표) 참조. 그중 **이 문서에 기록할 것은 Platform Lead 책임 영역**이다.

| 이 문서(PERMISSIONS.md)에 기록 | TongssOrg/docs에 기록 (Org PO 책임) |
|---|---|
| Page Layout, Permission Set, Profile / Sharing | Object 설계, Field 설계 (`01_OBJECT_MODEL.md`, `02_FIELD_GUIDE.md`) |
| Validation Rule, Flow, Org 설정 | Relationship 설계, Record Type 필요 여부 판단 |
| 연동 계정의 최소 권한 범위 | 연동 원칙 자체 (`TongssOrg/docs/05_PERMISSION.md`) |

> ⚠️ Record Type을 만들기로 결정되면(은영 책임 판단) → **Page Layout 지정과 Profile 할당은 이 문서에 기록**한다. 두 문서가 이 지점에서 이어진다.

값이 바뀔 때마다 이 문서를 갱신하고, 트랙을 넘는 변경은 `../../docs/07_DECISIONS.md`에도 기록.

---

## 팀원 User / 권한 세트 (내부 실사용자, 박세일즈 포함)

| 이름/역할 | Profile | Permission Set | 비고 |
|---|---|---|---|
| Org PO | `[확인필요]` | `[확인필요]` | |
| Integration Lead | `[확인필요]` | `[확인필요]` | |
| Platform Lead | `[확인필요]` | `[확인필요]` | Admin |
| PM (참관) | `[확인필요]` | 읽기 전용 권장 | |

---

## 연동 계정 권한 (TongssApp → TongssOrg 전용)

TongssApp은 Salesforce 계정으로 로그인하지 않습니다 — **사람이 아니라 시스템이 데이터를 보내는 통로**입니다. 위 "보안 원칙"에 따라 최소로만 엽니다.

| 항목 | 범위 | 이유 |
|---|---|---|
| Object 접근 | Account만 | `04_DATA_CONTRACT.md` 필드 갱신 목적 외 접근 불필요 |
| 필드 접근 | `Store_Id__c`, `Manual_Count__c`, `Last_Manual_Updated__c`, `Manual_Completion_Rate__c`, `Checklist_Completion_Rate__c` (Edit만) | 계약에 정의된 필드만 |
| Object 권한 수준 | Edit만, **Create/Delete 금지** | 매장 레코드는 Org PO가 미리 생성, 연동은 갱신만 |
| Apex Class 접근 | `StoreRestService`만 | 다른 클래스 호출 불가하도록 |
| 접근 가능 레코드 범위 | `[확인필요]` | 어떤 Account까지 갱신 가능한지 — 구현 시점에 Platform Lead가 정함 |

**"일단 넓게 열고 나중에 좁히기"는 하지 않습니다.** 처음부터 계약에 필요한 최소 범위만 엽니다. 실제로 이 접근을 여는 구체적인 Salesforce 기능 선택은 구현 시점 결정 사항입니다 (`TongssOrg/docs/05_PERMISSION.md` 참조) — 이 문서는 "무엇을 얼마나 열지"만 못 박습니다.

---

## Page Layout

| Object / Record Type | Layout 이름 | 할당 Profile | 비고 |
|---|---|---|---|
| Account | `[확인필요]` | | Record Type 도입 시 여기 행 추가 |

## Validation Rule

| Object | Rule 이름 | 조건 | 에러 메시지 | 비고 |
|---|---|---|---|---|
| | | | | `[확인필요]` 필요 여부부터 은영과 논의 |

## Flow

| Flow 이름 | 종류 | 트리거/조건 | 하는 일 | 비고 |
|---|---|---|---|---|
| `[확인필요]` Is_Active 계산 | Scheduled Flow (후보) | 매일 1회 | `Last_Manual_Updated__c` 기준으로 `Is_Active__c` 갱신 | Flow vs Apex 결정 세션(`03_PROJECT_GUIDE.md` Week 1) 결과 반영 |

## Org 설정

| 항목 | 설정값 | 설정일 | 비고 |
|---|---|---|---|
| CORS Allowed Origins | `[확인필요]` | | TongssApp 배포 도메인 (`integration-lead/docs/05_DEPLOYMENT_FLOW.md`와 동기화) |
| 연동 엔드포인트 공개 접근 설정 | `[확인필요]` | | 실제 Salesforce 기능 선택은 구현 시점 결정 — `TongssOrg/docs/05_PERMISSION.md` 참조 |

---

## 미래 인증 도입 시 체크리스트 (지금은 실행하지 않음, 참고용)

실제 로그인 시스템이 필요해지는 시점에, 위 "보안 원칙"의 구조(App → Integration → Org)는 그대로 두고 이 항목들만 추가하면 됩니다.

- [ ] TongssApp 사용자 인증 방식 결정 (전화번호, OAuth 등)
- [ ] 연동 계정 권한을 "인증된 사용자별 권한"으로 세분화할지 결정
- [ ] Salesforce 쪽 내부 사용자 인증 방식은 변경 없음 (이미 표준 로그인 사용 중)

---

## 변경 이력

| 날짜 | 변경 내용 | 이유 | 담당 |
|---|---|---|---|
| | | | |
