# TDD Guard Rust Reporter

Rust test reporter that captures test results for TDD Guard validation.

**Note:** This reporter is part of the [TDD Guard](https://github.com/nizos/tdd-guard) project, which ensures Claude Code follows Test-Driven Development principles.

## Requirements

- Rust 1.70+
- TDD Guard installed globally
- `cargo-nextest` (recommended) or `cargo test` with JSON output support

## Installation

Install TDD Guard globally to get all reporters including this Rust reporter:

```bash
npm install -g tdd-guard
```

## Usage

The reporter works as a filter that processes test output while passing it through unchanged.

### With cargo-nextest (Recommended)

```bash
cargo nextest run 2>&1 | tdd-guard-rust --project-root /absolute/path/to/project
```

### With cargo test

```bash
cargo test -- -Z unstable-options --format json 2>&1 | tdd-guard-rust --project-root /absolute/path/to/project
```

### Direct Execution

The reporter can also execute tests directly:

```bash
# Auto-detect runner (prefers nextest)
tdd-guard-rust --project-root /absolute/path/to/project

# Force specific runner
tdd-guard-rust --project-root /absolute/path/to/project --runner nextest
tdd-guard-rust --project-root /absolute/path/to/project --runner cargo
```

## Makefile Integration

Add to your `Makefile`:

```makefile
.PHONY: test
test:
	cargo nextest run 2>&1 | tdd-guard-rust --project-root $(PWD) --passthrough

.PHONY: test-tdd
test-tdd:
	tdd-guard on && $(MAKE) test
```

## Configuration

### Project Root

The `--project-root` flag must be an absolute path to your project directory. This is where the `.claude/tdd-guard/data/test.json` file will be written.

### Flags

- `--passthrough`: Force passthrough mode even if stdin is a terminal
- `--runner [auto|nextest|cargo]`: Choose test runner for direct execution (default: auto)
- `--project-root`: Absolute path to project directory (required)

## How It Works

The reporter captures JSON-formatted test output, passes it through unchanged to stdout, and saves TDD Guard-formatted results to `.claude/tdd-guard/data/test.json`.

## License

MIT - See LICENSE file in the repository root.