import * as React from "react";
import FormContainer from "../FormContainer/FormContainer";
import { UrlData } from "../../interface/UrlData";
import { ServerUrl } from "../../helper/Constants";
import axios from "axios";
import DataTable from "../../Datatable/Datatable";

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data, setData] = React.useState<UrlData[]>([]);
  const fetchTableData = async () => {
    const response = await axios.get(`${ServerUrl}/ShortUrl`);
    console.log("the response is:", response.data);
    setData(response.data);
    console.log("the data is:", data);
  };
  React.useEffect(() => {
    fetchTableData();
  }, []);
  return (
    <>
      <FormContainer />
      <DataTable data={data} />
    </>
  );
};

export default Container;
