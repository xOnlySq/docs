# Tool Calling
Tool calling is the process by which a model determines whether to use one or more of the functions you've provided. When a user's prompt can be better answered by calling a function, the model responds with a `tool_calls` object instead of a text message.

## `tool_calls` Object
The `tool_calls` object is a list of calls the model wants to make. Each item in the list contains:
- `id`: A unique identifier for the tool call. This is required for the subsequent `tool` message.
- `type`: The type of tool, always `"function"`.
- `function`: An object with the function details.
    - `name`: The name of the function to call.
    - `arguments`: A string containing the JSON-formatted arguments for the function.

### Example `tool_calls` response
```json
{
    "id": "chat_XBt6z670WKm7L9BVoCcLZLzTNZ03UJhD6sWqAEUyTgaJvhJA",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "tool_calls": [
                    {
                        "id": "call_abc123",
                        "type": "function",
                        "function": {
                            "name": "get_weather",
                            "arguments": "{\"latitude\":48.8566,\"longitude\":2.3522}"
                        }
                    }
                ]
            },
            "finish_reason": "tool_calls"
        }
    ],
    // ... other fields
}
````

## `tool_choice` Parameter

You can control the model's behavior with the `tool_choice` parameter in the API request.

- `none` (default): The model will not call any functions.
- `auto`: The model decides whether to call a function or generate a text response.
- `required`: The model must call one or more functions.

```python
# Example of using tool_choice
response = client.chat.completions.create(
    model="gemini-2.0-flash",
    messages=input_messages,
    tools=tools,
    tool_choice="auto" # or "none", or "required"
)
```

## Streaming Tool Calls

When using `stream=True`, the `tool_calls` object will be returned in chunks. The `delta` object in each chunk contains the partial `tool_calls` data.

### Python Example with Streaming

This example demonstrates how to handle streaming tool calls and their results.

```python
import json
import requests
from openai import OpenAI

def get_weather(latitude: float, longitude: float):
    response = requests.get(
        f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"
    )
    data = response.json()
    return data['current']['temperature_2m']

client = OpenAI(base_url="https://api.onlysq.ru/ai/openai", api_key="openai")

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

input_messages = [{"role": "user", "content": "What's the weather like in Paris today? 48°51′24″N 2°21′8″E"}]

# First API call to get the tool call
response = client.chat.completions.create(
    model="gemini-2.0-flash",
    messages=input_messages,
    tools=tools,
    tool_choice="auto"
)

if response.choices[0].message.tool_calls:
    tool_call = response.choices[0].message.tool_calls[0]
    function_name = tool_call.function.name
    function_args = json.loads(tool_call.function.arguments)

    if function_name == "get_weather":
        # Execute the tool
        result = get_weather(
            latitude=function_args.get("latitude"),
            longitude=function_args.get("longitude")
        )
        
        # Append the tool's output to messages
        input_messages.append(response.choices[0].message)
        input_messages.append(
            {
                "role": "tool",
                "tool_call_id": tool_call.id,
                "name": function_name,
                "content": str(result),
            }
        )

        # Second API call with streaming enabled
        stream = client.chat.completions.create(
            model="gemini-2.0-flash",
            messages=input_messages,
            tools=tools,
            stream=True
        )
        
        # Process and print the streaming response
        for chunk in stream:
            content = chunk.choices[0].delta.content
            if content:
                print(content, end="", flush=True)
        print()
    else:
        print("Unknown function called.")
else:
    print(response.choices[0].message.content)
```
