import type { RouteObject } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import HotelPage from './pages/HotelPage';
import ReservationPage from './pages/Reservation';
import ReservationHistory from './pages/ReservationHistory';
import PaymentVerificationPage from './pages/PaymentVerificationPage';


const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'hotel', element: <HotelPage /> },
            { path: 'hotel/reservation', element: <ReservationPage /> },
            { path: 'reservation-history', element: <ReservationHistory /> },
            { path: 'payment-verify', element: <PaymentVerificationPage /> },
        ],
    },
    {
        path: '*',
        element: <></>,
    },
];

export default routes;
