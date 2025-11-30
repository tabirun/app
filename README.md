<p align="center" style="color: #343a40">
  <h1 align="center">Tabi</h1>
</p>
<p align="center">
  <strong>No magic. No surprises. Minimal web framework for Deno.</strong>
</p>

<p align="center">
  <a href="https://jsr.io/@tabirun/app"><img src="https://jsr.io/badges/@tabirun/app" alt="JSR"></a>
  <a href="https://github.com/tabirun/app/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>
<p align="center" style="color: #343a40">
  <img src="./assets/mascot-readme.png" alt="Tabi Mascot" width="200"/>
</p>

## Quick Start

```bash
deno add jsr:@tabirun/app
```

Create `main.ts`:

```typescript
import { TabiApp } from "@tabirun/app";

const app = new TabiApp();

app.get("/", (c) => {
  c.text("Hello, world!");
});

Deno.serve(app.handler);
```

Run it:

```bash
deno run --allow-all main.ts
```
