import React, { useActionState, useState } from 'react';
import TodoComponent from './BaseCompenents/TodoComponent';
import Timing from './Timing';
import './Todo.css';
import Popup from './BaseCompenents/Popup';

function Todo() {
  const [isModalOpen, setModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [errorMsg, formAction, isPending] = useActionState(
    async (currentState, formData) => {
      console.log(formData.get('name'));
    },
    '',
  );
  const openModal = () => {
    setModal(!isModalOpen);
  };
  return (
    <div className="flex flex-col mt-10 flex-auto items-center mx-2 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
      <Popup openModalHandler={openModal} open={isModalOpen} isPending />
      <Timing />
      <div className="mt-8 todo__form--section w-full">
        <button
          className="add__btn mx-auto dark:bg-gray-700 rounded-full h-12 w-12 flex justify-center items-center bg-gray-800 text-white focus:outline-none"
          onClick={openModal}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </button>
      </div>
      <div className="todo__container w-full mt-6 mb-4 p-3">
        <TodoComponent />
      </div>
    </div>
  );
}

export default Todo;
