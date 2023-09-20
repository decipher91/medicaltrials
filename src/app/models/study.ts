// using simplified interface here, not all the response fields are listed
export interface Study {
    protocolSection: {
        identificationModule: {
            nctId: string;
            briefTitle: string;
        };
        statusModule: {
            overallStatus: string; // in real project we going to use enum here, but for assignment sake doesn't matter much since there is no logic attached
        };
        descriptionModule: {
            briefSummary: string;
        }
    };
    hasResults: boolean;
}

export interface StudiesResponse {
    studies: Study[];
    nextPageToken: string;
}
