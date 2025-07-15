# Using OnlySq AI models via OpenAI SDK
The API is compatible for calls from OpenAI libraries.
This allows you to easily connect projects to the OnlySq API, use any of the 40+ available models for free, use it in projects such as Exteragram, etc.
## Supported languages
- TypeScript / JavaScript
- Python
- Java
- .NET
- Go

This short course will show you how to use OnlySq API via OpenAI SDK.

## Installation
First you need to install the required dependencies and import SDK
Then, create a client and configure it with the OnlySq API URL and yours or a universal key `openai`.

::: code-group
```shell [Python]
pip install openai
```

```shell [TypeScript]
npm install openai
```
:::
## Initializing client
::: code-group
```python [Python]
from openai import OpenAI

client = OpenAI(
    base_url="https://api.onlysq.ru/ai/openai/",
    api_key="openai" # or your valid key
)
```

```typescript [TypeScript]
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: "https://api.onlysq.ru/ai/openai/",
    apiKey: "openai" // or your valid key
});
```
:::
## Chat completions
Here’s a basic example of using Chat Completions
::: code-group

```python [Python]
from openai import OpenAI

client = OpenAI(
    base_url="https://api.onlysq.ru/ai/openai",
    api_key="openai",
)

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {
            "role": "user",
            "content": "Say 5 short facts about AI.",
        },
    ],
)

print(completion.choices[0].message.content)
```

```typescript [TypeScript]
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: "https://api.onlysq.ru/ai/openai",
    apiKey: "openai",
    });

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        {
            role: "user",
            content: "Say 5 short facts about AI.",
        },
    ]
});

console.log(completion.choices[0].message.content);
```

```bash [cURL]
curl --request POST \
    --url https://api.onlysq.ru/ai/openai/chat/completions \
    --header 'Authorization: Bearer openai' \
    --header 'Content-Type: application/json' \
    --data '{
    "model": "gpt-4o-mini",
    "messages": [
    {
        "role": "user", 
        "content": "Say 5 short facts about AI."
    }
    ]
}'
```
:::
Example response (via the Python SDK):
```
Here are five short facts about AI:  

1. **AI Learns from Data** – AI systems improve by analyzing large amounts of data, identifying patterns, and making predictions.          
2. **Narrow vs. General AI** – Most AI today is "narrow" (task-specific), while "general AI" (human-like reasoning) is still theoretical.  
3. **AI Powers Everyday Tech** – Virtual assistants (Siri, Alexa), recommendations (Netflix, Spotify), and spam filters all use AI.        
4. **Ethical Concerns Exist** – AI raises issues like bias in algorithms, job displacement, and privacy risks.  
5. **AI is Evolving Fast** – Breakthroughs in deep learning and generative AI (like ChatGPT) are rapidly advancing the field.  

Would you like more details on any of these?
```

## State management
For state management, you can use the `messages` parameter to build the conversation history.
You can include a system message via the `system` (or `developer`) role and the multiple chat turns between the `user` and `assistant`.
::: code-group
```python [Python]
from openai import OpenAI

client = OpenAI(
    base_url="https://api.onlysq.ru/ai/openai",
    api_key="openai",
)

completion = client.chat.completions.create(
    model="gpt-4o-mini"
    messages=[
        {
            "role": "system",
            "content": "You are a neko-helper.",
        },
        {
            "role": "user",
            "content": "What's 5 + 5?",
        },
        {
            "role": "assistant",
            "content":"Nya~! 5 + 5 is 10, purr-fectly simple! 😸✨"
        },
        {
            "role": "user",
            "content": "Say what do you like",
        },
    ],
)

print(completion.choices[0].message.content)
```

```typescript [TypeScript]
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: "https://api.onlysq.ru/ai/openai",
    apiKey: "openai",
    });

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        {
            role: "system",
            content: "You are a neko-helper.",
        },
        {
            role: "user",
            content: "What's 5 + 5?",
        },
        {
            role: "assistant",
            content:"Nya~! 5 + 5 is 10, purr-fectly simple! 😸✨"
        },
        {
            role: "user",
            content: "Say what do you like",
        },
    ]
});

console.log(completion.choices[0].message.content);
```
:::
Example response (via the Python SDK):
```
Nya~! As your neko-helper, I love all things cute and cozy—like chasing digital yarn balls, napping in the cloud (servers!), and most of all... helping you with purr-oblems! 😻✨  

What about you? What do *you* like, nya? ~(=^･ω･^)ﾉ
```
## Supported parameters
- `model` - required
- `messages` - required

## Streaming chat completions usage

### Streaming request example

```python
from openai import OpenAI
client = OpenAI(api_key="openai", base_url="https://api.onlysq.ru/ai/openai/")
messages = [
    {
        "role":"user",
        "content":"Write a one-line story about AI."
    }
]
r = client.chat.completions.create(
    model = "gpt-4o-mini",
    messages = messages,
    stream = True
)

for chunk in r:
    print(chunk.choices[0].delta.content, end="")

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