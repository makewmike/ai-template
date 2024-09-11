"use client";

import React, { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import MessageList from './MessageList';
import InputField from './InputField';
import ModelSelector from './ModelSelector';
import ErrorDisplay from './ErrorDisplay';
import LoadingIndicator from './LoadingIndicator';

export default function ChatInterface() {
  const [model, setModel] = useState<'openai' | 'anthropic'>('openai');

  useEffect(() => {
    const savedModel = localStorage.getItem('aiModel') as 'openai' | 'anthropic';
    if (savedModel) setModel(savedModel);
  }, []);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: `/api/${model}/chat`,
  });

  const handleModelChange = (newModel: 'openai' | 'anthropic') => {
    setModel(newModel);
    localStorage.setItem('aiModel', newModel);
  };

  return (
    <div className="flex flex-col h-screen">
      <ModelSelector model={model} onModelChange={handleModelChange} />
      <MessageList messages={messages} />
      {isLoading && <LoadingIndicator />}
      {error && <ErrorDisplay error={error} />}
      <InputField
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}