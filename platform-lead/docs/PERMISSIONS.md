# platform-lead/docs/PERMISSIONS — 권한 세트 & Guest User 범위

> **문서 소유권:** 최종 수정 권한은 **Platform Lead(혜준)**. PM이 제시하는 빈 포맷 — 값이 정해지는 대로 채울 것.

---

## 이 문서가 다루는 범위 (Org PO와의 경계)

org 데이터 모델은 **설계와 세팅을 분리하지 않고** 은영(Org PO)·혜준(Platform Lead)이 함께 진행한다. 전체 책임 분담표는 `../../TongssOrg/CLAUDE.md`(👨‍💻 Salesforce Developer 구현 표) 참조. 그중 **이 문서에 기록할 것은 Platform Lead 책임 영역**이다.

| 이 문서(PERMISSIONS.md)에 기록 | 05_DATA.md에 기록 (Org PO 책임) |
|---|---|
| Page Layout, Permission Set, Profile / Sharing | Object 설계, Field 설계 |
| Validation Rule, Flow, Org 설정 | Relationship 설계, Record Type 필요 여부 판단 |
| Guest User 권한 범위 | — |

> ⚠️ Record Type을 만들기로 결정되면(은영 책임 판단) → **Page Layout 지정과 Profile 할당은 이 문서에 기록**한다. 두 문서가 이 지점에서 이어진다.

값이 바뀔 때마다 이 문서를 갱신하고, 트랙을 넘는 변경은 `../../docs/07_DECISIONS.md`에도 기록.

---

## 팀원 User / 권한 세트

| 이름/역할 | Profile | Permission Set | 비고 |
|---|---|---|---|
| Org PO | `[확인필요]` | `[확인필요]` | |
| Integration Lead | `[확인필요]` | `[확인필요]` | |
| Platform Lead | `[확인필요]` | `[확인필요]` | Admin |
| PM (참관) | `[확인필요]` | 읽기 전용 권장 | |

## Guest User 프로필 (TongssApp 연동용) — 가장 중요

| 항목 | 범위 | 이유 |
|---|---|---|
| Object 접근 | Account만 | 04_DATA_CONTRACT 필드 갱신 목적 외 접근 불필요 |
| 필드 접근 | `Store_Id__c`, `Manual_Count__c`, `Last_Manual_Updated__c`, `Manual_Completion_Rate__c`, `Checklist_Completion_Rate__c` (Edit만) | 계약에 정의된 필드만 |
| Object 권한 수준 | Edit만, **Create/Delete 금지** | 매장 레코드는 Org PO가 미리 생성, TongssApp은 갱신만 |
| Apex Class 접근 | `StoreRestService`만 | 다른 클래스 호출 불가하도록 |
| `[확인필요]` Sharing Rule | | Guest User가 어떤 Account를 볼 수 있는지 범위 설정 |

## 원칙

**"일단 넓게 열고 나중에 좁히기"는 하지 않는다.** 처음부터 계약(04_DATA_CONTRACT)에 필요한 최소 범위만 연다. 범위를 넓혀야 할 필요가 생기면 Integration Lead·Org PO와 합의 후 이 문서에 변경 이력을 남긴다.

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
| `[확인필요]` Is_Active 계산 | Scheduled Flow (후보) | 매일 1회 | `Last_Manual_Updated__c` 기준으로 `Is_Active__c` 갱신 | Flow vs Apex 결정 세션(03_PROJECT_GUIDE Week 1) 결과 반영 |

## Org 설정

| 항목 | 설정값 | 설정일 | 비고 |
|---|---|---|---|
| CORS Allowed Origins | `[확인필요]` | | TongssApp 배포 도메인 (integration-lead/docs/ENVIRONMENTS.md와 동기화) |
| Digital Experience Site | `[확인필요]` | | Guest User 연동용 |

---

## 변경 이력

| 날짜 | 변경 내용 | 이유 | 담당 |
|---|---|---|---|
| | | | |