import {render, screen, fireEvent, waitFor, act} from '@testing-library/react'
import AddTodo from './AddTodo';

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}))

test('render todo title', () => {
  render(<AddTodo/>)
  const title = screen.getByPlaceholderText('todo title');
  expect(title).toBeDefined();
  expect(title).toHaveAttribute("type", "text")
})

test('render todo description', () => {
  render(<AddTodo/>)
  const desc = screen.getByPlaceholderText('todo description');
  expect(desc).toBeDefined();
  expect(desc).toHaveAttribute("type", "text")
})

test('render todo assignee and type check', () => {
  render(<AddTodo/>)
  const assignee = screen.getByPlaceholderText('todo assignee');
  expect(assignee).toBeDefined();
  expect(assignee).toHaveAttribute("type", "text")
})

test('render todo due date and type check', () => {
  render(<AddTodo/>)
  const dueDate = screen.getByTestId('date');
  expect(dueDate).toBeDefined();
  expect(dueDate).toHaveAttribute("type", "date")
})

test('render button', () => {
  render(<AddTodo/>)
  const button = screen.getByText('ADD');
  expect(button).toBeDefined();
  expect(button).toHaveAttribute("type", "submit")
})

test('initially title, assignee, description and due date is empty', () => {
  render(<AddTodo/>)
  const title = screen.getByPlaceholderText('todo title');
  const assignee = screen.getByPlaceholderText('todo assignee');
  const desc = screen.getByPlaceholderText('todo description');
  const dueDate = screen.getByTestId('date');
  expect(title).toHaveValue('');
  expect(assignee).toHaveValue('');
  expect(desc).toHaveValue('');
  expect(dueDate).toHaveValue('');
})

test("input fields are not cleared after the todo is added", async () => {
  render(<AddTodo/>)
  const title = screen.getByPlaceholderText('todo title');
  const assignee = screen.getByPlaceholderText('todo assignee');
  const desc = screen.getByPlaceholderText('todo description');
  const dueDate = screen.getByTestId('date');
  const button = screen.getByText('ADD');
  fireEvent.change(title, {target: {value: 'test'}})
  fireEvent.change(assignee, {target: {value: 'test'}})
  fireEvent.change(desc, {target: {value: 'test'}})
  await act(() => fireEvent.click(button));
  expect(title).toHaveValue("test");
  expect(assignee).toHaveValue("test");
  expect(desc).toHaveValue("test");
});
