import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface IcategoryPillProps {
  category: string[];
  selectedCategory: string;
  onSlecte: (category: string) => void;
}

const TRANSLATE_AMOUNT = 200;

const CategoryPills = ({
  category,
  selectedCategory,
  onSlecte,
}: IcategoryPillProps) => {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsleftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current === null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container === null) return;

      setIsleftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientHeight < container.scrollWidth
      );
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [category, translate]);
  return (
    <div className="overflow-x-hidden relative" ref={containerRef}>
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {category &&
          category.map((item, index) => {
            return (
              <button
                className={`py-1 px-3 ${
                  selectedCategory === item
                    ? " bg-secondary-dark text-white"
                    : ""
                } text-sm rounded-md`}
                key={index}
                onClick={() => onSlecte(item)}
              >
                {item}
              </button>
            );
          })}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 -top-1/4 translate-y-1 bg-gradient-to-r from-white from 50% to-transparent w-24 h-full">
          <button
            className="h-full w-auto  aspect-square py-1 px-3 text-sm rounded-md"
            onClick={() => {
              setTranslate((prevState) => {
                const newTranslate = prevState - TRANSLATE_AMOUNT;
                if (newTranslate <= 0) return 0;
                return newTranslate;
              });
            }}
          >
            <ChevronLeft />
          </button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 -top-1/4 translate-y-1 bg-gradient-to-r from-white from 50% to-transparent w-24 h-full flex justify-end ">
          <button
            className="h-full w-auto p-2 aspect-square py-1 px-3 text-sm rounded-md"
            onClick={() => {
              setTranslate((prevState) => {
                if (containerRef.current === null) {
                  return translate;
                }
                const newTranslate = prevState - TRANSLATE_AMOUNT;

                const edge = containerRef.current.scrollWidth;

                const width = containerRef.current.clientWidth;
                if (newTranslate + width <= edge) {
                  return edge - width;
                }
                return newTranslate;
              });
            }}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPills;
