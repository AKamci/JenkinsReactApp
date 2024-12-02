const baseUrl = 'http://localhost:8080/';

export default {
	Job: {
        Get: (jobName: string) => `${baseUrl}/job/${jobName}/api/json`,
		    GetAll_NameColor: `${baseUrl}/api/json?tree=jobs[name,color]`

    },

};
