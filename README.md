# Next.js 15 Authentication App with Local Storage and JWT Token-Based Sessions

This is a Next.js 15 application that implements a basic user authentication system using local storage and JSON Web Token (JWT) sessions with JOSE. It includes the ability to delete users from the dashboard.

## Live Demo
[Live Demo](https://nextjs-basic-auth-starter.vercel.app/)

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **State Management**: React Hooks
- **CSS**: Tailwind CSS
- **Authentication**: CryptoJS for password hashing, JOSE for JWT sessions
- **Storage**: Local Storage

## Features

- User registration with name, email, and password
- User login with email and password
- Protected dashboard showing a list of all registered users
- User deletion from the dashboard
- Password hashing using CryptoJS SHA256
- Secure session management with JWT tokens and JOSE
- Secure storage of user data in local storage

## Setup

1. Clone the repository:

```bash
git clone https://github.com/jerome-orio/nextjs-basic-auth-starter.git
```

2. Install dependencies:

```bash
cd nextjs-basic-auth-starter
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser at `http://localhost:3000`.

## Usage

1. Visit the landing page and click on the "Login" or "Signup" links.
2. Fill out the form and submit to register or log in.
3. Upon successful login, you'll be redirected to the protected dashboard, which displays the list of registered users.
4. To delete a user, click the "Delete" button next to the user you want to remove.
5. To log out, click the "Logout" button in the dashboard.

## Security Considerations

- Passwords are hashed using CryptoJS SHA256 with a unique salt per user for added security.
- Sensitive data (like social security numbers) can be encrypted using CryptoJS AES.
- Rate limiting should be implemented to prevent brute force attacks.
- HTTPS should be used in production to protect data in transit.
- Session management and token-based authentication should be implemented for production use.
- Additional security measures like password complexity requirements, 2FA, and security audits should be considered for a production-ready application.

## Future Improvements

- Implement server-side storage (e.g., database, Redis) for user data instead of local storage.
- Add password reset functionality.
- Enhance the user interface and overall user experience.
- Integrate with third-party authentication providers (e.g., Google, Facebook, GitHub).

## License

This project is licensed under the [MIT License](LICENSE).

## Contact Information
Feel free to reach out for collaborations or inquiries:
* Email: [jrorio.dev@zohomail.com](mailto:jrorio.dev@zohomail.com)
* LinkedIn: [Jerome Orio](https://www.linkedin.com/in/jerome-orio-dev)