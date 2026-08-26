import { Star } from "lucide-react";

const StarRating = ({
  avgRating,
  size = "default",
}) => {
  const starSize =
    size === "small"
      ? "h-4 w-4"
      : "h-[18px] w-[18px] sm:h-5 sm:w-5";

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const fillLevel =
          avgRating >= i + 1
            ? 100
            : avgRating > i
            ? (avgRating - i) * 100
            : 0;

        return (
          <div
            key={i}
            className={`relative shrink-0 ${starSize}`}
          >
            {/* Empty Star */}
            <Star
              className="
                absolute
                inset-0
                h-full
                w-full
                text-[#DED5CC]
              "
              fill="currentColor"
              strokeWidth={1.4}
            />

            {/* Filled Star */}
            <div
              className="
                absolute
                inset-y-0
                left-0
                overflow-hidden
              "
              style={{
                width: `${fillLevel}%`,
              }}
            >
              <Star
                className={`${starSize} text-[#D5A142]`}
                fill="currentColor"
                strokeWidth={1.4}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;