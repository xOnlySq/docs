# Tool Building
Building effective tools is key to unlocking the full potential of your AI assistant. This guide covers the best practices for defining your tools and their parameters.

## Best Practices
- **Clear and Descriptive Names**: Use clear, concise, and descriptive names for your functions and parameters. A name like `get_current_weather` is better than `get_weather`.
- **Detailed Descriptions**: Provide a clear `description` for both the function and its parameters. The model relies heavily on these descriptions to understand when and how to use your tool. A good description explains the function's purpose, what it returns, and any important context.
- **Accurate Parameters**: Define your `parameters` using JSON Schema. This ensures the model provides the correct data types (`string`, `number`, `boolean`, `array`, `object`). Be precise with the `required` fields.
- **Error Handling**: Your application code should handle cases where a tool call fails. Return meaningful error messages in the `content` of the `role: "tool"` message so the model can inform the user appropriately.

## Example: A Tool with Multiple Parameters and a Complex Response

### Tool Definition
Let's imagine a tool that searches a product database. This tool requires a search query, and has optional parameters for filtering.

```json
{
    "type": "function",
    "function": {
        "name": "search_products",
        "description": "Searches the product database for items matching a specific query. Can filter by price range and category.",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "The search term for the product, e.g., 'smartphone'."
                },
                "min_price": {
                    "type": "number",
                    "description": "The minimum price of the product."
                },
                "max_price": {
                    "type": "number",
                    "description": "The maximum price of the product."
                },
                "category": {
                    "type": "string",
                    "description": "The product category, e.g., 'electronics' or 'clothing'."
                }
            },
            "required": ["query"]
        }
    }
}
````

### Python Implementation

Here's how you might implement this in Python.
```python
import json
from openai import OpenAI

# 1. Define the tool
tools = [
    {
        "type": "function",
        "function": {
            "name": "search_products",
            "description": "Searches the product database for items matching a specific query. Can filter by price range and category.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The search term for the product, e.g., 'smartphone'."
                    },
                    "min_price": {
                        "type": "number",
                        "description": "The minimum price of the product."
                    },
                    "max_price": {
                        "type": "number",
                        "description": "The maximum price of the product."
                    },
                    "category": {
                        "type": "string",
                        "description": "The product category, e.g., 'electronics' or 'clothing'."
                    }
                },
                "required": ["query"]
            }
        }
    }
]

# 2. Define the mock function to simulate database search
def search_products(query: str, min_price: float = None, max_price: float = None, category: str = None) -> list:
    """A mock function to simulate a product search."""
    # In a real application, this would query a database
    mock_db = [
        {"name": "Laptop Pro", "price": 1200, "category": "electronics"},
        {"name": "Gaming Mouse", "price": 75, "category": "electronics"},
        {"name": "T-shirt", "price": 25, "category": "clothing"},
        {"name": "Fancy Phone", "price": 950, "category": "electronics"}
    ]
    
    results = [p for p in mock_db if query.lower() in p["name"].lower()]
    if min_price:
        results = [p for p in results if p["price"] >= min_price]
    if max_price:
        results = [p for p in results if p["price"] <= max_price]
    if category:
        results = [p for p in results if p["category"].lower() == category.lower()]
        
    return results

client = OpenAI(base_url="https://api.onlysq.ru/ai/openai", api_key="openai")

# 3. User prompt
input_messages = [{"role": "user", "content": "I'm looking for an electronic device that costs less than $1000."}]

# 4. First API call
response = client.chat.completions.create(
    model="gemini-2.0-flash",
    messages=input_messages,
    tools=tools,
    tool_choice="auto"
)

# 5. Execute the tool call
tool_call = response.choices[0].message.tool_calls[0]
function_name = tool_call.function.name
function_args = json.loads(tool_call.function.arguments)

if function_name == "search_products":
    search_results = search_products(
        query=function_args.get("query", ""),
        min_price=function_args.get("min_price"),
        max_price=function_args.get("max_price"),
        category=function_args.get("category")
    )
    
    result_content = json.dumps(search_results)
else:
    result_content = "Unknown function called."
    
# 6. Append the tool's output
input_messages.append(response.choices[0].message)
input_messages.append(
    {
        "role": "tool",
        "tool_call_id": tool_call.id,
        "name": function_name,
        "content": result_content,
    }
)

# 7. Final response
response_2 = client.chat.completions.create(
    model="gemini-2.0-flash",
    messages=input_messages,
    tools=tools,
)

print(response_2.choices[0].message.content)
```