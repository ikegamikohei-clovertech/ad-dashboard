"use client";

import { SearchIcon } from "./Icons";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-[10px] px-3.5 py-2 flex-1 min-w-[200px] max-w-[400px]">
      <SearchIcon />
      <input
        type="text"
        placeholder="広告テキスト、URL、キャンペーン名で検索..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-none outline-none text-[13px] w-full bg-transparent font-[inherit]"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="border-none bg-none cursor-pointer text-base text-gray-400 p-0 leading-none hover:text-gray-600"
        >
          ×
        </button>
      )}
    </div>
  );
}
