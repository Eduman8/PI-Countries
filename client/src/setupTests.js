import '@testing-library/jest-dom';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));
