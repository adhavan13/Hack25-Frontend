import React, { useEffect } from 'react';
import { 
  PieChart, Pie, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  Cell
} from 'recharts';
import { 
  DollarSign, TrendingUp, Clock, Users, 
  CheckCircle, AlertTriangle, FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import useDashboardStore from '../../store/dashboard';

const Dashboard = () => {
  // Get location, dashboardData, loading, and fetchDashboardData from store
  const { location, dashboardData, loading, fetchDashboardData, setLocation } = useDashboardStore();

  // Track if initial load is done
  const [initialLoaded, setInitialLoaded] = React.useState(false);

  // Set default location to "Wayanad" after skeleton loading, only on first load
  useEffect(() => {
    if (!loading && !dashboardData && !initialLoaded) {
      setLocation("Wayanad");
      setInitialLoaded(true);
    }
    // eslint-disable-next-line
  }, [loading, dashboardData]);

  // Fetch data when location changes
  useEffect(() => {
    if (location && location.trim()) {
      fetchDashboardData();
    }
    // eslint-disable-next-line
  }, [location]);

  // Show loading skeleton (matches dashboard layout)
  if (loading || !dashboardData) {
    return (
      <div className="min-h-screen bg-white pt-6 md:pt-10 overflow-auto">
        <div className="px-2 sm:px-4 md:px-8 lg:px-16 pb-6 md:pb-10">
          <header className="mb-6 md:mb-10">
            <div className="h-8 w-80 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-4 w-64 bg-gray-100 rounded animate-pulse" />
          </header>
          {/* Row 1 - Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-6 md:mb-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md flex flex-col gap-2 animate-pulse">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gray-200" />
                  <div className="w-12 h-5 rounded-full bg-gray-200" />
                </div>
                <div className="h-8 w-24 bg-gray-200 rounded mb-1" />
                <div className="h-4 w-20 bg-gray-100 rounded mb-1" />
                <div className="h-3 w-16 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-10">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md animate-pulse" style={{ minHeight: 320 }}>
                <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
                <div className="h-48 w-full bg-gray-100 rounded" />
              </div>
            ))}
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-10">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md animate-pulse" style={{ minHeight: 260 }}>
                <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
                <div className="h-32 w-full bg-gray-100 rounded" />
              </div>
            ))}
          </div>
          {/* Row 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md animate-pulse">
                <div className="h-8 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-20 bg-gray-100 rounded mb-1" />
                <div className="h-3 w-16 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Prepare data from API response
  const categories = Object.keys(dashboardData)
    .filter(key => key !== 'satisfactionData' && key !== 'metrics')
    .map(key => dashboardData[key]);

  // Calculate totals
  // Assign total budget randomly between 10-30 crores (in INR)
  const minBudget = 100000000; // 10 Cr
  const maxBudget = 300000000; // 30 Cr
  let totalBudgetAllocated = Math.floor(Math.random() * (maxBudget - minBudget + 1)) + minBudget;
  totalBudgetAllocated = totalBudgetAllocated * 10; // Multiply by 10 as requested
  // Spent should be less than allocated, e.g., 60-98% of allocated
  let totalBudgetSpent = Math.floor(
    totalBudgetAllocated * (0.6 + Math.random() * 0.38)
  );
  const spentPercentage = totalBudgetAllocated > 0 ? Math.round((totalBudgetSpent / totalBudgetAllocated) * 100) : 0;

  // Calculate project totals
  const totalProjects = categories.reduce((acc, cat) => {
    // Ensure planned is between 2 and 20
    let planned = cat.planned;
    if (!planned || planned < 2 || planned > 20) {
      planned = Math.floor(Math.random() * 19) + 2; // 2 to 20 inclusive
    }
    return {
      planned: acc.planned + planned,
      ongoing: acc.ongoing + (cat.ongoing || 0),
      completed: acc.completed + (cat.completed || 0)
    };
  }, { planned: 0, ongoing: 0, completed: 0 });

  // Professional color palette
  const chartColors = [
    '#2563eb', '#14b8a6', '#f59e42', '#a78bfa', '#64748b', '#f43f5e',
    '#facc15', '#6366f1', '#10b981', '#eab308', '#0ea5e9', '#d946ef'
  ];

  // Prepare data for charts
  const topExpenditureData = categories
    .sort((a, b) => (b.budget_spent || 0) - (a.budget_spent || 0))
    .slice(0, 6)
    .map((cat, index) => ({
      sector: typeof cat.name === 'string' ? cat.name : '', // always use full name
      amount: Math.round((cat.budget_spent || 0) / 10000000) / 10, // Crores, 1 decimal
      allocated: Math.round((cat.budget_allocated || 0) / 10000000) / 10,
      color: chartColors[index % chartColors.length]
    }));

  const budgetUtilizationData = categories
    .map((cat, index) => {
      // Prevent 100% utilization for any category
      let utilized = cat.budget_allocated
        ? Math.round((cat.budget_spent / cat.budget_allocated) * 100)
        : 0;
      if (utilized >= 100) utilized = 98;
      return {
        name: typeof cat.name === 'string' ? cat.name : '',
        utilized,
        color: chartColors[index % chartColors.length]
      };
    });

  const projectStatusData = [
    { status: 'Planned', count: totalProjects.planned, color: chartColors[0] },
    { status: 'Ongoing', count: totalProjects.ongoing, color: chartColors[1] },
    { status: 'Completed', count: totalProjects.completed, color: chartColors[2] }
  ];

  // On-time delivery percentage (mock: completed/(completed+ongoing))
  const onTimePercentage = (totalProjects.completed + totalProjects.ongoing) > 0
    ? Math.round((totalProjects.completed / (totalProjects.completed + totalProjects.ongoing)) * 100)
    : 0;

  // Use satisfactionData and metrics from API
  const satisfactionData = dashboardData.satisfactionData || [];
  const metrics = dashboardData.metrics || {};

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
            value={`₹${Math.round(totalBudgetAllocated / 10000000) / 10}Cr`}
            subtitle={`${spentPercentage}% Spent (₹${Math.round(totalBudgetSpent / 10000000) / 10}Cr)`}
            icon={DollarSign}
            trend={metrics.budgetTrendPercentage}
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
            trend={metrics.projectTrendPercentage}
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
            <h3
              className="mb-6 flex items-center"
              style={{ fontSize: 15, fontWeight: 500, color: "#000" }}
            >
              <TrendingUp className="w-5 h-5 mr-2 text-black" />
              Budget Utilization by Category
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={budgetUtilizationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="utilized"
                  nameKey="name"
                >
                  {budgetUtilizationData.map((entry, index) => (
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
                    <span style={{ color: '#000000', fontSize: '12px', whiteSpace: 'pre-line' }}>
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
                  wrapperStyle={{
                    maxWidth: '100%',
                    whiteSpace: 'pre-line',
                    textOverflow: 'unset',
                    overflow: 'visible'
                  }}
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
            <h3
              className="mb-6 flex items-center"
              style={{ fontSize: 15, fontWeight: 500, color: "#000" }}
            >
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
                  tick={{ fontSize: 14, fill: '#000000', fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="sector"
                  tick={{ fontSize: 15, fill: '#000000', fontWeight: 500 }}
                  width={240}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  tickFormatter={value => value}
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
                  cursor={false} // Remove gray overlay on hover
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
            <h3
              className="mb-6 flex items-center"
              style={{ fontSize: 15, fontWeight: 500, color: "#000" }}
            >
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
            <h3
              className="mb-6 flex items-center"
              style={{ fontSize: 15, fontWeight: 500, color: "#000" }}
            >
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
              <span className="text-3xl font-bold text-black">
                {satisfactionData.length > 0 ? satisfactionData[satisfactionData.length - 1].score : '-'}
              </span>
              <span className="text-gray-500 text-sm ml-1">/10</span>
              <p className="text-xs text-gray-600 mt-1">
                {satisfactionData.length > 1
                  ? `${(satisfactionData[satisfactionData.length - 1].score - satisfactionData[satisfactionData.length - 2].score).toFixed(1)} from last month`
                  : ''}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Row 4 - Only show metrics that exist in the response */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } }
          }}
        >
          <MetricCard
            title="Budget Efficiency"
            value={`${100 - spentPercentage}%`}
            subtitle="Remaining budget allocation"
            icon={DollarSign}
            trend={metrics.efficiencyTrendPercentage}
            index={0}
          />
          <GaugeChart
            percentage={metrics.complaintResolutionPercentage || 0}
            title="Complaint Resolution"
            icon={AlertTriangle}
            index={1}
          />
          <GaugeChart
            percentage={metrics.transparencyPercentage || 0}
            title="Transparency"
            icon={TrendingUp}
            index={2}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;