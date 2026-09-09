import React, { useState } from 'react';
import { Shield, X, Check, ExternalLink, Sparkles } from 'lucide-react';
import { CLOAK_PRESETS, applyTabCloak } from '../utils/storage';
import { CloakPreset } from '../types';

interface TabCloakModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCloakId: string;
  onSelectCloak: (preset: CloakPreset, customTitle?: string, customIcon?: string) => void;
}

export const TabCloakModal: React.FC<TabCloakModalProps> = ({
  isOpen,
  onClose,
  activeCloakId,
  onSelectCloak,
}) => {
  const [customTitle, setCustomTitle] = useState('');
  const [customIcon, setCustomIcon] = useState('');

  if (!isOpen) return null;

  const handleApplyPreset = (preset: CloakPreset) => {
    onSelectCloak(preset);
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;
    const customPreset: CloakPreset = {
      id: 'custom',
      name: 'Custom Disguise',
      title: customTitle.trim(),
      faviconUrl: customIcon.trim() || 'https://www.google.com/favicon.ico',
      badge: '✨',
    };
    onSelectCloak(customPreset, customTitle.trim(), customIcon.trim());
  };

  const handleOpenAboutBlank = () => {
    try {
      const win = window.open('about:blank', '_blank');
      if (win) {
        win.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Google Classroom</title>
              <link rel="icon" href="https://ssl.gstatic.com/classroom/favicon.png">
              <style>
                body, html { margin:0; padding:0; height:100%; overflow:hidden; background:#0c0f17; }
                iframe { border:none; width:100%; height:100%; }
              </style>
            </head>
            <body>
              <iframe src="${window.location.href}"></iframe>
            </body>
          </html>
        `);
      }
    } catch {
      alert('Pop-ups were blocked by your browser. Please allow popups for about:blank cloaking.');
    }
  };

  return (
    <div
      id="tab-cloak-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      <div
        id="tab-cloak-modal-content"
        className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700/80 p-6 shadow-2xl text-slate-200 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          id="close-cloak-modal-btn"
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h2 id="cloak-modal-heading" className="text-lg font-bold text-white">
              Tab Cloaker & Stealth Disguise
            </h2>
            <p className="text-xs text-slate-400">
              Disguises the page title & browser tab favicon to look like school/work apps.
            </p>
          </div>
        </div>

        {/* Presets Grid */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Preset Disguises
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {CLOAK_PRESETS.map((preset) => {
              const isActive = activeCloakId === preset.id;
              return (
                <button
                  key={preset.id}
                  id={`cloak-preset-${preset.id}`}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={`flex items-center gap-2.5 rounded-xl p-2.5 text-left border transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-white shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-base">{preset.badge}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{preset.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{preset.title}</div>
                  </div>
                  {isActive && <Check className="h-4 w-4 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Cloak Form */}
        <form onSubmit={handleApplyCustom} className="mt-4 pt-4 border-t border-slate-800 space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Custom Tab Cloak
          </label>
          <div className="space-y-2">
            <input
              id="custom-cloak-title-input"
              type="text"
              placeholder="e.g. AP Chemistry Notes - Chapter 5"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
            <input
              id="custom-cloak-icon-input"
              type="url"
              placeholder="Favicon URL (optional, defaults to Google)"
              value={customIcon}
              onChange={(e) => setCustomIcon(e.target.value)}
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              id="about-blank-launcher-btn"
              type="button"
              onClick={handleOpenAboutBlank}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
              title="Launch app inside an about:blank iframe for stealth"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>About:Blank Cloak</span>
            </button>

            <button
              id="apply-custom-cloak-btn"
              type="submit"
              disabled={!customTitle.trim()}
              className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 px-3.5 py-1.5 text-xs font-bold transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Apply Custom</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
