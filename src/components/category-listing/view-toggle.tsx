"use client";
interface ViewToggleProps {
  viewMode: "grid" | "list";
  setViewMode: (viewMode: "grid" | "list") => void;
}
const ViewToggle = ({ viewMode, setViewMode }: ViewToggleProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-1 border-2 border-transparent">
      <button
        onClick={() => setViewMode("grid")}
        className={`px-4 py-2 rounded-md transition-all duration-300 ${
          viewMode === "grid"
            ? "bg-yellow-400 text-black"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <span className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          Grid
        </span>
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`px-4 py-2 rounded-md transition-all duration-300 ${
          viewMode === "list"
            ? "bg-yellow-400 text-black"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <span className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          List
        </span>
      </button>
    </div>
  );
};

export default ViewToggle;
