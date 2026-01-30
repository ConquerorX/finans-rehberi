import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  icon,
  placeholder = 'Seçiniz'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find(opt => opt.value === value);


  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'fixed',
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [isOpen]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      

      const isInsideContainer = containerRef.current?.contains(target);
      const isInsideDropdown = dropdownRef.current?.contains(target);
      
      if (!isInsideContainer && !isInsideDropdown) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);


  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen]);


  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => setIsOpen(false);
      window.addEventListener('scroll', handleScroll, true);
      return () => window.removeEventListener('scroll', handleScroll, true);
    }
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const dropdownMenu = isOpen ? (
    <div 
      ref={dropdownRef}
      style={dropdownStyle}
      className="py-2 bg-[#1a2235] border border-white/10 rounded-xl shadow-2xl shadow-black/50 animate-fade-in max-h-64 overflow-y-auto custom-scrollbar"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleSelect(option.value)}
          className={`
            w-full flex items-center justify-between px-4 py-2.5 text-sm text-left
            transition-colors duration-150
            ${option.value === value 
              ? 'bg-amber-500/10 text-amber-400' 
              : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }
          `}
        >
          <span>{option.label}</span>
          {option.value === value && (
            <Check className="h-4 w-4 text-amber-400" />
          )}
        </button>
      ))}
    </div>
  ) : null;

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between gap-2 
          pl-10 pr-4 py-3 
          bg-white/5 border rounded-xl 
          text-sm font-medium text-left
          transition-all duration-200
          ${isOpen 
            ? 'border-amber-500/50 ring-2 ring-amber-500/20' 
            : 'border-white/10 hover:border-white/20'
          }
        `}
      >
        {/* Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            {icon}
          </div>
        )}
        
        {/* Selected Value */}
        <span className={selectedOption ? 'text-slate-200' : 'text-slate-500'}>
          {selectedOption?.label || placeholder}
        </span>
        
        {/* Chevron */}
        <ChevronDown 
          className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu - Portal ile body'e render ediliyor */}
      {createPortal(dropdownMenu, document.body)}
    </div>
  );
};
