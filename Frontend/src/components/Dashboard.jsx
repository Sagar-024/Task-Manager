import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Calendar, User, Home } from "lucide-react";
import axios from "axios";
import TaskModal from "./TaskModal";

const statusColors = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
};

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0 });
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [filter]);

  const fetchTasks = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setTasks([]);
      setLoading(false);
      return;
    }
    const url =
      filter === "all"
        ? "http://localhost:5000/api/tasks"
        : `http://localhost:5000/api/tasks?status=${filter}`;
    try {
      const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      setTasks(res.data);
    } catch {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:5000/api/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch {
      setStats({ total: 0, completed: 0 });
    }
  };

  const getTaskProgress = (task) => {
    if (typeof task.progress === "number") return task.progress;
    if (task.status === "completed") return 100;
    if (task.status === "in_progress") return 50;
    return 0;
  };

  const toggleTaskStatus = async (task) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    let newStatus;
    if (task.status === "pending") newStatus = "in_progress";
    else if (task.status === "in_progress") newStatus = "completed";
    else newStatus = "pending";

    let newProgress = 0;
    if (newStatus === "in_progress") newProgress = 50;
    if (newStatus === "completed") newProgress = 100;

   
    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, status: newStatus, progress: newProgress } : t))
    );

    try {
      await axios.put(
        `https://task-manager-3-555o.onrender.com/api/tasks/${task._id}`,
        { status: newStatus, progress: newProgress },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchStats();
    } catch (error) {
      
      setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t)));
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await axios.delete(`https://task-manager-3-555o.onrender.com/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchTasks();
      await fetchStats();
    } catch {
     
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (searchTerm === "" ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.labels?.some((label) => label.toLowerCase().includes(searchTerm.toLowerCase())))) &&
      (filter === "all" || task.status === filter)
  );

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const progressPercent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
     <nav className="sticky top-0 z-10 bg-white shadow px-4 py-3 flex justify-center">
  <div className="flex items-center justify-between max-w-5xl w-full">
    <div className="flex space-x-2">
      {["all", "in_progress", "completed"].map((status) => (
        <button
          key={status}
          onClick={() => setFilter(status)}
          className={`px-3 py-1 rounded-full font-semibold 
            ${
              filter === status 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } 
            text-xs sm:text-sm md:text-base`}
        >
          {status === "all" ? "All Tasks" : status.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </button>
      ))}
    </div>
    <button
      className="rounded-full p-2 hover:bg-gray-200 ml-4"
      aria-label="Profile"
      onClick={() => navigate("/profile")}
    >
      <User size={24} />
    </button>
  </div>
</nav>


      <main className="flex-grow max-w-md mx-auto p-5 w-full">
        <div className="mb-6">
          <p className="text-gray-600">Hi, {user?.name?.split(" ")[0] || "User"}</p>
          <h1 className="text-2xl font-bold text-gray-900">Welcome! Let's make today awesome</h1>
        </div>

          <div className="relative mb-6">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search task"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              aria-label="Search tasks"
            />
          </div>

          <section
            aria-label="Overall progress"
            className="mb-6 bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
          >
            <div className="flex-grow mr-4" aria-hidden="true">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-blue-600 rounded-full transition-all duration-700 ease-in-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {completedTasks} / {totalTasks} tasks done
              </p>
            </div>
            <span className="text-blue-700 font-semibold" aria-live="polite" aria-atomic="true">
              {progressPercent}%
            </span>
          </section>

          <section className="space-y-5 h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="text-center py-20 text-gray-500" role="status" aria-label="Loading tasks">
                Loading...
              </div>
            ) : filteredTasks.length === 0 ? (
              <p className="text-center text-gray-400 select-none">No tasks found.</p>
            ) : (
              filteredTasks.map((task) => (
                <article
                  key={task._id}
                  className="bg-white rounded-lg p-4 shadow border flex flex-col space-y-2"
                >
                  <div className="flex flex-wrap gap-2">
                    {task.labels?.map((label, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          statusColors[label.toLowerCase()] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="capitalize">{task.status.replace("_", " ")}</span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={14} />
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3" aria-label={`Progress: ${task.progress || 0} percent`}>
                    <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-blue-600 rounded-full transition-all duration-700 ease-in-out"
                        style={{ width: `${getTaskProgress(task)}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{getTaskProgress(task)}%</span>
                  </div>

                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={() => toggleTaskStatus(task)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition"
                      aria-label={`Mark task as ${task.status === "completed" ? "incomplete" : "complete"}`}
                    >
                      {task.status === "completed"
                        ? "Undo Complete"
                        : task.status === "in_progress"
                          ? "Mark Complete"
                          : "Start Task"}
                    </button>
                    <button
                      onClick={() => {
                        setEditingTask(task);
                        setShowModal(true);
                      }}
                      className="px-3 py-1 bg-gray-300 text-gray-800 rounded-full text-sm font-semibold hover:bg-gray-400 transition"
                      aria-label="Edit task"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold hover:bg-red-700 transition"
                      aria-label="Delete task"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </section>

          <button
            onClick={() => {
              setEditingTask(null);
              setShowModal(true);
            }}
            aria-label="Add new task"
            className="fixed bottom-20 right-6 w-16 h-16 rounded-full bg-blue-600 shadow-lg flex items-center justify-center text-white transition hover:bg-blue-700"
          >
            <Plus size={28} />
          </button>

          {showModal && (
            <TaskModal
              task={editingTask}
              onClose={() => {
                setShowModal(false);
                setEditingTask(null);
              }}
              onSave={() => {
                setShowModal(false);
                setEditingTask(null);
                fetchTasks();
                fetchStats();
              }}
            />
          )}
      </main>
    </div>
  );
};

export default Dashboard;
