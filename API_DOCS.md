# SuperApp API Documentation

## Authentication
- `POST /api/auth/register` - Create new user account.
- `POST /api/auth/login` - Authenticate and get JWT token.
- `GET /api/auth/me` - Get current user profile (Protected).

## Rent Module
- `POST /api/rent/landlord` - Add landlord details.
- `POST /api/rent/pay` - Initiate rent payment and get Razorpay order.
- `GET /api/rent/history` - User's rent payment history.

## Flight Module
- `GET /api/flights/search` - Search flights with markup added.
- `POST /api/flights/book` - Initiate flight booking payment.

## Admin Module
- `GET /api/admin/stats` - Revenue and volume analytics (Admin only).
- `GET /api/admin/transactions` - View all system transactions (Admin only).

## Webhooks
- `POST /api/webhooks/razorpay` - Secure endpoint for payment verification.

---
**Base URL:** `http://localhost:5000`
**Auth Header:** `Authorization: Bearer <token>`
