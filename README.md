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

## マイグレーション(データベースにテーブル作成若しくは更新)

マイグレーション用sql作成
```zsh
bunx drizzle-kit generate:sqlite
```

マイグレーション実行
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
