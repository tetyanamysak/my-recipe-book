My Recipe Book

My Recipe Book is a full-stack digital culinary archive designed to help users document, organize, and preserve their favorite recipes. Built with Node.js and Express, the application focuses on a clean, user-friendly interface that mimics a warm, physical cookbook.

---

Key Features

Dynamic Recipe Detail Pages: Uses unique identifiers (UUIDs) and Express route parameters to generate custom pages for every recipe.

Full CRUD Functionality: Seamlessly add new recipes through a centralized form and remove them using a secure modal confirmation system.

Persistent Data Storage: Leverages the Node.js fs (File System) module to manage a local JSON database, ensuring recipes are saved even after the server restarts.

Graceful Error Handling: Includes a custom-designed "Kitchen Mishap" page for 404 and 500 status codes, ensuring a consistent user experience.

Responsive Design: A custom CSS layout optimized for use in the kitchen, featuring a paper-textured aesthetic and clear typography.

---

Tech Stack

Backend: Node.js, Express.js

Frontend: EJS (Embedded JavaScript Templates), CSS3

Tools: Crypto API (for UUIDs), Body-Parser, Git

---

Project Structure

`app.js`: Central server logic and routing.

`/views`: EJS templates for the homepage and detailed recipe views.

`index.ejs`: The homepage containing the "Add Recipe" form and the grid gallery.

`recipe.ejs`: The detailed view for a single dish.

`/error/404.ejs`: The custom error template.

`/partials`: Reusable components (Header and Footer) to keep code DRY.

`/public`: Static assets including the main stylesheet and background imagery.

`styles.css`: The "soul" of the design, handling colors, layouts, and animations.

`background.jpg`: The visual theme for the kitchen atmosphere.

`recipes.json`: The digital "storage shelf" where all your data is kept.

---

Setup Instructions

Clone the repository.

Run `npm install` in your terminal.

Start the application with node app.js.

Open your browser to http://localhost:3033.

---

Developed by Tetyana | Web Development Capstone 2026
