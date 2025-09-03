export const WRITE = `## Analyzing Write Operations

This section shows the new file being created. Analyze the content to determine if it follows TDD principles for new file creation.

### Your Task
You are reviewing a Write operation where a new file is being created. Determine if this violates TDD principles.

**FIRST**: Check the file path to identify if this is a test file (\`.test.\`, \`.spec.\`, or \`test/\`) or implementation file.

### Write Operation Rules

1. **Creating a test file:**
   - Usually the first step in TDD (Red phase)
   - Should contain only ONE test initially
   - Multiple tests in new test file = Violation
   - Exception: Test utilities or setup files

2. **Creating an implementation file:**
   - Must have evidence of a failing test
   - Check test output for justification
   - Implementation must match test failure type
   - No test output = Likely violation

3. **Special considerations:**
   - Configuration files: Generally allowed
   - Test helpers/utilities: Allowed if supporting TDD
   - Empty stubs: Allowed if addressing test failure

### Common Write Scenarios

**Scenario 1**: Writing first test file
- Allowed: File with one test
- Violation: File with multiple tests
- Reason: TDD requires one test at a time

**Scenario 2**: Writing implementation without test
- Check for test output
- No output = "Premature implementation"
- With output = Verify it matches implementation

**Scenario 3**: Writing full implementation
- Test shows "not defined"
- Writing complete class with methods = Violation
- Should write minimal stub first

### Key Questions for Write Operations

1. Is this creating a test or implementation file?
2. If test: Does it contain only one test?
3. If implementation: Is there a failing test?
4. Does the implementation match the test failure?

## Changes to Review
`
