import React, { useEffect } from 'react';
import { 
  PieChart, Pie, BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  Cell
} from 'recharts';
import { 
  DollarSign, TrendingUp, Clock, Users, 
  CheckCircle, AlertTriangle, FileText, Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import useDashboardStore from '../../store/dashboard';

const Dashboard = () => {
  // Get dashboard data from store
  const { 
    dashboardData, 
    loading, 
    error, 
    location, 
    fetchDashboardData 
  } = useDashboardStore();

  // Fetch data on component mount only if location is set
  useEffect(() => {
    if (location && location.trim()) {
      fetchDashboardData();
    }
  }, [location, fetchDashboardData]);

  // Skeleton Loading Components
  const SkeletonMetricCard = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm border animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
      </div>
      <div className="mt-4 flex items-center">
        <div className="h-4 bg-gray-200 rounded w-12 mr-2"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );

  const SkeletonChart = ({ height = "h-80" }) => (
    <div className={`bg-white rounded-lg p-6 shadow-sm border animate-pulse ${height}`}>
      <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
      <div className="h-full bg-gray-100 rounded"></div>
    </div>
  );

  const SkeletonProjectCard = () => (
    <div className="bg-white rounded-lg p-4 shadow-sm border animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  const DashboardSkeleton = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonMetricCard key={index} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SkeletonChart />
          <SkeletonChart />
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonProjectCard key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Show empty state when no location is selected
  if (!location || !location.trim()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
            <FileText size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Select a Kerala District
          </h2>
          <p className="text-gray-600 mb-6">
            Please search and select a valid Kerala district using the search bar above to view the government dashboard data.
          </p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return <DashboardSkeleton />;
  }

  // Show error state
  if (error && !dashboardData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-[#72e3ad] text-black rounded-lg hover:bg-opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Extract data from API response or use defaults
  const apiData = dashboardData || {};
  
  // Extract new sector data from API response
  const newSectorData = {
    "Agriculture and Allied Services": apiData["Agriculture and Allied Services"] || {
      "name": "Agriculture and Allied Services",
      "total_projects": 0,
      "planned": 0,
      "ongoing": 0,
      "completed": 0,
      "budget_allocated": 0,
      "budget_spent": 0
    },
    "Rural Development": apiData["Rural Development"] || {
      "name": "Rural Development", 
      "total_projects": 0,
      "planned": 0,
      "ongoing": 0,
      "completed": 0,
      "budget_allocated": 0,
      "budget_spent": 0
    },
    "Irrigation and Flood Control": apiData["Irrigation and Flood Control"] || {
      "name": "Irrigation and Flood Control",
      "total_projects": 0,
      "planned": 0,
      "ongoing": 0,
      "completed": 0,
      "budget_allocated": 0,
      "budget_spent": 0
    }
  };

  const newMetrics = apiData.metrics || {
    "transparencyPercentage": 0,
    "complaintResolutionPercentage": 0,
    "onTimeTrendPercentage": 0,
    "budgetTrendPercentage": 0,
    "projectTrendPercentage": 0,
    "categoryTrendPercentage": 0,
    "efficiencyTrendPercentage": 0
  };

  const enhancedSatisfactionData = apiData.satisfactionData || [];
  // Real government data
  const governmentData = {
    "categories": [
      {
        "name": "Agriculture",
        "budget_allocated": 15000000,
        "budget_spent": 10200000,
        "projects": {
          "planned": 10,
          "ongoing": 7,
          "completed": 5
        }
      },
      {
        "name": "Rural Dev.",
        "budget_allocated": 20000000,
        "budget_spent": 14500000,
        "projects": {
          "planned": 12,
          "ongoing": 8,
          "completed": 9
        }
      },
      {
        "name": "Co-operation",
        "budget_allocated": 8000000,
        "budget_spent": 5200000,
        "projects": {
          "planned": 6,
          "ongoing": 3,
          "completed": 2
        }
      },
      {
        "name": "Irrigation & Flood",
        "budget_allocated": 18000000,
        "budget_spent": 12000000,
        "projects": {
          "planned": 9,
          "ongoing": 6,
          "completed": 4
        }
      },
      {
        "name": "Energy",
        "budget_allocated": 22000000,
        "budget_spent": 16500000,
        "projects": {
          "planned": 11,
          "ongoing": 8,
          "completed": 6
        }
      },
      {
        "name": "Industry & Minerals",
        "budget_allocated": 16000000,
        "budget_spent": 10500000,
        "projects": {
          "planned": 8,
          "ongoing": 6,
          "completed": 3
        }
      },
      {
        "name": "Transport & Comm.",
        "budget_allocated": 25000000,
        "budget_spent": 18700000,
        "projects": {
          "planned": 15,
          "ongoing": 10,
          "completed": 9
        }
      },
      {
        "name": "Scientific Research",
        "budget_allocated": 7000000,
        "budget_spent": 4200000,
        "projects": {
          "planned": 5,
          "ongoing": 2,
          "completed": 2
        }
      },
      {
        "name": "Social Services",
        "budget_allocated": 14000000,
        "budget_spent": 10000000,
        "projects": {
          "planned": 9,
          "ongoing": 5,
          "completed": 4
        }
      },
      {
        "name": "Economic Services",
        "budget_allocated": 12000000,
        "budget_spent": 8000000,
        "projects": {
          "planned": 7,
          "ongoing": 4,
          "completed": 3
        }
      },
      {
        "name": "General Services",
        "budget_allocated": 6000000,
        "budget_spent": 3500000,
        "projects": {
          "planned": 4,
          "ongoing": 2,
          "completed": 1
        }
      },
      {
        "name": "Local Plan Prog.",
        "budget_allocated": 10000000,
        "budget_spent": 7200000,
        "projects": {
          "planned": 6,
          "ongoing": 4,
          "completed": 3
        }
      }
    ]
  };

  // Combine new sector data with existing data
  const enhancedCategories = [...governmentData.categories];
  
  // Add new sector data to categories
  Object.values(newSectorData).forEach(sector => {
    enhancedCategories.push({
      name: sector.name.length > 15 ? sector.name.substring(0, 15) + '...' : sector.name,
      budget_allocated: sector.budget_allocated,
      budget_spent: sector.budget_spent,
      projects: {
        planned: sector.planned,
        ongoing: sector.ongoing,
        completed: sector.completed
      }
    });
  });

  // Calculate totals using enhanced data
  const totalBudgetAllocated = enhancedCategories.reduce((sum, cat) => sum + cat.budget_allocated, 0);
  const totalBudgetSpent = enhancedCategories.reduce((sum, cat) => sum + cat.budget_spent, 0);
  const spentPercentage = Math.round((totalBudgetSpent / totalBudgetAllocated) * 100);

  // Calculate project totals using enhanced data
  const totalProjects = enhancedCategories.reduce((acc, cat) => ({
    planned: acc.planned + cat.projects.planned,
    ongoing: acc.ongoing + cat.projects.ongoing,
    completed: acc.completed + cat.projects.completed
  }), { planned: 0, ongoing: 0, completed: 0 });

  // Professional color palette
  const chartColors = [
    '#2563eb', // blue
    '#14b8a6', // teal
    '#f59e42', // orange
    '#a78bfa', // purple
    '#64748b', // slate
    '#f43f5e', // rose
    '#facc15', // yellow
    '#6366f1', // indigo
    '#10b981', // emerald
    '#eab308', // gold
    '#0ea5e9', // sky
    '#d946ef'  // fuchsia
  ];

  // Prepare data for charts
  const topExpenditureData = governmentData.categories
    .sort((a, b) => b.budget_spent - a.budget_spent)
    .slice(0, 6)
    .map((cat, index) => ({
      sector: cat.name.length > 25 ? cat.name.substring(0, 25) + '...' : cat.name,
      amount: Math.round(cat.budget_spent / 1000000), // Convert to millions
      allocated: Math.round(cat.budget_allocated / 1000000),
      color: chartColors[index % chartColors.length]
    }));

  const budgetUtilizationData = governmentData.categories
    .slice(0, 6)
    .map((cat, index) => ({
      name: cat.name.length > 12 ? cat.name.substring(0, 12) + '...' : cat.name,
      utilized: Math.round((cat.budget_spent / cat.budget_allocated) * 100),
      color: chartColors[index % chartColors.length]
    }));

  // Add this missing definition:
  const projectStatusData = [
    { status: 'Planned', count: totalProjects.planned, color: chartColors[0] },
    { status: 'Ongoing', count: totalProjects.ongoing, color: chartColors[1] },
    { status: 'Completed', count: totalProjects.completed, color: chartColors[2] }
  ];

  // Calculate on-time delivery percentage (mock calculation)
  const onTimePercentage = Math.round((totalProjects.completed / (totalProjects.completed + totalProjects.ongoing)) * 100);

  // Sample service data (you can replace with real data)
  const serviceTimeData = [
    { month: 'Jan', time: 5.2, target: 4.0 },
    { month: 'Feb', time: 4.8, target: 4.0 },
    { month: 'Mar', time: 4.5, target: 4.0 },
    { month: 'Apr', time: 4.2, target: 4.0 },
    { month: 'May', time: 3.9, target: 4.0 },
    { month: 'Jun', time: 3.7, target: 4.0 }
  ];

  const satisfactionData = [
    { month: 'Jan', score: 7.2, target: 8.0 },
    { month: 'Feb', score: 7.5, target: 8.0 },
    { month: 'Mar', score: 7.8, target: 8.0 },
    { month: 'Apr', score: 8.1, target: 8.0 },
    { month: 'May', score: 8.3, target: 8.0 },
    { month: 'Jun', score: 8.5, target: 8.0 }
  ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        type: "spring"
      }
    })
  };

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend, index }) => (
    <motion.div
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col gap-2"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      <div className="flex items-center justify-between mb-2">
        {/* If icon is green, use bg-gray-100 and text-black */}
        <div className="p-3 rounded-lg bg-gray-100">
          <Icon className="w-6 h-6 text-black" />
        </div>
        {trend !== undefined && (
          <div className="flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-black">
            {trend > 0 ? '↗' : trend < 0 ? '↘' : '→'} {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className="text-3xl font-bold text-black mb-1">{value}</h3>
      <p className="text-gray-700 text-sm font-medium">{title}</p>
      {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
    </motion.div>
  );

  const GaugeChart = ({ percentage, title, icon: Icon, index }) => (
    <motion.div
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      <div className="flex items-center mb-4">
        {/* If icon is green, use bg-gray-100 and text-black */}
        <div className="p-2 rounded-lg bg-gray-100 mr-3">
          <Icon className="w-5 h-5 text-black" />
        </div>
        <h3 className="text-sm font-semibold text-black">{title}</h3>
      </div>
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="35"
            fill="none" stroke="#E5E7EB" strokeWidth="6"
          />
          <circle
            cx="50" cy="50" r="35"
            fill="none" stroke="#72e3ad" strokeWidth="6"
            strokeDasharray={`${percentage * 2.2} 220`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-black">{percentage}%</span>
          <span className="text-xs text-gray-500 mt-1">Complete</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white pt-6 md:pt-10 overflow-auto">
      <div className="px-2 sm:px-4 md:px-8 lg:px-16 pb-6 md:pb-10">
        <header className="mb-6 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-1 md:mb-2">
            Government Dashboard for {location}
          </h1>
          <p className="text-gray-500 text-sm md:text-base">Comprehensive overview of public sector performance</p>
        </header>

        {/* Row 1 - Key Metrics */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-6 md:mb-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } }
          }}
        >
          <MetricCard
            title="Total Budget"
            value={`₹${Math.round(totalBudgetAllocated / 10000000)}Cr`}
            subtitle={`${spentPercentage}% Spent (₹${Math.round(totalBudgetSpent / 10000000)}Cr)`}
            icon={DollarSign}
            trend={spentPercentage > 70 ? 5.2 : -2.3}
            index={0}
          />
          <GaugeChart
            percentage={spentPercentage}
            title="Budget Utilization"
            icon={CheckCircle}
            index={1}
          />
          <GaugeChart
            percentage={onTimePercentage}
            title="Project Completion Rate"
            icon={Clock}
            index={2}
          />
          <MetricCard
            title="Total Projects"
            value={totalProjects.planned + totalProjects.ongoing + totalProjects.completed}
            subtitle={`${totalProjects.completed} Completed, ${totalProjects.ongoing} Ongoing`}
            icon={FileText}
            trend={2.1}
            index={3}
          />
        </motion.div>

        {/* Row 2 - Financials & Projects */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } }
          }}
        >
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold text-black mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-black" />
              Budget Utilization by Category
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={budgetUtilizationData.slice(0, 6)}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="utilized"
                >
                  {/* Use professional palette for slices */}
                  {budgetUtilizationData.slice(0, 6).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Utilization']}
                  labelStyle={{ color: '#000000' }}
                  contentStyle={{ 
                    backgroundColor: '#F3F4F6', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    color: '#000000'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry, index) => (
                    <span style={{ color: '#000000', fontSize: '12px' }}>
                      <span style={{
                        display: 'inline-block',
                        width: 10,
                        height: 10,
                        backgroundColor: chartColors[index % chartColors.length],
                        borderRadius: '50%',
                        marginRight: 6,
                        verticalAlign: 'middle'
                      }}></span>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold text-black mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-black" />
              Top Expenditure by Sector (₹ Crores)
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={topExpenditureData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 60, bottom: 10 }}
                barCategoryGap={18}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 12, fill: '#000000' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="sector"
                  tick={{ fontSize: 13, fill: '#000000', fontWeight: 500 }}
                  width={200}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value) => [`₹${value} Cr`, 'Amount Spent']}
                  labelStyle={{ color: '#000000' }}
                  contentStyle={{
                    backgroundColor: '#F3F4F6',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    color: '#000000'
                  }}
                />
                <Bar
                  dataKey="amount"
                  radius={[8, 8, 8, 8]}
                  barSize={18}
                >
                  {topExpenditureData.map((entry, index) => (
                    <Cell key={`bar-cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>

        {/* Row 3 - Projects by Status & Citizen Satisfaction Trend */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } }
          }}
        >
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold text-black mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-black" />
              Projects by Status
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={projectStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="status" tick={{ fontSize: 12, fill: '#000000' }} />
                <YAxis tick={{ fontSize: 12, fill: '#000000' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#F3F4F6', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    color: '#000000'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  radius={[4, 4, 0, 0]}
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`status-bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold text-black mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-black" />
              Citizen Satisfaction Trend
            </h3>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={satisfactionData}>
                <defs>
                  <linearGradient id="colorSatisfaction" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#000000' }} />
                <YAxis domain={[6, 9]} tick={{ fontSize: 10, fill: '#000000' }} />
                <Tooltip 
                  formatter={(value) => [`${value}/10`, 'Satisfaction Score']}
                  contentStyle={{ 
                    backgroundColor: '#F3F4F6', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    color: '#000000'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  fill="url(#colorSatisfaction)" 
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <span className="text-3xl font-bold text-black">8.5</span>
              <span className="text-gray-500 text-sm ml-1">/10</span>
              <p className="text-xs text-gray-600 mt-1">+0.2 from last month</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Row 4 - Active Departments, Active Categories, Budget Efficiency, Complaint Resolution */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } }
          }}
        >
          <MetricCard
            title="Active Departments"
            value="12"
            icon={Users}
            index={0}
          />
          <MetricCard
            title="Active Categories"
            value="12"
            subtitle="Government service categories"
            icon={TrendingUp}
            trend={1.5}
            index={1}
          />
          <MetricCard
            title="Budget Efficiency"
            value={`${100 - spentPercentage}%`}
            subtitle="Remaining budget allocation"
            icon={DollarSign}
            trend={spentPercentage < 80 ? 3.2 : -1.8}
            index={2}
          />
          <GaugeChart
            percentage={92}
            title="Complaint Resolution"
            icon={AlertTriangle}
            index={3}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;