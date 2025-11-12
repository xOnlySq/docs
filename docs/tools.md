# Tools
The OnlySq API is compatible with the OpenAI SDK, allowing you to leverage powerful tool-calling capabilities. This feature enables the model to interact with external functions to perform actions or retrieve information.

## How it works
The process involves a few steps:
1.  **Define tools**: You provide the model with a list of available functions (tools) it can use.
2.  **User request**: The user sends a message that requires external information.
3.  **Model decides**: The model analyzes the user's request and decides if a tool is needed. If so, it generates a `tool_calls` object instead of a direct response.
4.  **Execute the tool**: Your application receives the `tool_calls` object, parses it, and executes the specified function with the provided arguments.
5.  **Provide feedback**: The result from the function is sent back to the model as a new message with the `role: "tool"`.
6.  **Final response**: The model processes the tool's output and generates a final, human-readable response for the user.

## Supported languages
-   TypeScript / JavaScript
-   Python
-   Java
-   .NET
-   Go

## Tool Building
To use tools, you must first define them in a specific format that the model understands. A tool is a dictionary with `type` and `function` keys.

-   `type`: Must be `"function"`.
-   `function`: A dictionary describing the function.
    -   `name`: The name of the function to be called.
    -   `description`: A human-readable description of what the function does. This helps the model decide when to use it.
    -   `parameters`: An object defining the function's arguments in JSON Schema format. This is crucial for the model to know what arguments to provide.

### Tool Object Structure
Here's a template for defining a tool:
```json
{
    "type": "function",
    "function": {
        "name": "your_function_name",
        "description": "A description of what your function does.",
        "parameters": {
            "type": "object",
            "properties": {
                "parameter1": {
                    "type": "string",
                    "description": "Description of the first parameter."
                },
                "parameter2": {
                    "type": "number",
                    "description": "Description of the second parameter."
                }
            },
            "required": ["parameter1"]
        }
    }
}
````

## Example: Getting the weather

Let's look at a complete example using a weather function.

First, define the `get_weather` function and the corresponding tool definition.

```python
import json
import requests
from openai import OpenAI

# 1. Define the external function
def get_weather(latitude: float, longitude: float) -> float:
    """Get current temperature for provided coordinates in celsius."""
    response = requests.get(
        f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"
    )
    data = response.json()
    return data['current']['temperature_2m']

# 2. Define the tool for the model
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get the current weather for a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "latitude": { "type": "number" },
                    "longitude": { "type": "number" },
                },
                "required": ["latitude", "longitude"],
            },
        },
    }
]

client = OpenAI(base_url="https://api.onlysq.ru/ai/openai", api_key="openai")

# 3. Initial user message
input_messages = [{"role": "user", "content": "What's the weather like in Paris today? 48°51′24″N 2°21′8″E"}]

# 4. First API call: The model will "call" the tool
response = client.chat.completions.create(
    model="gemini-2.0-flash",
    messages=input_messages,
    tools=tools,
    tool_choice="auto"
)

# 5. Extract and execute the tool call
tool_call = response.choices[0].message.tool_calls[0]
function_name = tool_call.function.name
function_args = json.loads(tool_call.function.arguments)

if function_name == "get_weather":
    result = get_weather(
        latitude=function_args.get("latitude"),
        longitude=function_args.get("longitude")
    )
else:
    result = "Unknown function called."

# 6. Append the model's tool call and the tool's output to the messages
input_messages.append(response.choices[0].message)
input_messages.append(
    {
        "role": "tool",
        "tool_call_id": tool_call.id,
        "name": function_name,
        "content": str(result),
    }
)

# 7. Second API call: The model generates a final response based on the tool's output
response_2 = client.chat.completions.create(
    model="gemini-2.0-flash",
    messages=input_messages,
    tools=tools,
)

print(response_2.choices[0].message.content)
```
