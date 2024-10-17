# Medify

This is a web application that allows users to manage and view their hospital bookings seamlessly. Users can search for bookings by hospital name and review their appointment details.

## Table of Contents

- [Run Application Locally](#run-application-locally)
- [Usage](#usage)
- [Technical Choices](#technical-choices)
- [Design Choices](#design-choices)
- [Trade-offs and Future Improvements](#trade-offs-and-future-improvements)

## Run Application Locally

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/my-bookings-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd my-bookings-app
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

### Starting the Application

To start the development server, run the following command:

```bash
npm start
```

This command will start the application on [http://localhost:3000](http://localhost:3000). You can view it in your browser.

## Usage

- Book an appointment
- View their existing bookings.
- Use the search feature to filter bookings by hospital name.

## Technical Choices

1. **React**: The application is built using React for its component-based architecture, better satte management and dynamic UI rendering
2. **Local Storage**:Browser's local storage is used to persist user data (booked slots) to simplify data managemnt without a backend service.

## Design Choices

1. **Modular Components**: The application is divided into reusable components (e.g., `Navbar`, `BookingCard`), which aids in maintainability and scalability of the codebase.
2. **Material UI**: MUI has been used to style the application and provide pre-built, highly customizable components.

## Trade-offs and Future Improvements

1. **State Management**: Implementing a backend service with a database providing a more robust and scalable solution.

2. **Search Functionality**: The current search feature is limited to hospital names. Future iterations could enhance this by allowing filtering based on other parameters like date or city.

3. **Error Handling**: The application currently lacks comprehensive error handling which could be later improved for providing feedback for failed actions or data retrieval issues.

4. **Testing**: Additional time could be allocated for writing unit and integration tests to ensure the application's reliability and robustness.

