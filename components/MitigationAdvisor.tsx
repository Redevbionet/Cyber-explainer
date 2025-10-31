
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import type { Attack } from '../types';
import { ToolboxIcon } from './icons/ToolboxIcon';

interface MitigationAdvisorProps {
  attacks: Attack[];
}

const MitigationAdvisor: React.FC<MitigationAdvisorProps> = ({ attacks }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(attacks[0]?.title || '');
  const [advice, setAdvice] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGetAdvice = async () => {
    if (!selectedTopic) return;
    setIsLoading(true);
    setAdvice('');
    setError('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `ในฐานะผู้เชี่ยวชาญด้านความปลอดภัยทางไซเบอร์ ให้คำแนะนำที่เป็นขั้นตอนและนำไปปฏิบัติได้จริงเพื่อป้องกันและบรรเทาการโจมตีประเภท "${selectedTopic}" โปรดอธิบายให้เข้าใจง่ายสำหรับผู้ใช้ทั่วไปที่ไม่ใช่ผู้เชี่ยวชาญด้านเทคนิค จัดรูปแบบคำตอบให้ชัดเจนและอ่านง่าย`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setAdvice(response.text);
    } catch (err) {
      console.error('Error getting mitigation advice:', err);
      setError('เกิดข้อผิดพลาดในการสร้างคำแนะนำ โปรดลองอีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <a href="#/" className="inline-flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-200 group">
          <span className="transform transition-transform duration-200 group-hover:-translate-x-1 mr-2">&larr;</span>กลับหน้าหลัก
        </a>
      </div>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 flex items-center justify-center">
            <ToolboxIcon className="w-8 h-8 mr-3" />
            ที่ปรึกษาด้านการป้องกัน (AI)
        </h2>
        <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
          เลือกประเภทภัยคุกคามเพื่อรับคำแนะนำวิธีป้องกันและแก้ไขปัญหาจาก AI
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full sm:w-auto flex-grow bg-slate-800 border border-slate-600 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
            aria-label="เลือกประเภทภัยคุกคาม"
          >
            {attacks.map((attack) => (
              <option key={attack.id} value={attack.title}>{attack.title}</option>
            ))}
          </select>
          <button
            onClick={handleGetAdvice}
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-400/20 flex-shrink-0"
          >
            {isLoading ? 'กำลังวิเคราะห์...' : 'รับคำแนะนำ'}
          </button>
        </div>
      </div>
      <div className="mt-8 max-w-3xl mx-auto bg-slate-800/50 rounded-lg p-6 border border-slate-700 min-h-[200px] flex items-center justify-center">
        {isLoading && (
          <div className="space-y-3 animate-pulse w-full">
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-700 rounded w-full"></div>
            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
          </div>
        )}
        {error && <p className="text-red-400">{error}</p>}
        {advice && <p className="text-slate-300 whitespace-pre-wrap w-full text-left">{advice}</p>}
        {!isLoading && !error && !advice && (
          <p className="text-slate-500 text-center">คำแนะนำในการป้องกันจะปรากฏที่นี่</p>
        )}
      </div>
    </div>
  );
};

export default MitigationAdvisor;