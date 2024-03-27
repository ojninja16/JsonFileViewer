import React, { useState, useEffect } from 'react';
import { Card, Typography, Divider, Checkbox, Pagination, Row, Col } from 'antd';
import { JsonView, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { Vehicle } from '../types/Vehicle';

interface JsonDisplayProps {
  data: Vehicle[];
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ data }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 3;

  useEffect(() => {
    setSelected(Object.keys(data[0] || {}));
  }, [data]);

  const handleParameterSelection = (paramName: string) => {
    if (selected.includes(paramName)) {
      setSelected(selected.filter((param) => param !== paramName));
    } else {
      setSelected([...selected, paramName]);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredData = data.map((item) => {
    const filteredItem: { [key: string]: any } = {};
    selected.forEach((key) => {
      filteredItem[key] = item[key as keyof Vehicle];
    });
    return filteredItem;
  });

  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedData = filteredData.slice(startIdx, endIdx);

  return (
    <Card>
      <Typography.Title level={5} style={{ marginBottom: '1rem' }}>
        Search Results (JSON Format)
      </Typography.Title>
      <Divider style={{ marginBottom: '1rem' }} />
      <Typography.Title level={4}>Select Parameters to Display:</Typography.Title>
      <Row gutter={[16, 16]}>
        {data &&
          Object.keys(data[0]).map((paramname) => (
            <Col key={paramname} xs={24} sm={12} md={8} lg={6}>
              <Checkbox
                checked={selected.includes(paramname)}
                onChange={() => handleParameterSelection(paramname)}
                className="w-full"
              >
                {paramname}
              </Checkbox>
            </Col>
          ))}
      </Row>
      {data ? (
        <div>
          <Divider style={{ margin: '1rem 0' }} />
          <div className="json-tree-container">
            <JsonView data={paginatedData} style={defaultStyles} />
          </div>
          <Pagination
            style={{ marginTop: '1rem', textAlign: 'center' }}
            current={currentPage}
            total={filteredData.length}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      ) : (
        <Typography.Text>No data to display.</Typography.Text>
      )}
    </Card>
  );
};

export default JsonDisplay;
