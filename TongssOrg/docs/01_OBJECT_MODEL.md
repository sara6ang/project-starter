# TongssOrg/docs/01_OBJECT_MODEL — Object 모델

> **문서 소유권:** 최종 수정 권한은 **Org PO(은영)**.
> 👤 Org PO가 읽어야 할 것: 이 문서 전체 — "어떤 Object를 쓸지, 왜 그렇게 정했는지".
> 🤖 Claude Code 참고: 결정된 구조를 벗어나는 Object/필드를 임의로 제안하지 않기.
> 필드 하나하나의 상세 목록은 `02_FIELD_GUIDE.md`를 보세요. 이 문서는 "Object 단위"의 결정만 다룹니다.

---

## 👤 우리가 쓰는 Object는 딱 하나, Account

| 결정 | 이유 |
|---|---|
| **Store(매장)는 표준 Account로 만든다.** Custom Object를 새로 만들지 않는다 | 거래상대(조직) 데이터는 Account가 표준. Order__c/Inventory_Item__c 같은 별도 오브젝트가 필요했던 이전 프로젝트(Pepper's Oven)와 달리, 이번엔 Account 필드 확장만으로 `../../docs/00_PRODUCT_GUIDE.md` 스코프를 충족한다 |
| **Record Type은 만들지 않는다** `[확인필요]` | 이번엔 거래상대 종류가 매장 하나뿐이라 구분할 필요가 없다. 만들기로 하면 Page Layout·Profile 할당이 따라오므로 혜준과 함께 결정 |
| **매뉴얼/체크리스트 원본 데이터는 org에 저장하지 않는다.** 집계 필드만 Account에 둔다 | `00_PRODUCT_GUIDE.md` 스코프상 org는 "상태 확인"만 하면 된다. 원본을 다 옮기면 데이터 계약이 비대해지고 TongssApp과 이중 관리된다 |

---

## 👤 왜 Custom Object를 안 만드나

Tongss org의 역할은 "기록을 남기는 시스템"이 아니라 **"TongssApp의 상태를 비추는 거울"**입니다. 매뉴얼이 몇 개 있는지, 학습률이 얼마인지 같은 **숫자(집계값)만** org에 들어오면 되고, 매뉴얼 내용 자체나 체크리스트 항목 하나하나는 org에 들어올 필요가 없습니다. 그래서 Account에 필드 몇 개를 추가하는 것으로 충분하고, Order나 Inventory 같은 자식 Object가 필요 없습니다.

**나중에 필요해질 수 있는 것** `[확인필요]`: 매장별 방문 이력이나 영업 대응 로그가 필요해지면, 그때 `Store_Activity_Log__c` 같은 자식 Object를 추가할 수 있습니다 — 이번 스코프는 아닙니다 (`00_PRODUCT_GUIDE.md` §5 "우리가 하지 않는 것").

---

## 👨‍💻 실제로 만드는 방법 (Setup 클릭)

Account는 이미 Salesforce 표준 Object이므로 **새로 만들지 않습니다.** 여기에 커스텀 필드만 추가합니다 (Setup → Object Manager → Account → Fields & Relationships → New). 만든 결과는 `sf project retrieve`로 받아오면 아래처럼 자동으로 파일이 생깁니다.

```
🤖 force-app/main/default/objects/Account/fields/  ← 커스텀 필드만 (직접 파일을 만들지 않음)
```

필드 하나하나의 이름·타입·용도는 `02_FIELD_GUIDE.md` 참조.

---

## 👀 PM 확인 사항

- Object를 새로 추가해야 하는 논의가 나오면, 트랙을 넘는 결정이므로 `../../docs/07_DECISIONS.md`에 기록되어야 합니다.
- Record Type 여부가 아직 `[확인필요]` 상태입니다 — Week 1~2 중 은영·혜준이 결정하면 이 문서를 업데이트하세요.
