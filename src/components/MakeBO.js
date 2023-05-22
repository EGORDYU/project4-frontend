import React, { useState, useEffect } from 'react';
import { buildOrdersApi } from '../API.js';

export default function MakeBO() {
  const [buildOrders, setBuildOrders] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    refreshBuildOrders();
  }, []);

  const refreshBuildOrders = () => {
    buildOrdersApi
      .get('/')
      .then((res) => {
        setBuildOrders(res.data);
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const buildOrder = { title, description };
    buildOrdersApi
      .post('/', buildOrder)
      .then(() => refreshBuildOrders())
      .catch(console.error);
  };

  const onDelete = (id) => {
    buildOrdersApi
      .delete(`/${id}`)
      .then(() => refreshBuildOrders())
      .catch(console.error);
  };

  const onUpdate = (id) => {
    const buildOrder = { title, description };
    buildOrdersApi
      .patch(`/${id}`, buildOrder)
      .then(() => refreshBuildOrders())
      .catch(console.error);
  };

  const selectBuildOrder = (id) => {
    const buildOrder = buildOrders.find((bo) => bo.id === id);
    if (buildOrder) {
      setTitle(buildOrder.title);
      setDescription(buildOrder.description);
    }
  };

  return (
    <>
      <div>
        {buildOrders.map((buildOrder) => (
          <div
            key={buildOrder.id}
          >
            <h2>{buildOrder.title}</h2>
            <p>{buildOrder.description}</p>
            <button onClick={() => onDelete(buildOrder.id)}>Delete</button>
            <button onClick={() => selectBuildOrder(buildOrder.id)}>Select</button>
            <button onClick={() => onUpdate(buildOrder.id)}>Edit</button>
          </div>
        ))}
      </div>
      <h1>Add/Edit a build order!</h1>
      <form>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={'title'}
          type='text'
          name='title'
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={'description'}
          type='text'
          name='description'
        />
        <button onClick={onSubmit}>Add</button>
      </form>
    </>
  );
}
