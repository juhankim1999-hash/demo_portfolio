import { useState } from 'react';
import {
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Award,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Figma,
  FileText,
  Layers,
  Search,
  Sliders,
  Sparkles,
  HeartHandshake,
  Check,
  ChevronRight,
  User
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

// Define project types for type-safety
interface Project {
  id: number;
  title: string;
  period: string;
  role: string;
  problemSummary: string;
  processSummary: string;
  resultSummary: string;
  problemDetail: string;
  researchDetail: string;
  prioritizationDetail: string;
  validationDetail: string;
}

export default function App() {
  const [activeProjectId, setActiveProjectId] = useState<number>(2); // Default to Project 2 (content operations with chart)
  const [activeMetric, setActiveMetric] = useState<'views' | 'saves' | 'shares'>('views');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Copy email feature for interactive CTA
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("dalmi.seo.example@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Fact-based project data (Exactly as provided, no additions or modifications)
  const projects: Project[] = [
    {
      id: 1,
      title: "AI 반려식물 관리 서비스 기획",
      period: "2024.01 ~ 04",
      role: "경진대회 팀장",
      problemSummary: "초보 사용자는 물주기·병충해 판단이 어렵다",
      processSummary: "사용자 인터뷰 8명, 초기 기능 14개 → 핵심 8개로 압축",
      resultSummary: "참가 12팀 중 최종 3위(장려상)",
      problemDetail: "식물 초보 양육자가 양육 과정에서 겪는 가장 큰 페인 포인트인 '물주기 타이밍 부재'와 '식물 상태 이상 시 해결 방안 모색 불가' 현상 정의",
      researchDetail: "실제 반려식물을 기르는 초보 양육자 8명을 대상으로 심층 인터뷰(FGI)를 진행하여 물 공급 시점에 대한 불안감과 이상 현상 발생 시 대처 불능 상황에 대한 니즈 포착",
      prioritizationDetail: "브레인스토밍을 통해 도출된 초기 14개 아이디어 중, 개발 공수 및 필수 사용성을 기준으로 기능 우선순위화(Feature Prioritization)를 적용하여 최종 8개 MVP 기능으로 압축 (AI 식물 진단 및 실시간 물주기 맞춤 알림)",
      validationDetail: "대회 심사위원단 및 전문가 피드백을 수렴하여 기획 타당성을 검증받고, 참가 12개 팀 중 최종 3위(장려상) 수상"
    },
    {
      id: 2,
      title: "청년 취업정보 콘텐츠 운영",
      period: "2023.06 ~ 09",
      role: "인턴 업무",
      problemSummary: "취업준비생 대상 콘텐츠의 도달·저장 효율이 낮음",
      processSummary: "게시물 60건 분석, 취업정보 콘텐츠 비중 15% → 40% 확대",
      resultSummary: "평균 조회수 1,250→1,680회, 저장 34→57회, 공유 12→21회",
      problemDetail: "㈜커리어루트 인턴 과정 중, 타겟층인 취업준비생의 정보 수집 행태 대비 운영 중인 취업 콘텐츠의 실질적인 유입 및 액션 전환(저장/공유) 비율 저조 문제 발견",
      researchDetail: "기존에 발행된 콘텐츠 60건의 도달률 및 액션 반응 데이터를 다각도로 정량 분석하여, 단순 일상/홍보형 콘텐츠보다 체계적인 취업 정보 가이드에 대한 반응률이 월등히 높음을 규명",
      prioritizationDetail: "사용자가 실질적인 효용을 느끼는 정보형 콘텐츠의 제작 비중을 기존 15%에서 40%로 전격 확대 편성하고, 가독성을 저해하는 텍스트 위주 구성에서 템플릿화된 카드뉴스 형태로 콘텐츠 정보 구조(IA) 개편",
      validationDetail: "개편 후 정량적 수치 검증 결과, 평균 조회수 34.4% 상승, 저장수 67.6% 상승, 공유수 75% 상승이라는 즉각적인 사용자 지표 개선 달성"
    },
    {
      id: 3,
      title: "동네 소상공인 주문예약 서비스 기획",
      period: "2022.09 ~ 12",
      role: "대학 팀 프로젝트 (4명)",
      problemSummary: "소상공인은 예약·주문 관리 도구가 부족하다",
      processSummary: "소상공인 인터뷰 5명, 고객 설문 32명, 기능 12개 → 7개로 축소",
      resultSummary: "8팀 중 발표 2위, 최종 평가 A학점",
      problemDetail: "예약 시스템이 부재한 영세 골목 상권 점포들이 빈번한 노쇼(No-Show) 및 실시간 주문 관리 누락으로 인해 시간적·경제적 손실을 겪고 있는 페인 포인트 정의",
      researchDetail: "소상공인 점주 5명과의 일대일 인터뷰 및 서비스 주 이용 고객군 32명 대상의 설문조사를 통해 '점주는 예약 통합 관리의 간편함'을, '고객은 직관적인 실시간 예약 상황 확인'을 중시함을 입증",
      prioritizationDetail: "초기 구상안의 12개 연동 기능 중 학기 내 구현 타당성과 소상공인 사용 장벽을 감안하여 7개 기능으로 기능 축소 단행 (예약 승인 알림, 간편 실시간 스케줄러 위주)",
      validationDetail: "소상공인과 고객 양방향의 직관적인 정보 흐름(IA)을 갖춘 기획안으로 8개 대학 팀 중 종합 발표 2위를 차지하며 최종 A학점 획득"
    }
  ];

  // Recharts specific data
  const metricData = {
    views: {
      title: '평균 조회수 (정량 분석)',
      before: 1250,
      after: 1680,
      growth: '+34.4%',
      unit: '회',
      label: '도달 성과'
    },
    saves: {
      title: '평균 저장수 (정보 효용)',
      before: 34,
      after: 57,
      growth: '+67.6%',
      unit: '건',
      label: '콘텐츠 보존 가치'
    },
    shares: {
      title: '평균 공유수 (바이럴 확산)',
      before: 12,
      after: 21,
      growth: '+75.0%',
      unit: '건',
      label: '타겟 확산 속도'
    }
  };

  const activeChartData = [
    { name: '개선 전 (Before)', value: metricData[activeMetric].before, fill: '#cbd5e1' },
    { name: '개선 후 (After)', value: metricData[activeMetric].after, fill: '#10b981' } // Emerald Accent from Michael Carter style
  ];

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[1];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* =========================================================================
          HEADER: Sleek, high-contrast minimal branding bar
          ========================================================================= */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 md:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/60 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg hover:scale-105 transition-transform">
            S
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-950">
              서달미 <span className="text-slate-400 font-normal text-xs ml-1">Dal-mi Seo</span>
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5 font-bold">
              Junior Service Planner / PM
            </p>
          </div>
        </div>
        
        {/* Dynamic Header Contacts styled as capsules */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <button 
            onClick={handleCopyEmail}
            className="flex items-center px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 shadow-3xs rounded-full cursor-pointer transition-all active:scale-95 group"
          >
            <span className="text-[9px] text-slate-400 mr-2 uppercase font-bold tracking-wider group-hover:text-emerald-500 transition-colors">
              {copiedEmail ? 'Copied!' : 'Email (예시)'}
            </span>
            <span className="font-semibold text-slate-800 text-[11px]">dalmi.seo.example@gmail.com</span>
          </button>
          <div className="flex items-center px-4 py-2 bg-white border border-slate-200 shadow-3xs rounded-full">
            <span className="text-[9px] text-slate-400 mr-2 uppercase font-bold tracking-wider">Phone (예시)</span>
            <span className="font-semibold text-slate-800 text-[11px]">010-0000-0000</span>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN HERO LANDING AREA: Bold, spacious typography style from the design image
          ========================================================================= */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-10 pb-8 shrink-0">
        <div className="max-w-4xl">
          {/* Emerald Green status pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-500/10 rounded-full text-[11px] font-bold mb-6 hover:scale-[1.02] transition-transform">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>3 Core Projects & verified PM process available</span>
          </div>

          {/* Michael Carter typography style display headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-slate-900 leading-[1.1] mb-6 font-display">
            사용자 조사로 문제를 정의하고,<br />
            기능으로 검증하는 주니어 서비스기획자
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed font-normal mb-8 max-w-2xl">
            가설 수립부터 사용자 심층조사, 핵심 MVP 우선순위화 설계, 실질적인 데이터 개선 성과 도출까지. 
            사용자가 마주한 진짜 문제를 파악하고 정량적 가치로 비즈니스를 검증하는 기획 여정을 소개합니다.
          </p>

          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleCopyEmail}
              className="px-6 py-3.5 bg-[#0e0e0e] text-white hover:bg-slate-800 rounded-full text-xs font-bold shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              {copiedEmail ? '이메일 주소가 복사되었습니다!' : 'dalmi.seo.example@gmail.com (복사)'}
            </button>
            <div className="flex items-center gap-2.5 px-4 py-3 bg-white border border-slate-200/80 rounded-full text-xs font-bold text-slate-600">
              <span className="text-slate-400">신입 희망 분야 :</span> PM / 서비스 기획
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN INTERACTIVE CONTENT DASHBOARD (Bento Grid Style)
          ========================================================================= */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* LEFT COMPACT COLUMNS: Samantha style Black Card & Background (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Card 1: Sleek Charcoal/Black Overview Card (Samantha Testimonial Card inspired) */}
          <section className="bg-[#0e0e0e] text-white p-7 rounded-[2rem] border border-slate-800 shadow-lg flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            {/* Soft background radial gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Core Motto
                </span>
                <span className="font-serif text-5xl text-slate-700 leading-none select-none opacity-50 font-semibold group-hover:text-emerald-500 transition-colors">“</span>
              </div>
              
              <blockquote className="text-sm md:text-base font-bold leading-relaxed text-slate-100 font-display">
                &ldquo;기획자란 단순히 와이어프레임을 그리는 사람이 아닌, 사용자의 진짜 불편함을 집요하게 추적하여 비즈니스 가치로 치환해내는 사람입니다.&rdquo;
              </blockquote>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-300 shadow-sm shrink-0">
                SD
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100">서달미 (Seo Dalmi)</h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">사용자 기획적 사고방식 지향</p>
              </div>
            </div>
          </section>

          {/* Card 2: Background & Timeline (Plus Awards) */}
          <section className="bg-white p-7 rounded-[2rem] border border-slate-200/80 shadow-3xs flex-1 flex flex-col justify-between hover:shadow-2xs hover:border-slate-300/80 transition-all duration-300">
            <div className="space-y-6">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-500" />
                Background & Career
              </h2>

              {/* Combined Experience / Education stack */}
              <div className="space-y-5">
                {/* Career 1 */}
                <div className="relative pl-5 border-l-2 border-slate-100">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#0e0e0e]" />
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">2023.04 ~ 2023.12</span>
                  <h4 className="text-xs font-bold text-slate-900 mt-2">㈜커리어루트</h4>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">스타트업 운영지원 인턴</p>
                  <p className="text-[10px] text-slate-400 mt-1">콘텐츠 반응 분석 및 유입 정보 구조 개편 지원</p>
                </div>

                {/* Career 2 */}
                <div className="relative pl-5 border-l-2 border-slate-100">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300" />
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">2021.04 ~ 2022.03</span>
                  <h4 className="text-xs font-bold text-slate-900 mt-2">고객센터 상담 계약직</h4>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">고객지원센터</p>
                  <p className="text-[10px] text-slate-400 mt-1">인바운드 VOC 데이터 수집 및 분류를 통한 서비스 불편 확인</p>
                </div>

                {/* Education */}
                <div className="relative pl-5 border-l-2 border-slate-100">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300" />
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">2018.03 ~ 2023.02</span>
                  <h4 className="text-xs font-bold text-slate-900 mt-2">한국대학교 경영학과</h4>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">학점 3.6 / 4.5 졸업</p>
                  <p className="text-[10px] text-slate-400 mt-1">소비자 의사결정 방식 및 비즈니스 모델 마케팅 지식 함양</p>
                </div>
              </div>
            </div>

            {/* Awards banner embedded inside Background container */}
            <div className="mt-6 pt-5 border-t border-slate-100 bg-[#FAF9F5] p-4 rounded-2xl border border-slate-200/50">
              <p className="text-[9px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" /> Award Achievement
              </p>
              <h4 className="text-xs font-bold text-slate-800 leading-snug">
                2024 청년 스타트업 아이디어 경진대회
              </h4>
              <p className="text-[11px] text-amber-700 font-bold mt-1">
                장려상 수상 (최종 3위 / 12개 참가팀)
              </p>
            </div>
          </section>

        </div>

        {/* RIGHT DASHBOARD SECTION: Interactive Projects and High-Density Competencies (lg:col-span-8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Section 1: Core Projects Showcase with "Featured Works" structure */}
          <section className="bg-white p-7 rounded-[2rem] border border-slate-200/80 shadow-3xs flex-1 flex flex-col justify-between hover:shadow-2xs transition-all duration-300">
            
            <div className="flex flex-col h-full justify-between">
              
              {/* Header section with clean "Featured works" indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0e0e0e]" />
                  <h2 className="text-base font-bold text-slate-900 font-display">Featured Works</h2>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Thinking & Validation Details
                </span>
              </div>

              {/* Sub grid block for selectors and active content panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0 mt-4 overflow-y-auto lg:overflow-hidden">
                
                {/* Selectors Stack (Column 5) */}
                <div className="lg:col-span-5 flex flex-col gap-2.5 overflow-y-auto pr-1 max-h-[300px] lg:max-h-none">
                  {projects.map((project) => {
                    const isActive = project.id === activeProjectId;
                    return (
                      <button
                        key={project.id}
                        onClick={() => setActiveProjectId(project.id)}
                        className={`text-left p-4 rounded-2xl border transition-all duration-200 relative group cursor-pointer ${
                          isActive
                            ? 'bg-[#FAF9F5] border-slate-400/80 shadow-3xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                        style={{ contentVisibility: 'auto' }}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-l-2xl" />
                        )}

                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h3 className={`text-xs font-extrabold leading-snug group-hover:text-emerald-600 transition-colors ${
                            isActive ? 'text-slate-900' : 'text-slate-700'
                          }`}>
                            {project.title}
                          </h3>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                            isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {project.role}
                          </span>
                        </div>

                        {/* Dense Flow description lines */}
                        <div className="space-y-1 text-[10px] leading-normal">
                          <div className="flex gap-1.5">
                            <span className="text-red-500 font-bold shrink-0">Problem</span>
                            <p className="text-slate-500 line-clamp-1">{project.problemSummary}</p>
                          </div>
                          <div className="flex gap-1.5">
                            <span className="text-[#0e0e0e] font-bold shrink-0">Process</span>
                            <p className="text-slate-500 line-clamp-1">{project.processSummary}</p>
                          </div>
                          <div className="flex gap-1.5 items-center">
                            <span className="text-emerald-600 font-bold shrink-0">Result</span>
                            <p className="text-slate-800 font-bold line-clamp-1">{project.resultSummary}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Project Flow details Canvas (Column 7) */}
                <div className="lg:col-span-7 bg-[#FAF9F5] border border-slate-200/50 rounded-2xl p-5 flex flex-col justify-between overflow-y-auto max-h-[400px] lg:max-h-none">
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-200/40 pb-2 shrink-0">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
                        PM 기획 검증 프로세스
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">{activeProject.period}</span>
                    </div>

                    <h3 className="text-xs font-bold text-slate-900">
                      {activeProject.title} 의 사고 전개 흐름
                    </h3>

                    {/* Timeline Flow of Selected Project */}
                    <div className="space-y-3.5">
                      {/* Step 1 */}
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-5 h-5 rounded-full bg-red-100 text-red-700 border border-red-200 flex items-center justify-center font-display font-bold text-[9px] shrink-0">
                            01
                          </div>
                          <div className="w-0.5 flex-1 bg-slate-200 my-1" />
                        </div>
                        <div>
                          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">문제 정의 (Problem Definition)</h5>
                          <p className="text-[11px] text-slate-700 leading-relaxed font-semibold mt-0.5">{activeProject.problemDetail}</p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center font-display font-bold text-[9px] shrink-0">
                            02
                          </div>
                          <div className="w-0.5 flex-1 bg-slate-200 my-1" />
                        </div>
                        <div>
                          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">사용자 조사 (User Research)</h5>
                          <p className="text-[11px] text-slate-700 leading-relaxed font-semibold mt-0.5">{activeProject.researchDetail}</p>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 flex items-center justify-center font-display font-bold text-[9px] shrink-0">
                            03
                          </div>
                          <div className="w-0.5 flex-1 bg-slate-200 my-1" />
                        </div>
                        <div>
                          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">기능 우선순위화 (Feature Prioritization)</h5>
                          <p className="text-[11px] text-slate-700 leading-relaxed font-semibold mt-0.5">{activeProject.prioritizationDetail}</p>
                        </div>
                      </div>

                      {/* Step 4 */}
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center font-display font-bold text-[9px] shrink-0">
                            04
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">결과 검증 (Result Validation)</h5>
                          <p className="text-[11px] text-slate-700 leading-relaxed font-semibold mt-0.5 mb-1">{activeProject.validationDetail}</p>

                          {/* Render Recharts chart strictly for Project 2 */}
                          {activeProject.id === 2 && (
                            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-3xs mt-3.5 shrink-0">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-bold text-slate-700 flex items-center gap-1">
                                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                                  인턴십 정보 콘텐츠 운영 성과
                                </span>
                                
                                {/* Metric buttons styled as minimal pills */}
                                <div className="flex gap-1">
                                  {(['views', 'saves', 'shares'] as const).map((m) => (
                                    <button
                                      key={m}
                                      onClick={() => setActiveMetric(m)}
                                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold transition-all ${
                                        activeMetric === m
                                          ? 'bg-[#0e0e0e] text-white'
                                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                      }`}
                                    >
                                      {m === 'views' ? '조회수' : m === 'saves' ? '저장수' : '공유수'}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Recharts vertical bar visualization */}
                              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                                <div className="sm:col-span-8 h-14">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                      data={activeChartData}
                                      layout="vertical"
                                      margin={{ top: 0, right: 10, left: -30, bottom: 0 }}
                                    >
                                      <XAxis type="number" hide />
                                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 8, fontWeight: 700, fill: '#64748b' }} />
                                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={8}>
                                        {activeChartData.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                      </Bar>
                                    </BarChart>
                                  </ResponsiveContainer>
                                </div>

                                <div className="sm:col-span-4 flex flex-col justify-center items-center sm:items-end border-t sm:border-t-0 sm:border-l border-slate-100 pt-1.5 sm:pt-0 sm:pl-2.5 shrink-0">
                                  <span className="text-[8px] text-slate-400 font-bold uppercase">{metricData[activeMetric].label}</span>
                                  <div className="flex items-baseline gap-0.5 mt-0.5">
                                    <span className="text-xs font-bold text-emerald-600">
                                      {metricData[activeMetric].after}
                                    </span>
                                    <span className="text-[8px] text-slate-400 font-medium">
                                      {metricData[activeMetric].unit}
                                    </span>
                                  </div>
                                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full mt-1.5 shrink-0">
                                    {metricData[activeMetric].growth} 개선
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Extra validation indicators for other projects */}
                          {activeProject.id === 1 && (
                            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[9px] font-bold px-2.5 py-1 rounded-full border border-emerald-100 mt-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 최종 검증 완료: 12개 경진대회 참가팀 중 3위 장려상 수상
                            </div>
                          )}
                          {activeProject.id === 3 && (
                            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[9px] font-bold px-2.5 py-1 rounded-full border border-emerald-100 mt-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 학점 검증 완료: 소상공인 실무 요구사항에 부합하여 최종 평가 A학점 취득
                            </div>
                          )}

                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* Section 2: Core Competencies and software tools */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Core Skills & Capability (col-span-7) */}
            <section className="md:col-span-7 bg-white p-7 rounded-[2rem] border border-slate-200/80 shadow-3xs hover:shadow-2xs transition-all duration-300">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                <span className="w-1.5 h-3.5 bg-slate-900 rounded-full mr-2"></span>
                Skills & Core Competencies
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">서비스 기획</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["요구사항 정리", "화면 구성안 작성", "이용 흐름 설계"].map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-700 text-[11px] font-bold rounded-lg hover:bg-slate-100/50 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">리서치</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["설문 설계", "사용자 인터뷰", "경쟁 서비스 조사"].map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-700 text-[11px] font-bold rounded-lg hover:bg-slate-100/50 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">협업 / PM</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["회의록 작성", "일정 관리", "개발자·디자이너 협업"].map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-700 text-[11px] font-bold rounded-lg hover:bg-slate-100/50 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Software & Tools (col-span-5) */}
            <section className="md:col-span-5 bg-white p-7 rounded-[2rem] border border-slate-200/80 shadow-3xs hover:shadow-2xs transition-all duration-300 flex flex-col justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4.5 flex items-center">
                  <span className="w-1.5 h-3.5 bg-slate-900 rounded-full mr-2"></span>
                  Software & Tools
                </h2>

                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Figma", color: "bg-red-400" },
                    { name: "Notion", color: "bg-slate-800" },
                    { name: "Google Workspace", color: "bg-sky-400", colSpan: true },
                    { name: "PowerPoint", color: "bg-amber-500" },
                    { name: "Excel", color: "bg-green-500" },
                    { name: "Slack", color: "bg-purple-400" },
                    { name: "Trello", color: "bg-indigo-500" },
                    { name: "ChatGPT, Gemini", color: "bg-emerald-500", colSpan: true }
                  ].map((tool, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center space-x-1.5 px-3 py-1.5 border border-slate-100 bg-slate-50 rounded-xl hover:bg-slate-100/50 transition-all ${
                        tool.colSpan ? 'w-full sm:w-auto' : ''
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 ${tool.color} rounded-xs shrink-0`} />
                      <span className="text-[11px] font-bold text-slate-700">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>

        </div>
      </main>

      {/* =========================================================================
          FOOTER: Premium dark footer echoing the design layout
          ========================================================================= */}
      <footer className="w-full bg-[#0e0e0e] text-slate-500 text-[10px] py-6 px-6 border-t border-slate-950 mt-12 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="flex items-center gap-1.5 text-slate-400 font-medium">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
            <span>본 포트폴리오는 서비스기획자 서달미의 주체적인 분석 기획 역량을 소개하는 정적 페이지입니다. (연락처는 예시값으로 대체 기입되었습니다)</span>
          </p>
          <p className="font-bold text-slate-500">
            © 2026 Seo Dalmi Portfolio. High-Density Aesthetic Design.
          </p>
        </div>
      </footer>
    </div>
  );
}
