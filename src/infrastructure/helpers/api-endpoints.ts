const baseUrl = 'http://localhost:8080/';

export default {
	Job: {
        GetRepository_Name_Url: (jobName: string) => `${baseUrl}/job/${jobName}/api/json?tree=jobs[name,url,color]`,
		GetAll_Name: `${baseUrl}/api/json?tree=jobs[name]`

    },

};
