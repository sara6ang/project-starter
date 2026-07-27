# integration-lead/CLAUDE.md

> **문서 소유권:** 이 폴더 전체의 최종 수정 권한은 **Integration Lead**에게 있습니다. 아래는 PM이 제시하는 초안 포맷이며, Integration Lead가 채우고 확정합니다.
> 루트 규칙은 `../CLAUDE.md` 참조. 이 폴더는 `docs/06_PROJECT_TREE.md`에서 설명하듯, TongssApp·TongssOrg 어느 한쪽에도 속하지 않는 **연동 자체에 대한 기록**을 위한 공간입니다.

---

## 이 폴더가 무엇인가

TongssApp ↔ TongssOrg 데이터 연동(Apex REST, Guest User, CORS)의 상태·이력·환경 정보를 모아두는 곳. 실제 코드는 여기 없다 — TongssApp의 API 호출 코드는 `TongssApp/`에, Apex REST 클래스는 `TongssOrg/`에 있다. 여기는 **그 연동을 다루는 문서**만 둔다.

작업 전에 먼저 읽을 것: `../docs/05_DATA_CONTRACT.md`(shared, 필드 계약의 유일한 진실), `TongssApp/docs/06_ARCHITECTURE.md`, `TongssOrg/docs/06_ARCHITECTURE.md`(외부 통합 아키텍처 섹션).

## 문서 목록

```
integration-lead/docs/
├── ENVIRONMENTS.md            # 배포 도메인, 엔드포인트 URL, CORS 등록 현황
├── INTEGRATION_CHECKLIST.md   # 연동 착수 전/중/후 체크리스트
└── TROUBLESHOOTING.md         # 만난 벽과 해결법 기록
```

## AI 툴 사용 시 지켜야 할 것

1. **가급적 VS Code + Claude Code 확장을 사용할 것.** 이 역할은 TongssApp 저장소와 TongssOrg 저장소(force-app)를 오가며 작업하므로, 두 프로젝트를 각각 열어 diff를 확인할 수 있는 VS Code가 특히 유리하다.
2. **05_DATA_CONTRACT.md(shared)가 필드의 유일한 진실.** AI가 임의로 필드를 추가/변경 제안하면 계약 문서 기준으로 되돌린다.
3. 연동 중 새로 발견한 이슈(권한 부족, CORS 에러 등)는 그때그때 `TROUBLESHOOTING.md`에 기록 — 나중에 같은 문제를 반복하지 않기 위함.
4. Guest User 권한 범위를 넓히는 변경은 Platform Lead·Org PO와 반드시 합의 후 진행 (보안 관련).

## 하지 않을 것

- `05_DATA_CONTRACT.md`에 없는 필드를 코드에서 임의로 주고받지 않는다.
- Guest User 프로필 권한을 계약에 필요한 범위보다 넓게 열지 않는다.
- CORS Allowed Origins에 필요 이상의 도메인을 등록하지 않는다.

## 헷갈리면

연동 방식(즉시 전송 vs 배치, 페이로드 단위 등)이 애매하면 **혼자 정하지 말고 PM·Store PO·Org PO와 상의** (05_DATA_CONTRACT.md 변경 관리 절차 참조).