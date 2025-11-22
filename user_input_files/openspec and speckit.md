openspec and speckit.md

https://github.com/Fission-AI/OpenSpec.git

CodeBuddy Code (CLI)  /openspec:proposal, /openspec:apply, /openspec:archive (.codebuddy/commands/) — see docs

Windsurf  /openspec-proposal, /openspec-apply, /openspec-archive (.windsurf/workflows/)

OpenCode  /openspec-proposal, /openspec-apply, /openspec-archive
Kilo Code  /openspec-proposal.md, /openspec-apply.md, /openspec-archive.md (.kilocode/workflows/)

Cline  Rules in .clinerules/ directory (.clinerules/openspec-*.md)
Crush  /openspec-proposal, /openspec-apply, /openspec-archive (.crush/commands/openspec/)


https://github.com/Fission-AI/OpenSpec.git

Step 1: Install the CLI globally
npm install -g @fission-ai/openspec@latest

Step 2: Initialize OpenSpec in your project
Navigate to your project directory:
cd my-project
Run the initialization:
openspec init

Verify & Review
Check that the change was created correctly and review the proposal:

$ openspec list                             # Confirm the change folder exists
$ openspec validate add-profile-filters     # Validate spec formatting
$ openspec show add-profile-filters         # Review proposal, tasks, and spec delta
3. Refine the Specs
Iterate on the specifications until they match your needs:

You: Can you add acceptance criteria for the role and team filters?

AI:  I'll update the spec delta with scenarios for role and team filters.
     *Edits openspec/changes/add-profile-filters/specs/profile/spec.md and tasks.md.*
4. Implement the Change
Once specs look good, start implementation:

You: The specs look good. Let's implement this change.
     (Shortcut for tools with slash commands: /openspec:apply add-profile-filters)

AI:  I'll work through the tasks in the add-profile-filters change.
     *Implements tasks from openspec/changes/add-profile-filters/tasks.md*
     *Marks tasks complete: Task 1.1 ✓, Task 1.2 ✓, Task 2.1 ✓...*
5. Archive the Completed Change
After implementation is complete, archive the change:

AI:  All tasks are complete. The implementation is ready.

You: Please archive the change
     (Shortcut for tools with slash commands: /openspec:archive add-profile-filters)

AI:  I'll archive the add-profile-filters change.
    *Runs: openspec archive add-profile-filters --yes*
     ✓ Change archived successfully. Specs updated. Ready for the next feature!
Or run the command yourself in terminal:

$ openspec archive add-profile-filters --yes  # Archive the completed change without prompts

openspec/
├── specs/
│   └── auth/
│       └── spec.md           # Current auth spec (if exists)
└── changes/
    └── add-2fa/              # AI creates this entire structure
        ├── proposal.md       # Why and what changes
        ├── tasks.md          # Implementation checklist
        ├── design.md         # Technical decisions (optional)
        └── specs/
            └── auth/
                └── spec.md   # Delta showing additions

.......................................................................................................................

https://github.com/github/spec-kit.git

Option 1: Persistent Installation (Recommended)
Install once and use everywhere:

uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
Then use the tool directly:

specify init <PROJECT_NAME>
specify check
To upgrade specify run:

uv tool install specify-cli --force --from git+https://github.com/github/spec-kit.git

Command  Description
init  Initialize a new Specify project from the latest template
check  Check for installed tools (git, claude, gemini, code/code-insiders, cursor-agent, windsurf, qwen, opencode, codex)
specify init Arguments & Options
Argument/Option  Type  Description
<project-name>  Argument  Name for your new project directory (optional if using --here, or use . for current directory)
--ai  Option  AI assistant to use: claude, gemini, copilot, cursor-agent, qwen, opencode, codex, windsurf, kilocode, auggie, roo, codebuddy, amp, or q
--script  Option  Script variant to use: sh (bash/zsh) or ps (PowerShell)
--ignore-agent-tools  Flag  Skip checks for AI agent tools like Claude Code
--no-git  Flag  Skip git repository initialization
--here  Flag  Initialize project in the current directory instead of creating a new one
--force  Flag  Force merge/overwrite when initializing in current directory (skip confirmation)
--skip-tls  Flag  Skip SSL/TLS verification (not recommended)
--debug  Flag  Enable detailed debug output for troubleshooting
--github-token  Option  GitHub token for API requests (or set GH_TOKEN/GITHUB_TOKEN env variable)
Examples
# Basic project initialization
specify init my-project

# Initialize with specific AI assistant
specify init my-project --ai claude

# Initialize with Cursor support
specify init my-project --ai cursor-agent

# Initialize with Windsurf support
specify init my-project --ai windsurf

# Initialize with Amp support
specify init my-project --ai amp

# Initialize with PowerShell scripts (Windows/cross-platform)
specify init my-project --ai copilot --script ps

# Initialize in current directory
specify init . --ai copilot
# or use the --here flag
specify init --here --ai copilot

# Force merge into current (non-empty) directory without confirmation
specify init . --force --ai copilot
# or 
specify init --here --force --ai copilot

# Skip git initialization
specify init my-project --ai gemini --no-git

# Enable debug output for troubleshooting
specify init my-project --ai claude --debug

# Use GitHub token for API requests (helpful for corporate environments)
specify init my-project --ai claude --github-token ghp_your_token_here

# Check system requirements
specify check