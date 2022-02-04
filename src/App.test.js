import "./matchMedia.mock";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import userEvent from '@testing-library/user-event';
import * as Reducer from "./redux/ThemeReducer";
import * as Actions from "./redux/ThemeAction";
import TodoItem from "./components/TodoItem";
import Container from "./components/Container";
import App from "./App";
import { shallow, configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";


afterEach(cleanup)

describe("Reducer Test", () => {
  test("should change to dark", () => {
    const initialState  = {
      theme: "light"
    }
    expect(Reducer.ThemeReducer(initialState, Actions.applyTheme(initialState.theme))).toEqual({
      theme: "dark"
    });
  });

  test("should change to light", () => {
    const initialState  = {
      theme: "dark"
    }
    expect(Reducer.ThemeReducer(initialState, Actions.applyTheme(initialState.theme))).toEqual({
      theme: "light"
    });
  });
});

describe("TodoItem Test", () => {
  test("show todo text from props", () => {
    // prepare
    const handleCheck = jest.fn();
    const handleDelete = jest.fn();
    const key_id = 1;
    // execute
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
    // assert
    expect(todoItem.getByText(/This is todo/i).textContent).toEqual("This is todo text.");
  });

  test("check action called on click", () => {
    // prepare
    const handleCheck = jest.fn();
    const handleDelete = jest.fn();
    const key_id = 1;
    // execute
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
    fireEvent.click(checkbox);
    // assert
    expect(checkbox.checked).toEqual(false);
    expect(handleCheck).toHaveBeenCalledTimes(1);
  });

  test("delete action called on click", () => {
    // prepare
    const handleCheck = jest.fn();
    const handleDelete = jest.fn();
    const key_id = 1;
    // execute
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
    // assert
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});

describe("Container Test", () => {
  test("switch theme on click", () => {
    // prepare
    const switchTheme = jest.fn();
    const theme = "light"
    // execute
    const {getByTestId} = render(
      <Container 
        theme={theme}
        switchTheme={switchTheme} />
    );
    const themeSwitchBtn = getByTestId("switch");
    fireEvent.click(themeSwitchBtn);
    // assert
    expect(switchTheme).toHaveBeenCalledTimes(1);
  });

  test("add new todo on enter", () => {
    // prepare
    const container = render(<Container />);
    const todoInput = container.getByTestId("todo-input");
    // execute
    userEvent.type(todoInput, "New Todo");
    // assert
    expect(screen.getByTestId("todo-input")).toHaveValue("New Todo");
    // execute
    fireEvent.keyDown(todoInput, {
      keyCode: 13
    });
    // assert
    expect(container.getByText(/New/i).textContent).toEqual("New Todo");
  });

  test("remove the component on clicking delete", () => {
    // prepare
    const container = render(<Container />);
    const todoInput = container.getByTestId("todo-input");
    // execute
    userEvent.type(todoInput, "New Todo");
    // assert
    expect(screen.getByTestId("todo-input")).toHaveValue("New Todo");
    // execute
    fireEvent.keyDown(todoInput, {
      keyCode: 13
    });
    // assert
    expect(container.getByText(/New/i).textContent).toEqual("New Todo");
    const deleteBtn = container.getAllByTestId(0)[1];
    // execute
    fireEvent.click(deleteBtn);
    // assert
    expect(deleteBtn).not.toBeInTheDocument();
  });

  test("checkbox checked on click", () => {
    // prepare
    const key_id = 0;
    const container = render(<Container />);
    const todoInput = container.getByTestId("todo-input");
    // execute
    userEvent.type(todoInput, "New Todo");
    // assert
    expect(screen.getByTestId("todo-input")).toHaveValue("New Todo");
    // execute
    fireEvent.keyDown(todoInput, {
      keyCode: 13
    });
    const checkbox = container.getAllByTestId(key_id)[0];
    // assert
    expect(checkbox.checked).toEqual(false);
    // execute
    fireEvent.click(checkbox);
    // assert
    expect(checkbox.checked).toEqual(true);
  });

  test("remove completed components on clicking clear", () => {
    // prepare
    const key_id = 0;
    const container = render(<Container />);
    const todoInput = container.getByTestId("todo-input");
    // execute
    userEvent.type(todoInput, "New Todo");
    // assert
    expect(screen.getByTestId("todo-input")).toHaveValue("New Todo");
    // execute
    fireEvent.keyDown(todoInput, {
      keyCode: 13
    });
    const checkbox = container.getAllByTestId(key_id)[0];
    const deleteBtn = container.getAllByTestId(key_id)[1];
    // assert
    expect(checkbox.checked).toEqual(false);
    // execute
    fireEvent.click(checkbox);
    // assert
    expect(checkbox.checked).toEqual(true);
    const clearBtn = container.getByTestId("clear");
    // execute
    fireEvent.click(clearBtn);
    // assert
    expect(deleteBtn).not.toBeInTheDocument();
  });

  test("matches snapchost", () => {
    // create virtual dom
    const tree = renderer.create(<Container/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("show all todos", () => {
    // prepare
    const container = render(<Container />);
    const todoInput = container.getByTestId("todo-input");
    userEvent.type(todoInput, "Checked Todo");
    fireEvent.keyDown(todoInput, {
      keyCode: 13
    });
    const checkbox = container.getAllByTestId(0)[0];
    fireEvent.click(checkbox);
    userEvent.type(todoInput, "Active Todo");
    fireEvent.keyDown(todoInput, {
      keyCode: 13
    });
    const allBtn = container.getByTestId("all");
    // execute
    fireEvent.click(allBtn);
    // assert
    expect(container.getByText(/Checked Todo/i).textContent).toEqual("Checked Todo");
    expect(container.getByText(/Active Todo/i).textContent).toEqual("Active Todo");
  });

  test("show active todos", () => {
    // prepare
    const container = render(<Container />);
    const todoInput = container.getByTestId("todo-input");
    userEvent.type(todoInput, "Todo Checked");
    fireEvent.keyDown(todoInput, {
      keyCode: 13
    });
    const checkbox = container.getAllByTestId(0)[0];
    fireEvent.click(checkbox);
    userEvent.type(todoInput, "Todo Active");
    fireEvent.keyDown(todoInput, {
      keyCode: 13
    });
    const activeBtn = container.getByTestId("active");
    // execute
    fireEvent.click(activeBtn);
    const checkedTodo = screen.queryAllByText("Todo Checked")
    // assert
    expect(container.getByText(/Todo Active/i).textContent).toEqual("Todo Active");
    expect(checkedTodo).toHaveLength(0);
  });

  test("show completed todos", () => {
    // prepare
    const container = render(<Container />);
    const todoInput = container.getByTestId("todo-input");
    userEvent.type(todoInput, "Todo Checked");
    fireEvent.keyDown(todoInput, {
      keyCode: 13
    });
    const checkbox = container.getAllByTestId(0)[0];
    fireEvent.click(checkbox);
    userEvent.type(todoInput, "Todo Active");
    fireEvent.keyDown(todoInput, {
      keyCode: 13
    });
    const activeBtn = container.getByTestId("completed");
    // execute
    fireEvent.click(activeBtn);
    const checkedTodo = screen.queryAllByText("Todo Active")
    // assert
    expect(container.getByText(/Todo Checked/i).textContent).toEqual("Todo Checked");
    expect(checkedTodo).toHaveLength(0);
  });

  test("double check undo the check state", () => {
    // prepare
    const container = render(<Container />);
    const todoInput = container.getByTestId("todo-input");
    userEvent.type(todoInput, "Todo Checked");
    fireEvent.keyDown(todoInput, {
      keyCode: 13
    });
    const checkbox = container.getAllByTestId(0)[0];
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
  })
});

configure({ adapter: new Adapter() });
describe("App", () => {
  const initialState  = {
    theme: "light"
  }
  const mockStore = configureStore();
  let store;
  it("renders correctly", () => {
    store = mockStore(initialState);
    shallow(<Provider store={store}><App /></Provider>);
  });

  it("include one h1", () => {
    store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><App /></Provider>);
    expect(wrapper.find("h1").length).toEqual(1)
  });

  it("called switch theme", () => {
    // const switchTheme = jest.fn();
    store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><App /></Provider>);
    // const instance = wrapper.instance();
    // const spy = jest.spyOn(instance, "switchTheme");
    // instance.forceUpdate();
    // expect(spy).toHaveBeenCalled();
    wrapper.find("#switch-btn").simulate("click");
    // expect(spy).toHaveBeenCalled();
  });
});