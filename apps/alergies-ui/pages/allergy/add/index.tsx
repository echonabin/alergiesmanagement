import React from 'react';
import Head from 'next/head';
import { AddAllergyForm } from '@alergiesmanagement/components';
import { withAuth } from '@alergiesmanagement/utils';

const AddPractitioner = () => {
  return (
    <>
      <Head>
        <title>Allergy Management | Add Allergy</title>
      </Head>
      <div
        className="flex flex-col justify-center items-center h-screen"
        id="add_allergy_page"
      >
        {/* Login Modal */}
        <div className="border-[1px] border-gray-300 flex flex-col px-10 py-10 rounded-lg w-1/2 shadow">
          <p className="font-poppins font-medium text-3xl text-center text-gray-700">
            Create an allergy
          </p>
          <div className="pt-8">
            <AddAllergyForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(AddPractitioner);
