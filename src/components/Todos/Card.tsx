import React, { useState } from "react";
import Image from "next/image";
import { RiEditLine } from "react-icons/ri";
import { Calendar, Trash2 } from "lucide-react";
import dot from "@/assets/Authentication/3dot.png";
import { TodoType } from "@/types/types";
import { useUpdateTodosMutation } from "@/redux/features/todos/todos";

interface CardProps {
  todo: TodoType;
  position?: number;
  handleDeleteTask: (id: number) => void;
  getPriorityColor: (priority: TodoType["priority"]) => string;
}

const Card: React.FC<CardProps> = ({
  todo,
  position,
  getPriorityColor,
  handleDeleteTask,
}) => {
  const [showModal, setShowModal] = useState(false);

  const [updateTodo] = useUpdateTodosMutation();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const id = todo.id;
    const positions = position;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const date = (form.elements.namedItem("date") as HTMLInputElement).value;

    const priorityElement = form.elements.namedItem("priority");
    const priorityRadio = priorityElement as RadioNodeList;
    const priority =
      Array.from(priorityRadio as unknown as NodeListOf<HTMLInputElement>).find(
        (radio) => radio.checked,
      )?.value || todo.priority;

    const description = (
      form.elements.namedItem("description") as HTMLTextAreaElement
    ).value;

    const submitData = new FormData();
    submitData.append("title", title);
    submitData.append("description", description);
    submitData.append("priority", priority);
    submitData.append("todo_date", date);
    submitData.append("position", String(positions));

    try {
      const res = await updateTodo({ id, data: submitData }).unwrap();
      console.log(res);
      if (res) {
        setShowModal(false);
      }
    } catch (error) {
      console.log("Update error:", error);
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="bg-white p-7 rounded-lg border hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-gray-900 text-base xl:text-xl font-bold">
            {todo.title}
          </h3>

          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-md text-xs font-medium ${getPriorityColor(
                todo.priority,
              )}`}
            >
              {todo.priority}
            </span>

            <Image
              src={dot}
              className="w-[9px] h-5"
              alt="dot"
              width={14}
              height={14}
            />
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed font-semibold xl:w-[80%]">
          {todo.description}
        </p>

        <div className="flex justify-between items-center border-t pt-3">
          <span className="text-gray-500 text-sm">Due {todo.date}</span>

          <div className="flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="text-indigo-600 bg-[#EEF7FF] rounded-md p-1"
            >
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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Update Task</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-indigo-600"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={todo.title}
                    required
                    className="w-full px-4 py-2.5 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      defaultValue={todo.date}
                      required
                      className="w-full px-4 py-2.5 border rounded-lg"
                    />
                    <Calendar
                      size={18}
                      className="absolute right-3 top-3 text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Priority
                  </label>
                  <div className="flex gap-4">
                    {["extreme", "moderate", "low"].map((item) => (
                      <label key={item} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="priority"
                          value={item}
                          defaultChecked={todo.priority === item}
                        />
                        <span className="capitalize">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={todo.description}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center p-6 border-t">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-8 py-2 rounded-lg"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDeleteTask(todo.id)}
                  className="text-red-500 bg-[#EEF7FF] rounded-md p-1"
                >
                  <Trash2 size={26} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
