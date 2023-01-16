/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import router from 'next/router';
import { Cell } from 'react-table';
import { useDispatch } from 'react-redux';
import { FiEdit, FiTrash } from 'react-icons/fi';

import DeleteModal from '../../Modal/DeleteModal';
import { deleteAllergyAction } from '@alergiesmanagement/store';

interface AllergyProps {
  cell: any;
}

const AllergyRows = (props: AllergyProps) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch() as any;
  const cell = props.cell as Cell[];
  const [currentSelected, setCurrentSelected] = React.useState('');

  const handleDelete = async (id: string) => {
    if (currentSelected !== '') {
      dispatch(deleteAllergyAction(id));
    }
  };

  React.useEffect(() => {
    if (open) {
      DeleteModal({
        confirmHandler: () => handleDelete(currentSelected),
        // refreshHandler: () => setRefresh(true),
      });
      setOpen(false);
    }
  }, [open]);

  const renderProfile = (cell: Cell) => {
    if (cell.column.Header === 'Image') {
      return (
        <div className="flex">
          <img
            src={
              cell.value
                ? cell.value
                : 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
            }
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      );
    }
    return;
  };

  const renderAction = (cell: any) => {
    return (
      <div className="flex">
        <div>
          <FiEdit
            id={`Edit_${cell.row.original.id}`}
            className="text-blue-500 text-xl cursor-pointer hover:scale-105 transition-all ease-linear duration-200"
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              router.push(`/allergy/edit/${cell.row.original.id}`)
            }
          />
        </div>
        <div>
          <FiTrash
            id={`Delete_${cell.row.original.id}`}
            className="text-red-500 text-xl cursor-pointer hover:scale-105 transition-all ease-linear duration-200"
            onClick={() => {
              setOpen(true);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setCurrentSelected(cell.row.original.id);
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {cell.map((c, i) => {
        return (
          <>
            <td
              {...c.getCellProps()}
              className="text-left border-b-[1px] py-3 text-gray-700 font-poppins"
              key={i}
            >
              {c.column.Header === 'Image' ? (
                renderProfile(c)
              ) : c.column.Header !== 'Action' ? (
                <div
                  onClick={() =>
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    router.push(`/allergy/${c.row.original.id}`)
                  }
                >
                  {c.render('Cell')}
                </div>
              ) : (
                <div className="flex space-x-4">{[renderAction(c)]}</div>
              )}
            </td>
          </>
        );
      })}
    </>
  );
};

export default AllergyRows;
