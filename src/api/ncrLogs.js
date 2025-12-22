// src/api/ncrLogs.js
// Static mock data for NCR Logs since backend is not ready

const mockNCRLogs = [
  {
    id: 1,
    ncrNo: "NCR-001",
    discipline: "Civil",
    standardsViolated: {
      docRef: "ASTM A36",
      paraNo: "3.2.1",
    },
    description: "Concrete mix ratio not as per specification",
    originator: "John Doe",
    dateOfIssue: "2024-01-15",
    completionTargetDate: "2024-02-15",
    revisedTargetDate: "2024-02-20",
    completionDate: "2024-02-18",
    actionTaken: "Corrected mix ratio and retested",
    status: "Closed",
  },
  {
    id: 2,
    ncrNo: "NCR-002",
    discipline: "Mechanical",
    standardsViolated: {
      docRef: "API 650",
      paraNo: "5.1.3",
    },
    description: "Welding procedure not followed",
    originator: "Jane Smith",
    dateOfIssue: "2024-02-01",
    completionTargetDate: "2024-03-01",
    revisedTargetDate: "",
    completionDate: "",
    actionTaken: "Retrained welders and reinspected",
    status: "Open",
  },
  {
    id: 3,
    ncrNo: "NCR-003",
    discipline: "Electrical",
    standardsViolated: {
      docRef: "IEC 60204",
      paraNo: "6.2",
    },
    description: "Cable sizing incorrect",
    originator: "Bob Johnson",
    dateOfIssue: "2024-01-20",
    completionTargetDate: "2024-02-20",
    revisedTargetDate: "2024-03-01",
    completionDate: "",
    actionTaken: "Recalculated and replaced cables",
    status: "In Progress",
  },
];

export const getNCRLogs = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { data: mockNCRLogs };
};

export const createNCRLog = async (data) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newLog = { ...data, id: Date.now() };
  mockNCRLogs.push(newLog);
  return { data: newLog };
};

export const updateNCRLog = async (id, data) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockNCRLogs.findIndex((log) => log.id === id);
  if (index !== -1) {
    mockNCRLogs[index] = { ...mockNCRLogs[index], ...data };
    return { data: mockNCRLogs[index] };
  }
  throw new Error("NCR Log not found");
};

export const deleteNCRLog = async (id) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockNCRLogs.findIndex((log) => log.id === id);
  if (index !== -1) {
    mockNCRLogs.splice(index, 1);
    return { data: null };
  }
  throw new Error("NCR Log not found");
};
