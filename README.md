# hackathon backend

## local 実行

### bun install

```zsh
curl -fsSL https://bun.sh/install | bash
```

```powershell
powershell -c "irm bun.sh/install.ps1|iex"
```

### package install

```zsh
bun install
```

### database と backend 起動

```zsh
bun run dev
```

## database にテーブルを作成

```zsh
bun run migration
```

## database に初期データ投入

```zsh
bun run init
```

## deploy

```zsh
bun run deploy
```
