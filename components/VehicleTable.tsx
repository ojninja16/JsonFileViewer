import React from 'react';
import { Table } from 'antd';
import { Vehicle } from '../types/Vehicle';

interface VehicleTableProps {
  data: Vehicle[];
  loading: boolean;
}

const VehicleTable: React.FC<VehicleTableProps> = ({ data, loading }) => {
  console.log(data);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'Name', // Capitalized as per your data structure
      key: 'name', // Typically, the key is lowercase
    },
    {
      title: 'Model',
      dataIndex: 'Model',
      key: 'model',
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      key: 'type',
    },
    {
      title: 'Manufacturer',
      dataIndex: 'Manufacturer',
      key: 'manufacturer',
    },
    {
      title: 'Manufacturing Date',
      dataIndex: 'Manufacturing Date', // May need adjustment if this key contains spaces
      key: 'manufacturingDate',
    },
    {
      title: 'Seating',
      dataIndex: 'Seating',
      key: 'seating',
    },
  ];
  

  return (
    <div style={{ overflowX: 'auto' }}>
      <Table dataSource={data} columns={columns} loading={loading} scroll={{ x: true }} />
    </div>
  );
};

export default VehicleTable;