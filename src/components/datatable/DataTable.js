import React from 'react';
import  sampleData  from '../../data/SampleData.json';
import { determineRiskLevel, getColor } from '../../utils/RiskUtils';

const DataTable = () => {
  return (
    <div className="overflow-auto rounded-lg shadow-lg mt-6">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {['ID', 'Date', 'A1C (%)', 'LDL (mg/dL)', 'Vitamin D (ng/mL)', 'Blood Pressure', 'Glucose (mg/dL)'].map((header) => (
              <th key={header} className="py-2 px-4 text-left bg-gray-200 font-semibold text-gray-700">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sampleData.map((patient) => (
            <tr key={patient.id} className="text-gray-700">
              <td className="py-2 px-4">{patient.id}</td>
              <td className="py-2 px-4">{patient.date}</td>
              {['a1c', 'ldl', 'vitaminD', 'bloodPressure', 'glucose'].map((metric) => (
                <td key={metric} className={`py-2 px-4 ${getColor(determineRiskLevel(metric, patient[metric]))}`}>
                  {patient[metric]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
