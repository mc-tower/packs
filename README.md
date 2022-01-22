# Packs repository

## How to fill `resources.json`

1. Write folders in nested format

```json
{
  "folder1": {
    "folder2": {}
  }
}
```

2. Write files in one folder as array

```json
{
  "folder": ["file1.png", "file2.png"]
}
```

3. If you have folder with  files and other folders, write files as array under key `"."`

```json
{
  ".": ["file1.png", "file2.png"],
  "folder1": {},
  "folder2": {}
}
```

4. If you have structure like

```
- folder1
  - folder2
    - folder3
```

you can write instead of

```json
{
  "folder1": {
    "folder2": {
      "folder3": {}
    }
  }
}
```

this:

```json
{
  "folder1/folder2/folder3": {}
}
```

For example, you have this folders structure:

```
- pack.mcmeta
- assets
  - minecraft
    - textures
      - block
        - acacia_log.png
```

create `resources.json` in resource pack root folder and fill with this content:

```json
{
  ".": ["pack.mcmeta"],
  "assets/minecraft/textures/block": ["acacia_log.png"]
}
```
