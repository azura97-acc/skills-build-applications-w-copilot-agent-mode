# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey azura97-acc!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/azura97-acc/skills-build-applications-w-copilot-agent-mode/issues/1)

## Frontend environment setup

When the app runs inside a GitHub Codespace, the frontend must define `VITE_CODESPACE_NAME` before it can build the Codespaces API URL. Create a local environment file at `octofit-tracker/frontend/.env.local` with a value similar to:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

If `VITE_CODESPACE_NAME` is not set, the app falls back to `http://localhost:8000` instead of generating a broken `https://undefined-8000.app.github.dev` URL.

