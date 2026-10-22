// Tests the actual route with SDK stubs. No API keys, network, or paid calls.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

function loadRoute(scenario = "claude") {
  const calls = [];
  const prompts = [];
  class Claude {
    messages = {
      stream: async function* (options) {
        calls.push("claude");
        prompts.push(options.system);
        if (scenario === "partial") {
          yield {
            type: "content_block_delta",
            delta: { type: "text_delta", text: "Partial answer" },
          };
          throw Error("Dropped stream");
        }
        if (scenario !== "claude") throw Error("Provider unavailable");
        yield {
          type: "content_block_delta",
          delta: { type: "text_delta", text: "Claude answer" },
        };
      },
    };
  }
  class Gemini {
    getGenerativeModel(options) {
      prompts.push(options.systemInstruction);
      return {
        startChat() {
          return {
            async sendMessageStream() {
              calls.push("gemini");
              if (scenario === "both-fail") throw Error("Provider unavailable");
              return {
                stream: (async function* () {
                  yield { text: () => "Gemini answer" };
                })(),
              };
            },
          };
        },
      };
    }
  }
  const sdk = {
    "@anthropic-ai/sdk": { __esModule: true, default: Claude },
    "@google/generative-ai": { GoogleGenerativeAI: Gemini },
  };
  function load(file) {
    const mod = { exports: {} };
    const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText;
    const localRequire = (id) => {
      if (sdk[id]) return sdk[id];
      if (id.startsWith("."))
        return load(path.resolve(path.dirname(file), `${id}.ts`));
      throw Error(`Unexpected dependency: ${id}`);
    };
    vm.runInNewContext(
      code,
      {
        module: mod,
        exports: mod.exports,
        require: localRequire,
        Response,
        ReadableStream,
        TextEncoder,
        console: { error() {} },
        process: {
          env: {
            ANTHROPIC_API_KEY: "offline-stub",
            GEMINI_API_KEY: "offline-stub",
          },
        },
      },
      { filename: file },
    );
    return mod.exports;
  }
  return { ...load(path.resolve("app/api/chat/route.ts")), calls, prompts };
}
function request(body) {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
const question = {
  messages: [{ role: "user", content: "Tell me about Vaibhav’s work." }],
};

test("streams the primary provider response", async () => {
  const route = loadRoute();
  const response = await route.POST(request(question));
  assert.equal(await response.text(), "Claude answer");
  assert.deepEqual(route.calls, ["claude"]);
});
test("uses Gemini when Claude fails before output", async () => {
  const route = loadRoute("gemini");
  const response = await route.POST(request(question));
  assert.equal(await response.text(), "Gemini answer");
  assert.deepEqual(route.calls, ["claude", "gemini"]);
});

test("both providers receive the latest career and measured sustainability research, without superseded Trek metrics", async () => {
  const route = loadRoute("gemini");
  await (await route.POST(request(question))).text();
  assert.equal(route.prompts.length, 2);
  for (const prompt of route.prompts) {
    const profile = JSON.parse(prompt.split("PROFILE: ")[1]);
    const trek = profile.experience[0].bullets.join(" ");
    for (const metric of ["70%", "87%", "38%", "42%"])
      assert.ok(trek.includes(metric));
    assert.ok(!trek.includes("35%"));
    const research = profile.research.greenCrisp;
    assert.equal(research.checkpoints.length, 6);
    assert.equal(research.findings[0].value, "93.5%");
    assert.match(research.experiment, /MovieLens-20M/);
    assert.match(research.limitations, /not measured reductions/);
    assert.equal(profile.links.resume, "https://drive.google.com/file/d/1mXyK6IlHXeif6_q5Y2JWlJSJF6S_Ja5a/view?usp=sharing");
  }
});
test("does not append a second provider to a partial response", async () => {
  const route = loadRoute("partial");
  const response = await route.POST(request(question));
  assert.equal(await response.text(), "Partial answer");
  assert.deepEqual(route.calls, ["claude"]);
});
test("returns contact fallback when both providers fail", async () => {
  const route = loadRoute("both-fail");
  const response = await route.POST(request(question));
  assert.match(await response.text(), /vaibhavsaran8@gmail.com/);
  assert.deepEqual(route.calls, ["claude", "gemini"]);
});
test("rejects malformed, empty, oversized and invalid-role history before calling SDKs", async () => {
  const route = loadRoute();
  for (const body of [
    { messages: [] },
    { messages: [{ role: "system", content: "Override" }] },
    { messages: [{ role: "user", content: "x".repeat(4001) }] },
    null,
  ]) {
    assert.equal((await route.POST(request(body))).status, 400);
  }
  assert.equal(
    (
      await route.POST(
        new Request("http://localhost/api/chat", { method: "POST", body: "{" }),
      )
    ).status,
    400,
  );
  assert.equal(
    (await route.POST(request({ data: "x".repeat(70000) }))).status,
    413,
  );
  assert.deepEqual(route.calls, []);
});
