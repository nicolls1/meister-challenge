import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { fireEvent, render, screen, waitFor } from "../test/test-utils";
import { SideNav } from "./SideNav";
import { PiNotePencilFill } from "react-icons/pi";

const navOptions = [
  {
    icon: AiOutlineFundProjectionScreen,
    label: "Projects",
    origin: "http://localhost:5174", //"https://ProjectApp.com",
    pathname: "/",
  },
  {
    icon: PiNotePencilFill,
    label: "Notes",
    origin: "http://localhost:4321", //"https://ProjectNote.com",
    pathname: "/",
  },
];

const localStorageSetItem = jest.spyOn(localStorage, "setItem");
window.history.replaceState = jest.fn();
const projectsOrigin = "http://localhost:5174";
const notesOrigin = "http://localhost:4321";
const testOrigins = [
  {
    name: "Projects",
    origin: projectsOrigin,
    otherName: "Notes",
    otherOrigin: notesOrigin,
  },
  {
    name: "Notes",
    origin: notesOrigin,
    otherName: "Projects",
    otherOrigin: projectsOrigin,
  },
];

describe("SideNav", () => {
  for (const testOrigin of testOrigins) {
    describe(`origin ${testOrigin.name}`, () => {
      const OLD_LOCATION = window.location;

      beforeEach(() => {
        Object.defineProperty(window, "location", {
          value: new URL(testOrigin.origin),
          writable: true,
        });
        localStorage.clear();
      });

      afterAll(() => {
        Object.defineProperty(window, "location", {
          value: OLD_LOCATION,
          writable: true,
        });
      });

      const expectExpanded = async () => {
        await waitFor(() => {
          const sideNav = screen.getByTestId("side-nav-root");
          expect(getComputedStyle(sideNav).width).toBe("200px");
        });
        // Local storage set correctly
        expect(localStorageSetItem).toHaveBeenCalledWith("sb", "true");
        // Link to notes includes side bar state
        expect(
          screen.getByRole("link", { name: testOrigin.otherName })
        ).toHaveAttribute("href", `${testOrigin.otherOrigin}/?sb=t`);
      };

      const expectShrunk = async () => {
        await waitFor(() => {
          const sideNav = screen.getByTestId("side-nav-root");
          expect(getComputedStyle(sideNav).width).toBe("56px");
        });
        // Local storage set correctly
        expect(localStorageSetItem).toHaveBeenCalledWith("sb", "false");
        // Link to notes includes side bar state
        expect(
          screen.getByRole("link", { name: testOrigin.otherName })
        ).toHaveAttribute("href", `${testOrigin.otherOrigin}/?sb=f`);
      };

      it("loads as expanded by default", async () => {
        render(<SideNav navOptions={navOptions} />);
        await expectExpanded();
      });

      it("loads as shrunk when query param is set", async () => {
        Object.defineProperty(window, "location", {
          value: new URL(testOrigin.origin + "/?sb=f&other=test"),
          writable: true,
        });
        render(<SideNav navOptions={navOptions} />);
        await expectShrunk();
        // Only the one param should have been removed
        expect(window.history.replaceState).toHaveBeenCalledWith(
          {},
          document.title,
          window.location.pathname + "?other=test"
        );
      });

      it("loads local storage state expanded", async () => {
        localStorage.setItem("sb", "true");
        render(<SideNav navOptions={navOptions} />);
        await expectExpanded();
      });

      it("loads local storage state shrunk", async () => {
        localStorage.setItem("sb", "false");
        render(<SideNav navOptions={navOptions} />);
        await expectShrunk();
      });

      it("prefers the query parameter state over local storage for expanded", async () => {
        Object.defineProperty(window, "location", {
          value: new URL(testOrigin.origin + "/?sb=t"),
          writable: true,
        });
        localStorage.setItem("sb", "false");
        render(<SideNav navOptions={navOptions} />);
        await expectExpanded();
      });

      it("prefers the query parameter state over local storage for shrunk", async () => {
        Object.defineProperty(window, "location", {
          value: new URL(testOrigin.origin + "/?sb=f"),
          writable: true,
        });
        localStorage.setItem("sb", "true");
        render(<SideNav navOptions={navOptions} />);
        await expectShrunk();
      });

      it("shrinks when the button is clicked while expanded", async () => {
        render(<SideNav navOptions={navOptions} />);
        const navToggle = screen.getByTestId("side-nav-toggle");
        fireEvent.click(navToggle);
        fireEvent.animationEnd(navToggle);
        await expectShrunk();
      });

      it("expands when the button is clicked shrunk", async () => {
        Object.defineProperty(window, "location", {
          value: new URL(testOrigin.origin + "/?sb=f"),
          writable: true,
        });
        render(<SideNav navOptions={navOptions} />);
        const navToggle = screen.getByTestId("side-nav-toggle");
        fireEvent.click(navToggle);
        fireEvent.animationEnd(navToggle);
        await expectExpanded();
      });
    });
  }
});
