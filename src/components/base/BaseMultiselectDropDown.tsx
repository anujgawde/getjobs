"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

interface Option {
  id: number;
  label: string;
}

interface BaseMultiSelectDropDownProps {
  options: Option[];
  defaultText: string;
  onSelect: (selectedOptions: Option[], buttonIdentifier: string) => void; // Add this callback
}

export function BaseMultiSelectDropDown({
  options,
  defaultText,
  onSelect,
}: BaseMultiSelectDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    setSelectedOptions((prev) => {
      if (prev.some((item) => item.id === option.id)) {
        return prev.filter((item) => item.id !== option.id);
      } else {
        return [...prev, option];
      }
    });
  };

  const removeOption = (optionId: number) => {
    setSelectedOptions((prev) => prev.filter((item) => item.id !== optionId));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onSelect(selectedOptions, defaultText);
  }, [selectedOptions]);

  return (
    <div className="relative inline-block text-left w-full" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className={`inline-flex justify-between items-center w-full rounded-lg border-2 px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors min-h-[42px] ${
            selectedOptions.length > 0
              ? "hover:bg-primary hover:border-primary bg-primary text-white border-primary"
              : "bg-white text-gray-700 border-gray-300"
          }`}
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <div className="flex flex-wrap gap-1">
            {selectedOptions.length === 0
              ? defaultText
              : selectedOptions.map((option) => (
                  <span
                    key={option.id}
                    className="bg-indigo-200 text-indigo-800 px-2 py-1 rounded-full text-xs flex items-center"
                  >
                    {option.label}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeOption(option.id);
                      }}
                    />
                  </span>
                ))}
          </div>
          <ChevronDown
            className="h-5 w-5 ml-2 flex-shrink-0"
            aria-hidden="true"
          />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <button
                key={option.id}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  selectedOptions.some((item) => item.id === option.id)
                    ? "bg-indigo-100 text-indigo-900"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  handleOptionClick(option);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
