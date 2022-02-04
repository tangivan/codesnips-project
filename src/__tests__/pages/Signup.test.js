import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import Signup from "../../pages/Signup";
import FirebaseContext from "../../context/firebase";
import { doesUsernameExist } from "../../services/firebase";
import * as ROUTES from "../../constants/routes";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock("../../services/firebase");

describe("<Signup />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the sign up page with a form submission and signs a user up", async () => {
    const firebase = {
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          add: jest.fn(() => Promise.resolve("User added")),
        })),
      })),
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: {
            updateProfile: jest.fn(() => Promise.resolve("I am signed up!")),
          },
        })),
      })),
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Signup />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      doesUsernameExist.mockImplementation(() => Promise.resolve(true)); // as true but inverse in the code

      await fireEvent.change(getByPlaceholderText("Username"), {
        target: { value: "ivan" },
      });
      await fireEvent.change(getByPlaceholderText("Full name"), {
        target: { value: "ivan ta" },
      });
      await fireEvent.change(getByPlaceholderText("Email address"), {
        target: { value: "ivan@gmail.com" },
      });
      await fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "password" },
      });
      fireEvent.submit(getByTestId("signup"));

      expect(document.title).toEqual("Sign Up - Codesnips");
      await expect(doesUsernameExist).toHaveBeenCalled();
      await expect(doesUsernameExist).toHaveBeenCalledWith("ivan");

      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText("Username").value).toBe("ivan");
        expect(getByPlaceholderText("Full name").value).toBe("ivan ta");
        expect(getByPlaceholderText("Email address").value).toBe(
          "ivan@gmail.com"
        );
        expect(getByPlaceholderText("Password").value).toBe("password");
        expect(queryByTestId("error")).toBeFalsy();
      });
    });
  });

  it("renders the sign up page but an error is present (username exists)", async () => {
    const firebase = {
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: {
            updateProfile: jest.fn(() => Promise.resolve({})),
          },
        })),
      })),
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Signup />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      doesUsernameExist.mockImplementation(() => Promise.resolve([false])); // as true but inverse in the code

      await fireEvent.change(getByPlaceholderText("Username"), {
        target: { value: "ivan" },
      });
      await fireEvent.change(getByPlaceholderText("Full name"), {
        target: { value: "ivan ta" },
      });
      await fireEvent.change(getByPlaceholderText("Email address"), {
        target: { value: "ivan@gmail.com" },
      });
      await fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "password" },
      });
      fireEvent.submit(getByTestId("signup"));

      expect(document.title).toEqual("Sign Up - Codesnips");
      await expect(doesUsernameExist).toHaveBeenCalled();
      await expect(doesUsernameExist).toHaveBeenCalledWith("ivan");

      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText("Username").value).toBe("");
        expect(getByPlaceholderText("Full name").value).toBe("");
        expect(getByPlaceholderText("Email address").value).toBe("");
        expect(getByPlaceholderText("Password").value).toBe("");
        expect(queryByTestId("error")).toBeTruthy();
      });
    });
  });

  it("renders the sign up page but an error is thrown", async () => {
    const firebase = {
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: {
            updateProfile: jest.fn(() =>
              Promise.reject(new Error("Username exists"))
            ),
          },
        })),
      })),
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Signup />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      doesUsernameExist.mockImplementation(() => Promise.resolve(false)); // as true but inverse in the code

      await fireEvent.change(getByPlaceholderText("Username"), {
        target: { value: "ivan" },
      });
      await fireEvent.change(getByPlaceholderText("Full name"), {
        target: { value: "ivan ta" },
      });
      await fireEvent.change(getByPlaceholderText("Email address"), {
        target: { value: "ivan@gmail.com" },
      });
      await fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "password" },
      });
      fireEvent.submit(getByTestId("signup"));

      expect(document.title).toEqual("Sign Up - Codesnips");
      await expect(doesUsernameExist).toHaveBeenCalled();
      await expect(doesUsernameExist).toHaveBeenCalledWith("ivan");

      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText("Username").value).toBe("");
        expect(getByPlaceholderText("Full name").value).toBe("");
        expect(getByPlaceholderText("Email address").value).toBe("");
        expect(getByPlaceholderText("Password").value).toBe("");
        expect(queryByTestId("error")).toBeTruthy();
      });
    });
  });
});
