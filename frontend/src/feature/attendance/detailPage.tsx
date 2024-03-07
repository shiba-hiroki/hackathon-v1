import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { client } from "../../api/clinent";
import { appURL } from "../../config/url";

dayjs.extend(utc);
dayjs.extend(timezone);

export interface OptionType {
  id: number;
  label: string;
}

export const DetailAttendance = () => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const { id } = useParams<{ id: string }>();

  const [selectedValue, setSelectedValue] = useState<OptionType>();
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

  const handleChange = (option: OptionType | null) => {
    if (option) {
      setSelectedValue(option);
    }
  };

  return (
    <div className="w-full h-full p-10 flex-col">
      <Select
        className="mb-3"
        instanceId="search-select-box"
        defaultValue={selectedValue}
        options={options}
        onChange={(option) => handleChange(option)}
        noOptionsMessage={() => "user not found"}
        placeholder={options.find((u) => u.id === Number(id))?.label}
        isSearchable={true}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          views={["month", "year"]}
          timezone="Asia/Tokyo"
          onChange={(val: unknown) => {
            console.log(val.$y, Number(val.$M) + 1);
          }}
        />
      </LocalizationProvider>
    </div>
  );
};
