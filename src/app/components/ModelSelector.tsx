"use client";

import React from 'react';

interface ModelSelectorProps {
  model: 'openai' | 'anthropic';
  onModelChange: (model: 'openai' | 'anthropic') => void;
}

export default function ModelSelector({ model, onModelChange }: ModelSelectorProps) {
  return (
    <div className="p-4 border-b">
      <label className="flex items-center space-x-2">
        <span>AI Model:</span>
        <select
          value={model}
          onChange={(e) => onModelChange(e.target.value as 'openai' | 'anthropic')}
          className="p-1 border rounded"
        >
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
        </select>
      </label>
    </div>
  );
}