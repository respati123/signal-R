import React, { useState, useEffect, useCallback } from 'react';
import { getData, deleteData } from './../services';

const ListItems = ({ onDelete, refresh, submit }) => {
  console.log('list');
  const [data, setData] = useState([]);

  const handleDelete = useCallback(id => {
    onDelete(id);
  });

  useEffect(() => {
    if (submit) {
      setData([]);
    }
    (async () => {
      console.log('ambil data');

      try {
        const datas = await getData();
        console.log(datas);
        if (data) {
          setData(prevState => prevState.concat(datas.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [submit]);

  return (
    <>
      {data.length === 0 ? (
        <p>tidak ada data</p>
      ) : (
        <div id="lists" className="mt-10 shadow-md w-full py-10 px-12">
          <div className="flex-col">
            {data.map((value, index) => (
              <div key={index} className="border-b-2 flex justify-between mt-2">
                <p>{value.name}</p>
                <button className="bg-red-100 p-1 rounded-sm" onClick={() => handleDelete(value._id)}>
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(ListItems);
