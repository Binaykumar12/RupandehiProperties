import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { VERIFIED_AGENTS } from '../services/agentService';
import { X, ShieldCheck, Phone, MessageCircle, MapPin, Award, Star, Briefcase } from 'lucide-react';

export default function AgentDirectoryModal({ onClose }) {
  const { isDark, language } = useTheme();
  const [selectedArea, setSelectedArea] = useState('all');

  const areas = ['all', 'Butwal', 'Tilottama', 'Bhairahawa', 'Devdaha', 'Sainamaina'];

  const filteredAgents = VERIFIED_AGENTS.filter((agent) => {
    if (selectedArea === 'all') return true;
    return agent.serviceAreas.some((area) => area.toLowerCase().includes(selectedArea.toLowerCase()));
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content max-w-3xl animate-scale-in max-h-[90vh] overflow-y-auto ${
          isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E7D32]/15 flex items-center justify-center text-[#2E7D32]">
              <Award size={22} />
            </div>
            <div>
              <span className="section-kicker">
                {language === 'en' ? 'VERIFIED REAL ESTATE BROKERS' : 'प्रमाणित घरजग्गा दलाल तथा सल्लाहकार'}
              </span>
              <h2
                className={`text-xl font-serif font-bold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {language === 'en' ? 'Rupandehi Agent Directory' : 'रुपन्देही एजेन्ट डाइरेक्टरी'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg border transition-colors ${
              isDark ? 'border-[#23382A] text-[#A7B5A8] hover:text-[#F3F6F3]' : 'border-[#E3DEC3] text-[#5C6B5E] hover:text-[#152419]'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Locality Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                selectedArea === area
                  ? 'bg-[#2E7D32] text-white border-[#2E7D32] font-semibold'
                  : isDark
                  ? 'border-[#23382A] text-[#A7B5A8] hover:border-[#2D4837]'
                  : 'border-[#E3DEC3] text-[#5C6B5E] hover:border-[#D8D1BE]'
              }`}
            >
              {area === 'all' ? (language === 'en' ? 'All Municipalities' : 'सबै पालिकाहरू') : area}
            </button>
          ))}
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all hover:shadow-md ${
                isDark ? 'bg-[#0B130E] border-[#23382A]' : 'bg-[#FAF8F2] border-[#E3DEC3]'
              }`}
            >
              <div>
                {/* Agent Header */}
                <div className="flex items-start gap-3.5 mb-3">
                  <div
                    style={{ backgroundColor: agent.avatarBg }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0"
                  >
                    {agent.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className={`font-semibold text-sm ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
                        {agent.name}
                      </h3>
                      {agent.isVerified && (
                        <ShieldCheck size={16} className="text-[#2E7D32]" title="Verified Agent" />
                      )}
                    </div>
                    <p className="text-xs font-medium text-[#2E7D32]">{agent.agency}</p>
                    <p className={`text-[11px] ${isDark ? 'text-[#7A8A7C]' : 'text-[#7A8A7C]'}`}>
                      {agent.role} · {agent.experienceYears} yrs exp.
                    </p>
                  </div>
                </div>

                {/* Badges / Metrics */}
                <div className="flex flex-wrap gap-2 my-3 text-[11px]">
                  <span className={`px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                    isDark ? 'bg-[#132018] border-[#23382A] text-[#A7B5A8]' : 'bg-white border-[#E3DEC3] text-[#5C6B5E]'
                  }`}>
                    <Star size={11} className="text-amber-500 fill-amber-500" />
                    <strong>{agent.rating}</strong> ({agent.reviewsCount})
                  </span>
                  <span className={`px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                    isDark ? 'bg-[#132018] border-[#23382A] text-[#A7B5A8]' : 'bg-white border-[#E3DEC3] text-[#5C6B5E]'
                  }`}>
                    <Briefcase size={11} className="text-[#2E7D32]" />
                    {agent.activeListingsCount} Active Listings
                  </span>
                </div>

                {/* Specialization & Address */}
                <p className={`text-xs mb-2 line-clamp-2 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                  {agent.specialization}
                </p>

                <div className={`flex items-center gap-1 text-[11px] mb-4 ${isDark ? 'text-[#7A8A7C]' : 'text-[#7A8A7C]'}`}>
                  <MapPin size={12} className="shrink-0" />
                  <span className="truncate">{agent.officeAddress}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3 border-t border-black/10 dark:border-white/10">
                <a
                  href={`tel:+${agent.phone.startsWith('977') ? agent.phone : '977' + agent.phone}`}
                  className="flex-1 btn-outline text-xs py-2 justify-center flex items-center gap-1.5"
                >
                  <Phone size={13} />
                  <span>Call {agent.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(
                    `Namaste ${agent.name}, I found your profile on Rupandehi Property Hub and would like to consult about properties in Rupandehi.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#25D366] text-white hover:bg-[#20ba59] rounded-xl text-xs py-2 font-medium justify-center flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle size={13} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Agency Registration Note */}
        <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
          isDark ? 'bg-[#0B130E]/60 border-[#23382A] text-[#829685]' : 'bg-[#F4F0E6]/60 border-[#E3DEC3] text-[#5C6B5E]'
        }`}>
          <span className="font-semibold text-[#2E7D32]">Department of Industries Compliance:</span> All listed agents maintain verified business registrations and comply with standard Rupandehi mediation guidelines (0% seller listing fee / 1% buyer conveyance fee).
        </div>
      </div>
    </div>
  );
}
