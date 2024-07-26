import * as React from "react";
import FormContainer from "../FormContainer/FormContainer";
import { UrlData } from "../../interface/UrlData";
import { ServerUrl } from "../../helper/Constants";
import axios from "axios";
import DataTable from "../../Datatable/Datatable";
import { useUserContext } from "../../context/userContext";

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const { user } = useUserContext();
  const [data, setData] = React.useState<UrlData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchTableData = async () => {
    if (!user) {
      console.error("User is not logged in");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${ServerUrl}/shortUrl/${user.name}/urls`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTableData();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <FormContainer />
      <DataTable data={data} />
    </>
  );
};

export default Container;
