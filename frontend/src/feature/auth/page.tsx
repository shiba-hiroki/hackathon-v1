import { StatusCodes } from "http-status-codes";
import { useState } from "react";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import { client } from "../../api/clinent";
import { appURL } from "../../config/url";

export function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    const { data, error, response } = await client.POST("/api/login/employer", {
      body: { name, password },
    });
    localStorage.setItem("sessionID", data?.sessionID || "");

    if (response.status === StatusCodes.CREATED) {
      navigate(appURL.user);
    }
    setError(error?.message || "error");
  };
  return (
    <>
      <ScrollRestoration />
      <main className="h-screen flex items-center justify-center">
        <form className="max-w-md p-6 bg-white rounded shadow-md flex-col">
          <label className="block mb-4">
            <span>名前</span>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />
          </label>
          <label className="block mb-4">
            <span>パスワード</span>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </label>
          <button
            className="bg-cyan-400 text-white px-4 py-2 rounded-md hover:bg-cyan-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
          <p className="text-red-500">{error || "　"}</p>
        </form>
      </main>
    </>
  );
}
