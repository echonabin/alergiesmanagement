export const API_ENDPOINTS = {
  host_url: 'http://localhost:3333',
  base_url: '/api',
  auth: {
    signin: '/auth/signin',
    signup: '/auth/signup',
    refresh: '/auth/refresh-token',
  },
  allergies: {
    get: '/allergies',
    getOne: '/allergy/:id',
    create: '/allergy',
    update: '/allergy/:id',
    delete: '/allergy/:id',
    hardDelete: '/allergy/hard-delete/:id',
  },
};
