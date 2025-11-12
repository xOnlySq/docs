<span style="color: white; background-color: #0d47a1; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">POST</span> [https://api.onlysq.ru/ai/imagen](https://api.onlysq.ru/ai/imagen)

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
`ratio` string <span style="color: white; background-color: #607d8b; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">Optional</span>

Aspect ratio of the requested image.
Must be one of: `1:1`, `16:9`, `21:9`, `3:2`, `2:3`, `4:5`, `5:4`, `3:4`, `4:3`, `9:16`, `9:21`.

Default: `1:1`

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
j = {
	"model": "flux",
	"prompt": "cat on a blue water wave",
	"ratio":"16:9"
}

r = requests.post("https://api.onlysq.ru/ai/imagen", json=j)
r.raise_for_status()
c = r.json()

with open('pic.png', 'wb') as f:
	f.write(base64.b64decode(c["files"][0]))

print("Image saved successfully")
```

Executing one of the presented examples will save the image of the cat to the file pic.png.
### Response example
![Output image](/images/cat.jpg)
```json
{
    'id': 'imagen_u1nW43V9wAaWenrHifdqkzxSLNWIpXLVBMzJ4fnBsyNMx94w',
    'created': 1753881206,
    'model': 'flux',
    'files': ['base64'],
    'ratio': '16:9',
    'elapsed-time': 3.20550274848938,
    'usage': 1,
    'user': 0
}
```