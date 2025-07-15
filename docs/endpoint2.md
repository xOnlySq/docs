<span style="color: white; background-color: #0d47a1; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">POST</span> [https://api.onlysq.ru/ai/v2](https://api.onlysq.ru/ai/v2)

Generates a text response to a user message(s).

## Request
This endpoint expects an object.

---
`model` string <span style="color: white; background-color: #cc1111; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">Required</span>

The name of a [OnlySq AI model](/docs/models) which will process the request

---
`request` dict <span style="color: white; background-color: #cc1111; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">Required</span>

Query data dictionary.

Contains:
- `messages` list <span style="color: white; background-color: #cc1111; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">Required</span>
  
  A list of chat messages in chronological order, representing a conversation between the user and the model. Messages can be from `User`, `Assistant` and `System` roles.
  
  ---
- `meta` dict <span style="color: white; background-color: #607d8b; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">Optional</span>
  
  An optional dictionary previously used by ImaGen models.
  
  Contains:
  - `image_count` int <span style="color: white; background-color: #607d8b; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">Optional</span>
    
    Optional parameter, previously used when generating with ImaGen
## Response

`id` string

Unique identifier for the generated reply. Useful for submitting feedback.

---
`object` string

Object initialization for OpenAI SDK.

---
`created` int

Timestamp in UNIX format.

---
`model` string

The model that processed the request.

---
`answer` string <span style="color: white; background-color: #9e9e9e; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">Disabled</span>

The old version of receiving a response. Will be completely removed on 05/01/2025

---
`choices` list

The list of completion choices the model generated for the input prompt.

Contains:
- `index` integer
  
  Index of generated response
  
  ---
- `message` dict
  
  An object containing the response of the model that processed the request
  
  Contains:
  - `role` string
    
    A role of message, can be one of: `User`, `Assistant`, `System`.
    
    ---
  - `content` string
    
    A response text.
    
    ---
- `finish_reason` string
  
  The reason a chat request has finished.
  - `stop`: The model finished sending a complete message.
  - `error`: The generation failed due to an internal error.

---
`usage` dict

Contains:
- `prompt_tokens` int
  
  The number of billed input tokens.
  
  ---
- `completion_tokens` int
  
  The number of billed output tokens.
  
  ---
- `total_tokens` int
  
  Total number of billed tokens.
  
  ---
`user` int

Unique of user by API key. Useful for submitting feedback.

## Examples

### Sync request example

```python
import requests

send = {
    "model": "gpt-4o-mini",
    "request": {
        "messages": [
            {
                "role": "user",
                "content": "Hi! Write a short one-line story"
            }
        ]
    }
}

request = requests.post('http://api.onlysq.ru/ai/v2', json=send)
response = request.json()
print(response["choices"][0]["message"]["content"])
```
This returns the following response to the console:
```
"Under the streetlight, she found the courage to let go of the letter—and the past."
```
### Response example
```json
{
    "id": "chat_XBt6z670WKm7L9BVoCcLZLzTNZ03UJhD6sWqAEUyTgaJvhJA",
    "object": "chat.completion",
    "created": 1745146202,
    "model": "gpt-4o-mini",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "\"Under the full moon, the werewolf realized he'd forgotten his keys—again.\"",
                "refusal": null,
                "annotations": []
            },
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 11,
        "completion_tokens": 19,
        "total_tokens": 30
    },
    "user": 0
}
```

### Streaming request example

```python
import requests, json

url = "http://api.onlysq.ru/ai/v2"

data = {
    "model": "gpt-4o-mini",
    "request": {
        "messages": [
            {
                "role": "user",
                "content": "Write a one-line story about AI."
            }
        ],
        "stream": True
    }
}

with requests.post(url, json=data, stream=True) as response:
    if response.status_code == 200:
        for line in response.iter_lines():
            if line:
                try:
                    decoded_line = line.decode('utf-8').strip()
                    if decoded_line.startswith("data: "):
                        decoded_line = decoded_line[len("data: "):]
                    if decoded_line == "[DONE]":
                        break
                    chunk = json.loads(decoded_line)
                    content = chunk["choices"][0]["delta"].get("content")
                    if content:
                        print(content, end="", flush=True)
                except Exception as e:
                    print(e)
    else:
        print(response.status_code, response.text)

```
This returns the following response to the console:
```
"After mastering human emotions, the AI sighed and shut itself down, realizing loneliness wasn’t worth the code."
```

### Streaming chunk example
```json
{
    "id": "chatcmpl_lQdhTfXn4yKoDlyCjuBpL0GfPZNonZufGqOyGl3wVpMhJRwP",
    "object": "chat.completion.chunk",
    "created": 1750612428,
    "model": "gpt-4o-mini",
    "choices": [
        {
            "index": 0,
            "delta": {
                "content": "te",
                "role": "assistant"
            },
            "finish_reason": null
        }
    ],
    "usage": null
}
```