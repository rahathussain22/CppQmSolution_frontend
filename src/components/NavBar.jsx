import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const navItems = [
  {
    label: "Home",
    pathname: "/home",
    hasDropdown: false,
  },
  {
    label: "Companies & Projects",
    pathname: "/companies-projects",
    hasDropdown: true,
    dropdown: [
      { label: "Projects", pathname: "/companies-projects/projects" },
      { label: "Companies", pathname: "/companies-projects/companies" },
      { label: "Lots", pathname: "/companies-projects/lots" },
      { label: "Pipelines", pathname: "/companies-projects/pipelines" },
      { label: "ISO Drawings", pathname: "/companies-projects/iso-drawings" },
    ],
  },
  {
    label: "WPS & Weld Details",
    pathname: "/wps-weld-details",
    hasDropdown: true,
    dropdown: [
      { label: "WPS List", pathname: "/wps-weld-details/wps-list" },
      { label: "Weld Details", pathname: "/wps-weld-details/weld-details" },
      { label: "Welders", pathname: "/wps-weld-details/welders" },
    ],
  },
  {
    label: "Reports & Personnels",
    pathname: "/reports-personnels",
    hasDropdown: true,
    dropdown: [
      { label: "Reports", pathname: "/reports-personnels/reports" },
      { label: "Personnels", pathname: "/reports-personnels/personnels" },
      { label: "Statistics", pathname: "/reports-personnels/statistics" },
    ],
  },
  {
    label: "Inspection/NDT Masters",
    pathname: "/inspection-ndt-masters",
    hasDropdown: true,
    dropdown: [
      { label: "Inspections", pathname: "/inspection-ndt-masters/inspections" },
      { label: "NDT", pathname: "/inspection-ndt-masters/ndt" },
      { label: "Masters", pathname: "/inspection-ndt-masters/masters" },
    ],
  },
  {
    label: "Components",
    pathname: "/components",
    hasDropdown: true,
    dropdown: [
      { label: "Component List", pathname: "/components/list" },
      { label: "Add Component", pathname: "/components/add" },
    ],
  },
  {
    label: "Permissions",
    pathname: "/permissions",
    hasDropdown: true,
    dropdown: [
      { label: "Roles", pathname: "/permissions/roles" },
      { label: "Access", pathname: "/permissions/access" },
    ],
  },
];

function NavItem({ item, isActive }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

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

  if (!item.hasDropdown) {
    return (
      <Link
        to={item.pathname}
        className={`flex items-center h-9 px-4 rounded text-sm font-medium transition-colors ${
          isActive(item.pathname)
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
        className={`flex items-center gap-1 h-9 px-4 rounded text-sm font-medium transition-colors ${
          isActive(item.pathname)
            ? "bg-white/30 text-gray-900"
            : "text-gray-900 hover:bg-white/20"
        }`}
      >
        {item.label}
        <ChevronDown className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
          {item.dropdown.map((dropdownItem) => (
            <Link
              key={dropdownItem.pathname}
              to={dropdownItem.pathname}
              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors ${
                isActive(dropdownItem.pathname)
                  ? "font-semibold bg-blue-100"
                  : ""
              }`}
            >
              {dropdownItem.label}
            </Link>
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
