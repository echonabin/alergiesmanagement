import React from 'react';
import { withAuth } from '@alergiesmanagement/utils';
const Index = () => {
  return (
    <div>
      <div>Landing Page</div>;
    </div>
  );
};

export default withAuth(Index);
