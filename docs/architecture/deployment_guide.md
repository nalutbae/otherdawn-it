# Vercel 배포 및 it.otherdawn.org 도메인 설정 가이드

## 배포 개요

- **프로젝트**: 다른새벽 IT 브랜딩 웹사이트 (otherdawn-it)
- **프레임워크**: Next.js 14 (App Router, output: 'export')
- **배포 플랫폼**: Vercel (정적 사이트)
- **도메인**: it.otherdawn.org
- **SSL**: Vercel 자동 관리 (Let's Encrypt)

---

## 1. 사전 준수 사항

### 1.1 변경된 설정 파일

#### vercel.json (신규 생성)
- 정적 사이트 배포 설정 (outputDirectory: "out")
- 캐시 헤더: `_next/static/*` → 1년 immutable 캐시 (QA 이슈 해결)
- 보안 헤더: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- `trailingSlash: true` → 디렉토리 기반 URL 구조 (/en/ → /en/index.html)
- `cleanUrls: true` → .html 확장자 제거

#### next.config.js (수정)
- `trailingSlash: true` 추가 → 정적 내보내기 시 디렉토리 구조 생성
- 빌드 결과: out/en/index.html, out/en/about/index.html 등

### 1.2 QA 이슈 해결 상태

| QA 이슈 | 상태 | 해결 방법 |
|---------|------|-----------|
| 404 errors for .next/static chunks | 해결됨 | trailingSlash:true + 디렉토리 구조 변경 |
| Missing cache headers (655KiB) | 해결됨 | vercel.json Cache-Control 헤더 추가 |
| FCP 3.0s / LCP 5.1s | 부분 개선 | 캐시 헤더로 재방문 시 개선, 코드 최적화는 하위 태스크 |
| Unused JavaScript 204KiB | 하위 태스크 | Framer Motion dynamic import 필요 (코드 수정) |
| Heading order violation | 하위 태스크 | HTML 구조 수정 필요 (코드 수정) |

---

## 2. Vercel 배포 절차

### 2.1 Vercel CLI 설치 (로컬 배포)

```bash
npm install -g vercel
```

### 2.2 Git 기반 배포 (권장)

1. **GitHub 저장소 생성 또는 연결**
   ```bash
   cd ~/Dev/nalutbae/otherdawn-it
   git add -A
   git commit -m "feat: Vercel 배포 설정 (vercel.json, trailingSlash)"
   git push origin develop
   ```

2. **Vercel 대시보드에서 프로젝트 임포트**
   - https://vercel.com/new 접속
   - GitHub 저장소 선택 (otherdawn-it)
   - Framework Preset: Next.js (자동 감지)
   - Build Command: `npm run build` (자동 감지)
   - Output Directory: `out` (vercel.json에 지정됨)
   - Deploy 클릭

3. **또는 Vercel CLI로 배포**
   ```bash
   cd ~/Dev/nalutbae/otherdawn-it
   vercel login
   vercel --prod
   ```

### 2.3 빌드 검증

배포 후 Vercel 빌드 로그에서 다음 확인:
- `next build` 성공 (12/12 정적 페이지 생성)
- `out/` 디렉토리 업로드 완료
- 배포 URL 접근 가능 (https://otherdawn-it.vercel.app)

---

## 3. it.otherdawn.org 도메인 설정

### 3.1 Vercel에 커스텀 도메인 추가

1. **Vercel 대시보드 → 프로젝트 → Settings → Domains**
2. **Add Domain** 클릭
3. `it.otherdawn.org` 입력
4. Add 클릭

### 3.2 DNS 레코드 설정

Vercel가 DNS를 관리하지 않는 경우 (외부 DNS):

**A 레코드 (Apex/Subdomain):**
```
타입: A
이름: it
값: 76.76.21.21
TTL: 3600 (또는 자동)
```

**또는 CNAME 레코드 (권장):**
```
타입: CNAME
이름: it
값: cname.vercel-dns.com
TTL: 3600 (또는 자동)
```

### 3.3 DNS 제공자별 설정

#### Cloudflare (사용 중인 경우)
- DNS 탭 → Add Record
- Type: CNAME, Name: it, Target: cname.vercel-dns.com
- Proxy status: DNS only (회색 구름) — Vercel SSL이 작동하려면 프록시 비활성화 필요
- 주의: Cloudflare Proxy(주황 구름) 활성화 시 Vercel SSL과 충돌 발생 가능

#### Namecheap
- Advanced DNS 탭
- Type: CNAME Record, Host: it, Value: cname.vercel-dns.com, TTL: Automatic

#### GoDaddy
- DNS Management
- Type: CNAME, Name: it, Value: cname.vercel-dns.com, TTL: 1 Hour

#### Gandi
- DNS Records
- Type: CNAME, Name: it, Target: cname.vercel-dns.com, TTL: 3600

### 3.4 SSL 인증서

- Vercel가 자동으로 Let's Encrypt SSL 인증서 프로비저닝
- DNS 전파 후 자동 활성화 (보통 5-30분)
- HTTPS 리다이렉트 자동 적용 (Vercel 기본 동작)
- vercel.json의 HSTS 헤더로 보안 강화

### 3.5 DNS 전파 확인

```bash
# DNS 전파 상태 확인
dig it.otherdawn.org CNAME
dig it.otherdawn.org A

# 또는
nslookup it.otherdawn.org

# Vercel 도메인 상태 확인
vercel domains inspect it.otherdawn.org
```

DNS 전파 완료 후 Vercel 대시보드에서 도메인 상태가 "Valid Configuration"으로 변경됨.

---

## 4. 성능 최적화 상태

### 4.1 구성된 캐시 전략

| 리소스 | Cache-Control | 효과 |
|--------|---------------|------|
| `/_next/static/*` (JS/CSS) | public, max-age=31536000, immutable | 1년 캐시, 재검증 불필요 |
| `/_next/static/media/*` (폰트) | public, max-age=31536000, immutable | 1년 캐시 |
| `/*.html` (페이지) | public, max-age=3600, stale-while-revalidate=86400 | 1시간 캐시 + 24시간 SWR |
| 이미지 (ico/svg/png/jpg/webp) | public, max-age=2592000, immutable | 30일 캐시 |
| 폰트 (woff/woff2/ttf) | public, max-age=31536000, immutable | 1년 캐시 + CORS 허용 |

### 4.2 보안 헤더

| 헤더 | 값 | 목적 |
|------|------|------|
| Strict-Transport-Security | max-age=31536000; includeSubDomains; preload | HSTS — HTTPS 강제 |
| X-Content-Type-Options | nosniff | MIME 타입 스니핑 방지 |
| X-Frame-Options | DENY | 클릭재킹 방지 |
| Referrer-Policy | strict-origin-when-cross-origin | Referrer 정보 제한 |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | 디바이스 접근 차단 |

### 4.3 빌드 결과 요약

```
Route (app)                              Size     First Load JS
┌ ○ /                                    150 B          87.5 kB
├ ○ /_not-found                          150 B          87.5 kB
├ ● /[locale]                            6.2 kB          169 kB
├ ● /[locale]/about                      2.08 kB         165 kB
├ ● /[locale]/contact                    2.73 kB         166 kB
└ ● /[locale]/product                    2.79 kB         166 kB

First Load JS shared by all            87.4 kB
  ├ chunks/117-e173c366e2bfd494.js       31.9 kB
  ├ chunks/fd9d1056-b11b2651f33aae7f.js  53.6 kB
  └ other shared chunks (total)          1.89 kB
```

- 총 12개 페이지 정적 생성 (en/ko x 4페이지 + 루트 리다이렉트 + 404)
- 초기 JS: ~169 kB (압축 전 ~816 kB)
- CSS: 20 kB (1 파일)
- 폰트: 1 woff2 파일

---

## 5. 하위 태스크: 코드 수준 최적화 (별도 태스크로 분리)

### 5.1 Framer Motion Dynamic Import (Senior Engineer)

현재 모든 클라이언트 컴포넌트가 framer-motion을 정적으로 import하여 초기 JS 번들에 포함됨.

**권장 수정**:
```typescript
// components/sections/Hero.tsx
import { motion } from 'framer-motion';
// →
const { motion } = await import('framer-motion');
// 또는 next/dynamic으로 컴포넌트 자체를 지연 로드
```

**예상 효과**: 초기 JS ~30-50kB 감소

### 5.2 Heading Order 수정 (Junior Engineer)

QA에서 "Heading elements not in sequentially-descending order" 위반 발견.
H1 → H3 등의 순서 위반 수정 필요.

### 5.3 이미지 최적화 (Senior Engineer)

정적 내보내기에서 Next.js Image Optimization이 미지원되므로:
- OG 이미지 (1200x630) 생성 및 public/ 배치
- favicon.ico, apple-touch-icon.png 추가
- SVG 로고 최적화

---

## 6. 배포 후 검증 체크리스트

- [ ] Vercel 배포 성공 (빌드 로그 확인)
- [ ] 기본 URL 접속 (https://otherdawn-it.vercel.app)
- [ ] / → /en/ 리다이렉트 작동
- [ ] 언어 전환 (en ↔ ko) 정상
- [ ] 모든 페이지 라우팅 (/en/about/, /en/product/, /en/contact/)
- [ ] 커스텀 도메인 DNS 설정 (it.otherdawn.org)
- [ ] SSL 인증서 활성화 확인 (https://it.otherdawn.org)
- [ ] 캐시 헤더 응답 확인 (curl -I)
- [ ] 보안 헤더 응답 확인 (curl -I)
- [ ] Lighthouse 재측정 (목표: Performance > 90)
- [ ] OG 태그 미리보기 테스트 (Twitter/Facebook debugger)
- [ ] Google Search Console 등록

### 검증 명령어

```bash
# 캐시 헤더 확인
curl -I https://it.otherdawn.org/_next/static/chunks/main-app-*.js

# 보안 헤더 확인
curl -I https://it.otherdawn.org/

# 응답 코드 확인
curl -o /dev/null -s -w "%{http_code}" https://it.otherdawn.org/en/
curl -o /dev/null -s -w "%{http_code}" https://it.otherdawn.org/ko/
curl -o /dev/null -s -w "%{http_code}" https://it.otherdawn.org/en/about/
```

---

## 7. 롤백 계획

Vercel 자체 롤백 기능 사용:
1. Vercel 대시보드 → 프로젝트 → Deployments
2. 이전 배포의 "..." 메뉴 → "Promote to Production"
3. 즉시 이전 버전으로 롤백

또는 CLI:
```bash
vercel ls                    # 배포 목록 확인
vercel promote <deployment-url>  # 특정 배포를 프로덕션으로 승격
```

---

## 8. 비용 분석

| 항목 | 비용 |
|------|------|
| Vercel Hobby (개인) | $0/월 |
| 도메인 (otherdawn.org) | 기존 보유 (연 $10-15) |
| SSL 인증서 | $0 (Vercel/Let's Encrypt) |
| CDN (Vercel Edge Network) | $0 (Hobby 티어 포함) |
| **총 비용** | **$0/월** |

Hobby 티어 제한:
- 대역폭: 100GB/월 (브랜딩 사이트는 충분)
- 빌드 실행: 6000분/월
- 동시 배포: 1개

---

생성일: 2026-06-23
작성자: CTO (Hermes Kanban t_97c76e8d)