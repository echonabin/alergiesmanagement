import React from 'react';
import Head from 'next/head';
import { UpdateAllergyForm } from '@alergiesmanagement/components';
import { withAuth } from '@alergiesmanagement/utils';

const UpdatePractitioner = () => {
  return (
    <>
      <Head>
        <title>Allergy Management | Update</title>
      </Head>
      <div
        className="flex flex-col justify-center items-center h-screen"
        id="update_allergy_page"
      >
        {/* Login Modal */}
        <div className="border-[1px] border-gray-300 flex flex-col px-10 py-10 rounded-lg w-1/2 shadow">
          <p className="font-poppins font-medium text-3xl text-center text-gray-700">
            Update Allergy
          </p>
          <div className="pt-8" id="update_allergy_form">
            <UpdateAllergyForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(UpdatePractitioner);
