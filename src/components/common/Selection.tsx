import React, { useState } from 'react';
import type { SelectProps } from 'antd';
import { Select, Space, Tooltip } from 'antd';

interface ItemProps {
  value: string;
}

const values = [
  "Data Analyst",
  "Project Manager",
  "Front-End Developer",
  "Back-End Developer",
  "UI/UX Designer",
  "DevOps Engineer",
];

const options: ItemProps[] = values.map(value => ({
  value: value,
}));

const sharedProps: SelectProps = {
  mode: 'multiple',
  style: { width: '100%' },
  options,
  placeholder: 'Select roles',
  maxTagCount: 'responsive',
};

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>([]);

  const selectProps: SelectProps = {
    value,
    onChange: setValue,
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Select
        {...sharedProps}
        {...selectProps}
        maxTagPlaceholder={(value) => (
          <Tooltip
            overlayStyle={{ pointerEvents: 'none' }}
            title={value.map(({ value }) => value).join(', ')}
          >
            +{value.length} more
          </Tooltip>
        )}
      />
    </Space>
  );
};

export default App;
