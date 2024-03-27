import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import FileUploader from '../components/FileUploader';

const Home: React.FC = () => {
  return (
    <Provider store={store}>
      <FileUploader />
    </Provider>
  );
};

export default Home;