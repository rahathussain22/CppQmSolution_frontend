// src/api/tqLogs.js
// Static mock data for TQ Logs since backend is not ready

const mockTQLogs = [
  {
    id: 1,
    queryNo: "TQ-001",
    discipline: "Mechanical",
    subject: "Pipe Material Specification Clarification",
    description:
      "Need clarification on the pipe material grade for high-pressure lines in Zone A",
    originator: "John Smith",
    dateRaised: "2024-01-10",
    priority: "High",
    assignedTo: "Engineering Team",
    response:
      "Use ASTM A106 Grade B for high-pressure lines as per specification section 4.2.1",
    dateResponded: "2024-01-12",
    status: "Closed",
    referenceDocs: "Piping Specification Rev 3.2",
    projectCode: "PROJ-2024-001",
  },
  {
    id: 2,
    queryNo: "TQ-002",
    discipline: "Electrical",
    subject: "Cable Tray Installation Query",
    description:
      "Clarification needed on cable tray spacing requirements for control cables",
    originator: "Sarah Johnson",
    dateRaised: "2024-01-15",
    priority: "Medium",
    assignedTo: "Electrical Engineer",
    response: "",
    dateResponded: "",
    status: "In Progress",
    referenceDocs: "Electrical Standards Manual",
    projectCode: "PROJ-2024-001",
  },
  {
    id: 3,
    queryNo: "TQ-003",
    discipline: "Civil",
    subject: "Foundation Design Parameters",
    description:
      "Query regarding soil bearing capacity assumptions for equipment foundations",
    originator: "Mike Davis",
    dateRaised: "2024-01-18",
    priority: "High",
    assignedTo: "Geotechnical Engineer",
    response:
      "Soil bearing capacity confirmed at 150 kPa based on recent geotechnical report",
    dateResponded: "2024-01-20",
    status: "Closed",
    referenceDocs: "Geotechnical Report GR-2023-045",
    projectCode: "PROJ-2024-001",
  },
];

export const getTQLogs = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { data: mockTQLogs };
};

export const createTQLog = async (data) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newLog = { ...data, id: Date.now() };
  mockTQLogs.push(newLog);
  return { data: newLog };
};

export const updateTQLog = async (id, data) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockTQLogs.findIndex((log) => log.id === id);
  if (index !== -1) {
    mockTQLogs[index] = { ...mockTQLogs[index], ...data };
    return { data: mockTQLogs[index] };
  }
  throw new Error("TQ Log not found");
};

export const deleteTQLog = async (id) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockTQLogs.findIndex((log) => log.id === id);
  if (index !== -1) {
    mockTQLogs.splice(index, 1);
    return { data: null };
  }
  throw new Error("TQ Log not found");
};
