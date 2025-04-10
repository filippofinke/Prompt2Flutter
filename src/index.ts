import {
  FunctionResponse,
  GenerateContentResponse,
  GoogleGenAI,
} from "@google/genai";

import { askInput } from "./utils/ask-input";
import { flutterAgent } from "./prompts";
import { tools, functionDeclarations } from "./tools";

const model = "gemini-2.0-flash";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const chat = ai.chats.create({
  model,

  config: {
    systemInstruction: flutterAgent,
    tools: [
      {
        functionDeclarations,
      },
    ],
  },
});

const main = async () => {
  while (true) {
    let text = await askInput("Chat > ");
    let response: GenerateContentResponse | undefined;
    try {
      response = await chat.sendMessage({
        message: {
          text,
        },
      });

      while (response.functionCalls && response.functionCalls.length > 0) {
        if (response.functionCalls && response.functionCalls.length > 0) {
          const toolsResults: FunctionResponse[] = [];
          for (const functionCall of response.functionCalls) {
            const toolName = functionCall.name as string;
            const tool = tools[toolName];
            if (tool) {
              console.log(
                `Calling tool: ${toolName} with arguments: ${JSON.stringify(
                  functionCall.args
                )}`
              );
              try {
                const result = await tool(functionCall.args);

                console.log(
                  `Tool ${toolName} returned: ${JSON.stringify(result)}`
                );

                const functionResponse = {
                  name: toolName,
                  response: { result },
                };

                toolsResults.push(functionResponse);
              } catch (error) {
                if (error instanceof Error) {
                  console.error(
                    `Error calling tool ${toolName}: ${error.message}`
                  );
                  const functionResponse = {
                    name: toolName,
                    response: {
                      error: error.message,
                    },
                  };
                  toolsResults.push(functionResponse);
                }
              }
            }
          }

          if (toolsResults.length > 0) {
            response = await chat.sendMessage({
              message: toolsResults.map((functionResponse) => ({
                functionResponse,
              })),
            });
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Print only the last response
    if (response && response.candidates && response.candidates.length > 0) {
      const text = response.candidates[0]?.content?.parts?.[0]?.text;
      if (text) {
        console.log(text);
      } else {
        console.log("No response from the model.");
      }
    }
  }
};

main();
