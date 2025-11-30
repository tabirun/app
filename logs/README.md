# logs

Structured logger with color-coded terminal output.

## Installation

```typescript
import { TabiLogger } from "@tabirun/app/logs";
```

## Usage

```typescript
const logger = new TabiLogger("my-plugin");

logger.success("Operation completed");
logger.info("Server started on port 3000");
logger.warn("Deprecated API usage");
logger.error("Connection failed");
logger.error(new Error("Something went wrong"));
```

## API

- `new TabiLogger(source)` - Create logger with source label
- `success(message)` - Green output
- `info(message)` - Blue output
- `warn(message)` - Yellow output
- `error(message | Error)` - Red output

## Notes

- Output format: `[Source][Level] message`
