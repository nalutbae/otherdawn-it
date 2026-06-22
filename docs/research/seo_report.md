# SEO & OG Tag, Metadata, and Content Copy Review Report

## 1. 목표
- 웹 페이지에 **Open Graph (OG) 태그**, **메타데이터**를 적절히 삽입하여 SNS 공유 시 미리보기가 최적화되도록 함
- 주요 페이지에 **SEO 친화적 메타 타이틀·디스크립션·키워드**를 정의하고, 검색 엔진 노출을 극대화
- 현재 사이트 카피를 **브랜드 톤·가이드라인**에 맞게 검수하고, 가독성·전환율을 높이는 개선안을 제시

## 2. 전제조건
- 대상 사이트는 정적 HTML/React 기반 SSG(예: Next.js)이며, 페이지별 `head` 컴포넌트를 수정할 수 있음
- 기존 페이지 메타 정보가 거의 없거나 기본값(타이틀만)만 존재함
- 주요 페이지: Home, Product, About, Blog, Contact

## 3. OG 태그 권장 사양 (예시)
```html
<!-- 각 페이지의 <head>에 삽입 -->
<meta property="og:title" content="[페이지 타이틀] – 브랜드명" />
<meta property="og:description" content="[페이지 요약 (120~150자)]" />
<meta property="og:image" content="https://example.com/assets/og-image.jpg" />
<meta property="og:url" content="https://example.com/[path]" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="브랜드명" />
<!-- Optional Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[페이지 타이틀] – 브랜드명" />
<meta name="twitter:description" content="[페이지 요약]" />
<meta name="twitter:image" content="https://example.com/assets/og-image.jpg" />
```
- **이미지**: 1200×630 px, 파일 형식은 JPG/PNG, 150 KB 이하, `alt` 속성 포함
- **타이틀 길이**: 50~60 자 (구글 SERP 최적)
- **디스크립션 길이**: 120~155 자 (OG, 트위터 모두 동일 사용)

## 4. 메타데이터 권장 사양
| 페이지 | 메타 타이틀 | 메타 디스크립션 | 키워드 (선택) |
|---|---|---|---|
| Home | 브랜드명 – 혁신적인 AI 솔루션 | AI 기반 자동화와 데이터 인사이트 제공, 지금 바로 체험해 보세요. | AI, 자동화, 데이터 인사이트 |
| Product | 제품명 – 주요 기능 요약 | 제품·서비스 핵심 기능·가격·고객 사례를 한눈에. 상세 정보 확인. | 제품명, 기능, 가격 |
| About | 브랜드 스토리 & 미션 | 우리 기업이 추구하는 가치와 비전을 확인하고, 팀을 만나보세요. | 기업 스토리, 미션, 가치 |
| Blog | 블로그 – 최신 AI 트렌드와 활용 팁 | AI·데이터·클라우드 최신 동향과 실전 팁을 제공하는 블로그. | AI 트렌드, 블로그, 팁 |
| Contact | 문의하기 – 빠른 상담 요청 | 궁금한 점을 남겨 주세요. 24시간 내에 답변드립니다. | 문의, 상담, 지원 |

- **키워드** 메타는 구글이 거의 무시하지만, 일부 엔터프라이즈/내부 검색엔진에서는 활용 가능하므로 5~8개 정도 포함.
- **Canonical** 태그를 모든 페이지에 명시 (`<link rel="canonical" href="https://example.com/[path]" />`).

## 5. 콘텐츠 카피 검수 가이드라인
1. **톤앤매너**: 친근하면서도 전문가적 어투, 1인칭 ‘우리는’ 대신 ‘우리 팀은’ 사용. 
2. **문장 길이**: 한 문장은 20 단어 이하, 복잡한 절은 쉼표·대시로 나눔.
3. **핵심 키워드 앞에 배치**: SEO 핵심 키워드는 문장 앞부분에 배치 (예: “AI 자동화 솔루션으로…”)
4. **CTA(콜투액션) 명확화**: ‘지금 바로 체험하기’, ‘무료 데모 신청’ 같은 행동 유도 문구를 각 섹션 말미에 삽입.
5. **중복 및 불필요한 문구 제거**: “저희는…”, “본 제품은…” 등 중복 어구 삭제.
6. **읽기 쉬운 포맷**: 목록·표·강조(bold) 활용, H1-H3 구조 명확히 유지.

## 6. 구현 로드맵 (2‑주 스프린트)
| 주차 | 작업 항목 | 담당 | 산출물 |
|---|---|---|---|
| 1 | 현재 페이지 메타 현황 스크래핑 및 정리 | 마케터 | `meta_current.xlsx` |
| 1 | OG/Meta 템플릿 정의 (JSON) | 마케터/프론트엔드 | `meta_template.json` |
| 2 | 페이지별 `head` 컴포넌트 업데이트 (React/Next) | 프론트엔드 | PR #** (파일 변경) |
| 2 | 카피 검수 및 교정 (Google Docs 코멘트) | 마케터 | `copy_review_report.md` |
| 2 | QA: SNS 공유 테스트, 구글 서치 콘솔 검증 | QA | 테스트 리포트 PDF |

## 7. 성공 지표 (KPIs)
- **OG 인게이지먼트**: SNS 공유 시 클릭률(CTR) ≥ 2.5 % (3개월 평균 대비 +30 %)
- **페이지 SEO 점수**: Google Lighthouse SEO ≥ 90점 (전 페이지 평균 78점)
- **페이지 체류 시간**: 평균 +15 % (카피 개선 효과)
- **전환율**: CTA 클릭 → 리드 전환 ≥ 4 % (목표 3 %)
- **검색 노출**: 주요 키워드 상위 10위 이상 유지 (월간) 

## 8. 유지 보수 방안
- 메타·OG 데이터는 `meta_config.yaml`에 관리하고, CI 파이프라인에 자동 검증 스크립트(`npm run lint:meta`) 추가
- 카피는 분기마다 1차 리뷰, 주요 업데이트 시 2차 리뷰 프로세스 적용
- 구글 서치 콘솔, 페이스북 공유 디버거, 트위터 카드 검증 도구를 주간 자동 체크 (Cron) 

---
**다음 단계**: 위 로드맵에 따라 프론트엔드 팀에 PR을 요청하고, 마케팅 팀은 카피 검수 결과를 공유한다. 필요 시 추가 KPI 대시보드 시트를 제공한다.
