import React, { useState, useCallback, useEffect } from 'react';
import ListItems from './../components/listItem';
import { deleteData, insertData } from './../services';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import io from 'socket.io-client';

// const socket = io('http://localhost:4003');
const Home = ({ history }) => {
  const [todoList, setTodoList] = useState('');
  const [isRefresh, setIsRefresh] = useState(false);
  const [SignalConnection, setSignalConnection] = useState(new HubConnectionBuilder());
  const [socketData, setSocketData] = useState([]);

  useEffect(() => {
    SignalConnection.withUrl('https://localhost:5001/chatHub')
      .build()
      .start()
      .then(() => console.log('berhasil'))
      .catch(err => console.log(err));
    // socket.on('news', data => {
    //   console.log(data);
    // });
    // const createHubConnection = async () => {
    //   // Build new Hub Connection, url is currently hard coded.
    //   new HubConnection('https://localhost:5001/chatHub');
    // };
    // createHubConnection();
  }, []);

  const handleTodoList = e => {
    e.preventDefault();
    const { value } = e.target;
    // socket.emit('test', { data: 'hahahah' });

    setTodoList(value);
  };

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      // setTodoList('');
      // console.log(document.getElementById('todolist'));
      // try {
      //   await insertData({ name: todoList });
      // } catch (err) {
      //   return err;
      // }
    },
    [todoList],
  );

  const handleDelete = useCallback(async id => {
    try {
      await deleteData(id);
    } catch (err) {
      return err;
    }
  }, []);

  return (
    <div className="mx-64 my-20 px-64">
      <div className="p-20 shadow-md border-2 bg-white justify-center">
        <h1>TODO LIST</h1>
        <form>
          <input type="text" value={todoList} className="border-2 py-1 text-black w-full" onChange={handleTodoList} />
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
      <ListItems onDelete={handleDelete} />
      {socketData.map(value => {
        return <p>{JSON.stringify(value)}</p>;
      })}
    </div>
  );
};

export default Home;
