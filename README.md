# ANIMUS HISTORICA

> 세계사 데이터베이스 — HISTORICAL MEMORY SYNCHRONIZATION SYSTEM

어쌔신 크리드 시리즈의 *Animus* 인터페이스에서 영감을 받은 한국사·세계사 인터랙티브 타임라인 웹 앱입니다.

## 주요 기능

- 🌐 **수직 스크롤 타임라인**: 60개 이상의 한국사·세계사 사건을 연대순으로 표시
- 🔍 **필터링**: 시대, 지역, 사건 분류별 다중 필터
- ⌨️ **검색**: 제목·인물·연도·개요 통합 검색
- 📜 **상세 기록**: 각 사건의 개요, 역사적 의의, 관련 사건을 디코딩 애니메이션과 함께 표시
- 🎮 **Animus 비주얼**: 글리치, 스캔라인, 홀로그램 효과, ASCII 데이터 스트림

## 시스템 요구 사항

- Node.js 18+
- npm 9+

## 설치 및 실행

```bash
npm install
npm run dev
```

이후 브라우저에서 http://localhost:5173 접속.

## 빌드

```bash
npm run build
npm run preview
```

## 키보드 단축키

| 키 | 동작 |
|----|------|
| `ESC` | 상세 기록 닫기 |
| `F` | 검색창 포커스 |
| `1` ~ `6` | 시대 필터 전환 (ALL / 고대 / 중세 / 근세 / 근대 / 현대) |

## 프로젝트 구조

```
src/
├── App.jsx              메인 앱
├── App.css              전역 스타일 (Animus 디자인)
├── data/history.json    역사 데이터 (60+ 이벤트)
├── components/
│   ├── BootSequence.jsx Animus 부팅 시퀀스
│   ├── Header.jsx
│   ├── FilterPanel.jsx
│   ├── Timeline.jsx
│   ├── TimelineNode.jsx
│   ├── EraMarker.jsx
│   ├── DetailPanel.jsx
│   ├── DataStream.jsx
│   └── SearchBar.jsx
└── hooks/
    ├── useTypewriter.js
    └── useGlitch.js
```

## 라이선스

교육용 프로젝트.
