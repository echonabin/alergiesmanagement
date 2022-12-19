import { FiPieChart, FiUser, FiUserPlus } from 'react-icons/fi';

export const routes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: FiPieChart,
  },
  {
    name: 'List Allergies',
    path: '/allergy/list',
    icon: FiUser,
  },
  {
    name: 'Create Allergy',
    path: '/allergy/add',
    icon: FiUserPlus,
  },
];
