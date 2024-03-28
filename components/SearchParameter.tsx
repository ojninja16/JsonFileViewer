import React from 'react';
import { Select, Input, Button, Row, Col, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

interface SearchParameterProps {
  param: { id: number; name: string; value: string };
  onRemove: (id: number) => void;
  onInputChange: (id: number, name: string, value: string) => void;
  parameterNames: string[];
}

function SearchParameter({ param, onRemove, onInputChange, parameterNames }: SearchParameterProps) {
  const handleInputChange = (name: string, value: string) => {
    onInputChange(param.id, name, value);
  };

  return (
    <div className="p-4 mb-2 bg-gray-100 rounded-md">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={8}>
          <Select
            placeholder="Parameter Name"
            value={param.name}
            onChange={(value) => handleInputChange('name', value)}
            className="w-full"
          >
            {parameterNames.length === 0 && (
              <Option value="" disabled>
                Please upload a JSON file 🥺
              </Option>
            )}
            {parameterNames.map((name) => (
              <Option key={name} value={name}>
                {name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={8}>
          <Input
            placeholder="Parameter Value"
            value={param.value}
            onChange={(e) => handleInputChange('value', e.target.value)}
            className="w-full"
          />
        </Col>
        <Col xs={24} sm={8} className="flex justify-end">
          <Button type="text" icon={<DeleteOutlined />} onClick={() => onRemove(param.id)} danger />
        </Col>
      </Row>
    </div>
  );
}

export default SearchParameter;
