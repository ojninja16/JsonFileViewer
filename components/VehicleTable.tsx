import React from 'react';
import { Table } from 'antd';
import { Vehicle } from '../types/Vehicle';

interface VehicleTableProps {
  data: Vehicle[];
  loading: boolean;
}

const VehicleTable: React.FC<VehicleTableProps> = ({ data, loading }) => {
  const columns = data.length > 0 ? Object.keys(data[0]).map((key) => ({
    title: key,
    dataIndex: key,
    key: key.toLowerCase().replace(/\s+/g, '_'),
  })) : [];

  return (
    <div style={{ overflowX: 'auto' }} className=' max-h-screen'>
      <Table dataSource={data} columns={columns} loading={loading} scroll={{ x: true }} rowClassName="table-row" />
    </div>
  );
};

export default VehicleTable;
