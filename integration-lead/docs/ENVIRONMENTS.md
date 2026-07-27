# integration-lead/docs/ENVIRONMENTS — 배포 환경 & 엔드포인트

> **문서 소유권:** 최종 수정 권한은 **Integration Lead**. PM이 제시하는 빈 포맷 — 값이 정해지는 대로 채울 것.
> 값이 바뀔 때마다 이 문서를 갱신하고, 트랙을 넘는 변경(예: 배포 도메인 변경)은 `../../docs/08_DECISIONS.md`에도 기록.

---

## TongssApp 배포 정보

| 항목 | 값 |
|---|---|
| 배포처 | `[확인필요]` (04_ROADMAP Week 1 결정 — GitHub Pages / Vercel 등) |
| 배포 URL (dev) | `[확인필요]` |
| 배포 URL (demo, 있다면) | `[확인필요]` |

## TongssOrg 환경 정보

| 항목 | 값 |
|---|---|
| Org 종류 | `[확인필요]` (Developer Edition / Trailhead Playground 등) |
| Digital Experience Site URL | `[확인필요]` |
| Guest Site 도메인 | `[확인필요]` |

## Apex REST 엔드포인트

| 엔드포인트 | 메서드 | 용도 | 상태 |
|---|---|---|---|
| `/services/apexrest/tongss/store-status/*` `[확인필요: 실제 urlMapping 확정]` | POST | TongssApp → 매장 상태 갱신 | `[확인필요]` (미착수/스파이크 완료/실동작) |

## CORS Allowed Origins 등록 현황

| 등록한 도메인 | 등록일 | 등록자 |
|---|---|---|
| `[확인필요]` | | |

## Guest User 권한 범위 (요약, 상세는 platform-lead/docs/PERMISSIONS.md)

| 권한 | 범위 |
|---|---|
| Account 필드 접근 | `[확인필요]` (05_DATA_CONTRACT.md의 필드만 Edit 허용, 나머지 금지) |
| Apex Class 접근 | `[확인필요]` (StoreRestService만) |