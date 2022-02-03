import "./matchMedia.mock";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import * as Reducer from "./redux/ThemeReducer";
import * as Actions from "./redux/ThemeAction";
import TodoItem from "./components/TodoItem";
import Container from "./components/Container";
import App from "./App";
import { Provider } from "react-redux";

afterEach(cleanup)

describe("Reducer Test", () => {
  test("should change to dark", () => {
    const initialState  = {
      theme: "light"
    }
    expect(Reducer.ThemeReducer(initialState, Actions.applyTheme())).toEqual({
      theme: "dark"
    });
  });
});

describe("TodoItem Test", () => {
  test("show todo text from props", () => {
    const handleCheck = jest.fn();
    const handleDelete = jest.fn();
    const key_id = 1;
    const todoItem = render(
      <TodoItem 
        key={key_id}
        id={key_id}
        todo={{
          text: "This is todo text.",
          checked: false
        }}
        clear={false}
        handleDelete={handleDelete}
        handleCheck={handleCheck} />
    );
    expect(todoItem.getByText(/This is todo/i).textContent).toEqual("This is todo text.");
  });

  test("check action called on click", () => {
    const handleCheck = jest.fn();
    const handleDelete = jest.fn();
    const key_id = 1;
    const { getAllByTestId } = render(
      <TodoItem 
        key={key_id}
        id={key_id}
        todo={{
          text: "This is todo text.",
          checked: false
        }}
        clear={false}
        handleDelete={handleDelete}
        handleCheck={handleCheck} />
    );
    const checkbox = getAllByTestId(key_id)[0];
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(handleCheck).toHaveBeenCalledTimes(1);
  });

  test("delete action called on click", () => {
    const handleCheck = jest.fn();
    const handleDelete = jest.fn();
    const key_id = 1;
    const { getAllByTestId } = render(
      <TodoItem 
        key={key_id}
        id={key_id}
        todo={{
          text: "This is todo text.",
          checked: false
        }}
        clear={false}
        handleDelete={handleDelete}
        handleCheck={handleCheck} />
    );
    const deleteBtn = getAllByTestId(key_id)[1];
    fireEvent.click(deleteBtn);
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});

describe("Container Test", () => {
  test("switch theme on click", () => {
    const switchTheme = jest.fn();
    const theme = "light"
    const {getByTestId} = render(
      <Container 
        theme={theme}
        switchTheme={switchTheme} />
    );
    const themeSwitchBtn = getByTestId("switch");
    fireEvent.click(themeSwitchBtn);
    expect(switchTheme).toHaveBeenCalledTimes(1);
  });

  test("add new todo on enter", () => {
    const container = render(<Container />);
    const todoInput = container.getByTestId("todo-input");
    userEvent.type(todoInput, "New Todo");
    expect(screen.getByTestId("todo-input")).toHaveValue("New Todo");
    fireEvent.keyDown(todoInput, {
      keyCode: 13
    });
    expect(container.getByText(/New/i).textContent).toEqual("New Todo");
  });

  test("remove the component on clicking delete", () => {
    const container = render(<Container />);
    const todoInput = container.getByTestId("todo-input");
    userEvent.type(todoInput, "New Todo");
    expect(screen.getByTestId("todo-input")).toHaveValue("New Todo");
    fireEvent.keyDown(todoInput, {
      keyCode: 13
    });
    expect(container.getByText(/New/i).textContent).toEqual("New Todo");
    const deleteBtn = container.getAllByTestId(0)[1];
    fireEvent.click(deleteBtn);
    expect(deleteBtn).not.toBeInTheDocument();
  });

  // test("remove completed components on clicking clear", () => {
  //   const container = render(<Container />);
  //   const todoInput = container.getByTestId("todo-input");
  //   userEvent.type(todoInput, "New Todo");
  //   expect(screen.getByTestId("todo-input")).toHaveValue("New Todo");
  //   fireEvent.keyDown(todoInput, {
  //     keyCode: 13
  //   });
  //   expect(container.getByText(/New/i).textContent).toEqual("New Todo");
  //   const deleteBtn = container.getAllByTestId(0)[1];
  //   fireEvent.click(deleteBtn);
  //   expect(deleteBtn).not.toBeInTheDocument();
  // });
});