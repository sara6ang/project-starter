# 04_ERROR_HANDLING — 실패 시 처리

> 오너: Integration Lead(승우)

---

## 실패 시나리오

| 실패 상황 | 무슨 일이 생기나 | 누가 고치나 |
|---|---|---|
| CORS 미등록 | 브라우저가 요청 자체를 막음 | Integration Lead — CORS Allowed Origins에 도메인 등록 |
| 연동 엔드포인트 401/403 | 요청은 갔지만 거부됨 | Platform Lead — 연동용 권한 세트 확인 (`TongssOrg/docs/05_PERMISSION.md`) |
| `store_id` 매핑 실패 | 해당 Account를 못 찾음 | Integration Lead + Org PO |
| 계약에 없는 필드 전송 | Apex가 무시하거나 에러 | 보낸 쪽(Store PO) — `../../docs/04_DATA_CONTRACT.md` 기준으로 되돌림 |
| 네트워크 실패 (일시적) | 데이터 유실 가능 `[확인필요]` | Integration Lead |

> 참고: Entry Code 조회 실패(사장·직원이 코드를 잘못 입력하는 경우)는 이 문서의 대상이 아닙니다 — TongssApp 자체 화면 처리이며 `TongssApp/docs/03_USER_FLOW.md` §0에서 다룹니다.

---

## 지금 못 정한 것

- [ ] 전송 실패 시 재시도할지, 그냥 유실 처리할지 — Week 2 결정

---

## 실제 발생한 이슈 기록

```markdown
## [문제 제목]
**날짜:** / **증상:** / **원인:** / **해결:**
```

(아직 없음 — 발생하는 대로 위 양식으로 추가)
