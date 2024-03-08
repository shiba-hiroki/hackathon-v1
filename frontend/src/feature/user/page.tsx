import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BsTrash3 } from "react-icons/bs";
import { LiaUserTieSolid } from "react-icons/lia";
import { LiaUserSolid } from "react-icons/lia";
import { TbFileReport } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { client } from "../../api/clinent";
import { components } from "../../api/v1";
import { appURL } from "../../config/url";

export function User() {
  const [users, setUsers] = useState<
    components["schemas"]["UserListResponseSchema"]
  >([]);

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

  const handleUserDelete = (id: number) => {
    // Handle button click for the row with the given id
    console.log(`Button clicked for row with id ${id}`);
  };

  return (
    <div className="w-5/6 h-screen p-10">
      <h2 className="font-medium size-16 w-full text-center">USER LIST</h2>
      <div className="w-full flex flex-wrap gap-3">
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
                  to={appURL.detailAttendance
                    .replace(":id", String(user.id))
                    .replace(":year", String(now.toISOString().substring(0, 4)))
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
                  className="p-1 rounded-md bg-red-600 hover:opacity-80"
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
    </div>
  );
}
