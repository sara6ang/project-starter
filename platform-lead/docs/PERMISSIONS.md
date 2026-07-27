# platform-lead/docs/PERMISSIONS — 권한 세트 & Guest User 범위

> **문서 소유권:** 최종 수정 권한은 **Platform Lead**. PM이 제시하는 빈 포맷.

---

## 팀원 User / 권한 세트

| 이름/역할 | Profile | Permission Set | 비고 |
|---|---|---|---|
| Org PO | `[확인필요]` | `[확인필요]` | |
| Integration Lead | `[확인필요]` | `[확인필요]` | |
| Platform Lead | `[확인필요]` | `[확인필요]` | Admin |
| PM (참관) | `[확인필요]` | 읽기 전용 권장 | |

## Guest User 프로필 (store-app 연동용) — 가장 중요

| 항목 | 범위 | 이유 |
|---|---|---|
| Object 접근 | Account만 | 05_DATA_CONTRACT 필드 갱신 목적 외 접근 불필요 |
| 필드 접근 | `Store_Id__c`, `Manual_Count__c`, `Last_Manual_Updated__c`, `Manual_Completion_Rate__c`, `Checklist_Completion_Rate__c` (Edit만) | 계약에 정의된 필드만 |
| Object 권한 수준 | Edit만, **Create/Delete 금지** | 매장 레코드는 Org PO가 미리 생성, store-app은 갱신만 |
| Apex Class 접근 | `StoreRestService`만 | 다른 클래스 호출 불가하도록 |
| `[확인필요]` Sharing Rule | | Guest User가 어떤 Account를 볼 수 있는지 범위 설정 |

## 원칙

**"일단 넓게 열고 나중에 좁히기"는 하지 않는다.** 처음부터 계약(05_DATA_CONTRACT)에 필요한 최소 범위만 연다. 범위를 넓혀야 할 필요가 생기면 Integration Lead·Org PO와 합의 후 이 문서에 변경 이력을 남긴다.

## 변경 이력

| 날짜 | 변경 내용 | 이유 | 담당 |
|---|---|---|---|
| | | | |