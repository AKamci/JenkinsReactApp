export const baseUrl = import.meta.env.VITE_BASE_URL;

export default {
  Job: {
    GetRepository_Name_Url: (jobName: string, apiSettings: string[] = []) => {
      const defaultFields = ['name', 'url'];
      const fields = [...defaultFields, ...apiSettings];
      const fieldsQuery = Array.from(new Set(fields)).join(',');
      return `${baseUrl}/job/${jobName}/api/json?tree=jobs[${fieldsQuery}]`;
    },
    GetBranch_Name_Url: (jobName: string, jobName2: string, apiSettings: string[] = []) => {
      const defaultFields = ['name', 'url', 'lastBuild[url,timestamp]'];
      const fields = [...defaultFields, ...apiSettings];
      const fieldsQuery = Array.from(new Set(fields)).join(',');
      return `${baseUrl}/job/${jobName}/job/${jobName2}/api/json?tree=jobs[${fieldsQuery}]`;
    },
    GetSearchedItems: (jobName: string, jobName2: string, apiSettings: string[] = []) => {
      const defaultFields = ['name', 'url', 'lastBuild[url,timestamp]'];
      const fields = [...defaultFields, ...apiSettings];
      const fieldsQuery = Array.from(new Set(fields)).join(',');
      return `${baseUrl}/job/${jobName}/job/${jobName2}/api/json?tree=jobs[${fieldsQuery}]`;
    },
    GetAll_Name: `${baseUrl}/api/json?tree=jobs[name]`,
    GetAll_Name_With_Repository: `${baseUrl}/api/json?tree=jobs[name,jobs[name,url]]`,
    GetAllForSearch: `${baseUrl}/api/json?tree=jobs[name,jobs[name,url,jobs[name,color]]]`,
    GetAllBuildingJobs: `${baseUrl}/api/json?tree=jobs[name,jobs[name,jobs[name,url,lastBuild[building,timestamp,actions[_class,causes[_class,shortDescription,userName]]]]]]`,
    GetAllForControl: `${baseUrl}/api/json?tree=jobs[name,url,jobs[name,url,jobs[name,color]]]`
  },

  Information: {
  
    GetQueueItemList : `${baseUrl}/queue/api/json`,
    GetLastBuildsForInformation : `${baseUrl}/api/json?tree=jobs[name,url,jobs[name,url,jobs[name,lastBuild[number,timestamp,duration,result,url,actions[causes[shortDescription]]]]]]`
  },

  Test: {
    GetTest: (url: string) => `${url}/lastBuild/testReport/api/json?tree=failCount,passCount,skipCount`
  },

  Notification: {
    GetNotification: `${baseUrl}/api/json?tree=description`
  },

  Welcome: {
    GetWelcomeUser: `${baseUrl}/whoAmI/api/json`,
    GetUserDetails: (userId: string) => `${baseUrl}/user/${userId}/api/json?tree=fullName`
  }

};