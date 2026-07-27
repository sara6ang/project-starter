# TongssOrg/docs/02_FIELD_GUIDE — 필드 가이드

> **문서 소유권:** 최종 수정 권한은 **Org PO(은영)**.
> 👤 Org PO가 읽어야 할 것: 필드 목록과 "이 필드가 화면 어디에 보이는지". 새 필드가 필요할 때 여기부터 확인하세요.
> 🤖 Claude Code 참고: API 이름·타입 — 새 필드를 코드에서 참조할 때 여기 이름을 그대로 쓸 것.
> 근거: `../../docs/04_DATA_CONTRACT.md`(shared) §3 — TongssApp이 보내는 필드의 유일한 진실.

---

## 👤🤖 Account 필드 목록 (Store)

| 필드명 | API Name | 타입 | 화면 표시 | 설명 |
|---|---|---|---|---|
| Account Name | `Name` | Text | 리스트뷰, 레코드 페이지 | 매장명 (표준 필드) |
| Store ID | `Store_Id__c` | Text (External ID) | 숨김 (연결용) | TongssApp의 `store_id`와 매핑되는 키 — **`04_DATA_CONTRACT.md` §2 참조, 유일한 연결고리** |
| Manual Count | `Manual_Count__c` | Number(18,0) | 레코드 페이지 | 등록된 매뉴얼 총 개수 |
| Last Manual Updated | `Last_Manual_Updated__c` | DateTime | 레코드 페이지, 리스트뷰 정렬 기준 | 마지막 매뉴얼 등록/수정 시각 — 방치 매장 판별 근거 |
| Manual Completion Rate | `Manual_Completion_Rate__c` | Percent(3,0) | 레코드 페이지 | 직원 전체 매뉴얼 학습 완료율 |
| Checklist Completion Rate | `Checklist_Completion_Rate__c` | Percent(3,0) | 레코드 페이지 | 오늘 체크리스트 완료율 (재고 확인 포함) |
| Is Active | `Is_Active__c` | Checkbox | 리스트뷰 필터, 상태 배지 | 방치 매장 판별용 — 계산 방식은 `04_FLOW.md` 참조 |

**Related List**: 없음. 원본 데이터(매뉴얼 내용, 체크리스트 항목 등)는 org에 저장하지 않으므로 자식 레코드가 없습니다 (`01_OBJECT_MODEL.md` 참조).

---

## 👤 이 필드들이 화면 어디에 보이나

| 화면 | 보이는 필드 |
|---|---|
| 매장 리스트뷰 (표준 List View) | Account Name, Is Active(필터), Last Manual Updated(정렬) |
| 매장 레코드 페이지 (표준 Lightning Record Page) | 전체 필드 + 활성 상태 배지 (`06_AUTOMATION.md` 참조) |

화면 배치 자체는 코드가 아니라 **App Builder에서 클릭으로 구성**합니다. 새 필드를 추가하면 이 표와 레코드 페이지 배치를 같이 업데이트하세요.

---

## 👨‍💻 실제로 필드를 만드는 방법

Setup → Object Manager → Account → Fields & Relationships → New. 직접 코드 파일을 만들지 않습니다 — 클릭으로 만들고 `sf project retrieve`로 받아옵니다.

---

## 👀 PM 확인 사항

이 표는 `../../docs/04_DATA_CONTRACT.md`의 필드와 이름·타입이 정확히 일치해야 합니다. 어긋나면 계약 문서 기준으로 되돌리고, 계약을 바꿔야 한다면 계약 문서를 먼저 고친 뒤 `../../docs/07_DECISIONS.md`에 기록하세요.
