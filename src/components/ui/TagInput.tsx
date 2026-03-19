// src/components/ui/TagInput.tsx
'use client';

import { useState, KeyboardEvent } from 'react';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({ tags, setTags, placeholder }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const newTag = inputValue.trim().replace(/,$/, '');
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex w-full flex-wrap items-center gap-2 rounded-lg border border-zinc-200 bg-white p-2 transition-colors focus-within:border-unicamp focus-within:ring-2 focus-within:ring-unicamp/10">
      {tags.map((tag, index) => (
        <span key={index} className="flex items-center gap-1 rounded-md bg-zinc-100 px-2.5 py-1 font-sans text-xs font-medium text-zinc-700">
          {tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="ml-0.5 text-zinc-400 hover:text-red-500"
          >
            &times;
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="min-w-[120px] flex-1 bg-transparent px-1 py-1 font-sans text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
      />
    </div>
  );
}