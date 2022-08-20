![](https://res.cloudinary.com/adonisjs/image/upload/q_100/v1547549861/mrm_entbte.png)

# @bingtsingw/mrm-preset

[mrm](https://github.com/sapegin/mrm) preset to keep configuration files in-sync and consistent across various projects.  
Inspired by [mrm-preset-default](https://github.com/sapegin/mrm/tree/master/packages/mrm-preset-default) and [@adonisjs/mrm-preset](https://github.com/adonisjs/mrm-preset)

> :warning: I use [@antfu/ni](https://github.com/antfu/ni) in this readme file to install npm packages.

## Usage

```bash
$ ni mrm @bingtsingw/mrm-preset -D
```

Add script to package.json file

```json
{
  "scripts": {
    "mrm": "mrm --preset=@bingtsingw/mrm-preset"
  }
}
```

## Tasks

### Editorconfig

**Remove** and **Re-Create** a `.editorconfig` file inside the project root.

```bash
$ nr mrm editorconfig
```

### VSCode

Create a `.vscode/settings.json` file to set basic editor settings.

```bash
$ nr mrm vscode
```

### Husky

1. Remove current `.husky` folder
2. Add `husky` package and run `npx husky install`

```bash
$ nr mrm husky
```

### Typescript

1. Create `tsconfig.json`
2. Update `.vscode/settings.json` to support typescript
3. install `typescript`, `@types/node`

```bash
$ nr mrm typescript
```

### Prettier

1. Remove all prettier config files
2. Add `.prettierrc.json` and `.prettierignore` file
3. Update `.vscode/settings.json` settings
4. Add `package.json` scripts
5. install `prettier`
   1. install `prettier-plugin-organize-imports` if in a typescript project
