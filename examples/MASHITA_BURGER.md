# MASHITA_BURGER — Tongss 기준 매장 (Reference Store)

> 이 문서는 임시 더미 데이터 저장소가 아니라, **Tongss 개발 전체가 참조하는 기준 매장**입니다.
> App 화면 시안, Org 레코드, Flow/Apex 테스트, Demo Day 시연 데이터 — 전부 이 매장을 기준으로 만듭니다.
> 오너: Sara / 확장 구조: `examples/` 아래 업종별 기준 매장을 추가할 수 있습니다 (예: `HAPPY_CAFE.md`, `PASTA_HOUSE.md`). 지금은 MashiTa버거 하나만 존재합니다.
> ⚠️ **`01_PERSONAS.md`를 대체하지 않습니다.** 페르소나가 "유형"이라면 이 문서는 그 유형을 구체적인 한 매장·한 사람으로 구현한 것입니다 — 사장님 함부기 = "이대표" 페르소나의 구체적 예시, 직원 김스태프 = "김스태프" 페르소나의 구체적 예시.

---

## 0. 이 매장의 사람들 한눈에

이 매장 번호는 **01**입니다. 아래 Entry Code로 TongssApp에 들어갑니다 (`TongssApp/docs/03_USER_FLOW.md` §0 참조 — 실제 로그인이 아니라 코드 조회).

| 이름 | 역할 | Entry Code | 비고 |
|---|---|---|---|
| 함부기 | 점주 (매니저 겸임) | `S01O` | `01_PERSONAS.md` "이대표"의 구체적 예시 |
| 박주방 | 주방 담당 아르바이트 | `S01E01` | 근속 8개월, 시니어 |
| 김스태프 | 홀 담당 아르바이트 | `S01E02` | 근무 2개월차, `01_PERSONAS.md` "김스태프"의 구체적 예시 |
| 이주말 | 주말 전담 아르바이트 | `S01E03` | 근속 1년 |

---

## 1. 매장 정보

| 항목 | 내용 |
|---|---|
| 상호 | MashiTa버거 을지로 본점 |
| 업종 | 개인 수제버거 |
| 위치 | 서울 중구 을지로 (오피스 상권) |
| 영업시간 | 11:00~21:00 (브레이크타임 15:00~17:00, 라스트오더 20:00) |
| 직원 수 | 4명 (점주 1 + 아르바이트 3: 주중 1명, 주말 2명) |
| 운영 형태 | 단일 매장 · 운영 3년차 · 매장 식사 65% / 포장·배달 35% |
| 월평균 매출 | 약 5,000만원 (평균 객단가 약 13,000원) |
| 피크타임 | 평일 12:00~14:00, 주말 11:00~15:00 & 17:00~20:00 |
| 현재 이용 중인 토스플레이스 제품 | 토스 프론트 · 터미널 · 토스포스 |

### 매장 소개

을지로 오피스 상권에서 3년째 운영 중인 수제버거 가게. 평일엔 인근 직장인, 주말엔 관광객이 주 고객이다. 사장님 함부기가 점주 겸 매니저로 운영을 총괄하고, 아르바이트 3명이 교대로 근무한다.

올해만 직원이 5명 교체됐다 — 이유는 "직원 교육이 제대로 이루어지지 않아서". 지금도 기존 직원 1명이 퇴사하고 신입(김스태프)이 막 들어온 상태다. Tongss가 풀어야 할 문제가 이 매장 안에 그대로 담겨 있다.

### 사장님: 함부기

| 항목 | 내용 |
|---|---|
| 이름 | 함부기 |
| 나이 / 성별 | 35세 / 남성 |
| 직책 | 매장 대표이자 운영 책임자 |
| 주요 역할 | 매장 운영, 메뉴개발, 발주, 직원교육, 고객응대, 마케팅 |
| 근무시간 | 평일 하루 평균 14시간 |
| 디지털 숙련도 | POS·배달앱·모바일뱅킹은 익숙, 복잡한 초기 설정·데이터 입력은 부담 |
| 성향 | 성질 급함, 꼼꼼하지 못함, 호탕함, 은근 정 있음 |
| 최근 상황 | 신혼, 2개월 뒤 출산 예정 |

**페인포인트** (`01_PERSONAS.md` "이대표"와 동일한 맥락)
1. 신입 교육이 스트레스다 — 매번 처음부터, 매번 혼자
2. 체크리스트가 안 지켜진다 — 만들어놔도 현장에서 무시된다
3. 매뉴얼을 안 읽는다 — 배포와 학습은 다른 문제
4. 누가 뭘 했는지 모른다 — 물어봐야만 안다

---

## 2. 메뉴

| 메뉴 | 가격 |
|---|---|
| Classic Burger | 7,900원 |
| Cheese Burger | 8,900원 |
| Double Burger | 11,900원 |
| French Fries | 3,500원 |
| Onion Rings | 4,000원 |
| Cola | 2,500원 |
| Lemonade | 3,500원 |

세트(버거 1 + 사이드 1 + 음료 1) 주문 시 +2,000원 — 평균 객단가 13,000원은 세트 주문 비중이 높다는 뜻입니다.

---

## 3. 재료 (Inventory)

| 재료 | 현재 재고 | 최소 재고 | 단위 | 공급업체 | 상태 |
|---|---|---|---|---|---|
| Burger Bun | 45 | 50 | 개 | Happy Bun Bakery | 🔴 부족 |
| Beef Patty | 35 | 40 | 개 | Fresh Meat Co. | 🔴 부족 |
| Cheese | 60 | 30 | 장 | Fresh Meat Co. | 정상 |
| Lettuce | 5 | 2 | kg | Green Farm | 정상 |
| Tomato | 4 | 2 | kg | Green Farm | 정상 |
| Pickles | 3 | 1 | kg | Green Farm | 정상 |
| Onion | 6 | 2 | kg | Green Farm | 정상 |
| Burger Sauce | 8 | 3 | L | 자체 제조 | 정상 |
| Fries | 30 | 10 | kg | Potato World | 정상 |
| Fry Oil | 20 | 8 | L | Potato World | 정상 |
| Coke Syrup | 0.5 | 1 | BIB(박스) | Coca-Cola Korea | 🔴 부족 |
| Cup | 300 | 100 | 개 | Coca-Cola Korea | 정상 |
| Wrapper | 500 | 150 | 장 | 서울 푸드팩 | 정상 |

`[확인필요]` 현재 TongssApp의 InventoryItem 스키마(`TongssApp/docs/05_DATA.md`)에는 `vendor` 필드가 없습니다. 이 표의 공급업체 정보는 참고용이며, 화면에 실제로 표시하려면 아론이 스키마에 필드 추가를 결정해야 합니다.

---

## 4. 공급업체 (Vendors)

| 공급업체 | 전화번호 | 납품 주기 | 주요 품목 |
|---|---|---|---|
| Fresh Meat Co. | 02-1234-5678 | 매주 화·금 | 패티, 치즈 |
| Happy Bun Bakery | 02-2345-6789 | 매일 오전 | 번(빵) |
| Green Farm | 02-3456-7890 | 매주 월·목 | 양상추, 토마토, 피클, 양파 |
| Potato World | 02-4567-8901 | 격주 화요일 | 냉동 감자, 튀김유 |
| Coca-Cola Korea | 1588-1000 | 매월 1회 | 콜라시럽, 컵 |
| 서울 푸드팩 | 02-5678-9012 | 비정기 (필요 시 발주) | 포장재(랩퍼 등) |

> 위 5개(Fresh Meat Co.~Coca-Cola Korea)는 원 예시 목록이고, "서울 푸드팩"은 포장재 항목을 채우기 위해 이번에 추가했습니다.

---

## 5. 직원

| 이름 | 역할 | Entry Code | 비고 |
|---|---|---|---|
| 함부기 | 점주 (매니저 역할 겸임) | `S01O` | 1인 매장 특성상 별도 매니저 없음 |
| 박주방 | 주방 담당 | `S01E01` | 아르바이트, 근속 8개월 |
| 김스태프 | 홀 담당 | `S01E02` | 아르바이트, 근무 2개월차 (신입) |
| 이주말 | 주말 전담 | `S01E03` | 아르바이트, 근속 1년 |

---

## 6. 예시 매뉴얼

| 제목 | 카테고리 | 예상 소요시간 | 설명 |
|---|---|---|---|
| 오픈 준비 | 출근~마감 업무프로세스 | 20분 | 조명·간판·POS 켜기, 테이블 세팅 등 오픈 전 확인 절차 |
| 패티 해동 | 주방 조리·위생관리 | 15분 (냉장 해동 기준) | 냉동 패티를 안전하게 해동하는 순서와 시간 기준 |
| 햄버거 만들기 | 주방 조리·위생관리 | 5분 | 번 굽기 → 패티 → 야채 → 소스 순서, 완성까지 표준 조리 순서 |
| 감자튀김 조리 | 주방 조리·위생관리 | 4분 | 튀김 온도·시간 기준과 담아내는 방법 |
| 재고 확인 | 출근~마감 업무프로세스 | 10분 | 마감 전 주요 재료 재고 실사 및 부족 품목 기록 |
| POS 마감 | 출근~마감 업무프로세스 | 15분 | 매출 정산, 현금 시재 확인, 마감 보고 |
| 냉장고 청소 | 주방 조리·위생관리 | 20분 | 주 1회 냉장고 내부 청소 및 유통기한 확인 |

카테고리 3분류는 "매뉴얼 3대 영역" 기준입니다: 출근~마감 업무프로세스 / 고객응대 CS / 주방 조리·위생관리 (`archive/04_INITIAL_IDEAS.md`).

---

## 7. 예시 체크리스트

### 오픈 체크리스트
- [ ] POS 로그인
- [ ] 냉장고 온도 확인
- [ ] 패티 수량 확인
- [ ] 야채 준비
- [ ] 음료 머신 점검

### 마감 체크리스트
- [ ] POS 마감 정산
- [ ] 현금 시재 확인
- [ ] 주방 장비 전원 OFF
- [ ] 재고 실사 입력
- [ ] 쓰레기 분리수거
- [ ] 매장 바닥 청소
- [ ] 다음 날 해동할 패티 꺼내놓기

---

## 8. 예시 재고 알림

`06_VOICE_AND_TONE.md`의 알림 문구 원칙("사실 + 행동") 기준입니다. §3 재고표에서 🔴 부족 상태인 3개 품목이 그대로 알림으로 뜹니다.

- 패티 35개 남음 → 발주하기
- 번 45개 남음 → 발주하기
- 콜라시럽 0.5박스 남음 → 발주하기

---

## 9. 시드 데이터 (TongssApp 데이터 + Salesforce Org 반영값)

> Store/Staff/Manual/ChecklistItem/InventoryItem은 TongssApp 내부 데이터입니다 (`TongssApp/docs/05_DATA.md` 스키마 기준). 이 중 org의 Account에 실제로 올라가는 건 아래 "9-6 Org 반영값"의 집계 필드뿐입니다 (`04_DATA_CONTRACT.md` 기준). Vendor는 현재 어느 쪽 공식 스키마에도 없는 참고용 항목입니다 (§3, §4 참조).

### 9-1. Store

```javascript
{
  id: "store_001",
  name: "MashiTa버거 을지로 본점",
  storeNumber: "01",
  ownerEntryCode: "S01O",     // 함부기(점주)의 진입 코드
  createdAt: "2026-08-03T09:00:00+09:00"
}
```

### 9-2. Staff

> ⚠️ 점주(함부기)는 Staff가 아니라 Store의 `ownerEntryCode`로 식별됩니다 (`TongssApp/docs/05_DATA.md` 참조). 여기는 아르바이트 3명만 있습니다.

```javascript
[
  { id: "staff_001", store_id: "store_001", name: "박주방", entryCode: "S01E01" },
  { id: "staff_002", store_id: "store_001", name: "김스태프", entryCode: "S01E02" },
  { id: "staff_003", store_id: "store_001", name: "이주말", entryCode: "S01E03" }
]
```

### 9-3. Manual (7건 중 2건 예시, 나머지는 §6 표 참고)

```javascript
[
  {
    id: "manual_001",
    store_id: "store_001",
    title: "오픈 준비",
    photos: ["/uploads/manual_001_1.jpg"],
    content: "조명·간판·POS 순서로 켜고 테이블을 세팅한다",
    updatedAt: "2026-08-10T08:30:00+09:00"
  },
  {
    id: "manual_002",
    store_id: "store_001",
    title: "패티 해동",
    photos: ["/uploads/manual_002_1.jpg"],
    content: "전날 밤 냉장 이동, 조리 전 실온 10분",
    updatedAt: "2026-08-11T21:00:00+09:00"
  }
]
```

### 9-4. ChecklistItem (오픈·마감 12개 중 3개 예시)

```javascript
[
  { id: "check_001", store_id: "store_001", label: "POS 로그인", type: "opening" },
  { id: "check_002", store_id: "store_001", label: "냉장고 온도 확인", type: "opening" },
  { id: "check_006", store_id: "store_001", label: "POS 마감 정산", type: "closing" }
]
```

### 9-5. InventoryItem (§3 표에서 부족 품목 3건만 발췌)

```javascript
[
  { id: "inv_001", store_id: "store_001", name: "Beef Patty", unit: "개", currentQty: 35, thresholdQty: 40, updatedAt: "2026-08-12T18:00:00+09:00" },
  { id: "inv_002", store_id: "store_001", name: "Burger Bun", unit: "개", currentQty: 45, thresholdQty: 50, updatedAt: "2026-08-12T18:00:00+09:00" },
  { id: "inv_003", store_id: "store_001", name: "Coke Syrup", unit: "BIB", currentQty: 0.5, thresholdQty: 1, updatedAt: "2026-08-12T18:00:00+09:00" }
]
```

### 9-6. Org 반영값 (Account — `04_DATA_CONTRACT.md` §3 필드 기준)

| 필드 | 값 |
|---|---|
| `store_id` | store_001 |
| `manual_count` | 7 |
| `last_manual_updated_at` | 2026-08-12T21:00:00+09:00 |
| `staff_count` | 3 (아르바이트 기준 — 점주 제외) |
| `manual_completion_rate` | 0.67 (직원 3명 중 2명이 최신 매뉴얼까지 확인) |
| `checklist_date` | 2026-08-12 |
| `checklist_completion_rate` | 0.83 (오픈+마감 12개 중 10개 완료) |
| `low_stock_alert_count` | 3 (Beef Patty, Burger Bun, Coke Syrup) |
| `is_active` | true |

이 값이 그대로 TongssOrg의 Account 레코드(`Manual_Count__c` 등)에 채워지면 됩니다 — 필드 매핑은 `04_DATA_CONTRACT.md` §5 참조.

---

## 앞으로 이 문서를 쓰는 법

- 화면 시안, 더미 데이터, 테스트 케이스, Demo Day 시연 — 새로 만들 때 이름·메뉴·재고를 임의로 짓지 말고 이 문서 기준으로 쓰세요.
- 값을 바꿔야 하면(가격 조정, 재고 시나리오 추가 등) 이 문서를 먼저 고치고, 코드가 이 문서와 달라지면 이 문서 기준으로 되돌립니다 (`04_DATA_CONTRACT.md`와 같은 원칙).
- 업종이 다른 두 번째 기준 매장이 필요해지면 `examples/HAPPY_CAFE.md`처럼 같은 9개 섹션 구조로 새 파일을 추가하세요. 이 문서를 템플릿으로 복사해서 시작하면 됩니다.
