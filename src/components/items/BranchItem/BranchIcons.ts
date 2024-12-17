import { DeveloperMode, CheckCircle, Science, Rocket, BugReport } from '@mui/icons-material';

export const branchIcons = {
  dev: { icon: DeveloperMode, label: 'dev', order: 1 },
  stable: { icon: CheckCircle, label: 'stable', order: 2 },
  stage: { icon: Science, label: 'stage', order: 3 },
  prod: { icon: Rocket, label: 'prod', order: 4 },
  main: { icon: Rocket, label: 'main', order: 4 },
  feature: { icon: BugReport, label: 'feature', order: 5 }
  
};