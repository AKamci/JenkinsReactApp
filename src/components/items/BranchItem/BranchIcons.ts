import { DeveloperMode, CheckCircle, Science, Rocket, BugReport, IntegrationInstructions, QuestionMark } from '@mui/icons-material';

export const branchIcons = {
  master: {
    icon: IntegrationInstructions, 
    label: 'master', 
    order: 1,
    matcher: (name: string) => name === 'master'
  },
  dev: { 
    icon: DeveloperMode, 
    label: 'dev', 
    order: 2,
    matcher: (name: string) => name === 'dev'
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
  feature: { 
    icon: BugReport,
    label: 'feature',
    order: 6,
    matcher: (name: string) => name.startsWith('feature')
  },
  unknown: {
    icon: QuestionMark,
    label: 'unknown',
    order: 7,
    matcher: (name: string) => true
  }
};
