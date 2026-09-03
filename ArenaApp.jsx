import React, { useState } from "react";

export default function ArenaApp() {
  const [prompt, setPrompt] = useState("");
  const [modelA, setModelA] = useState("");
  const [modelB, setModelB] = useState("");
  const [verdict, setVerdict] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBattle = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setVerdict("");

    try {
      //const response = await fetch("http://localhost:8000/api/battle", {
      //  const response = await fetch("https://lgx3q6mh-8000.inc1.devtunnels.ms/", {
      //  
      //  method: "POST",
      //  headers: { "Content-Type": "application/json" },
      //  body: JSON.stringify({ prompt }),
      //});

      const response = await fetch("https://lgx3q6mh-8000.inc1.devtunnels.ms/api/battle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
      const data = await response.json();
      setModelA(data.model_a);
      setModelB(data.model_b);
    } catch (err) {
      console.error(err);
      setVerdict("⚠️ Error fetching responses. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = (label) => {
    setVerdict(`🗳️ Thanks! You voted: ${label}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 font-sans">
      <h1 className="text-2xl font-bold text-gray-800">
        🥊 LLM Arena — one prompt, two models
      </h1>

      {/* Input Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Ask both models the same thing
        </label>
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt here..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleBattle}
          disabled={loading}
          className="px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-medium rounded-lg transition"
        >
          {loading ? "⚔️ Battling..." : "⚔️ Battle!"}
        </button>
      </div>

      {/* Models Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Model A */}
        <div className="border border-gray-200 rounded-xl p-4 flex flex-col justify-between bg-white shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">
              🤖 Model A
            </h2>
            <div className="text-gray-700 whitespace-pre-wrap min-h-[120px] text-sm leading-relaxed">
              {modelA || <span className="text-gray-400 italic">Awaiting prompt...</span>}
            </div>
          </div>
          <div className="flex gap-2 pt-4 border-t mt-4">
            <button
              onClick={() => handleVote("👍 Model A")}
              className="flex-1 py-1.5 border rounded hover:bg-gray-50 text-base"
            >
              👍
            </button>
            <button
              onClick={() => handleVote("👎 Model A")}
              className="flex-1 py-1.5 border rounded hover:bg-gray-50 text-base"
            >
              👎
            </button>
          </div>
        </div>

        {/* Model B */}
        <div className="border border-gray-200 rounded-xl p-4 flex flex-col justify-between bg-white shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">
              🤖 Model B
            </h2>
            <div className="text-gray-700 whitespace-pre-wrap min-h-[120px] text-sm leading-relaxed">
              {modelB || <span className="text-gray-400 italic">Awaiting prompt...</span>}
            </div>
          </div>
          <div className="flex gap-2 pt-4 border-t mt-4">
            <button
              onClick={() => handleVote("👍 Model B")}
              className="flex-1 py-1.5 border rounded hover:bg-gray-50 text-base"
            >
              👍
            </button>
            <button
              onClick={() => handleVote("👎 Model B")}
              className="flex-1 py-1.5 border rounded hover:bg-gray-50 text-base"
            >
              👎
            </button>
          </div>
        </div>
      </div>

      {/* Verdict Output */}
      {verdict && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-medium text-center">
          {verdict}
        </div>
      )}
    </div>
  );
}