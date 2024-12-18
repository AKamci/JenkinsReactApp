import JobColor from '../../../infrastructure/Enums/JenkinsJobColor'

export const colorSchemes = {
  [JobColor.red]: { 
    color: '#ff4d6d',
    shadow: '#ffe0e6',
    gradient: '#fff5f7'
  },
  [JobColor.blue]: {
    color: '#0496ff',
    shadow: '#e6f4ff',
    gradient: '#f0f9ff'
  },
  [JobColor.yellow]: {
    color: '#ffeb3b',
    shadow: '#fff176',
    gradient: '#ffeb3b'
  },
  [JobColor.yellow_anime]: {
    color: '#ffeb3b',
    shadow: '#fff176',
    gradient: '#ffeb3b'
  },
  [JobColor.blue_anime]: {
    color: '#0496ff', 
    shadow: '#e6f4ff',
    gradient: '#f0f9ff'
  },
  [JobColor.red_anime]: {
    color:'#ff4d6d',
    shadow: '#ffe0e6',
    gradient: '#fff5f7'
  },
  [JobColor.notbuilt]: {
    color: '#02c39a',
    shadow: '#e6fff7', 
    gradient: '#f0fff9'
  },
  default: {
    color: '#6c757d',
    shadow: '#f8f9fa',
    gradient: '#fdfdfd'
  }
};
