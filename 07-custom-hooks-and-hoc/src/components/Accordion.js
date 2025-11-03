import { useEffect, useRef, useState } from "react";
import down from "url:../images/down.png";
import up from "url:../images/up.png";

const Accordion = ({
  title,
  children,
  isSubCategory = false,
  open = false,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <div className="mx-auto mt-3 w-[96%]">
      <button
        className={`mb-4 flex w-full items-center justify-between transition ${
          isSubCategory ? "text-base font-semibold" : "text-lg font-bold"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span>
          {isOpen ? (
            <img src={up} alt="up-arrow" className="w-3" />
          ) : (
            <img src={down} alt="down-arrow" className="w-5" />
          )}
        </span>
      </button>

      <div
        className={`overflow-hidden text-gray-700 transition-all duration-300 ease-in-out ${
          isOpen ? "pt-2" : "max-h-0 p-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
export default Accordion;
