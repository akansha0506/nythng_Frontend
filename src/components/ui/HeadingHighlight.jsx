const HeadingHighlight = ({
  text,
  highlight,
  className = "primaryText",
  withBreak = false,
}) => {
  // If highlight text is not present
  if (!text.includes(highlight)) {
    return (
      <h2
        className={`text-3xl font-semibold leading-snug font-serif text-[#355454] lg:text-4xl xl:text-5xl ${className}`}
      >
        {text}
      </h2>
    );
  }

  const [before, after] = text.split(highlight);

  const renderWithBreaks = (str) =>
    str.split("\n").map((line, idx, arr) => (
      <span key={idx}>
        {line}
        {idx < arr.length - 1 && <br />}
      </span>
    ));

  return (
    <h2
      className={`text-4xl leading-tight text-[#355454] xl:text-5xl ${className}`}
    >
      {renderWithBreaks(before)}

      <span
        className="relative inline-block px-[2px]"
      >
        {highlight}
      </span>

      {withBreak && <br />}

      {renderWithBreaks(after)}
    </h2>
  );
};

export default HeadingHighlight;