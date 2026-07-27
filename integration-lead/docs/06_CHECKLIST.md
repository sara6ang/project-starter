# 06_CHECKLIST — 릴리즈 체크

> 오너: Integration Lead(승우)

---

## 착수 전 (Week 1)
- [ ] `../../docs/04_DATA_CONTRACT.md` 필드 레벨 합의 완료
- [ ] TongssApp 배포처 확정
- [ ] TongssOrg Account 커스텀 필드 생성 완료
- [ ] Digital Experience Site 활성화 확인

## Hello World 스파이크 (Week 1 후반)
- [ ] 더미 값 1개 POST → Account 필드 갱신 확인
- [ ] Guest User 권한으로 실제 호출 성공 (로그인 없이)
- [ ] CORS 통과 확인
- [ ] 결과를 `04_ERROR_HANDLING.md`에 기록 (성공/실패 모두)

## 본 연동 (Week 2)
- [ ] 전체 필드 전송 확인 (`../../docs/04_DATA_CONTRACT.md` §3)
- [ ] 동기화 시점(즉시/배치) 결정 반영 (`03_DATA_FLOW.md`)

## 통합 주간 (Week 3)
- [ ] 엔드투엔드 실 데이터 확인
- [ ] Demo Day 한 줄 시나리오 통과 (`../../docs/00_PRODUCT_GUIDE.md` §3)

## Demo Day 전 (Week 5)
- [ ] 실제 시연 시나리오 리허설
- [ ] 환경 정보 최신화 (`05_DEPLOYMENT_FLOW.md`)
