import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../../api/clinent";
import { appURL } from "../../config/url";

export const DetailAttendance = () => {
  const { id, year, month } = useParams<{
    id: string;
    year: string;
    month: string;
  }>();
  const [attendances, SetAttendances] = useState<
    {
      day: string;
      time: string;
      state: string;
    }[]
  >([]);

  const navigate = useNavigate();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    (async () => {
      if (id && year && month) {
        const { data, response } = await client.GET(
          "/api/employer/attendance/{id}",
          {
            params: { query: { year, month }, path: { id } },
          },
        );
        if (response.status === StatusCodes.UNAUTHORIZED) {
          navigate(appURL.login);
        }
        if (data) {
          data.attendances.sort(
            (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
          );
          SetAttendances(
            data.attendances.map((attendance) => {
              const date = new Date(attendance.time);
              return {
                day: date.toLocaleDateString().slice(-2).replace("/", ""),
                time: date.toLocaleTimeString(),
                state: attendance.state,
              };
            }),
          );
        }
      }
    })();
  }, [id, year, month]);

  return (
    <div className="w-full p-10 flex-col">
      {attendances.map((attendance) => {
        return (
          <p key={`${id}${attendance.day}${attendance.time}`}>
            {attendance.day} {attendance.state} {attendance.time}
          </p>
        );
      })}
    </div>
  );
};
