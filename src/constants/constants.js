export const navItems = [
  {
    label: "Home",
    pathname: "/home",
    hasDropdown: false,
  },
  {
    label: "Master Data",
    pathname: "/master-data",
    hasDropdown: true,
    children: [
      { label: "Master Data Logs", pathname: "/master-data/data-logs" },
      { label: "Master RFI Logs", pathname: "/master-data/rfi-logs" },
      { label: "Master NCR Logs", pathname: "/master-data/ncr-logs" },
      { label: "Master TQ Logs", pathname: "/master-data/tq-logs" },
    ],
  },
  {
    label: "Manage Users",
    pathname: "/manage-users",
    hasDropdown: false,
    requiresSuperAdmin: true,
  },
  {
    label: "Welder & WPQ",
    pathname: "/welder-wpq",
    hasDropdown: true,
    children: [
      { label: "PQR", pathname: "/welder-wpq/pqr" },
      { label: "WPS", pathname: "/welder-wpq/wps" },
      { label: "Welder", pathname: "/welder-wpq/welder" },
      { label: "Welder Qualification (WQT)", pathname: "/welder-wpq/wqt" },
      { label: "Welders in Project", pathname: "/welder-wpq/project-welders" },
      { label: "Weld Type", pathname: "/welder-wpq/weld-type" },
      { label: "Weld Process", pathname: "/welder-wpq/weld-process" },
    ],
  },
  {
    label: "Callibration",
    pathname: "/callibration",
    hasDropdown: true,
    children: [
      { label: "Test Equipments", pathname: "/callibration/test-equipments" },
      { label: "Test Equipments View", pathname: "/callibration/test-equipments-view" },
    ],
  },
  {
    label: "Engineering",
    pathname: "/engineering",
    hasDropdown: true,
    children: [
      { label: "Lines", pathname: "/engineering/lines" },
      { label: "ISO Drawings & Spools", pathname: "/engineering/iso-drawings" },
      { label: "Bill of Materials", pathname: "/engineering/materials-bill" },
      { label: "Joints", pathname: "/engineering/joints" },
      { label: "Components", pathname: "/engineering/components" },
      { label: "Master Data Import", pathname: "/engineering/data-import" },
      { label: "Drawing Bulk Edit", pathname: "/engineering/drawing-bulk-edit" },
      { label: "Joints Bulk Edit", pathname: "/engineering/joints-bulk-edit" },
    ],
  },
  {
    label: "Inspection",
    pathname: "/inspection",
    hasDropdown: true,
    children: [
      { label: "View Fitup Request (SATR-W-2006)", pathname: "/inspection/fitup-request" },
      { label: "View WeldVI Request (SATR-W-2007)", pathname: "/inspection/weld-request" },
      { label: "NDE Requirement", pathname: "/inspection/nde-requirement" },
      { label: "Stage Inspection Requirement", pathname: "/inspection/stage-requirement" },
      { label: "NDT Inspection Request (IR-CSSP-NDT-001)", pathname: "/inspection/ndt-request" },
      { label: "Coating Test - Production", pathname: "/inspection/coating-production" },
      { label: "Coating Test - Inspection", pathname: "/inspection/coating-inspection" },
      { label: "Hydrostatic Test - Production", pathname: "/inspection/hydrostatic-production" },
      { label: "Hydrostatic Test - Inspection", pathname: "/inspection/hydrostatic-inspection" },
    ],
  },
  {
    label: "NDE & Other NDE Reports",
    pathname: "/nde-reports",
    hasDropdown: true,
    children: [
      { label: "Radiographic Testing (RT)", pathname: "/nde-reports/rt" },
      { label: "Ultrasonic Testing (UT)", pathname: "/nde-reports/ut" },
      { label: "Dye Penetrant Testing (PT)", pathname: "/nde-reports/pt" },
      { label: "Magnetic Particle Testing (MT)", pathname: "/nde-reports/mt" },
      { label: "Post Weld Heat Treatment (PWHT)", pathname: "/nde-reports/pwht" },
      { label: "PWHT RT", pathname: "/nde-reports/pwht-rt" },
      { label: "Automated Ultrasonic Testing (AUT)", pathname: "/nde-reports/aut" },
      { label: "Phased Array Ultrasonic Testing (PAUT)", pathname: "/nde-reports/paut" },
      { label: "Positive Material Identification (PMI)", pathname: "/nde-reports/pmi" },
      { label: "Hardness", pathname: "/nde-reports/hardness" },
    ],
  },
  {
    label: "Reports",
    pathname: "/reports",
    hasDropdown: true,
    children: [
      { label: "Daily Weld Fit-Up Inspection Report (IR-CSSP-W-001)", pathname: "/reports/ir-cssp-w-001" },
      { label: "Weld Summary & NDT Tracking System (IR-CSSP-W-002)", pathname: "/reports/ir-cssp-w-002" },
      { label: "Welder Initial Production Joint Status", pathname: "/reports/wipjs" },
      { label: "Weld Master Log", pathname: "/reports/weld-logs" },
      { label: "Weld Master Log (Repair Joints)", pathname: "/reports/weld-repair-logs" },
      { label: "Weld Repair and Rescan Status Report", pathname: "/reports/weld-rescan-report" },
      { label: "Tracer Summary", pathname: "/reports/tracer-summary" },
    ],
  },
  {
    label: "Documents",
    pathname: "/documents",
    hasDropdown: true,
    children: [
      { label: "Upload Documents", pathname: "/documents/upload" },
    ],
  },
];

// export const navItems = [
//   {
//     label: "Home",
//     pathname: "/home",
//     hasDropdown: false,
//   },
//   {
//     label: "Manage Users",
//     pathname: "/manage-users",
//     hasDropdown: false,
//     requiresSuperAdmin: true,
//   },
//   {
//     label: "DCL",
//     pathname: "/dcl",
//     hasDropdown: true,
//     children: [{ label: "Master Database", pathname: "/dcl/master-database" }],
//   },
//   {
//     label: "Engineering / Design",
//     pathname: "/engineering-design",
//     hasDropdown: true,
//     children: [
//       {
//         label: "Pipelines & Facilities",
//         pathname: "/engineering-design/pipelines",
//       },
//       {
//         label: "ISO Drawings with Weld & Spool details",
//         pathname: "/engineering-design/iso-drawings",
//       },
//       {
//         label: "Joints (Iso Drawing Wise)",
//         pathname: "/engineering-design/joints",
//       },
//     ],
//   },
//   {
//     label: "Quality & Procedures",
//     pathname: "/quality-procedures",
//     hasDropdown: true,
//     children: [
//       {
//         label: "Quality Procedures",
//         pathname: "/quality-procedures/quality-procedures",
//       },
//       {
//         label: "WPS Management",
//         pathname: "/quality-procedures/wps-management",
//       },
//       {
//         label: "Welder Management",
//         pathname: "/quality-procedures/welder-management",
//       },
//       {
//         label: "Approved Documents",
//         pathname: "/quality-procedures/approved-documents",
//       },
//       { label: "PQP & ITP", pathname: "/quality-procedures/pqp-itp" },
//       {
//         label: "Method Statements",
//         pathname: "/quality-procedures/method-statements",
//       },
//       { label: "Technical Queries (TQ)", pathname: "/quality-procedures/tq" },
//       {
//         label: "Third Party Testing & Subcontractors",
//         pathname: "/quality-procedures/testing-subcontractors",
//       },
//       {
//         label: "Audit & MRM Reports",
//         pathname: "/quality-procedures/audit-reports",
//       },
//       { label: "MQMRs (approved)", pathname: "/quality-procedures/mqmrs" },
//     ],
//   },
//   {
//     label: "Materials & Documents",
//     pathname: "/materials-documents",
//     hasDropdown: true,
//     children: [
//       {
//         label: "Components",
//         pathname: "/materials-documents/components",
//       },
//       {
//         label: "Project Reference Documents Archive",
//         pathname: "/materials-documents/project-reference-documents",
//         hasDropdown: true,
//         children: [
//           {
//             label: "Project Cut-off Date Acceptance Letter",
//             pathname:
//               "/materials-documents/project-reference-documents/cut-off-acceptance",
//           },
//           {
//             label: "CPP Specifications CSSP",
//             pathname:
//               "/materials-documents/project-reference-documents/cpp-specifications",
//           },
//           {
//             label: "International Code/Standards",
//             pathname:
//               "/materials-documents/project-reference-documents/international-codes",
//           },
//         ],
//       },
//       {
//         label: "Project Materials Documents Archive",
//         pathname: "/materials-documents/project-materials-documents",
//         hasDropdown: true,
//         children: [
//           {
//             label: "Project Material Docs",
//             pathname:
//               "/materials-documents/project-materials-documents/material-docs",
//           },
//           {
//             label: "Site Material Receiving Docs",
//             pathname:
//               "/materials-documents/project-materials-documents/material-receiving",
//           },
//           {
//             label: "Material Preservation/Quarantine Log",
//             pathname:
//               "/materials-documents/project-materials-documents/material-preservation",
//           },
//           {
//             label: "Welding Consumables Inspection Docs",
//             pathname:
//               "/materials-documents/project-materials-documents/welding-consumables",
//           },
//           {
//             label: "Coating Related Inspection Docs",
//             pathname:
//               "/materials-documents/project-materials-documents/coating-inspection",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     label: "Quality Control Logs",
//     pathname: "/quality-control-logs",
//     hasDropdown: true,
//     children: [
//       { label: "Master RFI Log", pathname: "/quality-control-logs/rfi-log" },
//       { label: "Master NCR Log", pathname: "/quality-control-logs/ncr-log" },
//       { label: "Master TQ Log", pathname: "/quality-control-logs/tq-log" },
//     ],
//   },
//   {
//     label: "Calibration & Welding",
//     pathname: "/calibration-welding",
//     hasDropdown: true,
//     children: [
//       {
//         label: "Calibration log for Hydrotest, QC Tools and equipment ",
//         pathname: "/calibration-welding/calibration-log-hydrotest-qc-tools",
//       },
//       {
//         label: "Calibration log for Project permanent Instruments ",
//         pathname: "/calibration-welding/calibration-log-permanent-instruments",
//       },
//       {
//         label: "Welding Machine Validation Log",
//         pathname: "/calibration-welding/welding-machine-validation-log",
//       }
//     ],
//   },
//   {
//     label: "Inspection",
//     pathname: "/inspection",
//     hasDropdown: true,
//     children: [
//       {
//         label: "Welding Inspection",
//         pathname: "/inspection/welding",
//         hasDropdown: true,
//         children: [
//           {
//             label: "Fit-Up Request",
//             pathname: "/inspection/welding/fit-up-request",
//           },
//           {
//             label: "Daily Welding Report",
//             pathname: "/inspection/welding/daily-welding-report",
//           },
//           { label: "NDT Request", pathname: "/inspection/welding/ndt-request" },
//           {
//             label: "NDE RTFI/UTI Report (SATR-NDE-2008)",
//             pathname: "/inspection/welding/nde-rtfi-uti-report",
//           },
//           {
//             label: "Weld Summary Weekly reports (SATR-W-2008)",
//             pathname: "/inspection/welding/weld-summary-weekly-reports",
//           },
//           {
//             label: "Weekly Welder Repair and Tracer Weld Report (SATR-W-2018)",
//             pathname: "/inspection/welding/weekly-welder-repair-tracer-report",
//           },
//           {
//             label: "Weekly Cumulative Weld Status report (SATR-W-2019)",
//             pathname:
//               "/inspection/welding/weekly-cumulative-weld-status-report",
//           },
//           {
//             label: "Weekly Welders Repair Rate Report (SATR-W-2013)",
//             pathname: "/inspection/welding/weekly-welders-repair-rate-report",
//           },
//           {
//             label: "Welder Initial production weld Status",
//             pathname:
//               "/inspection/welding/welder-initial-production-weld-status",
//           },
//           {
//             label: "Welding Databook/ pipe book (SATR-W-2008) Master Log",
//             pathname: "/inspection/welding/welding-databook-master-log",
//           },
//           {
//             label: "Repair Welding master Log",
//             pathname: "/inspection/welding/repair-welding-master-log",
//           },
//           {
//             label: "Tracer Summary",
//             pathname: "/inspection/welding/tracer-summary",
//           },
//           {
//             label: "NDT Test reports",
//             pathname: "/inspection/welding/ndt-test-reports",
//             hasDropdown: true,
//             children: [
//               {
//                 label: "Radiography Test Reports",
//                 pathname: "/inspection/welding/ndt-test-reports/radiographic",
//               },
//               {
//                 label: "UT/UTT",
//                 pathname: "/inspection/welding/ndt-test-reports/ultrasonic",
//               },
//               {
//                 label: "MPT",
//                 pathname: "/inspection/welding/ndt-test-reports/mpt",
//               },
//               {
//                 label: "PT",
//                 pathname: "/inspection/welding/ndt-test-reports/pt",
//               },
//               {
//                 label: "AUT",
//                 pathname: "/inspection/welding/ndt-test-reports/aut",
//               },
//               {
//                 label: "PAUT",
//                 pathname: "/inspection/welding/ndt-test-reports/paut",
//               },
//               {
//                 label: "PMI",
//                 pathname: "/inspection/welding/ndt-test-reports/pmi",
//               },
//               {
//                 label: "Harness test reports",
//                 pathname: "/inspection/welding/ndt-test-reports/harness-tests",
//               },
//               {
//                 label: "PWHT",
//                 pathname: "/inspection/welding/ndt-test-reports/pwht",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         label: "Coating Inspection",
//         pathname: "/inspection/coating",
//         hasDropdown: true,
//         children: [
//           {
//             label: "Painting Schedule",
//             pathname: "/inspection/coating/painting-schedule",
//           },
//           {
//             label: "Undergroung Pipeline Coating Reports",
//             pathname:
//               "/inspection/coating/underground-pipeline-coating-reports",
//           },
//           {
//             label: "Above Ground Pipeline Coating Reports",
//             pathname:
//               "/inspection/coating/above-ground-pipeline-coating-reports",
//           },
//         ],
//       },
//       {
//         label: "Mechanical Inspection",
//         pathname: "/inspection/mechanical",
//         hasDropdown: true,
//         children: [
//           {
//             label: "Scraper Trap Installation",
//             pathname: "/inspection/mechanical/scraper-trap",
//           },
//           {
//             label: "Crane Installation",
//             pathname: "/inspection/mechanical/crane-installation",
//           },
//         ],
//       },
//       {
//         label: "Hydrotest & Caliper Survey",
//         pathname: "/inspection/hydrotest",
//         hasDropdown: true,
//         children: [
//           {
//             label: "Hydrotest Packages",
//             pathname: "/inspection/hydrotest/packages",
//           },
//           {
//             label: "Hydrotest Reports",
//             pathname: "/inspection/hydrotest/reports",
//           },
//           {
//             label: "Caliper Test Reports",
//             pathname: "/inspection/hydrotest/caliper-reports",
//           },
//           {
//             label: "Pipeline layup Test Reports",
//             pathname: "/inspection/hydrotest/layup-test-reports",
//           },
//           {
//             label: "Valve hydrotest Reports",
//             pathname: "/inspection/hydrotest/valve-hydrotest-reports",
//           },
//         ],
//       },
//       {
//         label: "Civil & Electrical Inspection",
//         pathname: "/inspection/civil-electrical",
//         hasDropdown: true,
//         children: [
//           {
//             label: "Marl Material Laboratory Test Reports",
//             pathname:
//               "/inspection/civil-electrical/marl-material-laboratory-test-reports",
//           },
//           {
//             label: "Field Density Test Reports",
//             pathname: "/inspection/civil-electrical/field-density-test-reports",
//           },
//           {
//             label: "Concrete Test Reports & Grout Reports",
//             pathname:
//               "/inspection/civil-electrical/concrete-grout-test-reports",
//           },
//           {
//             label: "Asphalt Testing and Acceptance Reports",
//             pathname:
//               "/inspection/civil-electrical/asphalt-testing-acceptance-reports",
//           },
//           {
//             label: "Precast and In Situ Foundation Coating Reports",
//             pathname:
//               "/inspection/civil-electrical/precast-in-situ-foundation-coating-reports",
//           },
//           {
//             label: "Fence Installation",
//             pathname: "/inspection/civil-electrical/fence-installation",
//           },
//           {
//             label: "Structural Steel Installation (Piperack & Support)",
//             pathname:
//               "/inspection/civil-electrical/structural-steel-installation",
//           },
//         ],
//       },
//       {
//         label: "Electrical",
//         pathname: "/inspection/electrical",
//         hasDropdown: true,
//         children: [
//           {
//             label: "Electrical Equipment Installation & Termination Reports",
//             pathname:
//               "/inspection/electrical/electrical-equipment-installation-reports",
//           },
//           {
//             label:
//               "Power, Control & Grounding Cable Installation, Continuity and Insulation Resistance Test reports",
//             pathname:
//               "/inspection/electrical/power-control-grounding-cable-reports",
//           },
//         ],
//       },
//       {
//         label: "CP-Cathodic Protection",
//         pathname: "/inspection/cathodic-protection",
//         hasDropdown: true,
//         children: [
//           {
//             label: "Temporary CP: TCP Anode Installation & Termination Reports",
//             pathname:
//               "/inspection/cathodic-protection/temporary-cp-anode-installation-reports",
//           },
//           {
//             label: "Temporary CP: Monthly Potential Survey Test Reports",
//             pathname:
//               "/inspection/cathodic-protection/temporary-cp-monthly-potential-survey-reports",
//           },
//           {
//             label:
//               "Permanent: Bonding Box Installation and termination Reports",
//             pathname:
//               "/inspection/cathodic-protection/permanent-bonding-box-installation-reports",
//           },
//           {
//             label:
//               "Permanent CP: Impressed Current CP Anode Installation & Termination Reports",
//             pathname:
//               "/inspection/cathodic-protection/permanent-cp-anode-installation-reports",
//           },
//           {
//             label: "Permanent CP: Cathodic Protection Rectifier Installation",
//             pathname:
//               "/inspection/cathodic-protection/permanent-cp-rectifier-installation-reports",
//           },
//           {
//             label:
//               "Permanent CP: Impressed Current CP Anode Precommissioning Test Reports",
//             pathname:
//               "/inspection/cathodic-protection/permanent-cp-anode-precommissioning-reports",
//           },
//         ],
//       },
//       {
//         label: "Instrumentation",
//         pathname: "/inspection/instrumentation",
//         hasDropdown: true,
//         children: [
//           {
//             label: "Instrument's Bench Calibration reports",
//             pathname: "/inspection/instrumentation/bench-calibration-reports",
//           },
//           {
//             label: "Field instrument's Installation & Termination Reports",
//             pathname:
//               "/inspection/instrumentation/field-instruments-installation-reports",
//           },
//           {
//             label:
//               "Instrument & Control Cable Continuity and Insulation Resistance Test Reports",
//             pathname:
//               "/inspection/instrumentation/instrument-control-cable-reports",
//           },
//           {
//             label: "Loop Packages for All Instruments & Skid's",
//             pathname:
//               "/inspection/instrumentation/loop-packages-for-all-instruments",
//           },
//           {
//             label: "Gas Detectors-LEL & H2S",
//             pathname: "/inspection/instrumentation/gas-detectors-lel-h2s",
//           },
//           {
//             label: "Alarm Horn, Alarm Beacon",
//             pathname: "/inspection/instrumentation/alarm-horn-alarm-beacon",
//           },
//           {
//             label: "Permanent Pressure gauge Calibration certificates",
//             pathname:
//               "/inspection/instrumentation/permanent-pressure-gauge-calibration-certificates",
//           },
//           {
//             label: "Pressure Indicator Transmitters",
//             pathname:
//               "/inspection/instrumentation/pressure-indicator-transmitters",
//           },
//         ],
//       },
//       {
//         label: "Tele-communication",
//         pathname: "/inspection/tele-communication",
//         hasDropdown: true,
//         children: [
//           {
//             label: "Telecom Equipment's Installation & Termination Reports",
//             pathname:
//               "/inspection/tele-communication/telecom-equipment-installation-reports",
//           },
//           {
//             label: "FOC & CAT 6 Cable Installation & Termination Reports",
//             pathname:
//               "/inspection/tele-communication/foc-cat6-cable-installation-reports",
//           },
//           {
//             label: "Fiber Optic Cable OTDR Test Reports",
//             pathname:
//               "/inspection/tele-communication/fiber-optic-cable-otdr-test-reports",
//           },
//           {
//             label: "Duct bank Installation & Mandrel Test Reports",
//             pathname:
//               "/inspection/tele-communication/duct-bank-installation-mandrel-test-reports",
//           },
//         ],
//       },
//       {
//         label: "Overhead Power line",
//         pathname: "/inspection/overhead-power-line",
//         hasDropdown: true,
//         children: [
//           {
//             label: "Overhead Powerline Transformer Energization Package's",
//             pathname:
//               "/inspection/overhead-power-line/transformer-energization-packages",
//           },
//           {
//             label: "Overhead Powerline Pole & Accessories Installation Reports",
//             pathname:
//               "/inspection/overhead-power-line/pole-accessories-installation-reports",
//           },
//           {
//             label:
//               "Overhead Powerline Pole & Accessories Final Termination Reports",
//             pathname:
//               "/inspection/overhead-power-line/pole-accessories-final-termination-reports",
//           },
//         ],
//       },
//       {
//         label: "Final Tie IN & acceptance",
//         pathname: "/inspection/final-tie-in-acceptance",
//         hasDropdown: true,
//         children: [
//           {
//             label: "Tie in Packages",
//             pathname: "/inspection/final-tie-in-acceptance/tie-in-packages",
//           },
//           {
//             label: "Tie in final acceptance reports",
//             pathname:
//               "/inspection/final-tie-in-acceptance/tie-in-final-acceptance-reports",
//           },
//           {
//             label: "Jib Crane Installation",
//             pathname:
//               "/inspection/final-tie-in-acceptance/jib-crane-installation",
//           },
//         ],
//       },
//       {
//         label: "Pre-commissioning",
//         pathname: "/inspection/pre-commissioning",
//         hasDropdown: true,
//         children: [
//           {
//             label: "SAT (Site Acceptance test reports)",
//             pathname:
//               "/inspection/pre-commissioning/sat-site-acceptance-test-reports",
//           },
//           {
//             label: "Any other Final Pre-com reports (Service test)",
//             pathname:
//               "/inspection/pre-commissioning/other-final-pre-com-reports",
//           },
//         ],
//       },
//       {
//         label: "Commissioning",
//         pathname: "/inspection/commissioning",
//         hasDropdown: true,
//         children: [
//           {
//             label: "Reliability Test reports",
//             pathname: "/inspection/commissioning/reliability-test-reports",
//           },
//           {
//             label: "One Year Operation Test reports",
//             pathname:
//               "/inspection/commissioning/one-year-operation-test-reports",
//           },
//         ],
//       },
//     ],
//   },
// ];
