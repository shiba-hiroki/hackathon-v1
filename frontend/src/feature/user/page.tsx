import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BsTrash3 } from "react-icons/bs";
import { LiaUserTieSolid } from "react-icons/lia";
import { LiaUserSolid } from "react-icons/lia";
import { PiUserPlus } from "react-icons/pi";
import { TbFileReport } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { client } from "../../api/clinent";
import { components } from "../../api/v1";
import { appURL } from "../../config/url";
import LoadingSpinner from "../../ui/spiner";

type CreateUser = {
  name: string;
  password: string;
  type: "employee" | "employer";
};

export function User() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState<
    components["schemas"]["UserListResponseSchema"] | undefined
  >(undefined);
  const [newUser, setNewUser] = useState<CreateUser>({
    name: "",
    password: "",
    type: "employee",
  });

  // 日本時間
  const now = new Date();
  now.setTime(now.getTime() + 9 * 60 * 60 * 1000);

  const navigator = useNavigate();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    (async () => {
      const { data, response } = await client.GET("/api/employer/user");
      setUsers(data || []);
      if (response.status === StatusCodes.UNAUTHORIZED) {
        navigator(appURL.login);
      }
    })();
  }, []);

  const handleUserDelete = async (id: number) => {
    // await client.DELETE("/api/employer/user/{id}", {
    //   params: { path: { id: id.toString() } },
    // });
    console.log(`Button clicked for row with id ${id}`);
  };

  const handleCreateUser = async () => {
    const { data, response } = await client.POST("/api/employer/user", {
      body: {
        name: newUser.name,
        type: newUser.type,
        password: newUser.password,
      },
    });
    if (response.status === StatusCodes.CREATED && data) {
      setUsers([...(users || []), data]);
    }
    setShowModal(false);
  };

  return (
    <div className="w-5/6 h-screen p-10">
      <h2 className="font-medium size-16 w-full text-center">USER LIST</h2>
      <div className="flex items-center justify-center">
        <IconContext.Provider value={{ color: "#22d3ee", size: "30px" }}>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="hover:opacity-30 mb-2"
          >
            <PiUserPlus />
          </button>
        </IconContext.Provider>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="z-10 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create User</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={(e) => {
                  setNewUser({
                    ...newUser,
                    [e.target.name]: e.target.value,
                  });
                }}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={(e) => {
                  setNewUser({
                    ...newUser,
                    [e.target.name]: e.target.value,
                  });
                }}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                User Type
              </label>
              <select
                name="type"
                value={newUser.type}
                onChange={(e) => {
                  setNewUser({
                    ...newUser,
                    [e.target.name]: e.target.value,
                  });
                }}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="employee">Employee</option>
                <option value="employer">Employer</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="mr-2 p-2 bg-gray-300 rounded-md hover:opacity-30"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateUser}
                className="p-2 bg-cyan-400 text-white rounded-md hover:opacity-30"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      {users ? (
        <div className="w-full flex flex-wrap justify-between">
          {users.map((user) => (
            <div key={user.id} className="rounded shadow-md p-3 w-1/3 flex-col">
              <div className="flex items-center justify-center">
                <IconContext.Provider value={{ size: "30px" }}>
                  {user.type === "employer" ? (
                    <LiaUserTieSolid />
                  ) : (
                    <LiaUserSolid />
                  )}
                </IconContext.Provider>
                <p className="text-center">{user.name}</p>
              </div>

              <div className="flex w-full mt-6">
                <div className="w-1/2 flex items-center justify-center">
                  <Link
                    className="hover:opacity-30"
                    to={appURL.detailAttendance
                      .replace(":id", String(user.id))
                      .replace(
                        ":year",
                        String(now.toISOString().substring(0, 4)),
                      )
                      .replace(
                        ":month",
                        String(now.toISOString().substring(5, 7)),
                      )}
                  >
                    <IconContext.Provider
                      value={{ color: "#22d3ee", size: "30px" }}
                    >
                      <TbFileReport />
                    </IconContext.Provider>
                  </Link>
                </div>
                <div className="w-1/2 flex items-center justify-center">
                  <button
                    className="p-1 rounded-md bg-red-600 hover:opacity-30"
                    type="button"
                    onClick={() => handleUserDelete(user.id)}
                  >
                    <IconContext.Provider value={{ color: "white" }}>
                      <BsTrash3 />
                    </IconContext.Provider>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
