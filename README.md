# Packs repository

## File with info about pack in `info.json` structure.

- `id`: Pack identifier
- `name`: Pack name displayed
- `category`: Pack category
- `description` (optional): Pack description displayed in the modal after clicking on the question mark
- `description_type` (optional): Description type, if present, must be one of `markdown`, `html`
- `preview_format` (optional): File extension of preview, default is `jpg`, file name should be `preview`
- `incompatible` (optional): List of incompatible packs, each pack in `category_id/pack_id` format
- `versions` (optional): List of varying pack resources for different versions of **pack_format**
  - `format`: **pack_format** to apply this version, can be a single value: `5`, or a range: `1-5`, `5+`, `5-`
  - `folder`: A subfolder in the `versions` folder with resources for this version

[*Example*](resourcepacks/utility/glowing_ores/info.json)

## The following scheme is used to describe the folder and file structure.

For `resources.json`.

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

## Retrieving default resources

[*Answered here*](https://gaming.stackexchange.com/a/204641)

You should find `minecraft.jar`, and then run from folder with this file

```bash
unzip minecraft.jar 'assets/*' -d 'default'
```

Resource pack will be in the `default` folder.

*Where to find `minecraft.jar`*

- Official launcher: `<minecraft folder>/versions/<version>/`
- MultiMC: `<multimc folder>/libraries/com/mojang/minecraft/<version>/`

## [Pack format](https://minecraft.fandom.com/wiki/Resource_Pack#Pack_format)

| Format | Versions        |
|:-------|:----------------|
| `1`    | 1.6.1 - 1.8.9   |
| `2`    | 1.9 - 1.10.2    |
| `3`    | 1.11 - 1.12.2   |
| `4`    | 1.13 - 1.14.4   |
| `5`    | 1.15 - 1.16.1   |
| `6`    | 1.16.2 - 1.16.5 |
| `7`    | 1.17 - 1.17.1   |
| `8`    | 1.18 - 1.18.1   |

## Testing

You can use Java 17 for Minecraft 1.13+, Java 8 for Minecraft 1.6+

## Building

You need [imagemagick](https://imagemagick.org/script/download.php) installed, then

```bash
yarn install
yarn build
```

## Useful links

- https://minecraft.fandom.com/wiki/Resource_Pack
- https://minecraft.fandom.com/wiki/Model
- https://minecraft.fandom.com/wiki/History_of_textures
- https://minecraft.fandom.com/wiki/Texture_Update

- https://minecraft.fandom.com/wiki/Data_pack
