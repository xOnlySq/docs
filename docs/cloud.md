# OnlySq Cloud
> [!IMPORTANT] OnlySq is not responsible for the loss of important information in the event of Telegram service errors.

> [!NOTE] OnlySq Cloud is under testing. Any changes may be made without notifying users.
## What is OnlySq Cloud?
OnlySq Cloud is an unlimited cloud storage service designed to operate through web requests, storing files on Telegram servers. **Fast. Secure. Anonymous.**
## How to use?
### Upload file
Accepts files, returns JSON with download link

Endpoint: <span style="color: white; background-color: #0d47a1; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">POST</span> https://cloud.onlysq.ru/upload
#### Example
```python
import requests
import os, sys

# This example exports files using a
# command-line argument or by dragging
# and dropping a file onto it

if len(sys.argv) < 2:
    sys.exit(1)

URL = "https://cloud.onlysq.ru/upload"
FILE = sys.argv[1]

with open(FILE, "rb") as f:
    files = {"file": (os.path.basename(FILE), f, "application/octet-stream")}
    response = requests.post(URL, files=files)
    response.raise_for_status()
    print(response.json())
input("press enter")
```
#### Response
```json
{
	'ok': True,
	'owner': 'qwerty',
	'url': 'https://cloud.onlysq.ru/file/abcdef'
}
```
### Download file
Just download files

Endpoint: <span style="color: white; background-color: #2e7d32; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">GET</span> https://cloud.onlysq.ru/file/fileid
#### Example
```python
import requests
url = 'https://cloud.onlysq.ru/file/tMgPiu'

response = requests.get(url, stream=True)
response.raise_for_status()

with open(response.headers['Content-Disposition'], 'wb') as file:
    for chunk in response.iter_content(chunk_size=8192):
        file.write(chunk)
```
### Delete file
Delete file from servers by file ID and Owner

Endpoint: <span style="color: white; background-color: #cc1111; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">DELETE</span> https://cloud.onlysq.ru/file/fileid
#### Example
```python
import requests

headers = {
    "Authorization":"ownerkey"
}

request = requests.delete('https://cloud.onlysq.ru/file/fileid', headers=headers)
response = request.json()
print(response)
```
#### Response
```json
{
	"ok": True
}
```

Endpoint: <span style="color: white; background-color: #2e7d32; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">GET</span> https://cloud.onlysq.ru/delete/fileid
#### Example
```python
import requests

headers = {
    "Authorization":"ownerkey"
}

request = requests.get('https://cloud.onlysq.ru/delete/fileid', headers=headers)
response = request.json()
print(response)
```
#### Response
```json
{
	"ok": True
}
```