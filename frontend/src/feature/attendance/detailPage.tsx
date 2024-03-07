import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { client } from "../../api/clinent";
import { appURL } from "../../config/url";

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
    <div style={{ width: "500px", margin: "20px" }}>
      <Select
        instanceId="search-select-box"
        defaultValue={selectedValue}
        options={options}
        onChange={(option) => handleChange(option)}
        noOptionsMessage={() => "user not found"}
        placeholder={options.find((u) => u.id === Number(id))?.label}
        isSearchable={true}
      />
    </div>
  );
};
