export default function SplitLine({
  text,
  base = 0,
  className = "",
}: {
  text: string;
  base?: number;
  className?: string;
}) {
  const words = text.split(" ");
  let index = 0;
  return (
    <span className={`split-line ${className}`} aria-hidden="true">
      {words.map((word, wi) => (
        <span key={wi}>
          <span className="split-word">
            {[...word].map((char, ci) => (
              <span
                key={ci}
                className="split-char"
                style={{ "--i": index++, "--base": `${base}ms` } as React.CSSProperties}
              >
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
