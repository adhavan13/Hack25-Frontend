import React from 'react';
import { 
  PieChart, Pie, BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  Cell
} from 'recharts';
import { 
  DollarSign, TrendingUp, Clock, Users, 
  CheckCircle, AlertTriangle, FileText, Award
} from 'lucide-react';

const Dashboard = () => {
  // Real government data
  const governmentData = {
    "categories": [
      {
        "name": "Agriculture and Allied Services",
        "budget_allocated": 15000000,
        "budget_spent": 10200000,
        "projects": {
          "planned": 10,
          "ongoing": 7,
          "completed": 5
        }
      },
      {
        "name": "Rural Development",
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
        "name": "Irrigation and Flood Control",
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
        "name": "Industry and Minerals",
        "budget_allocated": 16000000,
        "budget_spent": 10500000,
        "projects": {
          "planned": 8,
          "ongoing": 6,
          "completed": 3
        }
      },
      {
        "name": "Transport and Communications",
        "budget_allocated": 25000000,
        "budget_spent": 18700000,
        "projects": {
          "planned": 15,
          "ongoing": 10,
          "completed": 9
        }
      },
      {
        "name": "Scientific Services and Research",
        "budget_allocated": 7000000,
        "budget_spent": 4200000,
        "projects": {
          "planned": 5,
          "ongoing": 2,
          "completed": 2
        }
      },
      {
        "name": "Social and Community Services",
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
        "name": "Local Level Plan Programmes",
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

  // Calculate totals
  const totalBudgetAllocated = governmentData.categories.reduce((sum, cat) => sum + cat.budget_allocated, 0);
  const totalBudgetSpent = governmentData.categories.reduce((sum, cat) => sum + cat.budget_spent, 0);
  const spentPercentage = Math.round((totalBudgetSpent / totalBudgetAllocated) * 100);

  // Calculate project totals
  const totalProjects = governmentData.categories.reduce((acc, cat) => ({
    planned: acc.planned + cat.projects.planned,
    ongoing: acc.ongoing + cat.projects.ongoing,
    completed: acc.completed + cat.projects.completed
  }), { planned: 0, ongoing: 0, completed: 0 });

  // Prepare data for charts
  const topExpenditureData = governmentData.categories
    .sort((a, b) => b.budget_spent - a.budget_spent)
    .slice(0, 6)
    .map((cat, index) => ({
      sector: cat.name.length > 25 ? cat.name.substring(0, 25) + '...' : cat.name,
      amount: Math.round(cat.budget_spent / 1000000), // Convert to millions
      allocated: Math.round(cat.budget_allocated / 1000000),
      color: `hsl(0, 0%, ${20 + index * 12}%)`
    }));

  const budgetUtilizationData = governmentData.categories
    .slice(0, 6)
    .map((cat, index) => ({
      name: cat.name.length > 12 ? cat.name.substring(0, 12) + '...' : cat.name,
      utilized: Math.round((cat.budget_spent / cat.budget_allocated) * 100),
      color: `hsl(0, 0%, ${20 + index * 12}%)`
    }));

  const projectStatusData = [
    { status: 'Planned', count: totalProjects.planned, color: '#404040' },
    { status: 'Ongoing', count: totalProjects.ongoing, color: '#808080' },
    { status: 'Completed', count: totalProjects.completed, color: '#000000' }
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

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-gray-100">
          <Icon className="w-6 h-6 text-black" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
            trend > 0 ? 'bg-gray-200 text-gray-800' : 
            trend < 0 ? 'bg-gray-300 text-gray-900' : 
            'bg-gray-100 text-gray-800'
          }`}>
            {trend > 0 ? '↗' : trend < 0 ? '↘' : '→'} {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className="text-3xl font-bold text-black mb-1">{value}</h3>
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
    </div>
  );

  const GaugeChart = ({ percentage, title, icon: Icon }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-6">
        <div className="p-2 rounded-lg bg-gray-100 mr-3">
          <Icon className="w-5 h-5 text-black" />
        </div>
        <h3 className="text-sm font-semibold text-black">{title}</h3>
      </div>
      <div className="relative w-36 h-36 mx-auto">
        <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="35"
            fill="none" stroke="#E5E7EB" strokeWidth="6"
          />
          <circle
            cx="50" cy="50" r="35"
            fill="none" stroke="#000000" strokeWidth="6"
            strokeDasharray={`${percentage * 2.2} 220`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-black">{percentage}%</span>
          <span className="text-xs text-gray-500 mt-1">Complete</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Government Dashboard</h1>
          <p className="text-gray-600">Comprehensive overview of public sector performance</p>
        </header>

        {/* Row 1 - Financials */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-8">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <MetricCard
              title="Total Budget"
              value={`₹${Math.round(totalBudgetAllocated / 10000000)}Cr`}
              subtitle={`${spentPercentage}% Spent (₹${Math.round(totalBudgetSpent / 10000000)}Cr)`}
              icon={DollarSign}
              trend={spentPercentage > 70 ? 5.2 : -2.3}
            />
            <MetricCard
              title="Active Departments"
              value="12"
              icon={Users}
            />
          </div>
          
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
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
                  {budgetUtilizationData.slice(0, 6).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Utilization']}
                  labelStyle={{ color: '#000000' }}
                  contentStyle={{ 
                    backgroundColor: '#F9FAFB', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span style={{ color: '#000000', fontSize: '12px' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-black" />
              Top Expenditure by Sector (₹ Crores)
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart 
                data={topExpenditureData} 
                layout="vertical"
                margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#000000' }} />
                <YAxis 
                  type="category"
                  dataKey="sector" 
                  tick={{ fontSize: 10, fill: '#000000' }} 
                  width={120}
                />
                <Tooltip 
                  formatter={(value) => [`₹${value} Cr`, 'Amount Spent']}
                  labelStyle={{ color: '#000000' }}
                  contentStyle={{ 
                    backgroundColor: '#F9FAFB', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="amount" 
                  fill="#000000" 
                  radius={[0, 6, 6, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 2 - Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
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
                    backgroundColor: '#F9FAFB', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill={(entry) => entry.color}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <GaugeChart
            percentage={onTimePercentage}
            title="Project Completion Rate"
            icon={Clock}
          />

          <GaugeChart
            percentage={spentPercentage}
            title="Budget Utilization"
            icon={CheckCircle}
          />
        </div>

        {/* Row 3 - Citizen Services */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-black" />
              Service Delivery Performance
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={serviceTimeData}>
                <defs>
                  <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#000000" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#000000' }} />
                <YAxis tick={{ fontSize: 12, fill: '#000000' }} />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value} days`, 
                    name === 'time' ? 'Actual Time' : 'Target'
                  ]}
                  contentStyle={{ 
                    backgroundColor: '#F9FAFB', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="time" 
                  stroke="#000000" 
                  strokeWidth={2}
                  fill="url(#colorTime)" 
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#808080" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <GaugeChart
            percentage={92}
            title="Complaint Resolution"
            icon={AlertTriangle}
          />

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-black" />
              Citizen Satisfaction Trend
            </h3>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={satisfactionData}>
                <defs>
                  <linearGradient id="colorSatisfaction" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#000000" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#000000' }} />
                <YAxis domain={[6, 9]} tick={{ fontSize: 10, fill: '#000000' }} />
                <Tooltip 
                  formatter={(value) => [`${value}/10`, 'Satisfaction Score']}
                  contentStyle={{ 
                    backgroundColor: '#F9FAFB', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#000000" 
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
          </div>
        </div>

        {/* Row 4 - Transparency & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <GaugeChart
            percentage={87}
            title="Open Bidding Contracts"
            icon={Award}
          />

          <MetricCard
            title="Total Projects"
            value={totalProjects.planned + totalProjects.ongoing + totalProjects.completed}
            subtitle={`${totalProjects.completed} Completed, ${totalProjects.ongoing} Ongoing`}
            icon={FileText}
            trend={2.1}
          />

          <MetricCard
            title="Active Categories"
            value="12"
            subtitle="Government service categories"
            icon={TrendingUp}
            trend={1.5}
          />

          <MetricCard
            title="Budget Efficiency"
            value={`${100 - spentPercentage}%`}
            subtitle="Remaining budget allocation"
            icon={DollarSign}
            trend={spentPercentage < 80 ? 3.2 : -1.8}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;