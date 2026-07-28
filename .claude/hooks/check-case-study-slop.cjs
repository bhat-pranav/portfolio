// PostToolUse hook (Write|Edit): reminds Claude to run the no-ai-slop skill
// whenever src/data/case-studies.ts changes, so case-study copy always gets
// checked for AI-slop patterns before the edit is considered done.
let raw = "";
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let input = {};
  try {
    input = JSON.parse(raw);
  } catch {
    process.stdout.write("{}");
    return;
  }

  const filePath =
    input?.tool_input?.file_path || input?.tool_response?.filePath || "";

  if (!/case-studies\.ts$/.test(filePath.replace(/\\/g, "/"))) {
    process.stdout.write("{}");
    return;
  }

  const reason =
    "src/data/case-studies.ts was just edited. Before treating this case-study change as done, invoke the no-ai-slop skill against the case-study text fields that changed (e.g. problem, productDecision, userFlow, implementationDetails, hardestTechnicalIssue, limitations, results, nextSteps) and apply any fixes it surfaces. Do not skip this step.";

  process.stdout.write(
    JSON.stringify({
      decision: "block",
      reason,
      hookSpecificOutput: {
        hookEventName: "PostToolUse",
        additionalContext: reason,
      },
    })
  );
});
