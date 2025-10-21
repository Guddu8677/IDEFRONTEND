CipherStudio - Our Browser-Based React IDE


 Overview

CipherStudio is a lightweight, browser-based React IDE designed for rapid prototyping, learning, and experimenting with React code. It allows users to create, manage, and run React projects directly within their web browser, providing a streamlined development experience without the need for complex local setups.

 Key Features

   File Management:**
    1   Create new files with a specified name and initial content.
    2   Delete existing files from the project.
    3   Rename files to better organize and reflect changes in your project

   Code Editor:
       A feature-rich code editor (powered by `react-simple-code-editor` and `PrismJS`) with:
           Syntax highlighting for JavaScript and JSX.
           Line numbering for easy code navigation.
           Customizable themes (light and dark).
   Live Preview:
    1   Real-time display of your React project's output as you type, thanks to `Sandpack`.
    2   Automatic code execution, so changes are instantly reflected.
  Project Persistence:
       Projects are automatically saved to and loaded from `localStorage` to preserve progress across sessions.

 Tech Stack

   1 Frontend:** React
   2 Code Editor:** `react-simple-code-editor` + `PrismJS` (for syntax highlighting)
   3 Live Preview:** `@codesandbox/sandpack-react`
   4 UI Enhancements:** Material-UI (MUI)
   5 Module Bundler:** Vite
   6 UUID Generation:** uuid (for unique file IDs)

 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

 Prerequisites

  1  Node.js (version 16 or higher)
  2  npm 

 Installation

1.  Clone the repository of Backend:

    ```bash
    git clone [https://github.com/Guddu8677/IDEFRONTEND]
    cd client

   ```


   Clone the repository of Frontend:

    ```bash
    git clone [https://github.com/Guddu8677/IDEBACKEND]
    cd client
    ```

    Both folder  put in the single folder  and open it 

2.  Navigate to the client directory:**

    ```bash
    cd client
    ```

3.  Install dependencies:**

    ```bash
    npm install
    ```

   

 Running the Application

1.  Start the development server:**

    ```bash
    npm run dev
    ```



2.  Open your browser:

    Visit `http://localhost:5173` (or the address provided by Vite) to access CipherStudio.

 File Structure
