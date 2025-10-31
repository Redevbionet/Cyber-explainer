
import React, { useEffect, useRef, useState } from 'react';
import { XIcon } from './icons/XIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const onboardingSteps = [
  {
    title: 'ยินดีต้อนรับสู่ Cyber Explainer',
    content: 'เรามาทัวร์สั้นๆ เพื่อแนะนำฟีเจอร์หลักของแอปพลิเคชันกัน'
  },
  {
    title: 'สำรวจรูปแบบภัยคุกคาม',
    content: 'หน้าหลักจะแสดงการโจมตีทางไซเบอร์ที่พบบ่อย คุณสามารถคลิกที่การ์ดแต่ละใบเพื่อดูข้อมูลเชิงลึก, ภัยคุกคาม, และวิธีการป้องกัน'
  },
  {
    title: 'รับสรุปข่าวกรองล่าสุด',
    content: 'เลื่อนลงมาเพื่อค้นหาส่วน "สรุปภัยคุกคาม" คลิกปุ่มเพื่อสร้างรายงานสรุปเกี่ยวกับภัยคุกคามล่าสุดโดย AI'
  },
  {
    title: 'ที่ปรึกษาด้านการป้องกัน (AI)',
    content: 'ต้องการคำแนะนำเฉพาะทางใช่ไหม? ไปที่หน้า "ที่ปรึกษาด้านการป้องกัน" จากเมนูนำทางเพื่อรับคำแนะนำแบบละเอียดจาก AI'
  },
  {
    title: 'คุณพร้อมแล้ว!',
    content: 'ตอนนี้คุณก็พร้อมที่จะสำรวจและเรียนรู้เกี่ยวกับการป้องกันภัยคุกคามทางไซเบอร์แล้ว ขอให้ปลอดภัย!'
  },
];

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsAnimatingIn(true), 10);
      modalRef.current?.focus();
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') handleFinish();
        if (event.key === 'ArrowRight') handleNext();
        if (event.key === 'ArrowLeft') handlePrev();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('keydown', handleKeyDown);
        setIsAnimatingIn(false);
      };
    }
  }, [isOpen, currentStep]);

  const handleFinish = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    onClose();
  };

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  const step = onboardingSteps[currentStep];

  return (
    <div
      className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out ${isAnimatingIn ? 'opacity-100' : 'opacity-0'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md max-h-[90vh] overflow-y-auto outline-none transform transition-all duration-300 ease-in-out ${isAnimatingIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-4">
            <h2 id="onboarding-title" className="text-xl sm:text-2xl font-bold text-cyan-400">{step.title}</h2>
            <button
              onClick={handleFinish}
              className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors flex-shrink-0 ml-4"
              aria-label="Close"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <p className="text-slate-300 leading-relaxed min-h-[80px]">{step.content}</p>

            <div className="flex justify-between items-center">
              {/* Step Indicators */}
              <div className="flex items-center gap-2">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${index === currentStep ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-600'}`}
                  ></div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrev}
                    className="flex-shrink-0 inline-flex items-center justify-center p-2 border border-slate-600 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 transition-colors"
                    aria-label="Previous step"
                  >
                     <ArrowLeftIcon className="w-5 h-5" />
                  </button>
                )}

                <button
                  onClick={handleNext}
                  className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors"
                >
                  {currentStep === onboardingSteps.length - 1 ? 'เสร็จสิ้น' : 'ต่อไป'}
                  {currentStep < onboardingSteps.length - 1 && <ArrowRightIcon className="w-5 h-5 ml-2" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
