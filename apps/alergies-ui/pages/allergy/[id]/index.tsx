import React, { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import moment from 'moment';

import { withAuth } from '@alergiesmanagement/utils';
import { getSingleAllergyAction } from '@alergiesmanagement/store';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Loading } from '@alergiesmanagement/components';
import { FiToggleLeft, FiToggleRight } from 'react-icons/fi';

type SingleAllergy = {
  id: number;
  name: string;
  symptoms: string;
  severity: string;
  treatments: string;
  notes: string;
  allergy_image: string;
  is_active: boolean;
  created_by: number;
  updated_by: any;
  deleted_by: any;
  created_at: string;
  updated_at: string;
};

interface RootState {
  AllergyReducer: {
    singleAllergy: SingleAllergy;
    loading: boolean;
    message: string;
    error: { message: string; status: number };
  };
}

const SingleAllergy = () => {
  const dispatch = useDispatch() as any;
  const { loading, singleAllergy } = useSelector(
    (state: RootState) => state.AllergyReducer
  );
  const { id } = useRouter().query;
  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined) {
        dispatch(getSingleAllergyAction(id as string));
      }
    };
    fetchData();
  }, [id]);

  const {
    allergy_image,
    created_at,
    is_active,
    name,
    notes,
    severity,
    symptoms,
    treatments,
  } = singleAllergy;

  return (
    <>
      <Head>
        <title>{name} - Allergy</title>
      </Head>
      {loading ? (
        <Loading />
      ) : (
        <div id="single_allergy_page">
          <div className="w-full">
            <div className="grid grid-cols-12 w-full items-center space-x-4">
              <h1
                className="text-3xl font-semibold font-poppins text-gray-700 col-span-3"
                id="allergy_title"
              >
                Allergy Detail
              </h1>
              <div className="h-[1px] bg-gray-200 w-full col-span-9" />
            </div>
            <div className="py-6 w-full">
              <div className="px-4 py-4 shadow-2xl grid grid-cols-12 w-full divide-x-[1px] items-center">
                {/* profile */}
                <div className="col-span-2 flex flex-col justify-center space-y-2 place-self-center mt-10">
                  <Image
                    src={
                      allergy_image
                        ? allergy_image
                        : 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
                    }
                    width={400}
                    height={400}
                    className="pr-3"
                    alt=""
                  />
                  <p className="font-semibold text-lg">{name}</p>
                </div>
                <div className="col-span-10 grid row-span-3 pl-6">
                  <p className="text-gray-500 pb-2">Allergy Details</p>
                  <div className="flex space-x-4 pb-2 border-b-[1px]">
                    <p className="font-poppins font-medium text-gray-400">
                      Symptoms:{' '}
                      <span className="text-gray-700 font-normal pl-3">
                        {symptoms}
                      </span>
                    </p>
                    <p className="font-poppins font-medium text-gray-400">
                      Severity:{' '}
                      <span className="text-gray-700 font-normal pl-3">
                        {severity}
                      </span>
                    </p>
                    <p className="font-poppins font-medium text-gray-400">
                      Treatments:{' '}
                      <span className="text-gray-700 font-normal pl-3">
                        {treatments}
                      </span>
                    </p>
                    <p className="font-poppins font-medium text-gray-400">
                      Is Active:{' '}
                      <span className="text-gray-700 font-normal pl-3">
                        {is_active ? 'Yes' : 'No'}
                      </span>
                    </p>
                    <div className="font-poppins font-medium text-gray-400 flex items-center">
                      Active:{' '}
                      <span className="text-gray-700 font-normal pl-3 text-3xl">
                        {is_active ? (
                          <FiToggleRight className="text-green-400" />
                        ) : (
                          <FiToggleLeft className="text-red-400" />
                        )}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 pb-2">More Info</p>
                  <div className="flex space-x-4 pb-2 border-b-[1px]">
                    <p className="font-poppins font-medium text-gray-400">
                      Notes:{' '}
                      <text className="text-gray-700 font-normal pl-3">
                        {notes}
                      </text>
                    </p>
                    <p className="font-poppins font-medium text-gray-400">
                      Registered:{' '}
                      <span className="text-gray-700 font-normal pl-3">
                        {moment(created_at).startOf('day').fromNow()};
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withAuth(SingleAllergy);
