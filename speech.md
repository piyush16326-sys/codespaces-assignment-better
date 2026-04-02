Hi everyone! Today I’m showing you a Smart Task Manager I built using Flask and Prisma. What makes this unique is that it doesn't just store tasks—it uses Machine Learning to categorize them automatically as you type. "

"Looking at the code, I’m using a Flask backend. One of the key features here is the integration with Hugging Face’s Inference API.

When a user submits a task, the text is sent to a BART-Large Model. The AI analyzes the content and assigns it a label like 'Work', 'Urgent', or 'Coding' without the user having to do it manually. This makes the UI much cleaner and faster to use. "

"For the data layer, I chose Prisma ORM. It allows for really clean, readable database queries.

* db.task.create handles the AI-categorized entries.

* db.task.find_many fetches all our records instantly.

In this environment, the database is running directly in my GitHub Codespace, making the whole development workflow seamless and portable. "

"If I add a task like 'Fix the production login bug', you’ll see the AI instantly tags it as 'Coding' or 'Urgent'. We can also fetch the full list of tasks with their timestamps, all formatted and served through our JSON API."

"By combining a lightweight Python backend with powerful AI models and a modern ORM, I’ve built a tool that actually understands the user's intent. Thanks for watching!"
