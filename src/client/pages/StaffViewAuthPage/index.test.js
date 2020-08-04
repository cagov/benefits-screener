import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import AUTH_STRINGS from "../../../data/authStrings";
import Component from "./index";

describe("<StaffViewAuthPage />", () => {
  it("retro certs auth page", async () => {
    const wrapper = renderNonTransContent(Component, "StaffViewAuthPage");

    expect(wrapper).toMatchSnapshot();
  });

  it("retro certs auth page with user not found error", async () => {
    const wrapper = renderNonTransContent(Component, "StaffViewAuthPage", {
      userData: { status: AUTH_STRINGS.statusCode.userNotFound },
    });

    expect(wrapper).toMatchSnapshot();
  });
});