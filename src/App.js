import React from 'react';
import DataTable from './components/datatable/DataTable';
import RiskSummary from './components/risksummary/RiskSummary';
import LLMInsights from './components/llminsights/LLMInsights';
import "./index.css";

const App = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">Blood Metrics Dashboard</h1>
      <RiskSummary />
      <DataTable />
      <LLMInsights />
    </div>
  );
};

export default App;
