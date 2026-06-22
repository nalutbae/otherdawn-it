# 다른새벽 IT 웹사이트 프로젝트 브리프

## 프로젝트 개요
- **프로젝트명**: 다른새벽 IT 브랜딩 웹사이트
- **도메인**: it.otherdawn.org
- **배포**: Vercel (정적 사이트)
- **기술스택**: Next.js 14+ (App Router), Tailwind CSS, Framer Motion, next-intl
- **언어**: 영문 우선, 한국어 옵션

## 핵심 목표
투자자 대상 인지도 확보 및 투자 유치

## 타겟 고객
1. 투자자 (1순위)
2. 제품 검토자 / B2B 고객 (2순위)

## 제품: mAI-Brain
- 오픈소스 도메인 특화 RAG 챗봇 프레임워크
- Qdrant 벡터DB + DeepSeek/OpenAI/Ollama 지원
- 분야별 특화 AI 서비스 확장 모델
- GitHub: https://github.com/nalutbae/mAI-Brain

## 경쟁사: AnythingLLM
- GitHub 61.9K Stars
- "All-in-one AI application" 포지셔닝
- 다크 테마, 깔끔한 제품 중심 랜딩

## 차별화 전략
- **AnythingLLM**: 범용 (All-in-one)
- **mAI-Brain**: 도메인 특화 (Domain-specialized)
- 메시지: "Generic AI is not enough. Domain-specialized RAG is the future."

## 디자인 방향
- **스타일**: Vercel/Linear 미니멀 다크 테마
- **컬러**: 다크 네이비 (#0a0a0f ~ #111827) + 에메랄드/시안 악센트 (#10b981 ~ #06b6d4)
- **폰트**: Geist Sans / Inter
- **애니메이션**: Framer Motion (미래적 감각)

## 칸반 태스크 맵
```
[T1] Researcher: 경쟁사 심층 분석 ← (시작)
[T2] Designer: 디자인 시스템 & 와이어프레임 ← (시작)
    ↓
[T3] CTO: Next.js 아키텍처 설계 ← (T1, T2 완료 후)
    ↓
[T4] Senior Engineer: 핵심 페이지 구현 ← (T3 완료 후)
[T5] Senior Engineer: i18n 다국어 지원 ← (T3 완료 후, T4와 병렬)
    ↓
[T6] Junior Engineer: 컴포넌트 & 애니메이션 ← (T4 완료 후)
[T8] Marketer: SEO/OG & 카피 검수 ← (T4 완료 후)
    ↓
[T7] QA Tester: 크로스 브라우저 테스트 ← (T4, T5, T6 완료 후)
    ↓
[T9] CTO: Vercel 배포 & 도메인 설정 ← (T7, T8 완료 후)
```

## 페이지 구성
1. **Hero/Landing** - "Domain-Specialized RAG for Every Industry"
2. **Product** - mAI-Brain 아키텍처, 기능, 차별점
3. **Open Source** - GitHub, 기여 가이드
4. **About** - 다른새벽 회사 소개
5. **Contact** - 문의 (정적 폼)

## 기술 제약
- DB 없음 (Supabase 등 사용 안 함)
- 정적 생성 (SSG) 우선
- Vercel 배포
- 오픈소스 제품 브랜딩 사이트

---
생성일: {datetime.now().strftime('%Y-%m-%d %H:%M')}
