import React, { useState } from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import SearchParameter from './SearchParameter';
import JsonDisplay from './JsonDisplay';
import VehicleTable from './VehicleTable';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { filterVehicleData, setLoading } from '../redux/vehicleSlice';
import { Vehicle } from '../types/Vehicle';

const { Title } = Typography;

interface SearchProps {
  parameterNames: string[];
  jsonData: Vehicle[] | null;
  viewMode: 'json' | 'table';
}

function Search({ parameterNames, jsonData, viewMode }: SearchProps) {
  const [searchParams, setSearchParams] = useState<{ id: number; name: string; value: string }[]>([
    { id: 1, name: '', value: '' },
  ]);
  const [nextId, setNextId] = useState(2);
  const dispatch = useDispatch();
  const { filteredData, isLoading } = useSelector((state: RootState) => state.vehicle);

  const handleInputChange = (id: number, name: string, value: string) => {
    setSearchParams((prevParams) =>
      prevParams.map((param) => (param.id === id ? { ...param, [name]: value } : param))
    );
  };

  const handleAddParameter = () => {
    setSearchParams((prevParams) => [...prevParams, { id: nextId, name: '', value: '' }]);
    setNextId(nextId + 1);
  };

  const handleRemoveParameter = (id: number) => {
    setSearchParams((prevParams) => prevParams.filter((param) => param.id !== id));
  };

  const handleSearch = () => {
    if (jsonData) {
      dispatch(setLoading(true));
      const newData = jsonData.filter((item) => {
        return searchParams.every((param) => {
          const paramValue = item[param.name as keyof Vehicle];
          if (typeof paramValue === 'string') {
            return paramValue.includes(param.value);
          }
          if (typeof paramValue === 'number') {
            return paramValue === parseFloat(param.value);
          }
          return false;
        });
      });
      dispatch(filterVehicleData(newData));
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div>
        <Title level={5} style={{ marginBottom: '1rem' }}>
          🔍 Multi-Parameter Search
        </Title>
        <Row gutter={[16, 16]}> {/* Use Row component with gutter prop for spacing */}
          {searchParams.map((param) => (
            <Col xs={24} key={param.id}> {/* Use Col component with xs={24} for full width on small screens */}
              <SearchParameter
                key={param.id}
                param={param}
                onRemove={handleRemoveParameter}
                onInputChange={handleInputChange}
                parameterNames={parameterNames}
              />
            </Col>
          ))}
          <Col xs={24}> {/* Use Col component with xs={24} for full width on small screens */}
            <Button
              type="default"
              icon={<PlusOutlined />}
              onClick={handleAddParameter}
              style={{ marginBottom: '0.5rem' }}
            >
              Add Parameter
            </Button>
          </Col>
          <Col xs={24}> {/* Use Col component with xs={24} for full width on small screens */}
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
              Search
            </Button>
          </Col>
        </Row>
      </div>
      {viewMode === 'json' && filteredData.length > 0 && <JsonDisplay data={filteredData} />}
      {viewMode === 'table' && <VehicleTable data={filteredData} loading={isLoading} />}
    </>
  );
}

export default Search;
