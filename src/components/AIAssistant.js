import { useState } from "react";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ai-float-btn"
        aria-label="AI Assistant"
      >
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      </button>

      {/* AI Chat Panel - Placeholder */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 z-40 w-96 h-[500px] glass-card rounded-2xl shadow-2xl animate-float-up overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="font-bold text-lg">AI Assistant</h3>
                  <p className="text-xs text-purple-100">Coming Soon!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content - Placeholder */}
          <div className="p-6 h-full bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-xl font-bold gradient-text mb-2">
                AI Features Coming Soon!
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                We're building amazing AI-powered features:
              </p>
            </div>

            <div className="space-y-3 w-full">
              <div className="p-3 rounded-xl bg-white/80 border border-purple-200 text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🍳</span>
                  <span className="font-semibold text-sm text-gray-800">Fridge-to-Recipe Generator</span>
                </div>
              </div>
              
              <div className="p-3 rounded-xl bg-white/80 border border-pink-200 text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🔍</span>
                  <span className="font-semibold text-sm text-gray-800">Smart Restaurant Search</span>
                </div>
              </div>
              
              <div className="p-3 rounded-xl bg-white/80 border border-blue-200 text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🧠</span>
                  <span className="font-semibold text-sm text-gray-800">AI Restaurant Insights</span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs text-gray-500">
              UI is ready! AI features being implemented...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
