import React, { useState, useEffect } from 'react';
import { Select, Space, Tooltip } from 'antd';
import axios from 'axios';
import type { SelectProps } from 'antd';

interface ItemProps {
  value: string;
}

interface SelectionProps {
  selectedRoles: string[];
  onChange: (roles: string[]) => void;
}

const Selection: React.FC<SelectionProps> = ({ selectedRoles, onChange }) => {
  const [options, setOptions] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('https://pairlance.vercel.app/api/roles');
        const roles = response.data.roles;
        const fetchedOptions = roles.map((role: string) => ({ value: role }));
        setOptions(fetchedOptions);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching roles:', err);
        setError('Failed to load roles');
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (value: string[]) => {
    onChange(value);
  };

  const selectProps: SelectProps<string[]> = {
    mode: 'multiple',
    style: { width: '100%' },
    options,
    placeholder: loading ? 'Loading roles...' : 'Select roles',
    maxTagCount: 'responsive',
    disabled: loading || !!error,
    value: selectedRoles,
    onChange: handleChange,
    maxTagPlaceholder: (value) => (
      <Tooltip
        overlayStyle={{ pointerEvents: 'none' }}
        title={value.join(', ')}
      >
        +{value.length} more
      </Tooltip>
    ),
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {error ? (
        <p>{error}</p>
      ) : (
        <Select {...selectProps} />
      )}
    </Space>
  );
};

export default Selection;
