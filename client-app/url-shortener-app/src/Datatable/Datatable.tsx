import * as React from 'react';
import { UrlData } from '../interface/UrlData';
import { Link } from 'react-router-dom';
import { ServerUrl } from '../helper/Constants';

interface IDataTableProps {
    data:UrlData[];
}

const DataTable: React.FunctionComponent<IDataTableProps> = (props) => {
    const {data} = props;
    console.log("the data is table:", data);
    const renderTableData = () => {
        return data.map((item) => {
            return (
                <tr key={item._id} className='border-b text-white bg-gray-600 hover:bg-white hover:text-gray-80'>
                    <td className='px-6 py-3 break-words'>
                        <Link to={`${ServerUrl}/shortUrl/${item.fullUrl}`} target='_blank' rel='noreferer noopener'>
                        {
                            item.shortUrl
                        }</Link>
                    </td>
                    <td className='px-6 py-3'>{item.clicks}</td>
                    <td className='px-6 py-3'></td>
                </tr>
            )
        })
    };
  return (
    <div className='container mx-auto pt-2 pb-10'>
        <div className='relative overflow-x-auto shadow-sm sm:rounded-lg'>
            <table className='w-full table-fixed text-sm text-left rtl:text-right text-gray-500'>
                <thead className='bg-gray-800 text-md uppercase text-gray-50'>
                    <tr>
                        <th scope="col" className="px-6 py-3 w-6/12 ">FullUrl</th>
                        <th scope="col" className="px-6 py-3 w-6/12 ">shortUrl</th>
                        <th scope="col" className="px-6 py-3  ">Click</th> 
                        <th scope="col" className="px-6 py-3  ">Action</th>
                    </tr>
                </thead>
                <tbody>{renderTableData()}</tbody>
            </table>
        </div>
    </div>
  );
};

export default DataTable;
