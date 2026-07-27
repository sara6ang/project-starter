# 00_OVERVIEW — Integration Lead 역할

> 오너: Integration Lead(승우) / 작성 원칙: `../CLAUDE.md`

---

## 이 폴더가 하는 일

TongssApp ↔ TongssOrg가 **어떻게 연결되는지만** 다룹니다. 각 시스템을 어떻게 만드는지는 다루지 않습니다.

| 질문 | 어디서 답을 찾나 |
|---|---|
| 화면이 어떻게 생겼나 | `TongssApp/docs/` |
| Object/Field가 어떻게 설계됐나 | `TongssOrg/docs/` |
| **두 시스템이 어떻게 연결되나** | **여기 (integration-lead/docs/)** |

---

## 문서 지도

| 문서 | 답하는 질문 |
|---|---|
| `01_SYSTEM_MAP.md` | 전체 구조가 어떻게 생겼나 |
| `02_API_CONTRACT.md` | 어떤 API가 있나 |
| `03_DATA_FLOW.md` | 데이터가 언제 어떻게 움직이나 |
| `04_ERROR_HANDLING.md` | 실패하면 무슨 일이 생기고 누가 고치나 |
| `05_DEPLOYMENT_FLOW.md` | 배포는 어떤 순서로 하나 |
| `06_CHECKLIST.md` | 릴리즈 전 뭘 확인하나 |

---

## 원칙

1. 여기 있는 내용이 App이나 Org 문서에도 있다면 → 여기서 지우고 링크만 남긴다
2. 모르는 게 있으면 문서를 늘리지 말고 팀(PM·Store PO·Org PO)에게 물어본다
3. `../../docs/04_DATA_CONTRACT.md`(shared)가 필드의 유일한 진실 — 여기서 다시 정의하지 않는다
