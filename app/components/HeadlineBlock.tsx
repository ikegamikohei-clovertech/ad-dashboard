interface Props {
  headlines: string[];
}

export default function HeadlineBlock({ headlines }: Props) {
  const valid = headlines.filter(Boolean);
  if (valid.length === 0) return null;
  const [main, ...rest] = valid;
  return (
    <div className="min-w-0 flex-1">
      <div className="text-sm font-bold text-[#1A1A2E] leading-snug">
        {main}
      </div>
      {rest.length > 0 && (
        <div className="text-[11.5px] text-[#4338CA] font-medium leading-relaxed mt-1">
          {rest.map((h, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-1 text-[#CBD5E1]">|</span>}
              {h}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
