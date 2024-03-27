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
    <div style={{ padding: '1rem', marginBottom: '1rem' }}>
      <Row gutter={[16, 16]} align="middle"> {/* Use Row component with gutter prop for spacing */}
        <Col xs={24} sm={8}> {/* Use Col component with xs={24} for full width on small screens */}
          <Select
            style={{ width: '100%' }}
            placeholder="Parameter Name"
            value={param.name}
            onChange={(value) => handleInputChange('name', value)}
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
        <Col xs={24} sm={8}> {/* Use Col component with xs={24} for full width on small screens */}
          <Input
            style={{ width: '100%' }}
            placeholder="Parameter Value"
            value={param.value}
            onChange={(e) => handleInputChange('value', e.target.value)}
          />
        </Col>
        <Col xs={24} sm={8} style={{ textAlign: 'right' }}> {/* Use Col component with xs={24} for full width on small screens */}
          <Button type="text" icon={<DeleteOutlined />} onClick={() => onRemove(param.id)} danger />
        </Col>
      </Row>
    </div>
  );
}

export default SearchParameter;
