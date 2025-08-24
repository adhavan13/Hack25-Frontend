import { create } from "zustand";

const useDashboardStore = create((set, get) => ({
  // Location and language state
  location: "",
  language: "eng",

  // Dashboard data state
  dashboardData: null,
  loading: false,
  error: null,

  // Actions
  setLocation: (location) => set({ location }),
  setLanguage: (language) => set({ language }),

  // API function to fetch dashboard data
  fetchDashboardData: async () => {
    const { location, language } = get();

    set({ loading: true, error: null });

    try {
      // Remove CORS proxy, use direct API call
      const apiUrl = "https://hack25-backend-x7el.vercel.app/api/projects/getSummary";

      const response = await fetch(
        apiUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location,
            language,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      set({ dashboardData: data, loading: false });
      return data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      set({
        error: error.message,
        loading: false,
        // Fallback to mock data if API fails
        dashboardData: getMockDashboardData(),
      });

      return getMockDashboardData();
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

// Mock data function (fallback when API is not available)
const getMockDashboardData = () => ({
  "Agriculture and Allied Services": {
    name: "Agriculture and Allied Services",
    total_projects: 20,
    planned: 0,
    ongoing: 20,
    completed: 0,
    budget_allocated: 608000000,
    budget_spent: 200600000,
  },
  "Rural Development": {
    name: "Rural Development",
    total_projects: 20,
    planned: 0,
    ongoing: 20,
    completed: 0,
    budget_allocated: 1052000000,
    budget_spent: 356200000,
  },
  "Irrigation and Flood Control": {
    name: "Irrigation and Flood Control",
    total_projects: 20,
    planned: 0,
    ongoing: 20,
    completed: 0,
    budget_allocated: 1125000000,
    budget_spent: 366200000,
  },
  satisfactionData: [
    {
      month: "Jan",
      score: 7.9,
      target: 8,
    },
    {
      month: "Feb",
      score: 7.5,
      target: 8,
    },
    {
      month: "Mar",
      score: 7.1,
      target: 8,
    },
    {
      month: "Apr",
      score: 7.5,
      target: 8,
    },
    {
      month: "May",
      score: 8.1,
      target: 8,
    },
    {
      month: "Jun",
      score: 8.3,
      target: 8,
    },
  ],
  metrics: {
    transparencyPercentage: 80,
    complaintResolutionPercentage: 91,
    onTimeTrendPercentage: -1.6,
    budgetTrendPercentage: -2.8,
    projectTrendPercentage: 1.9,
    categoryTrendPercentage: 2.1,
    efficiencyTrendPercentage: 3.2,
  },
});

export default useDashboardStore;




