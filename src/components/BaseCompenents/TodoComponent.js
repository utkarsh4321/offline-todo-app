import Input from './Input';

function TodoComponent({
  data = [],
  onChangeHandler = null,
  onDeleteTodo = null,
  onUpdateTodo = null,
}) {
  return data.map((item) => {
    return (
      <div key={item.id} className="mb-2 last:mb-0">
        <div className="group flex justify-between rounded bg-gray-200 dark:bg-gray-800 p-4 cursor-pointer overflow-hidden">
          <div className="flex items-center">
            <Input
              type="checkbox"
              className="check"
              ariaLabel="Todo checkbox"
              checked={item.status}
              onChangeHandler={
                onChangeHandler && ((e) => onChangeHandler(e, item.id))
              }
            />
            <h4 className="ml-2">{item.todo}</h4>
          </div>
          <div className="transition-transform duration-300 transition-width  duration-200 ease-in-out flex items-center transform">
            <svg
              className="transition duration-300 ease-in-out mr-1 transform hover:scale-110 motion-reduce:transition-none motion-reduce:transform-none w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={onUpdateTodo && ((e) => onUpdateTodo(e, item.id))}
              tabIndex={0}
              aria-label="Edit todo"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
            <svg
              className="transition duration-300 ease-in-out mr-2 transform hover:scale-110 motion-reduce:transition-none motion-reduce:transform-none w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={onDeleteTodo && ((e) => onDeleteTodo(e, item.id))}
              tabIndex={0}
              aria-label="Delete todo"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    );
  });
}

export default TodoComponent;
