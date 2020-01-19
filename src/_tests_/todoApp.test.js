import React from "react";
import { mount } from "enzyme";
import TodoMain from "../screens/todoMain";

describe("When our app loads for the first time", () => {
  const wrapper = mount(<TodoMain />);

  it("Should show a text input box and a Add button", () => {
    const inputWrapper = wrapper.find("input");
    const buttonWrapper = wrapper.find("button");
    expect(inputWrapper.exists()).toBe(true);
    expect(buttonWrapper.exists()).toBe(true);
    expect(buttonWrapper.text()).toBe("Add");
  });

  it("Should add a todo when we click on Add button", () => {
    const inputWrapper = wrapper.find("input");
    const buttonWrapper = wrapper.find("button");
    inputWrapper.simulate("change", { target: { value: "foo" } });
    buttonWrapper.simulate("click");
    const todoWrapper = wrapper.find("li");
    expect(todoWrapper.exists()).toBe(true);
    expect(todoWrapper.text()).toBe("foo");
  });

  it("Should show todo task status ", () => {
    const todoStatusWrapper = wrapper.find("TodoStatus");
    expect(todoStatusWrapper.exists()).toBe(true);
    expect(todoStatusWrapper.text()).toBe("Total todos remaining: 1 out of 1");
  });

  it("Should add strike when click on the todo and update the todo status as well ", () => {
    const todoWrapper = wrapper.find("li");
    todoWrapper.simulate("click");
    const todoWithStrikeWrapper = wrapper.find("strike");
    expect(todoWithStrikeWrapper.exists()).toBe(true);
    expect(todoWrapper.text()).toBe(todoWithStrikeWrapper.text());
    const todoStatusWrapper = wrapper.find("TodoStatus");
    expect(todoStatusWrapper.text()).toBe("Total todos remaining: 0 out of 1");
  });

  it("Should prepopulate todos when refreshed", () => {
    const wrapperAfterReload = mount(<TodoMain />);
    expect(wrapperAfterReload.html()).toEqual(wrapper.html());
  });

  it("Should remove all todos when we click on remove all todos button", () => {
    const removeAllTodosButtonWrapper = wrapper.find("button").last();
    removeAllTodosButtonWrapper.simulate("click");
    const todoWrapper = wrapper.find("ul");
    expect(todoWrapper.exists()).toBe(false);
  });
});
