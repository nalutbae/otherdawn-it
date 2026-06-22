# 프로젝트 킥오프: 다른새벽 IT 웹사이트

## 일시
2026-06-22 23:36

## 요청 요약
다른새벽(사업자명)의 IT 브랜딩 웹사이트 제작. RAG 챗봇 제품 mAI-Brain을 개발하는 스타트업으로, 투자자 대상 인지도 확보가 핵심 목표.

## 주요 결정사항
1. **완성도 우선** — 빠른 MVP가 아닌, 투자자 인상을 위한 완성도 높은 사이트
2. **영문 우선 + 한국어 옵션** — 글로벌 투자자 대상
3. **Next.js + Vercel** — DB 없이 정적 생성
4. **Vercel/Linear 스타일 다크 테마** — 미래적 감각 + 기술적 신뢰감
5. **"도메인 특화" 차별화** — AnythingLLM(범용) vs mAI-Brain(도메인 특화)

## 실행 내역
- 프로젝트 디렉토리 생성: ~/Dev/nalutbae/otherdawn-it/
- 칸반 태스크 9개 생성 (T1~T9)
- 프로젝트 브리프 문서 작성: PROJECT_BRIEF.md
- T1(Researcher) 자동 시작됨
- T2(Designer) ready 상태

## 칸반 태스크 ID
- T1: t_8fa7120d (researcher) - 경쟁사 심층 분석 ← RUNNING
- T2: t_69a4657a (designer) - 디자인 시스템 & 와이어프레임
- T3: t_8121d238 (cto) - Next.js 아키텍처 설계 (parents: T1, T2)
- T4: t_6dcd3f52 (senior-engineer) - 핵심 페이지 구현 (parent: T3)
- T5: t_0296b99c (senior-engineer) - i18n 다국어 지원 (parent: T3)
- T6: t_f1d7e364 (junior-engineer) - 컴포넌트 & 애니메이션 (parent: T4)
- T7: t_53a3105b (qa-tester) - 크로스 브라우저 QA (parents: T4, T5, T6)
- T8: t_08c899a8 (marketer) - SEO/OG & 카피 검수 (parent: T4)
- T9: t_97c76e8d (cto) - Vercel 배포 & 도메인 설정 (parents: T7, T8)

## 다음 단계
- T1(Researcher) 결과 대기 → T3 아키텍처 설계 시작
- T2(Designer) 와이어프레임 산출물 → T3, T4에 반영
- 모든 태스크 완료 후 Vercel 배포

## 비고
- 경쟁사 AnythingLLM 사이트 분석 완료 (다크 테마, all-in-one 포지셔닝)
- mAI-Brain GitHub 리포 분석 완료 (Qdrant + LLM, Docker 배포)
- AnythingLLM과의 차별화: "도메인 특화" 포지셔닝 전략 채택
