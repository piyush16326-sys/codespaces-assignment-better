# AI Development Guidelines

## Coding Standards
- Use Python Type Hints where possible.
- Wrap all Database and API calls in try/except blocks.
- Follow PEP 8 naming conventions.

## Constraints
- Database: Must use Prisma (Python Client).
- AI: Use Hugging Face Inference API (Zero-shot).
- Environment: Must be compatible with GitHub Codespaces (Port 5000).

## Prompting Strategy
- "When generating routes, always include error logging to the console."
- "If the AI categorization fails, always provide a fallback category of 'general'."
