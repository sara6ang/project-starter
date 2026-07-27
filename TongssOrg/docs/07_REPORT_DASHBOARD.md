# TongssOrg/docs/07_REPORT_DASHBOARD — 리포트 / 대시보드

> **문서 소유권:** 최종 수정 권한은 **Org PO(은영)**.
> 👤 Org PO가 읽어야 할 것: 이 문서 전체 — 박세일즈·박오너가 숫자를 보는 방식.
> 👀 PM 참고: Demo Day에서 박오너 관점을 어떻게 보여줄지 여기서 확인.

---

## 👤 박세일즈 — 매일 쓰는 화면 (표준 기능)

| 화면 | 내용 | 커스텀 필요? |
|---|---|---|
| 매장 리스트뷰 | Account 리스트, "활성"/"방치" 필터, 마지막 매뉴얼 업데이트일 정렬 | 아니오 — 표준 List View |
| 매장 레코드 페이지 | 매뉴얼 수, 학습 완료율, 체크리스트 완료율, 활성 배지 | 아니오 — 표준 Record Page (배지만 `06_AUTOMATION.md` 참조) |

이건 "리포트"라기보다 실시간 상태 확인용 화면입니다. 상세는 `02_FIELD_GUIDE.md` 참조.

---

## 👤 박오너 — 별도 화면 없음, 리포트로 충분

박오너는 매일 org를 여는 사람이 아니라 **전략을 결정하는 사람**입니다 (`../../docs/01_PERSONAS.md` 참조). 그래서 전용 대시보드를 새로 만들지 않고, 박세일즈가 보는 Account 데이터를 **표준 Report/Dashboard 기능**으로 집계해서 보여주는 정도로 충분합니다.

| 필요할 수 있는 리포트 | 표시 방식 |
|---|---|
| 전체 매장 중 활성 매장 비율 | Report (Account, `Is_Active__c` 그룹화) — 클릭으로 생성 |
| 매장별 학습·체크리스트 완료율 분포 | Report (Account, 필드별 요약) |

**이번 스코프 In:** 위 리포트를 Salesforce 표준 Report Builder로 클릭 생성하는 것까지. **Out:** 커스텀 Dashboard 컴포넌트를 새로 만드는 것 (Nice-to-have).

---

## 👨‍💻 실제로 만드는 방법

Setup 없이 앱 안에서 바로 만듭니다: **Reports 탭 → New Report → Accounts** → 원하는 필드로 그룹화·필터. Dashboard가 필요해지면 **Dashboards 탭 → New Dashboard**에서 위 리포트를 컴포넌트로 추가.

```
🤖 별도 코드/폴더 없음 — Report/Dashboard는 메타데이터로 관리되며 필요 시 sf project retrieve로 받아옴
```

---

## 🚨 이번엔 만들지 않을 것

```
❌ 박오너 전용 커스텀 대시보드
❌ 매장 간 비교 리포트 (Nice-to-have)
❌ 매장별 매뉴얼 상세 콘텐츠를 org 안에서 리포트로 열람 (집계 필드만 받는다 — 04_DATA_CONTRACT 참조)
```

## 👀 PM 확인 사항

Demo Day에서 "박오너가 org에서 확인한다"(`../../docs/00_PRODUCT_GUIDE.md` §3)는 실제로는 박세일즈 화면 + 위 리포트로 대체됩니다 — 별도 화면을 준비하지 않아도 됩니다.
