"use client";
import React, { useState, FormEvent } from "react";
import { Search, Plus, Calendar, Trash2 } from "lucide-react";
import Image from "next/image";
import notfund from "@/assets/Authentication/notfund.png";
import Card from "@/components/Todos/Card";
import { TodoType } from "@/types/types";
import { useCreateTodosMutation, useDeleteTodosMutation, useGetTodosQuery } from "@/redux/features/todos/todos";
import Swal from "sweetalert2";

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetTodosQuery({});
  const allData = data?.results || [];
  
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    deadlineToday: false,
    expires5Days: false,
    expires10Days: false,
    expires30Days: false,
  });

  const [todosCreate] = useCreateTodosMutation();

  const getPriorityColor = (priority: string) => {
    const priorityLower = priority.toLowerCase();
    switch (priorityLower) {
      case "extreme":
      case "high":
        return "bg-red-100 text-red-600";
      case "moderate":
      case "medium":
        return "bg-green-100 text-green-600";
      case "low":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

 
  const handleAddTask = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const date = form.date.value;
    const priority = form.priority.value;
    const description = form.description.value;

    const submitData = new FormData();
    submitData.append("title", title);
    submitData.append("description", description);
    submitData.append("priority", priority.toLowerCase());
    submitData.append("todo_date", date);

    try {
      const res: any = await todosCreate(submitData);
      if (res?.data) {
        form.reset();
        setShowModal(false);

        Swal.fire({
          icon: "success",
          title: "Task Added!",
          text: "Your todo was created successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      } 
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to add todo",
      });
    }
  };


  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchTerm((form.search as HTMLInputElement).value);
  };


  const  [deleteTask] = useDeleteTodosMutation();
  const handleDeleteTask = async (id: number) => {
       try{
         const res = await deleteTask(id)
         if(res?.data){
             Swal.fire({
          icon: "success",
          title: "Delete",
          text: "Delete Successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
         }
       }catch (error){
          console.log(error)
       }
  };


  const filteredTodos = allData.filter((todo: any) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const transformedTodos = filteredTodos.map((todo: any) => ({
    id: todo.id,
    title: todo.title,
    date: todo.todo_date,
    priority: todo.priority,
    description: todo.description,
  }));

  return (
    <div className="md:px-4 lg:pr-4">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Todos</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm"
          >
            <Plus size={18} />
            New Task
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3 items-center mb-6 relative">
          <div className="flex-1 relative">
            <input
              type="text"
              name="search"
              placeholder="Search your task here..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
            />
            <button className="absolute rounded-md p-1 bg-indigo-500 right-3 top-1/2 -translate-y-1/2">
              <Search className="text-white" size={28} />
            </button>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
            >
              <span className="text-gray-700 font-medium">Filter By</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10">
                <div className="font-medium text-gray-700 text-sm mb-2">Date</div>
                <div className="space-y-2">
                  {[
                    { label: "Deadline Today", key: "deadlineToday" },
                    { label: "Expires in 5 days", key: "expires5Days" },
                    { label: "Expires in 10 days", key: "expires10Days" },
                    { label: "Expires in 30 days", key: "expires30Days" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filterOptions[item.key as keyof typeof filterOptions]}
                        onChange={(e) =>
                          setFilterOptions({ ...filterOptions, [item.key]: e.target.checked })
                        }
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </form>

        {isLoading ? (
          <div className="bg-white rounded-xl p-16 border text-center">
            <p className="text-gray-500 text-lg font-medium">Loading todos...</p>
          </div>
        ) : transformedTodos.length === 0 ? (
          <div className="bg-white rounded-xl p-16 border text-center">
            <Image src={notfund} alt="not found" width={260} height={260} />
            <p className="text-gray-500 text-lg font-medium mt-4">No todos found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {transformedTodos.map((todo: TodoType) => (
              <Card
                key={todo.id}
                todo={todo}
                getPriorityColor={getPriorityColor}
                handleDeleteTask={handleDeleteTask}
              />
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold">Add New Task</h2>
                <button onClick={() => setShowModal(false)} className="text-indigo-600">
                  Close
                </button>
              </div>

              <form onSubmit={handleAddTask}>
                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
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
                        required
                        className="w-full px-4 py-2.5 border rounded-lg"
                      />
                      <Calendar size={18} className="absolute right-3 top-3 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <div className="flex gap-4">
                      {["extreme", "moderate", "low"].map((item) => (
                        <label key={item} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="priority"
                            value={item}
                            defaultChecked={item === "moderate"}
                          />
                          <span className="capitalize">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>


                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      rows={4}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center p-6 border-t">
                  <button type="submit" className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg">
                    Done
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;