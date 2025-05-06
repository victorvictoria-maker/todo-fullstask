import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditTodo from "./EditTodo";

const TodoItem = ({ todo, isLast, onDelete, onToggle, onUpdate }) => {
  return (
    <div
      className={`flex h-10 items-center w-full ${
        isLast ? "border-b-0" : "border-b-2"
      }`}
    >
      <span
        className={`flex-1 px-3 ${
          todo.isCompleted && "line-through text-[#63657b]"
        }`}
      >
        {todo.title}
      </span>
      <div className='px-3 flex gap-2'>
        <FaCheckCircle
          className={`transition ease-in-out hover:cursor-pointer ${
            todo.isCompleted ? "text-primary" : "text-slate-300"
          }`}
          onClick={() => onToggle(todo._id, todo.isCompleted)}
        />
        <MdDelete className='iconHover' onClick={() => onDelete(todo._id)} />
        <EditTodo
          id={todo._id}
          title={todo.title}
          handleUpdate={(formdata) => onUpdate(todo._id, formdata.get("title"))}
        />
      </div>
    </div>
  );
};

export default TodoItem;
