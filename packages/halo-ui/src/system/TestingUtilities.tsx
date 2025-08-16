// TestingUtilities: Simple test hook and mock utility
export function useTestId(id: string) {
  return { 'data-testid': id };
}

export function mockComponent(name: string) {
  return () => <div data-mock={name}>Mock: {name}</div>;
}

// Usage in tests:
// <button {...useTestId('submit-btn')}>Submit</button>
// const Mocked = mockComponent('MyComponent');
// <Mocked />
