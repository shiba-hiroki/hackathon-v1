import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../../api/clinent";
import { appURL } from "../../config/url";
import LoadingSpinner from "../../ui/spiner";

type AttendanceState = "checkIn" | "checkOut" | "breakStart" | "breakEnd";

const actionColors = {
  checkIn: "bg-green-300",
  checkOut: "bg-orange-300",
  breakStart: "bg-blue-300",
  breakEnd: "bg-yellow-300",
};

type GroupedAttendances = {
  [key: string]: Array<{ time: string; state: AttendanceState }>;
};

export const DetailAttendance = () => {
  const { id, year, month } = useParams<{
    id: string;
    year: string;
    month: string;
  }>();

  const [groupedAttendances, setGroupedAttendances] = useState<
    GroupedAttendances | undefined
  >(undefined);

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

          const attendances = data.attendances.map((attendance) => {
            const date = new Date(attendance.time);
            return {
              day: date.toLocaleDateString().slice(-2).replace("/", ""),
              time: date.toLocaleTimeString(),
              state: attendance.state,
            };
          });

          const gA: GroupedAttendances = {};
          for (const attendance of attendances) {
            const day = attendance.day;
            if (!gA[day]) {
              gA[day] = [];
            }
            gA[day].push({
              time: attendance.time.slice(0, -3),
              state: attendance.state,
            });
          }
          setGroupedAttendances(gA);
        }
      }
    })();
  }, [id, year, month]);

  return (
    <div className="h-5/6 flex flex-col flex-wrap pb-1">
      {groupedAttendances ? (
        Object.keys(groupedAttendances).map((day) => (
          <div key={day} className="flex gap-x-2 p-0.5 w-1/2">
            <h2 className="w-1/12 text-center text-lg font-bold rounded">
              {day}
            </h2>
            {groupedAttendances[day].map((attendance) => (
              <p
                key={`${attendance.time}`}
                className={`rounded-md p-0.5 w-2/12 text-center ${
                  actionColors[attendance.state]
                }`}
              >
                {attendance.time}
              </p>
            ))}
          </div>
        ))
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
