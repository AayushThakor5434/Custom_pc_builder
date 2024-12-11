import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComponentSelector from './ComponentSelector';

const PCBuilder = () => {
  const [selectedComponents, setSelectedComponents] = useState({
    cpu: '',
    gpu: '',
    ram: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [componentOptions, setComponentOptions] = useState({
    cpu: [],
    gpu: [],
    ram: [],
  });

  // Fetch component data from external APIs
  useEffect(() => {
    // Example API calls (replace with actual URLs and API keys)
    axios.get('https://api.example.com/cpu').then(response => {
      setComponentOptions(prevState => ({ ...prevState, cpu: response.data }));
    });
    axios.get('https://api.example.com/gpu').then(response => {
      setComponentOptions(prevState => ({ ...prevState, gpu: response.data }));
    });
    axios.get('https://api.example.com/ram').then(response => {
      setComponentOptions(prevState => ({ ...prevState, ram: response.data }));
    });
  }, []);

  const handleSelectComponent = (component, value) => {
    setSelectedComponents(prev => {
      const updatedComponents = { ...prev, [component]: value };
      let updatedPrice = 0;

      Object.keys(updatedComponents).forEach(key => {
        const selectedPart = componentOptions[key].find(
          (opt) => opt.value === updatedComponents[key]
        );
        if (selectedPart) {
          updatedPrice += selectedPart.price;
        }
      });
      setTotalPrice(updatedPrice);
      return updatedComponents;
    });
  };

  return (
    <div>
      <h2>Choose Your Components</h2>
      <div>
        <ComponentSelector
          label="CPU"
          options={componentOptions.cpu}
          onSelect={(value) => handleSelectComponent('cpu', value)}
        />
        <ComponentSelector
          label="GPU"
          options={componentOptions.gpu}
          onSelect={(value) => handleSelectComponent('gpu', value)}
        />
        <ComponentSelector
          label="RAM"
          options={componentOptions.ram}
          onSelect={(value) => handleSelectComponent('ram', value)}
        />
      </div>

      <h2>Selected Parts</h2>
      <ul>
        {Object.entries(selectedComponents).map(([key, value]) => (
          <li key={key}>
            {key.toUpperCase()}: {value || 'Not selected'}
          </li>
        ))}
      </ul>

      <h2>Total Price: ${totalPrice}</h2>
    </div>
  );
};

export default PCBuilder;
