/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { FiEdit, FiTrash, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { Cell } from 'react-table';
import router from 'next/router';
import DeleteModal from '../../Modal/DeleteModal';
import { deleteAllergyAction } from '@alergiesmanagement/store';
import { useDispatch } from 'react-redux';

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

  // const handleToggle = async (current: boolean | string, id: string) => {
  //   const resp = await privateAgent.put(`/practitioner/${id}`, {
  //     isIcu: !current,
  //   });
  //   if (resp.status === 200) {
  //     setRefresh(true);
  //   }
  // };

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
        <div className="flex items-center space-x-2 ml-4">
          <img
            src={cell.value}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      );
    }
  };

  // const renderToggle = (cell: Cell) => {
  //   // @ts-ignore
  //   const value = cell.row.original.isIcu;
  //   return (
  //     <td className="flex items-center space-x-2 -ml-10">
  //       {value ? (
  //         <FiToggleLeft
  //           className="text-green-500 text-2xl hover:scale-110 transition-all ease-linear duration-200"
  //           onClick={() => {
  //             setRefresh(true);
  //             // @ts-ignore
  //             handleToggle(value, cell.row.original._id);
  //           }}
  //         />
  //       ) : (
  //         <FiToggleRight
  //           className="text-red-500 text-2xl hover:scale-110 transition-all ease-linear duration-200"
  //           onClick={() => {
  //             setRefresh(true);
  //             // @ts-ignore
  //             handleToggle(value, cell.row.original._id);
  //           }}
  //         />
  //       )}
  //     </td>
  //   );
  // };

  const renderAction = (cell: Cell) => {
    return (
      <div className="">
        <td>
          <FiEdit
            className="text-blue-500 text-xl cursor-pointer hover:scale-105 transition-all ease-linear duration-200"
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              router.push(`/allergy/edit/${cell.row.original.id}`)
            }
          />
        </td>
        <td>
          <FiTrash
            className="text-red-500 text-xl cursor-pointer hover:scale-105 transition-all ease-linear duration-200"
            onClick={() => {
              setOpen(true);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setCurrentSelected(cell.row.original.id);
            }}
          />
        </td>
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
              className="text-center border-b-[1px] py-3 text-gray-700 font-poppins"
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
