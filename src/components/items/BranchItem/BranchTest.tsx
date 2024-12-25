import React from 'react';
import { TestResultDto } from '../../../infrastructure/dtos/TestResultDto';

export const calculateSuccessRate = (testResult: TestResultDto | null) => {
  if (!testResult) return null;
  
  let passCount = 0;
  let totalCount = 0;

  testResult.actions.forEach(action => {
    if(action._class === "hudson.tasks.junit.TestResultAction") {
      passCount = action.passCount;
      totalCount = action.totalCount;
    }
  });

  if (totalCount === 0) return 0;

  const successRate = (passCount / totalCount) * 100;
  return Math.round(successRate);
};

export const getFillColor = (rate: number | null) => {
  if (rate === null) return '#90CAF9';
  if (rate >= 75) return '#4CAF50';
  if (rate >= 50) return '#FDD835';
  if (rate >= 25) return '#FB8C00';
  return '#E53935';
};

export const getSuccessRateRange = (rate: number) => {
  const ranges = [
    { min: 0, max: 25, text: '%0-%25', color: '#E53935', gradient: 'linear-gradient(45deg, #F44336, #E53935)' },
    { min: 26, max: 50, text: '%26-%50', color: '#FB8C00', gradient: 'linear-gradient(45deg, #FF9800, #FB8C00)' },
    { min: 51, max: 75, text: '%51-%75', color: '#FDD835', gradient: 'linear-gradient(45deg, #FFEB3B, #FDD835)' },
    { min: 76, max: 100, text: '%76-%100', color: '#4CAF50', gradient: 'linear-gradient(45deg, #66BB6A, #4CAF50)' }
  ];

  const range = ranges.find(r => rate >= r.min && rate <= r.max);
  return {
    text: range ? range.text : 'Bilinmeyen Aralık',
    color: range ? range.color : '#90CAF9',
    gradient: range ? range.gradient : 'linear-gradient(45deg, #90CAF9, #64B5F6)'
  };
};
