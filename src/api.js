import axios from "axios";

// const api = axios.create({ baseURL: "/api" });

const api = axios.create({
  baseURL: "https://d2zt43phpp4rd1.cloudfront.net/api",
});

export const getHealth = () => api.get("/health").then((r) => r.data);
export const getSummary = () => api.get("/dashboard/summary").then((r) => r.data);
export const getCharts = () => api.get("/dashboard/charts").then((r) => r.data);
export const getJobProfile = () => api.get("/dashboard/job-profile").then((r) => r.data);
export const getTrapStats = () => api.get("/dashboard/trap-stats").then((r) => r.data);

export const searchCandidates = (params) =>
  api.get("/candidates", { params }).then((r) => r.data);
export const getCandidate = (id) =>
  api.get(`/candidates/${id}`).then((r) => r.data);

export const sendChat = (message) =>
  api.post("/chat", { message }).then((r) => r.data);
export const getChatSuggestions = () =>
  api.get("/chat/suggestions").then((r) => r.data);

export const generateSubmission = (team) =>
  api.post("/submission/generate", null, { params: { team } }).then((r) => r.data);
export const validateSubmission = (team) =>
  api.get("/submission/validate", { params: { team } }).then((r) => r.data);

export async function downloadSubmission(team) {
  const safe = team.replace(/[^\w-]/g, "") || "team_talentai";
  const response = await api.get("/submission/download", {
    params: { team },
    responseType: "blob",
  });
  const blob = new Blob([response.data], { type: "text/csv;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safe}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export async function downloadReportPdf(team) {
  const safe = team.replace(/[^\w-]/g, "") || "team_talentai";
  const response = await api.get("/submission/report.pdf", {
    params: { team },
    responseType: "blob",
  });
  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safe}_report.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export const downloadSubmissionUrl = (team) =>
  `/api/submission/download?team=${encodeURIComponent(team)}`;
export const downloadReportPdfUrl = (team) =>
  `/api/submission/report.pdf?team=${encodeURIComponent(team)}`;

export default api;










// import axios from "axios";

// // const api = axios.create({ baseURL: "/api" });
// const api = axios.create({
//   baseURL: "https://d2zt43phpp4rd1.cloudfront.net/api",
// });

// export const getHealth = () => api.get("/health").then((r) => r.data);
// export const getSummary = () => api.get("/dashboard/summary").then((r) => r.data);
// export const getCharts = () => api.get("/dashboard/charts").then((r) => r.data);
// export const getJobProfile = () => api.get("/dashboard/job-profile").then((r) => r.data);
// export const getTrapStats = () => api.get("/dashboard/trap-stats").then((r) => r.data);

// export const searchCandidates = (params) =>
//   api.get("/candidates", { params }).then((r) => r.data);
// export const getCandidate = (id) =>
//   api.get(`/candidates/${id}`).then((r) => r.data);

// export const sendChat = (message) =>
//   api.post("/chat", { message }).then((r) => r.data);
// export const getChatSuggestions = () =>
//   api.get("/chat/suggestions").then((r) => r.data);

// export const generateSubmission = (team) =>
//   api.post("/submission/generate", null, { params: { team } }).then((r) => r.data);
// export const validateSubmission = (team) =>
//   api.get("/submission/validate", { params: { team } }).then((r) => r.data);

// export async function downloadSubmission(team) {
//   const safe = team.replace(/[^\w-]/g, "") || "team_talentai";
//   const response = await api.get("/submission/download", {
//     params: { team },
//     responseType: "blob",
//   });
//   const blob = new Blob([response.data], { type: "text/csv;charset=utf-8" });
//   const url = window.URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = `${safe}.csv`;
//   document.body.appendChild(link);
//   link.click();
//   link.remove();
//   window.URL.revokeObjectURL(url);
// }

// export const downloadSubmissionUrl = (team) =>
//   `/api/submission/download?team=${encodeURIComponent(team)}`;
// export const downloadReportPdfUrl = (team) =>
//   `/api/submission/report.pdf?team=${encodeURIComponent(team)}`;

// export default api;

