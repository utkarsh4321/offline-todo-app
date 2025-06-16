import React, { useActionState, useEffect, useRef, useState } from 'react';
import TodoComponent from './BaseCompenents/TodoComponent';
import Timing from './Timing';
import './Todo.css';
import Popup from './BaseCompenents/Popup';
import {
  setTodo,
  getTodosViaIndex,
  updateTodo,
  deleteTodo,
} from '../utility/db';

function Todo() {
  const [isModalOpen, setModal] = useState(false);
  const inputRef = useRef(null);
  const [todos, setTodos] = useState([]);
  const [isMicOpen, setMicOnOff] = useState(false);
  let updatedTodoId = useRef(null);
  const recognitionObj = useRef(null);
  useEffect(() => {
    (async () => {
      const todos = await getTodosViaIndex();
      setTodos(todos);
    })();
  }, []);
  const resetForm = () => {
    inputRef.current.value = '';
  };
  const [errorMsg, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const todoName = formData.get('todo_name');
      if (!todoName || !todoName.trim().length) {
        return 'todoname is required';
      }

      if (updatedTodoId.current) {
        const storedTodoIndex = todos.findIndex(
          (item) => item.id === updatedTodoId.current,
        );
        if (storedTodoIndex !== -1) {
          const selectedTodo = todos[storedTodoIndex];
          await setTodo(selectedTodo.id, {
            id: selectedTodo.id,
            todo: todoName,
            status: selectedTodo.status,
          });
          (todos[storedTodoIndex] = {
            id: selectedTodo.id,
            todo: todoName,
            status: selectedTodo.status,
          }),
            setTodos([...todos]);
          updatedTodoId.current = null;
        }
      } else {
        const radomUuid = Math.random().toString(36).slice(2);
        await setTodo(radomUuid, {
          id: radomUuid,
          todo: todoName,
          status: false,
        });
        setTodos([...todos, { id: radomUuid, todo: todoName, status: false }]);
      }
      setModal(false);

      return null;
    },
    null,
  );
  const openModal = () => {
    inputRef.current.value = '';
    setModal(!isModalOpen);
    if (recognitionObj.current) {
      recognitionObj.current.speech.abort();
      recognitionObj.current.audio.pause();
      setMicOnOff(false);
      recognitionObj.current = null;
    }
  };
  const onChangeHandler = (e, id) => {
    const selectedTodoIndex = todos.findIndex((item) => item.id === id);
    if (selectedTodoIndex !== -1) {
      const selectedTodo = todos[selectedTodoIndex];
      selectedTodo.status = e.target.checked;
      todos[selectedTodoIndex] = selectedTodo;
      setTodos([...todos]);
      updateTodo(id, selectedTodo);
    }
  };
  const onDeleteTodo = (e, id) => {
    (async () => {
      await deleteTodo(id);
      const filteredTodo = todos.filter((item) => item.id !== id);
      setTodos([...filteredTodo]);
    })();
  };
  const onUpdateTodo = (e, id) => {
    if (inputRef.current) {
      const selectedTodo = todos.find((item) => item.id === id);
      inputRef.current.value = selectedTodo.todo;
      updatedTodoId.current = id;
      setModal(true);
    }
  };
  const onSpeak = () => {
    const LANG = 'en-US';
    const audio = new Audio('message-13716.mp3');
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();

    recognition.lang = LANG;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      inputRef.current.value = inputRef.current.value + ' ' + transcript;
    };
    recognition.onerror = (event) => {
      console.error('Speech recognition error detected: ' + event.error);
    };
    recognition.start();
    recognitionObj.current = {
      speech: recognition,
      audio: audio,
    };
    recognition.onstart = () => {
      setMicOnOff(true);
      audio.addEventListener('canplaythrough', () => {
        audio.play();
      });
    };
    recognition.onaudioend = () => {
      recognition.stop();
      setMicOnOff(false);
      audio.pause();
      recognitionObj.current = null;
    };

    // recognition.onend = () => {
    //   recognition.stop();
    //   setMicOnOff(false);
    //   audio.pause();
    // };
  };

  return (
    <div className="flex flex-col mt-10 flex-auto items-center mx-2 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
      <Popup openModalHandler={openModal} open={isModalOpen}>
        <form
          className={`todo__form flex flex-col w-96 md:max-w-4xl todo__form--content px-3 py-4 rounded text-current dark:bg-gray-700 bg-gray-200 z-10 ${
            isModalOpen ? 'form__active' : ''
          }`}
          action={formAction}
        >
          <div
            className="flex todo-input dark:bg-gray-800 bg-gray-100"
            tabIndex={0}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Your todo"
              name="todo_name"
              className="flex-auto bg-transparent"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 cursor-pointer ${
                (isMicOpen && 'fill-current text-red-500') || ''
              }`}
              onClick={onSpeak}
              aria-label="Mic"
              tabIndex={0}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
              />
            </svg>
          </div>
          <span className={errorMsg && 'text-red-600'}>{errorMsg}</span>
          {/* <Input
          type=" text"
          placeholder="Todo reward"
          className="todo-input dark:bg-gray-800 mt-3"
        /> */}
          <button
            className={`mt-4 px-4 py-2 rounded dark:bg-darkSecondary bg-gray-800 text-white ${
              isPending && 'cursor-not-allowed'
            }`}
            type="submit"
            disabled={isPending}
          >
            {(isPending && '...Loading') || 'Add'}
          </button>
        </form>
      </Popup>
      <Timing />
      <div className="mt-8 todo__form--section w-full">
        <button
          className="add__btn mx-auto dark:bg-gray-700 rounded-full h-12 w-12 flex justify-center items-center bg-gray-800 text-white"
          onClick={openModal}
          tabIndex={0}
          aria-label="Add todo"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
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
      <div className="todo__container w-full mt-6 h-80 mb-4 p-3 overflow-auto">
        <TodoComponent
          data={todos}
          onChangeHandler={onChangeHandler}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      </div>
    </div>
  );
}

export default Todo;
