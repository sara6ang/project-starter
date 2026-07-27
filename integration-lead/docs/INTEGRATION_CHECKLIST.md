# integration-lead/docs/INTEGRATION_CHECKLIST — 연동 체크리스트

> **문서 소유권:** 최종 수정 권한은 **Integration Lead**. PM이 제시하는 빈 포맷.

---

## 착수 전 (Week 1)

- [ ] `../../docs/05_DATA_CONTRACT.md` 필드 레벨 합의 완료 (Store PO·Org PO·PM과)
- [ ] TongssApp 배포처 확정 (04_ROADMAP Week 1 필수 결정)
- [ ] TongssOrg에서 Account 커스텀 필드 생성 완료 (Org PO)
- [ ] Digital Experience Site 활성화 여부 확인

## Hello World 스파이크 (Week 1 후반)

- [ ] 더미 값 1개를 TongssApp에서 하드코딩해 POST
- [ ] Apex REST(`StoreRestService`)가 받아서 Account 필드 갱신 확인
- [ ] Guest User 권한으로 실제 호출 성공 확인 (로그인 세션 없이)
- [ ] CORS 에러 발생 여부 확인 → 발생 시 Allowed Origins에 TongssApp 도메인 등록
- [ ] 스파이크 결과를 `TROUBLESHOOTING.md`에 기록 (성공/실패 모두)

## 본 연동 (Week 2)

- [ ] 실제 필드 전체(05_DATA_CONTRACT §3) 전송 확인
- [ ] 전송 방식(즉시 vs 배치) 결정 반영
- [ ] 에러 처리 (전송 실패 시 재시도 여부 등)

## 통합 주간 (Week 3)

- [ ] 엔드투엔드: TongssApp 실제 활동 → org 레코드 반영까지 실 데이터로 확인
- [ ] Demo Day 한 줄 시나리오 전체 흐름 통과 확인
- [ ] 잔여 이슈는 Platform Lead와 함께 해결 (09_TEAM_GUIDE 협업 매트릭스)

## Demo Day 전 최종 점검 (Week 5)

- [ ] 실제 시연 시나리오로 엔드투엔드 리허설
- [ ] 배포 도메인·org 로그인 정보 최신 상태 확인 (ENVIRONMENTS.md)