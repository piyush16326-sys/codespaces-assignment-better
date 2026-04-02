Flask + Prisma Provider: Chose Flask for its lightweight nature and Prisma as the ORM to ensure type-safe database queries and easy schema migrations.

Zero-Shot Classification: Used Hugging Face’s bart-large-mnli because it can categorize text into any label (work, home, etc.) without needing a custom-trained dataset.

CORS Configuration: Enabled wide CORS (*) to facilitate seamless communication between the React frontend and Flask backend within the GitHub Codespaces environment.

Stateless Connection Management: Implemented @app.before_request to ensure the Prisma engine is active, preventing "Database not found" errors during cold starts.
