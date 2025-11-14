"use client";

import React, { useState, FormEvent } from "react";
import { Search, Plus, Calendar, Trash2 } from "lucide-react";
import Image from "next/image";
import notfund from "@/assets/Authentication/notfund.png";
import Card from "@/components/Todos/Card";
import { TodoType } from "@/types/types";

const initialTodos: TodoType[] = [
  {
    id: 1,
    title: "Backend Infrastructure",
    date: "Apr 15, 2025",
    priority: "Extreme",
    description: "Upgrading backend infrastructure for better performance",
  },
  {
    id: 2,
    title: "Mobile App Redesign",
    date: "Mar 25, 2025",
    priority: "Moderate",
    description: "Redesigning the mobile app interface for better user experience",
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    date: "Mar 30, 2025",
    priority: "Low",
    description: "Creating a new analytics dashboard for clients",
  },
];

const Page = () => {
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    deadlineToday: false,
    expires5Days: false,
    expires10Days: false,
    expires30Days: false,
  });

  // -------------------- Functions --------------------
  const getPriorityColor = (priority: TodoType["priority"]) => {
    switch (priority) {
      case "Extreme":
        return "bg-red-100 text-red-600";
      case "Moderate":
        return "bg-green-100 text-green-600";
      case "Low":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Add Task
  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const form = e.currentTarget;
  
    // Use FormData to safely read form values without casting DOM properties
    const formData = new FormData(form);
    const title = String(formData.get("title") ?? "");
    const date = String(formData.get("date") ?? "");
    const priority = (formData.get("priority") ?? "Moderate") as TodoType["priority"];
    const description = String(formData.get("description") ?? "");
  
    if (!title || !date) return;
  
    const newTodo: TodoType = {
      id: Date.now(),
      title,
      date,
      priority,
      description,
    };
  
    setTodos((prev) => [...prev, newTodo]);
    setShowModal(false);
    form.reset();
  };

  // Search
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchInput = form.search as HTMLInputElement;
    setSearchTerm(searchInput.value);
  };

  // Delete Task
  const handleDeleteTask = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Filtered Todos
  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  return (
    <div className="md:pr-4">
      <div>
        {/* Header */}
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

        {/* Search + Filter */}
        <form onSubmit={handleSearch} className="flex gap-3 items-center mb-6 relative">
          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              name="search"
              placeholder="Search your task here..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
            />
            <button type="submit" className="absolute rounded-md p-1 bg-indigo-500 right-3 top-1/2 -translate-y-1/2 text-indigo-600">
              <Search className="text-white" size={30} />
            </button>
          </div>

          {/* Filter Button */}
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
                  ].map((option) => (
                    <label key={option.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterOptions[option.key as keyof typeof filterOptions]}
                        onChange={(e) =>
                          setFilterOptions({ ...filterOptions, [option.key]: e.target.checked })
                        }
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Task List */}
        {filteredTodos.length === 0 ? (
          <div className="bg-white rounded-xl p-16 border text-center">
            <Image src={notfund} alt="not found" width={300} height={300} />
            <p className="text-gray-500 text-lg font-medium mt-4">No todos yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTodos.map((todo) => (
              <Card
                key={todo.id}
                todo={todo}
                getPriorityColor={getPriorityColor}
                handleDeleteTask={handleDeleteTask}
              />
            ))}
          </div>
        )}

        {/* Add Task Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-md">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold">Add New Task</h2>
                <button onClick={() => setShowModal(false)} className="text-indigo-600">
                  Go Back
                </button>
              </div>

              <form onSubmit={handleAddTask}>
                <div className="p-6 space-y-5">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input type="text" name="title" required className="w-full px-4 py-2.5 border rounded-lg" />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <div className="relative">
                      <input type="date" name="date" required className="w-full px-4 py-2.5 border rounded-lg" />
                      <Calendar size={18} className="absolute right-3 top-3 text-gray-400" />
                    </div>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <div className="flex gap-4">
                      {["Extreme", "Moderate", "Low"].map((item) => (
                        <label key={item} className="flex items-center gap-2">
                          <input type="radio" name="priority" value={item} defaultChecked={item === "Moderate"} />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea name="description" rows={4} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                </div>

                <div className="flex justify-between items-center p-6 border-t">
                  <button type="submit" className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg">
                    Done
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-red-500 text-white p-2.5 rounded-lg"
                  >
                    <Trash2 size={18} />
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
