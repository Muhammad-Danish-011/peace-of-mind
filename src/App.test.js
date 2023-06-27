import { render } from '@testing-library/react';
import App from './App';


jest.mock('survey-pdf');
jest.mock('react-s3', () => ({
  uploadFile: jest.fn()
}));


describe('App Tests', () => {
  test('App renders without errors', () => {
    render(

      <App />

    );
  });
});
