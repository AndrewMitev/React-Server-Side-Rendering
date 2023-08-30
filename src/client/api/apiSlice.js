// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery, buildCreateApi,
  coreModule,
  reactHooksModule, } from '@reduxjs/toolkit/query/react';
import { apiConfig, apiPaths, aiApiPaths, httpMethods, searchParams, apiTags } from './config';
import { profileTypes } from '../infrastructure/constants';
import { TOKEN_KEY } from '../infrastructure/constants';
import { getFormData } from '../infrastructure/getFormData';

const { api } = apiConfig;

const API_REDUCER_PATH = 'api';
const AI_API_REDUCER_PATH = 'ai_api';
const TOP_FIVE_MENTORS = 5;

const getRegisterPath = (payload) => {
  switch (payload.selectedProfile) {
    case profileTypes.mentor:
      return `${apiPaths.register}/${apiPaths.mentor}`;
    case profileTypes.individual:
      return `${apiPaths.register}/${apiPaths.user}`;
    case profileTypes.corporate:
      return `${apiPaths.register}/${apiPaths.corporate}`;
  }
};


const createApi2 = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
)

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: API_REDUCER_PATH,
  // All of our requests will have URLs starting with '/api'
  // fetchBaseQuery - small wrapper around native fetch
  baseQuery: fetchBaseQuery({
    baseUrl: api.url + '/',
    prepareHeaders: (headers) => {
      //const token = window.localStorage.getItem(TOKEN_KEY);

      if (false) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  // The "endpoints" represent operations and requests for this server
  // Endpoints can be "queries" or "mutations" which send update to the server
  endpoints: (builder) => ({
    // [Courses]
    getCourses: builder.query({
      query: () => apiPaths.courses,
      providesTags: [apiTags.courses],
    }),
    getCourseById: builder.query({
      query: (id) => `${apiPaths.courses}/${id}`,
    }),
    getPrivateCoursesByMentor: builder.query({
      query: () => `${apiPaths.courses}/${apiPaths.user}/${apiPaths.profile}/${apiPaths.mentor}`,
    }),
    getCoursesByMentorId: builder.query({
      query: (mentorId) => `${apiPaths.courses}/${apiPaths.by}/${apiPaths.mentor}/${mentorId}`,
    }),
    getCoursesByBusinessType: builder.query({
      query: (businessTypeId) => `${apiPaths.courses}/${apiPaths.by}/${apiPaths.businessType}/${businessTypeId}`,
    }),
    getUserCourses: builder.query({
      query: () => `${apiPaths.courses}/${apiPaths.user}/${apiPaths.profile}`,
    }),
    // [Mentors]
    // The `getMentors` endpoint is a "query" operation that returns data
    // builder.query({..}) or builder.mutation({..})
    getMentors: builder.query({
      // The url for request is '/api/mentors'
      // By default, query endpoints will use a GET HTTP request, but you can
      // override that by returning an object like
      // {url: '/posts', method: 'POST', body: newPost} instead of just the URL string itself.
      // headers: {
      //   'Content-type': 'application/json; charset=UTF-8',
      // },
      query: ({ skip, take, searchText }) => {
        const url = new URL(`${api.url}/${apiPaths.mentors}`);
        url.searchParams.append('skip', skip);
        url.searchParams.append('take', take);
        url.searchParams.append('searchText', searchText);

        return url.toString();
      },
      providesTags: [apiTags.mentors],
    }),
    getMentorProfile: builder.query({
      query: () => `${apiPaths.mentors}/${apiPaths.profile}`,
    }),
    getMentorById: builder.query({
      query: (id) => `${apiPaths.mentors}/${id}`,
    }),
    getTopMentors: builder.query({
      query: (numberOfTopMentors = TOP_FIVE_MENTORS) => {
        const url = new URL(`${api.url}/${apiPaths.mentors}/${apiPaths.top}`);
        if (numberOfTopMentors) {
          url.searchParams.set(searchParams.numberOfTopMentors, numberOfTopMentors);
        }
        return url.href;
      },
    }),
    getMentorScheduleById: builder.query({
      query: (id) => `${apiPaths.mentors}/${id}/${apiPaths.schedule}`,
    }),
    updateMentorPublicInfo: builder.mutation({
      query: ({ ...payload }) => {
        const formData = getFormData(payload);

        return {
          url: `${apiPaths.mentors}/${apiPaths.publicInfo}`,
          method: httpMethods.patch,
          body: formData,
        };
      },
    }),
    updateMentorPersonalInfo: builder.mutation({
      query: ({ ...payload }) => {
        const formData = getFormData(payload);

        return {
          url: `${apiPaths.mentors}/${apiPaths.personalInfo}`,
          method: httpMethods.patch,
          body: formData,
        };
      },
    }),
    updateMentorSchedule: builder.mutation({
      query: (payload) => {
        return {
          url: `${apiPaths.mentors}/${apiPaths.schedule}`,
          method: httpMethods.patch,
          body: payload,
        };
      },
    }),

    // [Regular user]
    getUserProfile: builder.query({
      query: () => `${apiPaths.users}/${apiPaths.profile}`,
    }),
    updateUserProfile: builder.mutation({
      query: ({ ...payload }) => {
        const formData = getFormData(payload);
        return {
          url: `${apiPaths.users}`,
          method: httpMethods.patch,
          body: formData,
        };
      },
    }),

    // [Login]
    login: builder.mutation({
      query: (payload) => ({
        url: `${apiPaths.login}/${apiPaths.auth}`,
        method: httpMethods.post,
        body: payload,
      }),
      // invalidatesTags: [apiTags.login],
    }),

    // [Login with Google]
    loginWithGoogle: builder.mutation({
      query: (payload) => ({
        url: `${apiPaths.login}/${apiPaths.auth}/${apiPaths.google}`,
        method: httpMethods.post,
        body: payload,
      }),
    }),

    // [Register]
    register: builder.mutation({
      query: (payload) => ({
        url: getRegisterPath(payload),
        method: httpMethods.post,
        body: payload,
      }),
    }),

    // [ForgotPassword]
    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: `${apiPaths.forgotPassword}`,
        method: httpMethods.post,
        body: payload,
      }),
    }),

    // [ResetPassword]
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: `${apiPaths.resetPassword}`,
        method: httpMethods.post,
        body: payload,
      }),
    }),

    // [EmailConfirmation]
    EmailConfirmation: builder.query({
      query: (payload) => `${apiPaths.emailsConfirmation}?email=${payload.email}&token=${payload.token}`,
    }),

    // [ContactUs]
    contactUsEmail: builder.mutation({
      query: (payload) => ({
        url: `${apiPaths.emails}/${apiPaths.contactUs}`,
        method: httpMethods.post,
        body: payload,
      }),
    }),

    // [Consultations]
    getUserConsultations: builder.query({
      query: () => `${apiPaths.users}/${apiPaths.consultations}`,
    }),
    getMentorConsultations: builder.query({
      query: () => `${apiPaths.mentors}/${apiPaths.consultations}`,
    }),
    createConsultation: builder.mutation({
      query: (payload) => ({
        url: `${apiPaths.mentors}/${payload.mentorId}/${apiPaths.consultations}`,
        method: httpMethods.post,
        body: payload,
      }),
    }),

    // [Get mentor availability]
    getMentorAvailability: builder.query({
      query: (mentorId) => `${apiPaths.mentors}/${mentorId}/${apiPaths.consultations}/${apiPaths.availability}`,
    }),

    registerForCourse: builder.mutation({
      query: (courseId) => ({
        url: `${apiPaths.courses}/${courseId}/${apiPaths.register}`, // assuming the endpoint is structured like this
        method: httpMethods.post,
      }),
    }),

    // [Skills]
    getAllSkills: builder.query({
      query: () => apiPaths.skills,
    }),
  }),
});

export const aiApiSlice = createApi({
  reducerPath: AI_API_REDUCER_PATH,
  baseQuery: fetchBaseQuery({ baseUrl: api.aiUrl + '/' }),
  endpoints: (builder) => ({
    // [Start AI Course]
    startLearningSession: builder.mutation({
      query: (payload) => ({
        url: `${aiApiPaths.courses}/${aiApiPaths.startLearningSession}`,
        method: httpMethods.post,
        body: payload,
      }),
      providesTags: [apiTags.startLearningSession],
    }),

    // [Process Answer]
    processAnswer: builder.mutation({
      query: (payload) => ({
        url: `${aiApiPaths.courses}/${aiApiPaths.processAnswer}`,
        method: httpMethods.post,
        body: payload,
      }),
      providesTags: [apiTags.startLearningSession],
    }),
  }),
});

// Export the auto-generated hook for the `getMentors` query endpoint
export const {
  //courses
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetPrivateCoursesByMentorQuery,
  useGetCoursesByMentorIdQuery,
  useGetCoursesByBusinessTypeQuery,
  useGetUserCoursesQuery,
  useRegisterForCourseMutation,
  //mentors
  useGetMentorsQuery,
  useGetMentorByIdQuery,
  useGetMentorProfileQuery,
  useGetTopMentorsQuery,
  useGetMentorScheduleByIdQuery,
  useUpdateMentorPublicInfoMutation,
  useUpdateMentorPersonalInfoMutation,
  useUpdateMentorScheduleMutation,
  //consultations
  useGetMentorAvailabilityQuery,
  useCreateConsultationMutation,
  useGetUserConsultationsQuery,
  useGetMentorConsultationsQuery,
  //auth
  useLoginMutation,
  useLoginWithGoogleMutation,
  useRegisterMutation,
  useEmailConfirmationQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  //users
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  //emails
  useContactUsEmailMutation,
  //skills
  useGetAllSkillsQuery,
} = apiSlice;

export const { useStartLearningSessionMutation, useProcessAnswerMutation } = aiApiSlice;
