![](https://res.cloudinary.com/adonisjs/image/upload/q_100/v1547549861/mrm_entbte.png)

# @bingtsingw/mrm-preset

[mrm](https://github.com/sapegin/mrm) preset to keep configuration files in-sync and consistent across various projects. Highly inspired by [mrm-preset-default](https://github.com/sapegin/mrm/tree/master/packages/mrm-preset-default) and [@adonisjs/mrm-preset](https://github.com/adonisjs/mrm-preset).

> :white_check_mark: This project is configured by itself.

> :warning: This documentation uses [@antfu/ni](https://github.com/antfu/ni) for npm operations.

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

### Git Ignore

**Re-Create** `.gitignore` file inside the project root.

```bash
$ nr mrm gitignore
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

### Lint-Staged

1. Remove all `.lintstaged` configs
2. Add `lint-staged` package and add husky `pre-commit` hook

```bash
$ nr mrm lint-staged
```

### Commitizen

1. Remove all `commitizen` configs
2. Add `commitizen` packages and configs
3. Install husky hook if exists

```bash
$ nr mrm commitizen
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

```bash
$ nr mrm prettier
```

### Prisma

1. Add `prisma` package and script
2. Init `prisma` and add `diff.sh`

```bash
$ nr mrm prisma
```
