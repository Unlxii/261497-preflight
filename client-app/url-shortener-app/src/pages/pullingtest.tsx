import { useState, useEffect } from 'react';
import FormContainer from "../component/FormContainer/FormContainer.tsx";
import { UrlData } from "../interface/UrlData";
import { ServerUrl } from "../helper/Constants";
import axios from "axios";
import DataTable from "../Datatable/Datatable";

interface PullingTestProps {
  userId: string;
}

const PullingTest: React.FunctionComponent<PullingTestProps> = ({ userId }) => {
  const [data, setData] = useState<UrlData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get(
          `${ServerUrl}/api/public/user/${userId}/shortUrls`,
          { headers: { "Cache-Control": "no-cache" } }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching short URLs:", error);
        setError("Failed to fetch short URLs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTableData();
  }, [userId]); // Run when userId changes

  const deleteUrl = async (id: string) => {
    try {
      await axios.delete(`${ServerUrl}/shortUrl/${id}`);
      fetchTableData(); // Refresh data after deleting
    } catch (error) {
      console.error("Error deleting short URL:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error}</div>;
  } else if (data.length === 0) {
    return <p>No short URLs found for this user.</p>;
  } else {
    return (
      <>
        <FormContainer />
        <DataTable data={data}  /> 
      </>
    );
  }
};

export default PullingTest;
function fetchTableData() {
  throw new Error('Function not implemented.');
}

