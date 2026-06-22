# Git 커밋 원칙 수립

## 일시
2026-06-23 00:20

## 요청
태현: "kanban 업무를 진행하여 각각의 task가 Done 상태가 되면, 해당 태스크의 진행 상태를 Git으로 커밋하세요"

## 실행 내역
1. T1(Researcher) 완료 산출물 → `docs/research/competitive-analysis-rag-chatbot.md` 복사
2. T2(Designer) 완료 산출물 → `docs/design/` (DESIGN.md, tokens/, wireframes/, components/) 복사
3. 프로젝트 초기 셋업 코드 포함 첫 커밋 생성:
   - Commit: `d5177a5` on `develop` branch
   - "feat: initial project setup + T1 research + T2 design system"
   - 43 files changed, 9924 insertions

## Git 커밋 원칙
- **모든 칸반 태스크 완료 시 즉시 Git 커밋**
- 커밋 메시지에 칸반 태스크 ID 포함
- 칸반 워크스페이스 산출물을 프로젝트 디렉토리로 복사 후 커밋
- 스킬 `otherdawn-it-git-commit`로 원칙 문서화
- cron `blocked_solving`이 완료 태스크 자동 커밋하도록 업데이트

## 산출물 매핑
| 칸반 워크스페이스 | 프로젝트 타겟 |
|---|---|
| Research outputs | `docs/research/` |
| Design outputs | `docs/design/` |
| Architecture docs | `docs/architecture/` |
| Source code | 프로젝트 루트 |

## 다음 단계
- T3(CTO 아키텍처 설계) 실행 중
- T10(빌드 에러 수정) ready 상태
- cron이 2분마다 상태 점검 및 자동 커밋 수행