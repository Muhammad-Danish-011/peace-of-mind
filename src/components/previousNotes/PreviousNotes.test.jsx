import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import PreviousNotes from "./PreviousNotes";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';


// Create a mock server
const server = setupServer(
    rest.get('http://notes.us-west-2.elasticbeanstalk.com/notes/notesByPatientId/2', (req, res, ctx) => {
        const notes = [
            { id: 1, content: 'Note 1', created: '2023-06-18T12:00:00Z', updated: '2023-06-18T13:00:00Z' },
            { id: 2, content: 'Note 2', created: '2023-06-19T14:00:00Z', updated: '2023-06-19T15:00:00Z' },
        ];
        return res(ctx.json(notes));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());



describe('testing previous notes component', () => {
    test('all the things are rendering correctly', () => {
        //arrange
        render(<PreviousNotes />);

        //act
        const listElement = screen.getByRole('list');
        const headElement = screen.getByRole('heading', { name: /patient previous notes:/i })
        const noNotesElement = screen.getByText(/no previous notes available/i);
        //assert
        expect(listElement).toBeInTheDocument();
        expect(headElement).toBeInTheDocument();
        expect(noNotesElement).toBeInTheDocument();

    })

    test("renders notes correctly when there are notes", async () => {
        const notes = [
            { id: 1, created: "2023-06-20T10:00:00Z", content: "Note 1" },
            { id: 2, created: "2023-06-19T14:30:00Z", content: "Note 2" },
        ];

        jest.spyOn(global, "fetch").mockResolvedValue({
            json: jest.fn().mockResolvedValue(notes),
        });

        render(<PreviousNotes />);

        await waitFor(() => {
            const noteElements = screen.queryAllByRole("button");

            expect(noteElements).toHaveLength(notes.length);
        });

        expect(screen.getByText("Date: June 20th 2023")).toBeInTheDocument();
        expect(screen.getByText("Date: June 19th 2023")).toBeInTheDocument();
    });


    test("renders 'No previous notes available' message when there are no notes", async () => {
        const notes = [];

        jest.spyOn(global, "fetch").mockResolvedValue({
            json: jest.fn().mockResolvedValue(notes),
        });

        render(<PreviousNotes />);

        await waitFor(() => {
            const noNotesElement = screen.getByText("No previous notes available");
            expect(noNotesElement).toBeInTheDocument();
        });
    });

    test('shows the modal after clicking the note', async () => {
        // Mock the API fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve([
                        {
                            id: 1,
                            created: '2023-06-21T10:00:00Z',
                            content: 'Sample note 1',
                        },
                    ]),
            })
        );
        render(<PreviousNotes />);
        // Wait for the notes to be fetched and rendered
        await waitFor(() => {
            expect(screen.queryByText('No previous notes available')).not.toBeInTheDocument();
        });
        // Click the note element
        const noteElement = screen.getByTestId('click-note');
        fireEvent.click(noteElement);
        // Assert that the modal heading is displayed
        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /note/i })).toBeInTheDocument();
        });
    });

    test('close the modal after clicking the close button', async () => {
        // Mock the API fetch function
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve([
                        {
                            id: 1,
                            created: '2023-06-21T10:00:00Z',
                            content: 'Sample note 1',
                        },
                    ]),
            })
        );

        render(<PreviousNotes />);

        // Wait for the notes to be fetched and rendered
        await waitFor(() => {
            expect(screen.queryByText('No previous notes available')).not.toBeInTheDocument();
        });

        // Click the note element
        const noteElement = screen.getByTestId('click-note');
        fireEvent.click(noteElement);

        // Assert that the modal heading is displayed
        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /note/i })).toBeInTheDocument();
        });

        //clicking the close button
        const closebutton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closebutton);

        // Assert that the modal heading is not displaying
        await waitFor(() => {
            expect(screen.queryByRole('heading', { name: "note" })).not.toBeInTheDocument();
        });

    });


})