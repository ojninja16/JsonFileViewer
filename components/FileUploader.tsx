import React, { useCallback, useState } from 'react';
import { Typography, Card, Switch } from 'antd';
import { useDropzone } from 'react-dropzone';
import { CloudUploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode, setVehicleData } from '../redux/vehicleSlice';
import { RootState } from '../redux/store';
import { Vehicle } from '../types/Vehicle';
import VehicleTable from './VehicleTable';
import JsonDisplay from './JsonDisplay';

const { Title } = Typography;

function FileUploader() {
  const [parsedData, setParsedData] = useState<Vehicle[] | null>(null);
  const dispatch = useDispatch();
  const viewMode = useSelector((state: RootState) => state.vehicle.viewMode);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 1 && acceptedFiles[0].type === 'application/json') {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData: Vehicle[] = JSON.parse(event.target?.result as string);
          setParsedData(jsonData);
          dispatch(setVehicleData(jsonData));
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    } else {
      alert('Please select a JSON file.');
    }
  }, [dispatch]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.json', multiple: false });

  const handleViewModeChange = (checked: boolean) => {
    dispatch(setViewMode(checked ? 'table' : 'json'));
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="p-4 w-screen  h-full">
        <div className="h-full flex flex-col justify-center items-center space-y-4">
          <Title level={6}>JSON Analyzer</Title>
          <div {...getRootProps()} className="border-2 border-dashed w-8/12 border-gray-300 rounded-md p-8 cursor-pointer flex flex-col items-center justify-center">
            <input {...getInputProps()} />
            <CloudUploadOutlined className="text-3xl mb-4 text-gray-400" />
            <p className="text-gray-600">Drag & Drop your JSON file here</p>
            <p className="text-gray-600">or</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
              Browse File
            </button>
          </div>
          {parsedData && <Title level={5} className='text-emerald-400'>🚀 JSON File Parsed Successfully!</Title>}
          <div className="flex items-center">
            <Title level={5} className="mr-2">View Mode:</Title>
            <Switch checkedChildren="Table" unCheckedChildren="JSON" checked={viewMode === 'table'} onChange={handleViewModeChange} />
          </div>
          <div className="w-full h-full flex justify-center items-center">
            {viewMode === 'table' && parsedData && <VehicleTable data={parsedData} loading={false} />}
            {viewMode === 'json' && parsedData && <JsonDisplay data={parsedData} />}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default FileUploader;
