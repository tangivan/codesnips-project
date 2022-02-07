import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import Dashboard from "../../pages/Dashboard";
import UserContext from "../../context/user";
import FirebaseContext from "../../context/firebase";
import { getSnippets, getSuggestedProfiles } from "../../services/firebase";
import useUser from "../../hooks/useUser";
import LoggedInUserContext from "../../context/logged-in-user";
import snippetsFixture from "../../fixtures/feedSnippets";
import userFixture from "../../fixtures/loggedInUser";
import suggestedProfilesFixture from "../../fixtures/suggestedProfiles";

jest.mock("../../services/firebase");
jest.mock("../../hooks/useUser");

describe("<Dashboard />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the dashboard with a user profile and follows a user from the suggested profile sidebar", async () => {
    await act(async () => {
      getSnippets.mockImplementation(() => snippetsFixture);
      getSuggestedProfiles(() => suggestedProfilesFixture);
      useUser.mockImplementation(() => ({ user: userFixture }));

      const firebase = {
        firestore: jest.fn(() => ({
          collection: jest.fn(() => ({
            doc: jest.fn(() => ({
              update: jest.fn(() => Promise.resolve("IUser added")),
            })),
          })),
        })),
      };

      const {
        getByText,
        getByTitle,
        getAllByText,
        getByAltText,
        getAllByAltText,
        debug,
      } = render(
        <Router>
          <FirebaseContext.Provider value={firebase}>
            <UserContext.Provider
              value={{
                user: {
                  uid: "aVbFRSQ6axXBBTXH6dMPmnSPERl1",
                  displayName: "ivannn",
                },
              }}
            >
              <LoggedInUserContext.Provider value={{ user: userFixture }}>
                <Dashboard
                  user={{
                    uid: "aVbFRSQ6axXBBTXH6dMPmnSPERl1",
                    displayName: "ivannn",
                  }}
                />
              </LoggedInUserContext.Provider>
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>
      );

      await waitFor(() => {
        expect(document.title).toEqual("Codesnips");
        expect(getByTitle("Sign Out")).toBeTruthy();
        expect(getAllByText("ivannn")).toBeTruthy();
        expect(getAllByText("Magikarpet")).toBeTruthy();
        expect(getAllByText("SleepyTeas")).toBeTruthy();
        expect(getByAltText("Codesnips")).toBeTruthy(); //logo
        expect(getAllByAltText("ivannn profile")).toBeTruthy();
        expect(getByText("tailwind cdn")).toBeTruthy();
        expect(getByText("hello world")).toBeTruthy();
        expect(getByText("status loading animation")).toBeTruthy();
        // expect(getByText("Follow")).toBeTruthy();

        // fireEvent.click(getByText('Follow'));
      });
    });
  });
});
