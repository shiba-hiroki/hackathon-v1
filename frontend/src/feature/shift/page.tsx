import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { StatusCodes } from "http-status-codes";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { client } from "../../api/clinent";
import { components } from "../../api/v1";
import { appURL } from "../../config/url";
import LoadingSpinner from "../../ui/spiner";

dayjs.extend(utc);
dayjs.extend(timezone);

type User = {
  id: number;
  label: string;
};

type ConfirmedProps = {
  users: User[];
};

type RequestProps = {
  users: User[];
  shiftRequests:
    | components["schemas"]["ShiftInMonthResponseSchema"]
    | undefined;
};

export const Shift = () => {
  const [users, setUsers] = useState<User[]>([]);
  const selectedYearAndMonth = useRef<Dayjs>(
    dayjs(new Date().toISOString().substring(0, 10)),
  );

  const [shiftRequests, setShiftRequests] =
    useState<components["schemas"]["ShiftInMonthResponseSchema"]>();

  const navigate = useNavigate();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    (async () => {
      const userRes = client.GET("/api/employer/user");
      const shiftRequestRes = client.GET("/api/employer/shiftRequest", {
        params: {
          query: {
            year: selectedYearAndMonth.current.year().toString(),
            month: (selectedYearAndMonth.current.month() + 1)
              .toString()
              .padStart(2, "0"),
          },
        },
      });

      {
        const { data, response } = await userRes;
        if (response.status === StatusCodes.UNAUTHORIZED) {
          navigate(appURL.login);
        }
        if (data) {
          setUsers(
            data.map((user) => {
              return { id: user.id, label: user.name };
            }),
          );
        }
      }

      {
        const { data, response } = await shiftRequestRes;
        if (response.status === StatusCodes.UNAUTHORIZED) {
          navigate(appURL.login);
        }
        if (data) {
          for (const userShiftRequest of data) {
            userShiftRequest.shiftTime.sort(
              (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime(),
            );
          }
          setShiftRequests(data);
        }
      }
    })();
  }, []);

  return (
    <div className="h-screen w-5/6 flex flex-col p-5">
      <div className="w-full h-1/12">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["month", "year"]}
            timezone="Asia/Tokyo"
            value={selectedYearAndMonth.current}
            onChange={(val: Dayjs | null) => {
              if (val) {
                const selectYear = val.year().toString();
                const selectMonth = (val.month() + 1)
                  .toString()
                  .padStart(2, "0");
                selectedYearAndMonth.current = dayjs(
                  `${selectYear}-${selectMonth}-15`,
                );
              }
            }}
          />
        </LocalizationProvider>
      </div>
      <div className="flex">
        <Confirmed users={users} />
        <Request users={users} shiftRequests={shiftRequests} />
      </div>
    </div>
  );
};

const Confirmed = ({ users }: ConfirmedProps) => {
  return (
    <div className="w-1/2 flex flex-col items-center gap-2 p-5">
      <h2 className="text-2xl text-center font-bold">Confirmed</h2>
    </div>
  );
};

const Request = ({ users, shiftRequests }: RequestProps) => {
  const [userID, setUserID] = useState<number>();

  return (
    <div className="w-1/2 flex flex-col items-center gap-2 p-5">
      <h2 className="text-2xl text-center font-bold">Request</h2>
      <Select
        className="w-full"
        instanceId="search-select-box"
        options={users}
        onChange={(user) => {
          if (user) {
            setUserID(user.id);
          }
        }}
        noOptionsMessage={() => "user not found"}
        placeholder={users.find((u) => u.id === userID)?.label}
        isSearchable={true}
      />
      {shiftRequests ? (
        shiftRequests
          .filter(
            (shiftRequest) => userID == null || shiftRequest.userID === userID,
          )
          .map((shift) => {
            return (
              <>
                <p>{users.find((u) => u.id === shift.userID)?.label}</p>
                <div className="flex flex-col w-full">
                  {shift.shiftTime.map((times) => {
                    const start = new Date(times[0]);
                    const end = new Date(times[1]);
                    return (
                      <div className="w-full flex gap-x-3">
                        <p className="text-center text-lg font-bold">
                          {start
                            .toLocaleDateString()
                            .slice(-2)
                            .replace("/", "")}
                        </p>
                        <p
                          key={`${times[0]}`}
                          className="rounded-md p-0.5 w-1/5 text-center bg-green-300"
                        >
                          {start.toLocaleTimeString().slice(0, -3)}
                        </p>
                        <p
                          key={`${times[1]}`}
                          className="rounded-md p-0.5 w-1/5 text-center bg-orange-300"
                        >
                          {end.toLocaleTimeString().slice(0, -3)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
