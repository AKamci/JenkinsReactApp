import { DeveloperMode, CheckCircle, Science, Rocket, BugReport, IntegrationInstructions, QuestionMark } from '@mui/icons-material';

export const branchIcons = {
  dev: { 
    icon: DeveloperMode, 
    label: 'dev', 
    order: 1,
    matcher: (name: string) => name === 'dev'
  },
  master: {
    icon: IntegrationInstructions, 
    label: 'master', 
    order: 2,
    matcher: (name: string) => name === 'master'
  },
  stable: { 
    icon: CheckCircle, 
    label: 'stable', 
    order: 3,
    matcher: (name: string) => name === 'stable'
  }, 
  stage: { 
    icon: Science, 
    label: 'stage', 
    order: 4,
    matcher: (name: string) => name === 'stage'
  },
  prod: { 
    icon: Rocket, 
    label: 'prod', 
    order: 5,
    matcher: (name: string) => name === 'prod'
  },
  main: { 
    icon: Rocket, 
    label: 'main', 
    order: 6,
    matcher: (name: string) => name === 'main'
  },
  feature: { 
    icon: BugReport,
    label: 'feature',
    order: 7,
    matcher: (name: string) => name.startsWith('feature')
  },
  unknown: {
    icon: QuestionMark,
    label: 'unknown',
    order: 8,
    matcher: (name: string) => true
  }
};
