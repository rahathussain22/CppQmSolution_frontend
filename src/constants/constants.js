export const navItems = [
  {
    label: "Home",
    pathname: "/home",
    hasDropdown: false,
  },
  {
    label: "DCL",
    pathname: "/dcl",
    hasDropdown: true,
    dropdown: [
      { label: "Projects", pathname: "/dcl/projects" },
    ],
  },
  {
    label: "Engineering / Design",
    pathname: "/engineering-design",
    hasDropdown: true,
    dropdown: [
      { label: "Pipelines & Facilities", pathname: "/engineering-design/pipelines" },
      { label: "ISO Drawings with Weld & Spool details", pathname: "/engineering-design/iso-drawings" },
      { label: "Joints (Iso Drawing Wise)", pathname: "/engineering-design/joints" },
    ],
  },
  {
    label: "Quality & Procedures",
    pathname: "/quality-procedures",
    hasDropdown: true,
    dropdown: [
      { label: "Quality Procedures", pathname: "/quality-procedures/quality-procedures" },
      { label: "Approved Documents", pathname: "/quality-procedures/approved-documents" },
      { label: "PQP & ITP", pathname: "/quality-procedures/pqp-itp" },
      { label: "Method Statements", pathname: "/quality-procedures/method-statements" },
      { label: "Technical Queries (TQ)", pathname: "/quality-procedures/tq" },
      { label: "Third Party Testing & Subcontractors", pathname: "/quality-procedures/testing-subcontractors" },
      { label: "Audit & MRM Reports", pathname: "/quality-procedures/audit-reports" },
      { label: "MQMRs (approved)", pathname: "/quality-procedures/mqmrs" },
    ],
  },
  {
    label: "Materials & Documents",
    pathname: "/materials-documents",
    hasDropdown: true,
    dropdown: [
      { label: "Project Materials Documents", pathname: "/materials-documents/project-materials" },
      { label: "Material Receiving & Inspection", pathname: "/materials-documents/material-receiving" },
      { label: "Coating & Welding Consumables", pathname: "/materials-documents/coating-welding" },
      { label: "Project Reference Documents", pathname: "/materials-documents/project-reference" },
    ],
  },
  {
    label: "Quality Control Logs",
    pathname: "/quality-control-logs",
    hasDropdown: true,
    dropdown: [
      { label: "Master RFI Log", pathname: "/quality-control-logs/rfi-log" },
      { label: "Master NCR Log", pathname: "/quality-control-logs/ncr-log" },
      { label: "Master TQ Log", pathname: "/quality-control-logs/tq-log" },
    ],
  },
  {
    label: "Calibration & Welding",
    pathname: "/calibration-welding",
    hasDropdown: true,
    dropdown: [ 
      { label: "Calibration Logs", pathname: "/calibration-welding/calibration-logs" },
      { label: "Welding Machine Validation", pathname: "/calibration-welding/welding-validation" },
    ],
  },
  {
    label: "Inspection",
    pathname: "/inspection",
    hasDropdown: true,
    dropdown: [
      {
        label: "Welding Inspection",
        pathname: "/inspection/welding",
        dropdown: [
          { label: "Fit-Up Request", pathname: "/inspection/welding/fit-up-request" },
          { label: "Daily Welding Report", pathname: "/inspection/welding/daily-welding-report" },
          { label: "NDT Request & Test Reports", pathname: "/inspection/welding/ndt-reports" },
        ],
      },
      {
        label: "Coating Inspection",
        pathname: "/inspection/coating",
        dropdown: [
          { label: "Painting Schedule", pathname: "/inspection/coating/painting-schedule" },
          { label: "Pipeline Coating Reports", pathname: "/inspection/coating/coating-reports" },
        ],
      },
      {
        label: "Mechanical Inspection",
        pathname: "/inspection/mechanical",
        dropdown: [
          { label: "Scraper Trap Installation", pathname: "/inspection/mechanical/scraper-trap" },
          { label: "Crane Installation", pathname: "/inspection/mechanical/crane-installation" },
        ],
      },
      {
        label: "Hydrotest & Caliper Survey",
        pathname: "/inspection/hydrotest",
        dropdown: [
          { label: "Hydrotest Packages", pathname: "/inspection/hydrotest/packages" },
          { label: "Hydrotest Reports", pathname: "/inspection/hydrotest/reports" },
          { label: "Caliper Test Reports", pathname: "/inspection/hydrotest/caliper-reports" },
        ],
      },
      {
        label: "Civil & Electrical Inspection",
        pathname: "/inspection/civil-electrical",
        dropdown: [
          { label: "Concrete & Asphalt Testing", pathname: "/inspection/civil-electrical/concrete-asphalt" },
          { label: "Electrical Termination Reports", pathname: "/inspection/civil-electrical/electrical-termination" },
        ],
      },
    ],
  },
  {
    label: "Commissioning & Testing",
    pathname: "/commissioning-testing",
    hasDropdown: true,
    dropdown: [
      { label: "Site Acceptance Test (SAT)", pathname: "/commissioning-testing/sat" },
      { label: "Reliability Test Reports", pathname: "/commissioning-testing/reliability-reports" },
      { label: "Commissioning Reports", pathname: "/commissioning-testing/commissioning-reports" },
    ],
  },
  {
    label: "Project Reference Documents Archive",
    pathname: "/project-reference-documents",
    hasDropdown: true,
    dropdown: [
      { label: "Project Cut-off Date Acceptance Letter", pathname: "/project-reference-documents/cut-off-acceptance" },
      { label: "CPP Specifications CSSP", pathname: "/project-reference-documents/cpp-specifications" },
      { label: "International Code/Standards", pathname: "/project-reference-documents/international-codes" },
    ],
  },
  {
    label: "Project Materials Documents Archive",
    pathname: "/project-materials-documents",
    hasDropdown: true,
    dropdown: [
      { label: "Project Material Docs", pathname: "/project-materials-documents/material-docs" },
      { label: "Site Material Receiving Docs", pathname: "/project-materials-documents/material-receiving" },
      { label: "Material Preservation/Quarantine Log", pathname: "/project-materials-documents/material-preservation" },
      { label: "Welding Consumables Inspection Docs", pathname: "/project-materials-documents/welding-consumables" },
      { label: "Coating Related Inspection Docs", pathname: "/project-materials-documents/coating-inspection" },
    ],
  },
];