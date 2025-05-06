import { Input } from "./ui/input";
import { FiPlus } from "react-icons/fi";
import Profile from "./Profile";
import TodoItem from "./TodoItem";
import { useTodos } from "@/actions/todos";
import toast from "react-hot-toast";

const Todos = () => {
  const {
    data,
    error,
    isLoading,
    addTodo,
    deleteTodo,
    toggleIsCompleted,
    updateTodo,
  } = useTodos();

  if (error) {
    console.error(error);
    return <h1 className='text-2xl py-2 text-center'>Something went wrong.</h1>;
  }

  if (isLoading) return <h1 className='text-2xl py-2 text-center'>Loading</h1>;

  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    if (!title.trim().length) return toast.error("Todo can't be empty!");
    addTodo(title);
    e.target.reset();
  };

  return (
    <div className='mx-auto mt-20 max-w-lg px-4 w-full flex flex-col gap-6'>
      <div className='flex justify-end'>
        <Profile />
      </div>
      <h1 className='bg-gradient-to-r from-teal-600 via-green-500 to-amber-400 font-bold text-4xl text-center mb-4 text-transparent bg-clip-text'>
        Todo App
      </h1>
      <form onSubmit={handleAdd} className='flex gap-4 items-center'>
        <Input
          type='text'
          placeholder='Enter todo'
          name='title'
          required
          className='shadow-md'
        />
        <button className='h-9 rounded-md border border-input bg-transparent px-4 text-base shadow-md flex items-center hover:bg-primary transition ease-linear group'>
          <FiPlus
            size={20}
            className='transition ease-linear group-hover:stroke-white'
          />
        </button>
      </form>

      {data?.length > 0 ? (
        <div className='shadow-md border-2 border-input bg-transparent flex flex-col rounded'>
          {data.map((todo, index) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              isLast={index === data.length - 1}
              onDelete={deleteTodo}
              onToggle={toggleIsCompleted}
              onUpdate={updateTodo}
            />
          ))}
        </div>
      ) : (
        <span>You don't have any todos</span>
      )}
    </div>
  );
};

export default Todos;
