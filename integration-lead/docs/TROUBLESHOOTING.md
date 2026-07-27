# integration-lead/docs/TROUBLESHOOTING — 만난 벽과 해결법

> **문서 소유권:** 최종 수정 권한은 **Integration Lead**. PM이 제시하는 빈 포맷 — 발견하는 대로 계속 추가.
> 목적: 같은 문제를 두 번 겪지 않기. Pepper's Oven 때도 Guest User/CORS류가 가장 어려운 지점이었음 (00_PRODUCT_GUIDE 참고 경험).

---

## 기록 양식

```markdown
## [문제 제목]

**날짜:**
**증상:** (에러 메시지, 상황)
**원인:**
**해결:**
**참고:** (관련 문서, 링크)
```

---

## 예상되는 단골 이슈 (미리 적어두는 참고용, 실제 발생 시 위 양식으로 기록)

- CORS 에러: Setup → CORS Allowed Origins에 TongssApp 도메인 미등록
- Guest User 401/403: Guest User Profile에 Apex Class 또는 Object 권한 누락
- SOQL/DML 권한 에러: Guest User는 기본적으로 매우 제한된 권한만 가짐 — Sharing Rule 추가 필요할 수 있음
- Store_Id__c 매핑 실패: TongssApp의 store_id와 Account의 External ID가 안 맞는 경우

---

## 실제 기록 (여기부터 채우기)

(아직 없음)