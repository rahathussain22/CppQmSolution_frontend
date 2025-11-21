import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
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

export default function TestingNavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentSubMenu, setCurrentSubMenu] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setCurrentSubMenu(subMenus[menu] || []);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div >
      {
        menuItems.map((menu) =>
          <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={(e) => handleClick(e, menu)}
            endIcon={<KeyboardArrowDownIcon />}
            style={{ marginInline: 5, marginTop: 5 }}
          >
            {menu}
          </Button>
        )
      }

      <MenuFromMaterial
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{ marginTop: 5 }}
        PaperProps={{
          sx: {
            border: '1px solid gray',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            backgroundColor: '#ffffff',
            minWidth: '200px',
            maxWidth: { xs: '90vw', sm: '300px', lg:'50vw' }, 
          },
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
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              display: 'block',
              maxWidth: '100%',

              '&::-webkit-scrollbar': {
                display: 'none'
              },

              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {subMenuItem}
          </MenuItem>
        ))}
      </MenuFromMaterial>


    </div>
  );
}