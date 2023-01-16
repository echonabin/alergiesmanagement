import React from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';

import { Loading, Table } from '@alergiesmanagement/components';
import { getAllergiesAction } from '@alergiesmanagement/store';
import { withAuth } from '@alergiesmanagement/utils';

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
    allergies: {
      totalItems: number;
      items: SingleAllergy[];
    };
    loading: boolean;
    message: string;
    error: { message: string; status: number };
  };
}

const ListPractitioner = () => {
  const dispatch = useDispatch() as any;
  const { allergies, error, loading, message } = useSelector(
    (state: RootState) => state.AllergyReducer
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'allergy_image',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Symptoms',
        accessor: 'symptoms',
      },
      {
        Header: 'Severity',
        accessor: 'severity',
      },
      {
        Header: 'Treatments',
        accessor: 'treatments',
      },
      {
        Header: 'Action',
        accessor: '',
      },
    ],
    []
  );

  React.useEffect(() => {
    dispatch(getAllergiesAction({ limit: 20, page: 0 }));
  }, [message]);

  return (
    <div id="list_allergy">
      <Head>
        <title>Allergies List</title>
      </Head>
      <h1 className="text-3xl font-semibold font-poppins text-gray-700">
        Allergies
      </h1>
      <div className="w-full bg-slate-100" id="render_table">
        {loading ? (
          <div className="flex justify-center items-center h-screen bg-white">
            <Loading />
          </div>
        ) : (
          <Table
            data={allergies.items ?? []}
            columns={columns}
            id="Allergy_list_table"
          />
        )}
      </div>
    </div>
  );
};

export default withAuth(ListPractitioner);
