// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery, buildCreateApi,
  coreModule,
  reactHooksModule, } from '@reduxjs/toolkit/query/react';
import { apiConfig, apiPaths, aiApiPaths, httpMethods, searchParams, apiTags } from './config';
import { profileTypes } from '../infrastructure/constants';
import { TOKEN_KEY } from '../infrastructure/constants';
import { getFormData } from '../infrastructure/getFormData';
import https from 'https';
import fetch from 'isomorphic-unfetch';

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

const agent = new https.Agent({
  rejectUnauthorized: false, // Disables SSL verification
});

// Define our single API slice object
export const apiSlice = createApi2({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: API_REDUCER_PATH,
  // All of our requests will have URLs starting with '/api'
  // fetchBaseQuery - small wrapper around native fetch
  baseQuery: fetchBaseQuery({
    baseUrl: api.url + '/',
    httpAgent: agent,
    fetchFn: fetch,
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
    // [Mentors]
    getMentors: builder.query({
      query: ({ skip, take, searchText }) => {
        const url = new URL(`${api.url}/${apiPaths.mentors}`);
        url.searchParams.append('skip', skip);
        url.searchParams.append('take', take);
        url.searchParams.append('searchText', searchText);

        return url.toString();
      },
      providesTags: [apiTags.mentors],
    })
  }),
});


// Export the auto-generated hook for the `getMentors` query endpoint
export const {
  //mentors
  useGetMentorsQuery,

} = apiSlice;

export const { useStartLearningSessionMutation, useProcessAnswerMutation } = aiApiSlice;
