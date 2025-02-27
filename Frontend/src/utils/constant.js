// src/utils/constant.js

export const USER_API_END_POINT = "http://localhost:8000/api/user";
export const JOB_API_END_POINT = "http://localhost:8000/api/jobs"; // post
//                               http://localhost:8000/api/jobs/post
export const APPLICATION_API_END_POINT = "http://localhost:8000/api/applicants";
// http://localhost:8000/api/applicants/678a58a108988d89ba683dab/applicants
export const COMPANY_API_END_POINT = "http://localhost:8000/api/companies";

// http://localhost:8000/api/companies/register

/*

http://localhost:8000/api/user/register   p
http://localhost:8000/api/user            f
http://localhost:8000/api/user/register || /login || //logout || /profile/update




http://localhost:8000/api/jobs/post     p
http://localhost:8000/api/jobs          f
http://localhost:8000/api/jobs/getadminjobs || /get || //post ||/get/:id  ||/apply/:jobId
http://localhost:8000/api/jobs/getadminjobs



http://localhost:8000/api/companies/register    p
http://localhost:8000/api/companies              f   
http://localhost:8000/api/companies/register ||/get  ||/get/:id ||/update/:id




http://localhost:8000/api/applicants/apply/677d2a8f4324a04680312dc2    p
http://localhost:8000/api/application                                f
http://localhost:8000/api/applicants/ || /apply/:id|| /get ||/:id/applicants ||/status/:id/update ||


*/