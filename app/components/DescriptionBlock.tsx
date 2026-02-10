interface Props {
  descriptions: string[];
}

export default function DescriptionBlock({ descriptions }: Props) {
  const valid = descriptions.filter(Boolean);
  if (valid.length === 0) return null;

  if (valid.length === 1) {
    return (
      <p className="text-xs text-gray-500 leading-relaxed mt-2">{valid[0]}</p>
    );
  }

  return (
    <div className="mt-2 flex flex-col gap-1">
      {valid.map((d, i) => (
        <div key={i} className="flex gap-1.5 text-xs text-gray-500 leading-relaxed">
          <span className="text-[#C4B5FD] font-bold text-[10px] min-w-[14px] text-right pt-0.5 shrink-0">
            {i + 1}
          </span>
          <span>{d}</span>
        </div>
      ))}
    </div>
  );
}
