import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { navItems } from "../constants/constants";

function NavItem({ item, isActive }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const [submenuPosition, setSubmenuPosition] = useState('left-0');  // Default submenu position
  const [mainMenuPosition, setMainMenuPosition] = useState('left-0'); // Default main menu position

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 100);
  };

  useEffect(() => {
    if (containerRef.current && open) {
      // Calculate the space from the right edge of the screen for the submenu
      const containerRect = containerRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const submenuWidth = containerRect.width;

      // Adjust main menu position to prevent overflow
      if (screenWidth - containerRect.left < submenuWidth) {
        setMainMenuPosition('right-0');  // Move the main menu to the right if it's overflowing
      } else {
        setMainMenuPosition('left-0');  // Default position if there's no overflow
      }
      if (screenWidth - containerRect.right < submenuWidth) {
        setSubmenuPosition('right-0');  // If it does, align the submenu to the right
      } else {
        setSubmenuPosition('left-0');  // Default position if there's no overflow
      }
    }
  }, [open]);

  if (!item.hasDropdown) {
    return (
      <Link
        to={item.pathname}
        className={`flex items-center h-9 px-4 rounded text-sm font-medium transition-colors ${isActive(item.pathname)
          ? "bg-white/30 text-gray-900"
          : "text-gray-900 hover:bg-white/20"
          }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 h-9 px-4 rounded text-sm font-medium transition-colors ${isActive(item.pathname)
          ? "bg-white/30 text-gray-900"
          : "text-gray-900 hover:bg-white/20"
          }`}
      >
        {item.label}
        <ChevronDown className="h-4 w-4" />
      </button>
      {open && (
        <div
          className={`absolute top-full mt-1 min-w-[200px] bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 ${submenuPosition} ${mainMenuPosition}`}
        >
          {item.dropdown.map((dropdownItem) => (
            <div key={dropdownItem.pathname} className="relative group">
              <Link
                to={dropdownItem.pathname}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors ${isActive(dropdownItem.pathname)
                  ? "font-semibold bg-blue-100"
                  : ""
                  }`}
              >
                {dropdownItem.label}
                {dropdownItem.dropdown && (
                  <ChevronRight className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 opacity-50 group-hover:opacity-100" />
                )}
              </Link>
              {dropdownItem.dropdown && (
                <div className="absolute left-full top-0 mt-0.5 min-w-[200px] bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 hidden group-hover:block">
                  {dropdownItem.dropdown.map((subItem) => (
                    <Link
                      key={subItem.pathname}
                      to={subItem.pathname}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors ${isActive(subItem.pathname)
                        ? "font-semibold bg-blue-100"
                        : ""
                        }`}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function NavBar() {
  const location = useLocation();
  const isActive = (pathname) => location.pathname.startsWith(pathname);

  return (
    <nav className="bg-linear-to-b from-cyan-400 to-cyan-500 border-b-2 border-cyan-600 shadow-md px-2 py-1">
      <div className="flex gap-1 flex-wrap">
        {navItems.map((item) => (
          <NavItem key={item.pathname} item={item} isActive={isActive} />
        ))}
      </div>
    </nav>
  );
}