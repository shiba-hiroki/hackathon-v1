import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { StatusCodes } from "http-status-codes";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { client } from "../../api/clinent";
import { appURL } from "../../config/url";

dayjs.extend(utc);
dayjs.extend(timezone);

interface OptionType {
  id: number;
  label: string;
}

export const Attendance = () => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const { id, year, month } = useParams<{
    id: string;
    year: string;
    month: string;
  }>();

  const selectedYearAndMonth = useRef<Dayjs>(
    dayjs(
      year && month
        ? `${year}-${month}-15`
        : new Date().toISOString().substring(0, 10),
    ),
  );

  const navigate = useNavigate();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    (async () => {
      const { data, response } = await client.GET("/api/employer/user");
      if (response.status === StatusCodes.UNAUTHORIZED) {
        navigate(appURL.login);
      }
      if (data) {
        setOptions(
          data.map((user) => {
            return { id: user.id, label: user.name };
          }),
        );
      }
    })();
  }, []);

  return (
    <div className="w-5/6 h-screen px-10 flex-col">
      <div className="w-full py-10">
        <Select
          className="mb-3"
          instanceId="search-select-box"
          options={options}
          onChange={(option) => {
            if (option) {
              navigate(
                appURL.detailAttendance
                  .replace(":id", String(option.id))
                  .replace(
                    ":year",
                    selectedYearAndMonth.current.year().toString(),
                  )
                  .replace(
                    ":month",
                    (selectedYearAndMonth.current.month() + 1)
                      .toString()
                      .padStart(2, "0"),
                  ),
              );
            }
          }}
          noOptionsMessage={() => "user not found"}
          placeholder={options.find((u) => u.id === Number(id))?.label}
          isSearchable={true}
        />
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

                if (id) {
                  navigate(
                    appURL.detailAttendance
                      .replace(":id", id)
                      .replace(":year", selectYear)
                      .replace(":month", selectMonth),
                  );
                }
              }
            }}
          />
        </LocalizationProvider>
      </div>
      <Outlet />
    </div>
  );
};
