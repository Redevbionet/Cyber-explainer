
import React, { useEffect, useRef, useState } from 'react';
import type { Attack } from '../types';
import { XIcon } from './icons/XIcon';
import { LinkIcon } from './icons/LinkIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';

interface ShareModalProps {
  attack: Attack | null;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ attack, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState('คัดลอก');

  useEffect(() => {
    if (attack) {
      const timer = setTimeout(() => setIsAnimatingIn(true), 10);
      modalRef.current?.focus();
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('keydown', handleKeyDown);
        setIsAnimatingIn(false);
        setCopyButtonText('คัดลอก'); // Reset button text on close
      };
    }
  }, [attack, onClose]);

  if (!attack) return null;
  
  const shareUrl = `${window.location.origin}${window.location.pathname}#${attack.id}`;
  const shareText = `เรียนรู้เกี่ยวกับ ${attack.title} และวิธีป้องกันตัวเอง:`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopyButtonText('คัดลอกแล้ว!');
      setTimeout(() => setCopyButtonText('คัดลอก'), 2000);
    });
  };

  return (
    <div
      className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out ${isAnimatingIn ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md max-h-[90vh] overflow-y-auto outline-none transform transition-all duration-300 ease-in-out ${isAnimatingIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-4">
            <h2 id="share-modal-title" className="text-xl sm:text-2xl font-bold text-cyan-400">แบ่งปัน: {attack.title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors flex-shrink-0 ml-4"
              aria-label="Close"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
                <label htmlFor="share-link" className="text-sm font-medium text-slate-300 mb-2 block">ลิงก์สำหรับแบ่งปัน</label>
                <div className="flex gap-2">
                    <input
                        id="share-link"
                        type="text"
                        readOnly
                        value={shareUrl}
                        className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 text-slate-300 text-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                    />
                    <button
                        onClick={handleCopyLink}
                        className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-slate-900 bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-600 transition-colors"
                    >
                        <LinkIcon className="w-4 h-4 mr-2" />
                        {copyButtonText}
                    </button>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <hr className="flex-grow border-slate-700" />
                <span className="text-slate-400 text-sm">หรือ</span>
                <hr className="flex-grow border-slate-700" />
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                    <TwitterIcon className="w-6 h-6 text-[#1DA1F2]" />
                    <span className="mt-2 text-sm text-slate-300">Twitter</span>
                </a>
                 <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                    <FacebookIcon className="w-6 h-6 text-[#1877F2]" />
                    <span className="mt-2 text-sm text-slate-300">Facebook</span>
                </a>
                 <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(attack.title)}&summary=${encodeURIComponent(attack.description)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                    <LinkedInIcon className="w-6 h-6 text-[#0A66C2]" />
                    <span className="mt-2 text-sm text-slate-300">LinkedIn</span>
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
