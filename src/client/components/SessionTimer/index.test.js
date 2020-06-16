import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<SessionTimer />", () => {
  it("startOrUpdate", async () => {
    const wrapper = renderNonTransContent(Component, "SessionTimer", {
      action: "startOrUpdate",
      setUserData: () => {},
    });

    expect(wrapper).toMatchSnapshot();
    expect(Component.getTimerIdForTest()).not.toBeNull();
    clearTimeout(Component.getTimerIdForTest());
  });

  it("clear", async () => {
    const wrapper = renderNonTransContent(Component, "SessionTimer", {
      action: "clear",
      setUserData: () => {},
    });

    expect(wrapper).toMatchSnapshot();
    expect(Component.getTimerIdForTest()).toBeNull();
  });
});
