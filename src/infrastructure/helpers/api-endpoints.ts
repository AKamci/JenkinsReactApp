export const baseUrl = 'http://localhost:8080/';

export default {
  Job: {
    GetRepository_Name_Url: (jobName: string, apiSettings: string[] = []) => {
      const defaultFields = ['name', 'url', 'lastBuild[url]'];
      const fields = [...defaultFields, ...apiSettings];
      const fieldsQuery = Array.from(new Set(fields)).join(',');
      return `${baseUrl}/job/${jobName}/api/json?tree=jobs[${fieldsQuery}]`;
    },
    GetBranch_Name_Url: (jobName: string, jobName2: string, apiSettings: string[] = []) => {
      const defaultFields = ['name', 'url', 'lastBuild[url]'];
      const fields = [...defaultFields, ...apiSettings];
      const fieldsQuery = Array.from(new Set(fields)).join(',');
      return `${baseUrl}/job/${jobName}/job/${jobName2}/api/json?tree=jobs[${fieldsQuery}]`;
    },
    GetAll_Name: `${baseUrl}/api/json?tree=jobs[name]`
  },
};