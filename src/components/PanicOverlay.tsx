import React, { useEffect } from 'react';
import { FileText, Undo, Redo, Printer, Check, ShieldAlert, ArrowLeft } from 'lucide-react';

interface PanicOverlayProps {
  isOpen: boolean;
  onExitPanic: () => void;
}

export const PanicOverlay: React.FC<PanicOverlayProps> = ({ isOpen, onExitPanic }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onExitPanic();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onExitPanic]);

  if (!isOpen) return null;

  return (
    <div
      id="panic-screen-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-100 text-slate-900 font-sans"
    >
      {/* Fake Google Docs Top Navigation */}
      <header
        id="fake-docs-header"
        className="sticky top-0 z-10 border-b border-slate-300 bg-white px-4 py-2 flex items-center justify-between shadow-xs"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-800">
                AP Biology - Cellular Respiration & ATP Cycle Notes
              </span>
              <span className="text-xs text-slate-500 font-normal">Saved to Drive</span>
            </div>
            {/* Menu Items */}
            <div className="hidden sm:flex items-center gap-3 text-xs text-slate-600 mt-0.5">
              <span className="hover:text-slate-900 cursor-pointer">File</span>
              <span className="hover:text-slate-900 cursor-pointer">Edit</span>
              <span className="hover:text-slate-900 cursor-pointer">View</span>
              <span className="hover:text-slate-900 cursor-pointer">Insert</span>
              <span className="hover:text-slate-900 cursor-pointer">Format</span>
              <span className="hover:text-slate-900 cursor-pointer">Tools</span>
              <span className="hover:text-slate-900 cursor-pointer">Help</span>
            </div>
          </div>
        </div>

        {/* Action button to return to movie site */}
        <div className="flex items-center gap-2">
          <button
            id="panic-return-btn"
            type="button"
            onClick={onExitPanic}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 shadow-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Cinema</span>
            <kbd className="ml-1 rounded bg-blue-800 px-1 py-0.5 text-[10px] font-mono">Esc</kbd>
          </button>
        </div>
      </header>

      {/* Fake Docs Toolbar */}
      <div
        id="fake-docs-toolbar"
        className="hidden md:flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-6 py-1.5 text-xs text-slate-600"
      >
        <Undo className="h-3.5 w-3.5 cursor-pointer hover:text-slate-900" />
        <Redo className="h-3.5 w-3.5 cursor-pointer hover:text-slate-900" />
        <Printer className="h-3.5 w-3.5 cursor-pointer hover:text-slate-900" />
        <span className="text-slate-300">|</span>
        <span className="rounded bg-white px-2 py-0.5 border border-slate-300 text-slate-800">
          100%
        </span>
        <span className="rounded bg-white px-2 py-0.5 border border-slate-300 text-slate-800 font-serif">
          Times New Roman
        </span>
        <span className="rounded bg-white px-2 py-0.5 border border-slate-300 text-slate-800">
          12
        </span>
        <span className="text-slate-300">|</span>
        <span className="font-bold cursor-pointer hover:text-slate-900">B</span>
        <span className="italic cursor-pointer hover:text-slate-900">I</span>
        <span className="underline cursor-pointer hover:text-slate-900">U</span>
      </div>

      {/* Realistic Document Paper */}
      <main className="mx-auto my-6 max-w-3xl rounded-sm bg-white p-8 sm:p-12 shadow-md border border-slate-200 text-slate-800 leading-relaxed min-h-[85vh]">
        <h1 className="text-2xl font-serif font-bold text-slate-950 mb-2 border-b pb-2 border-slate-200">
          Unit 3: Cellular Energetics & Metabolic Pathways
        </h1>
        <p className="text-xs text-slate-500 mb-6">
          Biology Honors • Instructor: Dr. Richardson • Period 4
        </p>

        <h2 className="text-lg font-serif font-semibold text-slate-900 mt-6 mb-2">
          1. Overview of Glycolysis
        </h2>
        <p className="text-sm text-slate-700 mb-4">
          Glycolysis is a universal catabolic pathway taking place in the cytoplasm that breaks
          down one glucose molecule (C₆H₁₂O₆) into two pyruvate molecules (C₃H₄O₃). This process
          occurs independently of oxygen (anaerobic) and produces a net yield of 2 ATP and 2 NADH.
        </p>

        <div className="my-4 rounded border border-slate-300 bg-slate-50 p-3 font-mono text-xs text-slate-800">
          Net Reaction: Glucose + 2 NAD⁺ + 2 ADP + 2 Pᵢ → 2 Pyruvate + 2 NADH + 2 H⁺ + 2 ATP
        </div>

        <h2 className="text-lg font-serif font-semibold text-slate-900 mt-6 mb-2">
          2. The Citric Acid (Krebs) Cycle
        </h2>
        <p className="text-sm text-slate-700 mb-4">
          In aerobic conditions, pyruvate enters the mitochondrial matrix via active transport.
          During the transition step, pyruvate decarboxylation produces Acetyl-CoA, which enters the
          Krebs cycle. Each turn of the cycle oxidizes acetyl groups to CO₂, reducing NAD⁺ to NADH
          and FAD to FADH₂.
        </p>

        <h2 className="text-lg font-serif font-semibold text-slate-900 mt-6 mb-2">
          3. Oxidative Phosphorylation & ATP Synthase
        </h2>
        <p className="text-sm text-slate-700 mb-4">
          The electron transport chain (ETC) utilizes the high-energy electrons from NADH and
          FADH₂ across complexes I-IV, creating an electrochemical proton gradient across the inner
          mitochondrial membrane. Chemiosmosis harnesses this proton-motive force through ATP
          synthase to phosphorylate ADP into approximately 26 to 28 ATP molecules.
        </p>

        <div className="mt-8 pt-6 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
          <span>Page 1 of 4</span>
          <span>Last edited 2 minutes ago</span>
        </div>
      </main>
    </div>
  );
};
