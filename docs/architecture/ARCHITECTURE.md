# Next.js 아키텍처 설계 — 다른새벽 IT 웹사이트

## ADR-001: Next.js App Router + next-intl 정적 생성 아키텍처

**Status**: Approved  
**Date**: 2026-06-23  
**Decider**: CTO

---

## 1. 컨텍스트

다른새벽 IT 브랜딩 웹사이트 (it.otherdawn.org)를 Vercel 정적 사이트로 배포해야 합니다.
기존 프로젝트 베이스 코드가 ~/Dev/nalutbae/otherdawn-it/에 생성되어 있으나,
next-intl의 `requestLocale`이 내부적으로 `headers()`를 호출하여 `output: 'export'`와 충돌하는 빌드 에러가 발생합니다.

### 빌드 에러 원인 분석

```
Error: Route /en with `dynamic = "error"` couldn't be rendered statically because it used `headers`.
```

**근본 원인**: `i18n/request.ts`의 `getRequestConfig` 콜백이 `requestLocale`을 사용하는데,
next-intl 3.x에서 `requestLocale` getter는 내부적으로 Next.js의 `headers()` API를 호출합니다.
`output: 'export'` 모드에서는 `headers()`가 정적 렌더링 중 사용될 수 없으므로 모든 페이지 빌드가 실패합니다.

**영향 범위**: 8개 페이지 전부 (/en, /ko, /en/product, /ko/product, /en/about, /ko/about, /en/contact, /ko/contact)

---

## 2. 결정

### 2.1 핵심 아키텍처: setRequestLocale 패턴

next-intl 3.x에서 `output: 'export'`와 호환되는 공식 패턴을 채택합니다.

**원리**: `getRequestConfig`의 `requestLocale`에 의존하지 않고,
각 페이지/레이아웃에서 `setRequestLocale(locale)`을 명시적으로 호출하여
서버 컴포넌트의 `getTranslations()`, `useTranslations()`가 동작하도록 합니다.

이 패턴은 `headers()` 호출을 우회하므로 정적 생성과 완벽히 호환됩니다.

### 2.2 디렉토리 구조

```
otherdawn-it/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # locale별 루트 레이아웃 (setRequestLocale 호출)
│   │   ├── page.tsx            # 홈페이지 (setRequestLocale 호출)
│   │   ├── product/page.tsx    # 제품 페이지 (setRequestLocale 호출)
│   │   ├── about/page.tsx      # 소개 페이지 (setRequestLocale 호출)
│   │   ├── contact/page.tsx    # 문의 페이지 (setRequestLocale 호출)
│   │   └── not-found.tsx       # locale별 404
│   ├── layout.tsx              # 글로벌 루트 레이아웃 (pass-through)
│   ├── page.tsx                # 루트 리다이렉트 (/ → /en)
│   ├── not-found.tsx           # 글로벌 404
│   └── globals.css             # 글로벌 스타일 (Tailwind + 디자인 토큰)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # 네비게이션 바 (client, useTranslations)
│   │   ├── Footer.tsx          # 푸터 (client, useTranslations)
│   │   └── LanguageSwitcher.tsx # 언어 전환 버튼 (client)
│   ├── sections/
│   │   ├── Hero.tsx            # 히어로 섹션 (client, framer-motion)
│   │   ├── ProductSection.tsx  # 제품 섹션 (client)
│   │   ├── AboutSection.tsx    # 소개 섹션 (client)
│   │   └── ContactSection.tsx  # 문의 섹션 (client)
│   └── ui/
│       ├── Button.tsx          # 재사용 버튼 컴포넌트
│       ├── Card.tsx            # 재사용 카드 컴포넌트
│       └── index.ts            # 배럴 익스포트
├── i18n/
│   └── request.ts              # getRequestConfig (requestLocale 미사용)
├── messages/
│   ├── en.json                 # 영문 메시지
│   └── ko.json                 # 한국어 메시지
├── lib/
│   └── utils.ts                # cn() 유틸 (clsx + tailwind-merge)
├── routing.ts                  # defineRouting (locales, defaultLocale)
├── navigation.ts               # createNavigation (Link, redirect, etc.)
├── i18n.ts                     # 루트 i18n 설정 (삭제 대상 — i18n/request.ts로 통합)
├── next.config.js              # Next.js 설정 (output: 'export')
├── tailwind.config.js          # Tailwind 설정 (다크 테마 토큰)
├── tsconfig.json               # TypeScript 설정
└── package.json                # 의존성
```

### 2.3 정적 생성 전략

| 항목 | 결정 | 이유 |
|------|------|------|
| output | `'export'` | Vercel 정적 배포 + DB 없음 |
| images.unoptimized | `true` | 정적 내보내기에서 이미지 최적화 미지원 |
| generateStaticParams | locale별 | `[{locale:'en'}, {locale:'ko'}]` |
| setRequestLocale | 모든 서버 페이지/레이아웃 | `headers()` 우회, 정적 렌더링 호환 |
| middleware | 사용 안 함 | 정적 내보내기에서 미들웨어 미지원 |

### 2.4 i18n 아키텍처

**언어**: 영문 기본 (`en`), 한국어 옵션 (`ko`)

```
routing.ts → defineRouting({ locales: ['en','ko'], defaultLocale: 'en' })
navigation.ts → createNavigation(routing) → Link, redirect, usePathname, useRouter
i18n/request.ts → getRequestConfig (locale 기반 메시지 로드)
```

**핵심 수정 — i18n/request.ts**:
- `requestLocale` 파라미터를 무시하고 별도 소스에서 locale을 결정하지 않음
- 대신 `setRequestLocale()`이 설정한 값을 `getLocale()`로 읽어옴
- 이를 통해 `headers()` 호출 완전 제거

### 2.5 클라이언트/서버 컴포넌트 분리

| 컴포넌트 | 타입 | 이유 |
|----------|------|------|
| app/[locale]/layout.tsx | Server | 메타데이터, setRequestLocale, 메시지 로드 |
| app/[locale]/page.tsx | Server | setRequestLocale 호출, 클라이언트 섹션 렌더링 |
| Navbar | Client | useState (모바일 메뉴), usePathname |
| Footer | Client | useTranslations (next-intl 클라이언트) |
| Hero, ProductSection, etc. | Client | framer-motion 애니메이션 |
| Button, Card | Client (forwardRef) | 이벤트 핸들링 |

### 2.6 스타일링 아키텍처

- **Tailwind CSS 3.4**: 다크 테마 유틸리티 클래스
- **디자인 토큰**: CSS 변수 (globals.css) + Tailwind 확장 (tailwind.config.js)
- **컬러 팔레트**: Navy (#0a0a0f~#1e1e3a) + Emerald (#10b981) / Cyan (#06b6d4)
- **폰트**: Geist Sans (next.js/font 통합)
- **애니메이션**: Framer Motion + CSS keyframes (float, fadeUp)
- **재사용 클래스**: `.glass-card`, `.gradient-text`, `.glow-emerald`, `.glow-cyan`

### 2.7 의존성 스택

| 패키지 | 버전 | 용도 |
|--------|------|------|
| next | ^14.2.0 | App Router 프레임워크 |
| react | ^18.3.0 | UI 라이브러리 |
| next-intl | ^3.22.0 (3.26.5 설치됨) | i18n (setRequestLocale 패턴) |
| tailwindcss | ^3.4.0 | 스타일링 |
| framer-motion | ^11.5.0 | 애니메이션 |
| geist | ^1.7.2 | Geist Sans 폰트 |
| clsx + tailwind-merge | ^2.x | 클래스명 유틸 |

---

## 3. 빌드 에러 수정 계획

### 3.1 수정 파일 목록

1. **i18n/request.ts** — `requestLocale` 대신 `getLocale()` 사용
2. **app/[locale]/layout.tsx** — `setRequestLocale(locale)` 추가
3. **app/[locale]/page.tsx** — `setRequestLocale(locale)` 추가
4. **app/[locale]/product/page.tsx** — `setRequestLocale(locale)` 추가
5. **app/[locale]/about/page.tsx** — `setRequestLocale(locale)` 추가
6. **app/[locale]/contact/page.tsx** — `setRequestLocale(locale)` 추가
7. **i18n.ts** (루트) — 중복 파일 삭제
8. **next.config.js** — 플러그인 경로 확인 (`./i18n/request.ts` 유지)
**핵심 수정 — i18n/request.ts**:
- `requestLocale` 파라미터를 그대로 유지 (원본 코드와 동일)
- 대신 `setRequestLocale()`이 모든 서버 페이지/레이아웃에서 호출되도록 추가
- `setRequestLocale()`이 호출되면 `requestLocale`이 `headers()`를 우회하고 설정된 값을 반환
- `getRequestConfig` 내부에서 `getLocale()`을 호출하면 무한 재귀 발생 (주의)

```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from '../routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as 'en' | 'ko')) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

#### app/[locale]/layout.tsx (수정 부분)

```typescript
import { setRequestLocale } from 'next-intl/server';

// ... 기존 코드 ...

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as 'en' | 'ko')) {
    notFound();
  }

  // 핵심: locale을 명시적으로 설정하여 headers() 호출을 우회
  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className="dark">
      <body className={`${GeistSans.className} bg-navy-950 text-white antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

#### 각 페이지 (page.tsx, product/page.tsx, about/page.tsx, contact/page.tsx)

```typescript
import { setRequestLocale } from 'next-intl/server';

export default async function XxxPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <XxxSection />
      </main>
      <Footer />
    </>
  );
}
```

---

## 4. 대안 검토

### 4.1 대안 A: next-intl 없이 자체 i18n 구현

| 장점 | 단점 |
|------|------|
| headers() 문제 원천 제거 | 라우팅, 메시지 로드, 타입 안전성을 직접 구현해야 함 |
| 번들 크기 감소 | 유지보수 부담 증가 |
| 정적 생성 완벽 호환 | LanguageSwitcher 등 클라이언트 로직 재작성 필요 |

**기각**: next-intl의 setRequestLocale 패턴으로 동일한 목표 달성 가능하므로 자체 구현은 오버엔지니어링.

### 4.2 대안 B: react-i18next 사용

| 장점 | 단점 |
|------|------|
| 성숙한 생태계 | Next.js App Router 통합이 next-intl만큼 매끄럽지 않음 |
| 번들 크기 작음 | SSR/SSG 호환성 직접 처리 필요 |
| 정적 생성 호환 | 라우팅 통합 부재 |

**기각**: Next.js App Router에서는 next-intl이 공식 추천 패턴이며 setRequestLocale로 문제 해결됨.

### 4.3 대안 C: output: 'export' 제거하고 SSR 모드 사용

| 장점 | 단점 |
|------|------|
| headers() 정상 작동 | Vercel 서버리스 함수 필요 (비용 증가) |
| next-intl 공식 패턴 그대로 사용 | DB 없는 정적 사이트에 오버스펙 |
| 미들웨어 사용 가능 | 배포 복잡도 증가 |

**기각**: 프로젝트 브리프가 명시적으로 "정적 사이트, DB 없음, Vercel 배포"를 요구.

### 4.4 채택: setRequestLocale 패턴 (next-intl 3.x 공식)

| 장점 | 단점 |
|------|------|
| next-intl 공식 지원 패턴 | 각 페이지에 setRequestLocale 호출 필요 (보일러플레이트) |
| output: 'export' 완벽 호환 | next-intl 버전 의존성 (3.x에서만 지원) |
| 기존 코드 최소 수정 | — |
| 타입 안전성 유지 | — |

---

## 5. 트레이드오프

### 얻는 것
- 정적 생성 빌드 성공 (8개 페이지 모두 SSG)
- Vercel 무료 티어 배포 가능 (서버리스 함수 불필요)
- next-intl 공식 패턴으로 향후 업그레이드 호환성 보장
- 기존 컴포넌트 코드 100% 재사용

### 희생하는 것
- 각 서버 페이지에 setRequestLocale 보일러플레이트 필요
- 미들웨어 기반 locale 감지 불가 (URL 경로 기반만 가능)
- 동적 locale 리다이렉트 제한 (정적이므로 빌드 타임에 결정)

### 리스크
- next-intl 4.x 마이그레이션 시 setRequestLocale API 변경 가능성
  - 완화: next-intl 공식 문서가 추천하는 패턴이므로 마이그레이션 가이드 제공 예상
- 클라이언트 컴포넌트의 useTranslations가 NextIntlClientProvider에만 의존
  - 완화: layout.tsx에서 명시적으로 messages를 로드하여 Provider에 전달
- **getRequestConfig 내부에서 getLocale() 호출 시 무한 재귀**
  - `getLocale()`이 내부적으로 `getRequestConfig()`를 트리거하여 스택 오버플로 발생
  - 절대 `getRequestConfig` 콜백 안에서 `getLocale()`을 호출하지 말 것
  - `requestLocale` 파라미터를 그대로 사용하고 `setRequestLocale()`로 값 주입

---

## 6. 하위 태스크 의존성 맵

```
[T3] CTO: 아키텍처 설계 + 빌드 에러 수정 (이 태스크)
  ├── [T4] Senior: 핵심 페이지 구현 (Hero, Product, About, Contact)
  ├── [T5] Senior: i18n 다국어 지원
  └── [긴급] Senior: next-intl static export 빌드 에러 수정
```

T4, T5는 이 아키텍처 설계를 기반으로 구현 진행.
긴급 빌드 에러 수정 태스크(t_8cf856d7)는 이 태스크에서 직접 처리하여 완료.

---

## 7. 검증 기준

- [x] `npm run build` 성공 (output: 'export')
- [x] 8개 페이지 모두 정적 생성 (/en, /ko, /en/product, /ko/product, /en/about, /ko/about, /en/contact, /ko/contact)
- [x] `out/` 디렉토리에 정적 파일 생성 확인
- [x] 메시지 파일 (en.json, ko.json) 정상 로드
- [x] 언어 전환 (LanguageSwitcher) 정상 동작