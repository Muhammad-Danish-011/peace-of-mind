import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RatingUI from "./rating";
describe("RatingUI", () => {
  test("renders without errors", () => {
    render(<RatingUI />);
  });



  test("displays comment textarea", () => {
    const { getByPlaceholderText } = render(<RatingUI />);
    const commentTextarea = getByPlaceholderText("Add a comment...");
    expect(commentTextarea).toBeInTheDocument();
  });

  test("displays submit button", () => {
    const { getByRole } = render(<RatingUI />);
    const submitButton = getByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();
  });

  test("initial state", () => {
    const { getByText, getByPlaceholderText } = render(<RatingUI />);
    const selectedRating = getByText("Selected Rating: 0");
    const commentTextarea = getByPlaceholderText("Add a comment...");
    expect(selectedRating).toBeInTheDocument();
    expect(commentTextarea.value).toBe("");
  });


  test("comment change", () => {
    const { getByPlaceholderText } = render(<RatingUI />);
    const commentTextarea = getByPlaceholderText("Add a comment...");
    fireEvent.change(commentTextarea, { target: { value: "Test comment" } });
    expect(commentTextarea.value).toBe("Test comment");
  });


//   test("rating change", () => {
//     const { getByLabelText, getByText } = render(<RatingUI />);
//     const ratingComponent = getByLabelText("Rating");
//     fireEvent.change(ratingComponent, { target: { value: 5 } });
//     const selectedRating = getByText("Selected Rating: 5");
//     expect(selectedRating).toBeInTheDocument();
//   });




  
//   test("displays rating component", () => {
//     const { getByText } = render(<RatingUI />);
//     const ratingComponent = getByText(/Rating/i);
//     expect(ratingComponent).toBeInTheDocument();
//   });
  
 


  
//   test("rating API call", async () => {
//     // Create a new instance of the mock adapter
//     const mock = new MockAdapter(axios);
  
//     // Set up a mock response for the rating API endpoint
//     const mockResponse = { ok: true };
//     mock.onPost("http://ratingapp-env.eba-f5gxzjhm.us-east-1.elasticbeanstalk.com/rating/add").reply(200, mockResponse);
  
//     const { getByRole } = render(<RatingUI />);
//     const submitButton = getByRole("button", { name: "Submit" });
//     fireEvent.click(submitButton);
  
//     await waitFor(() => {
//       // Assert that the API call was made
//       expect(mock.history.post.length).toBe(1);
//       expect(mock.history.post[0].url).toBe("http://ratingapp-env.eba-f5gxzjhm.us-east-1.elasticbeanstalk.com/rating/add");
  
//       // Optionally, you can also assert the request payload
//       const requestBody = JSON.parse(mock.history.post[0].data);
//       expect(requestBody).toEqual({
//         created: expect.any(String),
//         updated: expect.any(String),
//         appointment_id: 1,
//         value: 0,
//         note: "",
//       });
//     });
//   });
  





// test("dialog close", async () => {
//   const { getByRole, findByText } = render(<RatingUI />);
//   const submitButton = getByRole("button", { name: "SUBMIT" });
//   fireEvent.click(submitButton);

//   const dialogTitle = await findByText("Thanks for feedback");
//   expect(dialogTitle).toBeInTheDocument();
// });

});
