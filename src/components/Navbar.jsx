import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import MenuFromMaterial from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const menuItems = [
  "Home",
  "Engineering / Design related",
  "Quality Procedure, Method Statements",
  "Project Reference Documents Archive",
  "Project Materials Documents Archive",
  "Quality Control Logs",
  "Calibration",
  "Welding Procedure, Welder Status",
  "Inspection (General)",
  "Inspection (Welding)",
  "Inspection (Coating)",
  "Inspection (Mechanical- Equipment Installation)",
  "Inspection (Hydrotest/ Layup/ Caliper survey)",
  "Inspection (Civil)",
  "Inspection (Electrical)",
  "Inspection (CP-Cathodic Protection)",
  "Inspection (Instrumentation)",
  "Inspection (Tele-communication)",
  "Inspection (Overhead Power line)",
  "Inspection (Final Tie IN & acceptance)",
  "Inspection (Pre-commissioning)",
  "Inspection (Commissioning/ Startup operation)"
];

const subMenus = {
  "Home": ["Projects"],
  "Engineering / Design related": ["List of main Pipelines & Facilities",
    "ISO Drawings with Weld & spool details (DRG +All Quality Reports Attached)",
    "List of all Joints (Iso Drawing wise)"
  ],
  "Quality Procedure, Method Statements": ["Approved Quality Procedure/ Documents Status Log",
    "PQP",
    "ITP (Inspection Test plan) Status Log",
    "All Quality Forms (Checklist and Test report formats)",
    "Method Statement Log with Status",
    "TQ (Technical Queries)",
    "Approved NDT procedure",
    "Approved Third party testing procedures",
    "Approved subcontractors Documents",
    "Audit reports",
    "MRM reports",
    "MQMRs (approved)"
  ],
  "Project Reference Documents Archive": ["Project Cut-off date Acceptance letter",
    "CPP Specifications CSSP",
    "International Code/ Standards (as per Cut-Off date)"
  ],
  "Project Materials Documents Archive": ["Project material (Procured) docs",
    "Site material receiving docs",
    "Material preservation/ Quarantine related log & documents",
    "Welding Consumables Inspection Docs",
    "Coating related (paints, abrasives, Coating equipment, Gauges, relief valves) Inspection Documents"
  ],
  "Quality Control Logs": ["aster RFI Log – Lot A/ B/ C/ D (Request for Inspection Log)",
    "Master NCR/ Violation/ proactive Log",
    "Master TQ Log (Quality related Technical Queries)"
  ],
  "Calibration": ["Calibration log for Hydrotest, QC Tools and equipment",
    "Calibration log for Project permanent Instruments",
    "Welding Machine Validation Log"
  ],
  "Welding Procedure, Welder Status": ["WPS Log with status",
    "Welders’ log with JCC Status",
    "Weld Type (BW-Butt/ Girth Weld, Shop Weld -SW, Field Weld-FW)",
    "Weld Process (GTAW, GTAW-Auto, SMAW, GMAW, FCAW-Semi, FCAW-Auto, SAW)"
  ],
  "Inspection (General)": ["RFI format general"],
  "Inspection (Welding)": ["View Fit up Request (SATR-W_2006)",
    "View Daily Welding Report (SATR-W-2007)",
    "NDT request (SATR-NDE-2011)",
    "NDE RTFI/UTI Report (SATR-NDE-2008)",
    "Weld Summary Weekly reports (SATR-W-2008)",
    "Weekly Welder Repair and Tracer Weld Report (SATR-W-2018)",
    "Weekly Cumulative Weld Status report (SATR-W-2019)",
    "Weekly Welders Repair Rate Report (SATR-W-2013)",
    "Welder Initial production weld Status",
    "Welding Databook/ pipe book (SATR-W-2008) Master Log",
    "Repair Welding master Log",
    "Tracer Summary",
    "NDT Test Reports"
  ],
  "Inspection (Coating)": ["Painting and Coating Schedule",
    "Under Ground pipeline/piping Coating /Holiday test Reports",
    "Above Ground pipeline/ Piping Coating reports",
  ],
  "Inspection (Mechanical- Equipment Installation)": ["Scraper trap Installation",
    "Jib Crane Installation"
  ],
  "Inspection (Hydrotest/ Layup/ Caliper survey)": ["Hydrotest packages",
    "Hydrotest reports Pipeline/ piping",
    "Pipeline/ piping Layup test report",
    "Caliper test report",
    "Valve hydrotest / Preservation log & reports"
  ],
  "Inspection (Civil)": ["Fill, Select Fill & Marl Material Laboratory Test Reports",
    "Field Density test reports",
    "Concrete Test Reports & Grout Reports",
    "Asphalt Testing and Acceptance Reports",
    "Precast and In Situ Foundation Coating Reports",
    "Fence Installation",
    "Structural Steel Installation (Piperack & Support)"
  ],
  "Inspection (Electrical)": ["Electrical Equipment Installation & Termination Reports",
    "Power, Control & Grounding Cable Installation, Continuity and Insulation Resistance Test reports"
  ],
  "Inspection (CP-Cathodic Protection)": ["Temporary CP: TCP Anode Installation & Termination Reports",
    "Temporary CP: Monthly Potential Survey Test Reports",
    "Permanent: Bonding Box Installation and termination Reports",
    "Permanent CP: Impressed Current CP Anode Installation & Termination Reports",
    "Permanent CP: Cathodic Protection Rectifier Installation",
    "Permanent CP: Impressed Current CP Anode Precommissioning Test Report's",

  ],
  "Inspection (Instrumentation)": ["Instrument's Bench Calibration reports",
    "Field instrument's Installation & Termination Reports",
    "Instrument & Control Cable Continuity and Insulation Resistance Test Reports",
    "Loop Packages for All Instruments & Skid's",
    "Gas Detectors-LEL & H2S",
    "Alarm Horn, Alarm Beacon",
    "Permanent Pressure gauge Calibration certificates",
    "Pressure Indicator Transmitters"
  ],
  "Inspection (Tele-communication)": ["Telecom Equipment's Installation & Termination Reports",
    "FOC & CAT 6 Cable Installation & Termination Reports",
    "Fiber Optic Cable OTDR Test Reports",
    "Duct bank Installation & Mandrel Test Reports"
  ],
  "Inspection (Overhead Power line)": ["Overhead Powerline Transformer Energization Package's",
    "Overhead Powerline Pole & Accessories Installation Reports",
    "Overhead Powerline Pole & Accessories Final Termination Reports"
  ],
  "Inspection (Final Tie IN & acceptance)": ["Tie in Packages",
    "Tie in final acceptance reports", "Jib Crane Installation"
  ],
  "Inspection (Pre-commissioning)": ["SAT (Site Acceptance test reports)", "Any other Final Pre-com reports (Service test)"],
  "Inspection (Commissioning/ Startup operation)": ["Reliability Test reports", "One Year Operation Test reports"]
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSubMenu, setCurrentSubMenu] = useState([]); // submenu for clicked menu
  const open = Boolean(anchorEl);

  const handleMenuClick = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setCurrentSubMenu(subMenus[menu] || []); // set submenu of clicked menu
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="bg-blue-500 w-full fixed top-0 left-0 z-50 shadow-md">
      <div className="flex flex-wrap items-center justify-between w-full px-6">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg lg:hidden hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-controls="navbar-default"
          aria-expanded={mobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Menu */}
        <div className={`${mobileMenuOpen ? "block" : "hidden"} w-full lg:flex lg:w-auto`} id="navbar-default">
          <ul className="flex flex-col lg:flex-row lg:space-x-4 text-sm font-medium mt-4 lg:mt-0 w-full lg:w-auto bg-blue-500 lg:bg-transparent py-4 lg:py-4">
            {menuItems.map((menu) => (
              <li key={menu} className="relative">
                <a
                  href="#"
                  className="flex items-center justify-between pt-2 text-white hover:bg-blue-600 lg:hover:bg-transparent lg:hover:text-blue-200 rounded-sm transition"
                  onClick={(e) => handleMenuClick(e, menu)}
                >
                  {menu}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </a>
              </li>
            ))}
          </ul>

          <MenuFromMaterial
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            style={{ marginTop: 5 }}
            PaperProps={{
              style: {
                border: '1px solid gray',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                backgroundColor: '#ffffff',
                minWidth: '200px',
              },
            }}
            slotProps={{
              list: { 'aria-labelledby': 'basic-button' },
            }}
          >
            {currentSubMenu.map((subMenuItem) => (
              <MenuItem
                key={subMenuItem}
                onClick={handleClose}
                sx={{
                  color: 'gray',
                  fontWeight: 500,
                  borderBottom: '1px solid #e0e0e0',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#bdbbbbff',
                    color: 'black',
                    transform: 'scale(1.02)',
                  },
                }}
              >
                {subMenuItem}
              </MenuItem>
            ))}
          </MenuFromMaterial>


        </div>
      </div>
    </nav>
  );
}
