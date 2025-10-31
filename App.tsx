
import React from 'react';
import { GoogleGenAI } from '@google/genai';
import Header from './components/Header';
import AttackCard from './components/AttackCard';
import AttackDetailModal from './components/AttackDetailModal';
import { ATTACK_DATA } from './constants';
import type { Attack } from './types';
import SkeletonCard from './components/SkeletonCard';
import { SparklesIcon } from './components/icons/SparklesIcon';
import MitigationAdvisor from './components/MitigationAdvisor';
import ShareModal from './components/ShareModal';
import OnboardingModal from './components/OnboardingModal';

const getRouteFromHash = (hash: string): string => {
  if (hash === '#advisor') {
    return 'advisor';
  }
  return 'home';
};

const App: React.FC = () => {
  const [selectedAttack, setSelectedAttack] = React.useState<Attack | null>(null);
  const [sharingAttack, setSharingAttack] = React.useState<Attack | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [briefing, setBriefing] = React.useState<string>('');
  const [isBriefingLoading, setIsBriefingLoading] = React.useState<boolean>(false);
  const [briefingError, setBriefingError] = React.useState<string>('');
  const [route, setRoute] = React.useState(getRouteFromHash(window.location.hash));
  const [showOnboarding, setShowOnboarding] = React.useState<boolean>(false);

  React.useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (hasSeenOnboarding !== 'true') {
      setShowOnboarding(true);
    }
  }, []);

  React.useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash(window.location.hash));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Check for hash on initial load for deep linking, only on home page
      const hash = window.location.hash.substring(1);
      if (getRouteFromHash(window.location.hash) === 'home' && hash) {
        const attackFromHash = ATTACK_DATA.find(a => a.id === hash);
        if (attackFromHash) {
          setSelectedAttack(attackFromHash);
        }
      }
    }, 1500); // Simulate a 1.5s network request

    return () => clearTimeout(timer);
  }, []);


  const handleSelectAttack = (attack: Attack) => {
    setSelectedAttack(attack);
    window.location.hash = attack.id;
  };

  const handleCloseModal = () => {
    setSelectedAttack(null);
    // Use history.pushState to clean the URL without reloading the page
    history.pushState("", document.title, window.location.pathname + window.location.search);
  };
  
  const handleShareClick = (attack: Attack) => {
    setSharingAttack(attack);
  };
  
  const handleCloseShareModal = () => {
    setSharingAttack(null);
  };
  
  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
  };

  const handleGenerateBriefing = async () => {
    setIsBriefingLoading(true);
    setBriefing('');
    setBriefingError('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `ในฐานะผู้เชี่ยวชาญด้านความปลอดภัยทางไซเบอร์ ให้สร้างสรุปข่าวกรองภัยคุกคามทางไซเบอร์ล่าสุด (สมมติขึ้นแต่มีความสมจริง) เป็นภาษาไทย สรุปควรสั้น กระชับ ให้ข้อมูล และมีรูปแบบเหมือนการอัปเดตข่าว ระบุประเภทของภัยคุกคาม, กลุ่มเป้าหมาย, และคำแนะนำทั่วไปในระดับสูง ใช้โทนเสียงที่เป็นมืออาชีพและเน้นการเตือนภัย`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setBriefing(response.text);

    } catch (error) {
      console.error('Error generating briefing:', error);
      setBriefingError('ขออภัย, ไม่สามารถสร้างสรุปได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsBriefingLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-cyan-300 selection:text-cyan-900">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {route === 'advisor' ? (
          <MitigationAdvisor attacks={ATTACK_DATA} />
        ) : (
          <>
            <section id="threats">
              <div className="text-center mb-10 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">รูปแบบการโจมตีทางไซเบอร์ที่พบบ่อย</h2>
                <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
                  สำรวจภัยคุกคามทางไซเบอร์ที่สำคัญและเรียนรู้วิธีป้องกันสินทรัพย์ดิจิทัลของคุณ
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <SkeletonCard key={index} />
                    ))
                  : ATTACK_DATA.map((attack) => (
                      <AttackCard 
                        key={attack.id} 
                        attack={attack} 
                        onSelect={handleSelectAttack} 
                        onShare={handleShareClick}
                      />
                    ))}
              </div>
            </section>
            
            <section id="threat-briefing" className="mt-16 md:mt-24">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">สรุปภัยคุกคามทางไซเบอร์ล่าสุด</h2>
                <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
                  รับข้อมูลอัปเดตเกี่ยวกับภัยคุกคามที่เกิดขึ้นใหม่ซึ่งสร้างโดย AI
                </p>
              </div>
              <div className="max-w-3xl mx-auto text-center">
                 <button 
                  onClick={handleGenerateBriefing}
                  disabled={isBriefingLoading}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-400/20"
                >
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  {isBriefingLoading ? 'กำลังสร้าง...' : 'สร้างสรุป'}
                </button>
              </div>
              
              <div className="mt-8 max-w-3xl mx-auto bg-slate-800/50 rounded-lg p-6 border border-slate-700 min-h-[150px] flex items-center justify-center">
                {isBriefingLoading && (
                  <div className="space-y-3 animate-pulse w-full">
                    <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-700 rounded"></div>
                    <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                  </div>
                )}
                {briefingError && (
                  <p className="text-red-400">{briefingError}</p>
                )}
                {briefing && (
                  <p className="text-slate-300 whitespace-pre-wrap w-full text-left">{briefing}</p>
                )}
                {!isBriefingLoading && !briefingError && !briefing && (
                    <p className="text-slate-500">คลิกปุ่มด้านบนเพื่อสร้างสรุปข่าวกรองภัยคุกคามล่าสุด</p>
                )}
              </div>
            </section>

            <footer className="text-center mt-16 text-slate-500">
                <p>การป้องกันภัยคุกคามทางไซเบอร์เป็นสิ่งสำคัญสำหรับทุกคนและทุกองค์กร</p>
                <p>ควรมีการฝึกอบรม, ควบคุมการเข้าถึงข้อมูล, และใช้เทคโนโลยีป้องกันที่เหมาะสม</p>
            </footer>
          </>
        )}
      </main>

      <OnboardingModal isOpen={showOnboarding} onClose={handleCloseOnboarding} />
      <AttackDetailModal attack={selectedAttack} onClose={handleCloseModal} />
      <ShareModal attack={sharingAttack} onClose={handleCloseShareModal} />
    </div>
  );
};

export default App;
