## Pastebin-Lite Frontend (Client)

First, run the development server:

```bash
npm install
npm run dev
```

The app runs on [http://localhost:3000] and connects to the backend API.

**Persistence layer**
The frontend does not store data locally. All paste data is fetched from the backend, which persists data in MongoDB.

**Design decisions**
- Built with Next.js for fast rendering and clean routing
- Backend kept separate to follow a clear client–server architecture
- Safe rendering of paste content to prevent script execution
- Minimal UI focused on functionality and correctness

## Live Url
[Live Demo](https://pastebin-frontend-peach.vercel.app/)

