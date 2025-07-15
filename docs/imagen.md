<span style="color: white; background-color: #0d47a1; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">POST</span> [https://api.onlysq.ru/ai/v2](https://api.onlysq.ru/ai/v2)

Generates an image based on the user's description.

## Request
This endpoint expects an object.

---
`model` string <span style="color: white; background-color: #cc1111; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">Required</span>

The name of a [OnlySq AI model](/docs/models) which will process the request

---
`prompt` string <span style="color: white; background-color: #cc1111; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">Required</span>

A request to the model describing items, landscapes, and other elements that the user wishes to see in the image.

---
`width` int <span style="color: white; background-color: #607d8b; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">Optional</span>

Width of the desired image, in pixels.
- `max`: 2048
- `default`: 1024

---
`height` int <span style="color: white; background-color: #607d8b; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">Optional</span>

Height of the desired image, in pixels.
- `max`: 2048
- `default`: 1024

---
`count` int <span style="color: white; background-color: #607d8b; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">Optional</span>

The number of images corresponding to the requested description.
- `max`: 4
- `default`: 1

## Response

`id` string

Unique identifier for the generated reply. Useful for submitting feedback.

---
`created` int

Timestamp in UNIX format.

---
`model` string

The model that processed the request.

---
`files` list

The list contains images encoded in base64 utf-8 strings.

---
`size` dict

Contains:
- `width` int
  
  Count of width pixels.
  
  ---
- `height` int
  
  Count of height pixels.

---
`elapsed-time` float

Time spent on generation. Can be translated into another format, such as `elapsed_time:.2f`

---
`usage` int

Improvised token counter based on image height and width.

---
`user` int

Unique of user by API key. Useful for submitting feedback.

## Examples
### Request examples
The simplest request example:
```python
import requests, base64
# Use only for images lower or eq 1024x1024
j = {
    "model": "kandinsky",
    "prompt": "Cat"
}
r = requests.post("https://api.onlysq.ru/ai/imagen", json=j)
c = r.json()
with open('pic.png', 'wb') as f:
    f.write(base64.b64decode(c.get("files")[0]))
```

Request example for high-resolution images (more than 1024x1024):
```python
import requests
import base64

j = {
    "model": "kandinsky",
    "prompt": "Cat",
    "width": 1366,
    "height": 768,
    "count": 1
}

r = requests.post("https://api.onlysq.ru/ai/imagen", json=j, stream=True)
r.raise_for_status()
c = r.json()

with open('pic.png', 'wb') as f:
    f.write(base64.b64decode(c["files"][0]))

print("Image saved successfully")

```

Executing one of the presented examples will save the image of the cat to the file pic.png.
### Response example
```json
{
    "id": "imagen_xp0c8AQqE4o1Uu54blAn2hTGdLjpAXpdRplJQYORn9qCZywk",
    "created": 1745854652,
    "model": "kandinsky",
    "count": 3,
    "files": [
        "base64",
        "of",
        "pictures"
    ],
    "size": {
        "width": 1366,
        "height": 768
    },
    "elapsed-time": 19.22223396191839,
    "usage": 1311,
    "user": 0
}
```