import {logRoles, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom';
import Calendar from './Calendar'
import { rest } from 'msw'
import {setupServer} from 'msw/node'

import UseFetchAvailabilities from '../../hooks/UseFetchAvailabilities';
import UseFetchAppointment from '../../hooks/UseFetchAppointment';

// const server = setupServer(
//   rest.get('http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/counselor/2', (req, res, ctx) => {
//     return res(
//       ctx.json([
//         {
//           id: 1,
//           counselorId: 2,
//           created: '2023-06-13T10:37:04.932452Z',
//           updated: '2023-06-13T11:37:04.932452Z',
//           date: '2023-06-19T16:30:04.932452Z',
//         },
//         {
//           id: 3,
//           counselorId: 2,
//           created: '2023-06-13T10:37:04.932452Z',
//           updated: '2023-06-13T11:37:04.932452Z',
//           date: '2023-06-19T16:30:04.932452Z',
//         },
//       ])
//     );
//   }),
//   // Define other mocked API endpoints and their responses...

//   rest.get('http://appointment.us-west-2.elasticbeanstalk.com/appointments/getall', (req, res, ctx) => {
//     return res(
//       ctx.json([ 
//         {
//           "id": 111,
//           "created": "2023-06-20T00:00:00Z",
//           "updated": "2023-06-20T00:00:00Z",
//           "availabilityId": 1,
//           "patientid": null,
//           "confirmed": true,
//           "deleted": 0
//           },
//           {
//           "id": 108,
//           "created": "2023-06-20T00:00:00Z",
//           "updated": "2023-06-20T00:00:00Z",
//           "availabilityId": 3,
//           "patientid": null,
//           "confirmed": true,
//           "deleted": 0
//           },
//           {
//           "id": 116,
//           "created": "2023-06-20T00:00:00Z",
//           "updated": "2023-06-20T00:00:00Z",
//           "availabilityId": 209,
//           "patientid": null,
//           "confirmed": true,
//           "deleted": 0
//           },
//       ])
//     );
//   }),

// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// jest.mock('../../hooks/UseFetchAvailabilities');
// jest.mock('../../hooks/UseFetchAppointment');


describe('check calendar is rendering',()=>{

  // UseFetchAvailabilities.mockReturnValue({
  //   data: [],
  //   loading: false,
  //   setLoading: jest.fn(),
  //   fetchAllAvailability: jest.fn(),
  // });

  // UseFetchAppointment.mockReturnValue({
  //   appointmentData: [],
  //   fetchAllAppointment: jest.fn(),
  // });



  it('calendar is rendering',()=>{
      //arrange
      render(<Calendar type={'public'} />)

      //act
      const element = screen.getByRole('heading', {
          name: /calendar/i
        })
      
        //assert
      expect(element).toBeInTheDocument();

  });

  it('opens Appointment modal when select is true', async () => {
      // Render the component with select set to true
      render(<Calendar />);

      
      waitFor(() => {
        expect( screen.getByTestId('calendar-id')).toBeInTheDocument();
      })

    });
  })
  // // Find the Appointment modal trigger element and simulate a click
  // const appointmentModalTrigger = screen.getByTestId('calendar-id');
  // fireEvent.click(appointmentModalTrigger);

  // // Assert that the Appointment modal is rendered
  // const appointmentModal = screen.getByTestId('appointment-modal');
  // expect(appointmentModal).toBeInTheDocument();