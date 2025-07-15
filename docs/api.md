# Working with OnlySq API2.0
OnlySq platform allows you to feel power of LLMs in your projects.
Our advanced models allow for their use in any projects, ranging from small ones (chatbot, text analysis) to extended and large ones (virtual assistant, agents). Learn <a href="/docs/endpoint2">how to work with the models</a> and <a href = "/docs/models">familiarize yourself with their list</a>.

## SDKs
OnlySq supports calls via OpenAI SDK libraries as the primary way of accessing API, providing advanced models for the user and ease of use for the developer.
To get started, please see the installation methods and code snippets below.
## Python
```shell
pip install -U openai
```
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
## TypeScript
```shell
npm install openai
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
## Example response (via the Python SDK)
```
Here are five short facts about AI:  

1. **AI Learns from Data** – AI systems improve by analyzing large amounts of data, identifying patterns, and making predictions.          
2. **Narrow vs. General AI** – Most AI today is "narrow" (task-specific), while "general AI" (human-like reasoning) is still theoretical.  
3. **AI Powers Everyday Tech** – Virtual assistants (Siri, Alexa), recommendations (Netflix, Spotify), and spam filters all use AI.        
4. **Ethical Concerns Exist** – AI raises issues like bias in algorithms, job displacement, and privacy risks.  
5. **AI is Evolving Fast** – Breakthroughs in deep learning and generative AI (like ChatGPT) are rapidly advancing the field.  

Would you like more details on any of these?
```
