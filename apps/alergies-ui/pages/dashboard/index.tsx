import React from 'react';
import { FiDelete, FiEdit, FiUserCheck, FiUserMinus } from 'react-icons/fi';

import { withAuth } from '@alergiesmanagement/utils';
import { Card, Chart } from '@alergiesmanagement/components';

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-4 space-x-4">
        <Card Icon={FiUserCheck} title="Practitioner" subtitle="20" />
        <Card Icon={FiUserMinus} title="Users" subtitle="3" />
        <Card Icon={FiDelete} title="Deleted" subtitle="4" />
        <Card Icon={FiEdit} title="Updated" subtitle="2" />
      </div>
      <div className="mt-10">
        <Chart />
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
