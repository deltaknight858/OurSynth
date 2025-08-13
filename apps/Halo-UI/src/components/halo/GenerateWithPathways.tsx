'use client';
import React, { useState } from 'react';

type Props = {
  product: {
    slug: string;
    title: string;
    version: string;
    isPremium: boolean;
  };
};

const GenerateWithPathways: React.FC<Props> = ({ product }) => {
  // Demo: always entitled
  const isEntitled = true;
  const [open, setOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  // Demo: stub handler
  const handleGenerate = async () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setOpen(false);
      alert('Wizard completed!');
    }, 1200);
  };

  return (
    <>
      <button
        className={`px-4 py-2 rounded font-semibold transition-colors ${isEntitled ? 'bg-cyan-600 text-white hover:bg-cyan-700' : 'bg-gray-400 text-gray-100 cursor-not-allowed'}`}
        onClick={() => {
          if (isEntitled) setOpen(true);
          else window.location.href = `/cart?product=${product.slug}`;
        }}
        disabled={!isEntitled}
      >
        {isEntitled ? 'Generate with Pathways' : 'Buy to Generate'}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col gap-4">
            <h3 className="text-lg font-bold mb-2">Generate {product.title}</h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm mb-2">
              This will create ~67 files in your monorepo in seconds. You can preview and apply via pull request.
            </p>
            <button
              className="px-4 py-2 rounded bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors disabled:opacity-60"
              onClick={handleGenerate}
              disabled={isRunning}
            >
              {isRunning ? 'Generating…' : 'Run Wizard'}
            </button>
            <button
              className="mt-2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 underline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GenerateWithPathways;
