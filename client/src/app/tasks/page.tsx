"use client";

import { useEffect, useState } from "react";
import { LogOut, Plus, CheckCircle2, Circle, Trash2, Clock, X } from "lucide-react";
import api from "@/lib/axios";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    console.log('Retrieved Access Token from sessionStorage:', token);
    if (token) {
      fetchTask(token);
    } else {
      window.location.href = '/login';
    }
  }, []);

  async function fetchTask(token) {
    try {
      setIsLoading(true);
      
      const response = await api.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Fetched tasks:', response.data);
      setTasks(response.data.data);
      
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Failed to fetch tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddTask(e) {
    e.preventDefault();
    
    if (!newTaskTitle.trim()) {
      alert('Please enter a task title');
      return;
    }

    try {
      setIsSubmitting(true);
      const token = sessionStorage.getItem('accessToken');
      
      const response = await api.post('/tasks', 
        { title: newTaskTitle, completed: false },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      console.log('Task created:', response.data);
      
      // Add the new task to the list
      setTasks([...tasks, response.data.data]);
      
      // Reset form and close modal
      setNewTaskTitle("");
      setIsModalOpen(false);
      
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleToggleComplete(taskId, currentStatus) {
    try {
      const token = sessionStorage.getItem('accessToken');
      
      await api.patch(`/tasks/${taskId}`, 
        { completed: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !currentStatus } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task.');
    }
  }

  async function handleToggleCompleteButton(taskId) {
    try {
      const token = sessionStorage.getItem('accessToken');
      
      const response = await api.post(`/tasks/${taskId}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update the task in the list with the response data
      setTasks(tasks.map(task => 
        task.id === taskId ? response.data.data : task
      ));
    } catch (error) {
      console.error('Error toggling task:', error);
      alert('Failed to toggle task completion.');
    }
  }

  async function handleDeleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const token = sessionStorage.getItem('accessToken');
      
      await api.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task.');
    }
  }

  async function handlelogout() {
    try {
      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    } catch (error) {
      alert('Logout failed. Please try again.');
    }
  }

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black">My Tasks</h1>
              <p className="text-gray-600 mt-1">Manage your daily tasks efficiently</p>
            </div>
            <button
              onClick={handlelogout}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-black text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Tasks</p>
                <p className="text-3xl font-bold mt-1">{tasks.length}</p>
              </div>
              <Clock className="h-10 w-10 text-gray-400" />
            </div>
          </div>

          <div className="bg-black text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-3xl font-bold mt-1">{completedTasks}</p>
              </div>
              <CheckCircle2 className="h-10 w-10 text-gray-400" />
            </div>
          </div>

          <div className="bg-black text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-3xl font-bold mt-1">{pendingTasks}</p>
              </div>
              <Circle className="h-10 w-10 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-black">All Tasks</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <svg className="animate-spin h-10 w-10 mx-auto mb-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-gray-600">Loading tasks...</p>
            </div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20">
            <Circle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 text-lg">No tasks found</p>
            <p className="text-gray-500 text-sm mt-2">Create your first task to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white border-2 border-black rounded-xl p-5 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <button 
                      onClick={() => handleToggleComplete(task.id, task.completed)}
                      className="flex-shrink-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-black" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-400 hover:text-black transition" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-black'}`}>
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded ${
                          task.completed ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {task.completed ? 'completed' : 'pending'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Trash2 className="h-5 w-5 text-gray-600 hover:text-black" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border-2 border-black">
            <div className="flex items-center justify-between p-6 border-b-2 border-black">
              <h3 className="text-2xl font-bold text-black">Add New Task</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setNewTaskTitle("");
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="p-6">
              <div className="mb-6">
                <label htmlFor="taskTitle" className="block text-sm font-semibold text-black mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  id="taskTitle"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task title..."
                  className="w-full text-black px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  autoFocus
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setNewTaskTitle("");
                  }}
                  className="flex-1 px-4 py-3 border-2 border-black text-black rounded-lg hover:bg-gray-100 transition font-semibold"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding...' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}