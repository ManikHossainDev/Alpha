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
        <h3 className=" text-gray-900 text-base  xl:text-xl font-bold">{todo.title}</h3>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getPriorityColor(todo.priority)}`}>
            {todo.priority}
          </span>

          <Image src={dot} className="w-[9px] h-5" alt="dot" width={14} height={14} />
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 leading-relaxed  font-semibold xl:w-[80%]">{todo.description}</p>

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






// {showModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
//               <div className="flex justify-between items-center p-6 border-b">
//                 <h2 className="text-xl font-semibold">Add New Task</h2>
//                 <button onClick={() => setShowModal(false)} className="text-indigo-600">
//                   Close
//                 </button>
//               </div>

//               <form onSubmit={handleAddTask}>
//                 <div className="p-6 space-y-5">
//                   {/* Title */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Title</label>
//                     <input
//                       type="text"
//                       name="title"
//                       required
//                       className="w-full px-4 py-2.5 border rounded-lg"
//                     />
//                   </div>

//                   {/* Date */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Date</label>
//                     <div className="relative">
//                       <input
//                         type="date"
//                         name="date"
//                         required
//                         className="w-full px-4 py-2.5 border rounded-lg"
//                       />
//                       <Calendar size={18} className="absolute right-3 top-3 text-gray-400" />
//                     </div>
//                   </div>

//                   {/* Priority */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Priority</label>
//                     <div className="flex gap-4">
//                       {["extreme", "moderate", "low"].map((item) => (
//                         <label key={item} className="flex items-center gap-2">
//                           <input
//                             type="radio"
//                             name="priority"
//                             value={item}
//                             defaultChecked={item === "moderate"}
//                           />
//                           <span className="capitalize">{item}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Description</label>
//                     <textarea
//                       name="description"
//                       rows={4}
//                       className="w-full px-4 py-2 border rounded-lg"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center p-6 border-t">
//                   <button type="submit" className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg">
//                     Done
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                     className="bg-red-500 text-white p-2.5 rounded-lg"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}