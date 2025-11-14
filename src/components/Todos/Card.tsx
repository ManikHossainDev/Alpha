import Image from "next/image";
import { Trash2 } from "lucide-react";
import { RiEditLine } from "react-icons/ri";
import dot from "@/assets/Authentication/3dot.png";
import { TodoType } from "@/types/types";


interface CardProps {
  todo: TodoType;
  getPriorityColor: (priority: TodoType["priority"]) => string;
  handleDeleteTask: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ todo, getPriorityColor, handleDeleteTask }) => {
  return (
    <div className="bg-white p-7 rounded-lg border hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className=" text-gray-900 text-base md:text-2xl font-bold">{todo.title}</h3>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getPriorityColor(todo.priority)}`}>
            {todo.priority}
          </span>

          <Image src={dot} className="w-[9px] h-5" alt="dot" width={14} height={14} />
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 leading-relaxed md:text-lg font-semibold md:w-[70%]">{todo.description}</p>

      <div className="flex justify-between items-center border-t pt-3">
        <span className="text-gray-500 text-sm">Due {todo.date}</span>

        <div className="flex gap-2">
          <button className="text-indigo-600 bg-[#EEF7FF] rounded-md p-1">
            <RiEditLine size={16} />
          </button>

          <button
            onClick={() => handleDeleteTask(todo.id)}
            className="text-red-500 bg-[#EEF7FF] rounded-md p-1"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
