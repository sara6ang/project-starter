# TongssOrg/docs/04_FLOW — Flow (선언형 자동화)

> **문서 소유권:** 최종 수정 권한은 **Org PO(은영) + Platform Lead(혜준)**, 함께 결정.
> 👤 Org PO가 읽어야 할 것: 어떤 자동화가 Flow(클릭으로 설정)로 이루어지는지.
> 👨‍💻 Salesforce Developer 참고: Flow Builder에서 실제로 만드는 방법.
> 🤖 Claude Code 참고: Flow는 코드가 아니라 화면 클릭으로 만드는 것 — 대신 만들어달라는 요청을 받으면 "Flow Builder에서 이렇게 만들면 됩니다"로 안내할 것.
> Apex(코드)로 처리하는 자동화는 `06_AUTOMATION.md` 참조. "Flow로 할지 Apex로 할지"의 판단 기준도 그 문서에 있습니다.

---

## 👤 지금 필요한 Flow는 1개 — `Is_Active__c` 계산

| 항목 | 내용 |
|---|---|
| 이름 | 방치 매장 자동 판별 (가칭) |
| 종류 | Scheduled Flow (매일 1회 실행) `[확인필요]` |
| 하는 일 | `Last_Manual_Updated__c` 또는 `Checklist_Completion_Rate__c`가 N일 이상 갱신되지 않았으면 `Is_Active__c = false`로 갱신 |
| 왜 Flow인가 | 단순 날짜 비교 로직이라 Apex 트리거보다 Flow가 유지보수하기 쉽다 |

`[확인필요]` **대안도 검토 중:** TongssApp이 `is_active` 값을 직접 계산해서 보내는 방식 (`../../docs/04_DATA_CONTRACT.md` §3-5) — Flow보다 단순하지만 판별 로직이 TongssApp 쪽에 종속된다. **Org PO·Integration Lead·Platform Lead가 함께 결정** (`../../docs/03_PROJECT_GUIDE.md` Week 1). 결정되면 이 문서와 `06_AUTOMATION.md`, `../../docs/07_DECISIONS.md`에 기록.

---

## 👨‍💻 Flow Builder에서 만드는 법

1. Setup → Flows → New Flow → **Schedule-Triggered Flow** 선택
2. 실행 대상: Account, 조건: `Last_Manual_Updated__c < TODAY() - N`
3. 실행 동작: `Is_Active__c`를 `false`로 Update
4. 매일 새벽 실행되도록 스케줄 설정

만든 결과는 아래 폴더에 자동으로 저장됩니다 (직접 파일을 만들지 않음).
```
🤖 force-app/main/default/flows/
```

## 👀 PM 확인 사항

Flow vs Apex 최종 결정은 트랙을 넘는 결정이므로, 확정되는 대로 `../../docs/07_DECISIONS.md`에 기록되어야 합니다.
