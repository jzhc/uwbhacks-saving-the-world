import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "../../models/userModel";

export default function InitiativeCard({ initiative }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      // const data = await getUser(initiative.ScrumMasterId);
      // setUser(data[0]);
      setUser(
        new User(
          5,
          "Adam",
          "Tan",
          "AdamTan@gmail.com",
          "567050540",
          "Software Engineer",
          5,
          "WASGOOD GANG"
        )
      );
    }
    fetchUser();
  }, [initiative.ScrumMasterId]);

  return (
    <Link
      to={`/initiative/${initiative.UID}`}
      className="
        block w-full
        bg-white rounded-2xl
        p-4 sm:p-6
        shadow-lg hover:shadow-2xl
        transform hover:-translate-y-1
        transition duration-300
      "
    >
      {/* HEADER: flex with title growing and date wrapping */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
        <h2 className="
          flex-1 min-w-0
          text-xl sm:text-2xl
          font-semibold text-blue-900
          break-words
        ">
          {initiative.title}
        </h2>
        <time
          className="mt-1 sm:mt-0 text-sm text-gray-500 sm:ml-4"
          dateTime={`
            ${initiative.publishYear}-
            ${String(initiative.publishMonth).padStart(2, "0")}-
            ${String(initiative.publishDay).padStart(2, "0")}
          `.replace(/\s+/g, "")}
        >
          {`${initiative.publishMonth}/${initiative.publishDay}/${initiative.publishYear}`}
        </time>
      </div>

      {/* DESCRIPTION */}
      <p className="mt-3 text-blue-800 text-base sm:text-lg leading-relaxed">
        {initiative.description}
      </p>

      {/* CREATOR */}
      {user ? (
        <div className="mt-5 flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            👤
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium">
              {user.firstName} {user.lastName}
            </span>{" "}
            <span className="italic text-gray-500">
              {user.profession}
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-5 text-sm text-gray-400 animate-pulse">
          Loading…
        </div>
      )}
    </Link>
  );
}
