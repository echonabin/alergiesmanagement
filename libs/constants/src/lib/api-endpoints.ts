export const API_ENDPOINTS = {
  host_url: 'http://localhost:3333',
  base_url: '/api',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
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
