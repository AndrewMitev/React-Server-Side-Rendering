export const apiConfig = {
    api: {
      baseUrl: 'https://localhost:7134',//process.env.REACT_APP_BASE_URL,
      url: 'https://localhost:7134/api',//process.env.REACT_APP_API_URL,
      aiUrl: ''//process.env.REACT_APP_AI_API_URL,
    },
  };
  
  export const apiPaths = {
    // Fake api path
    test: 'posts',
    // Api paths
    courses: 'courses',
    emails: 'emails',
    contactUs: 'contact-us',
    login: 'login',
    mentor: 'mentor',
    mentors: 'mentors',
    businessType: 'businessType',
    top: 'top',
    by: 'by',
    auth: 'auth',
    google: 'google',
    register: 'register',
    emailsConfirmation: 'register/user/confirm',
    user: 'user',
    users: 'users',
    corporate: 'corporate',
    update: 'update',
    consultations: 'consultations',
    availability: 'availability',
    profile: 'profile',
    skills: 'skills',
    forgotPassword: 'password/forgot',
    resetPassword: 'password/reset',
    publicInfo: 'publicInfo',
    personalInfo: 'personalInfo',
    schedule: `schedule`,
  };
  
  export const aiApiPaths = {
    courses: 'courses',
    startLearningSession: 'start-learning-session',
    processAnswer: 'process-answer',
    getNewQuestion: 'get-new-question',
    getQuestionHint: 'get-question-hint',
  };
  
  export const httpMethods = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    patch: 'PATCH',
    delete: 'DELETE',
  };
  
  export const contentTypes = {
    json: 'application/json',
  };
  
  export const httpHeaders = {
    contentType: 'Content-Type',
  };
  
  export const searchParams = {
    numberOfTopMentors: 'numberOfTopMentors',
  };
  
  export const apiTags = {
    courses: 'courses',
    mentors: 'mentors',
    login: 'login',
    startLearningSession: 'startLearningSession',
  };
  