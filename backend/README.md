# hackathon backend

## local 実行

### package install

```zsh
npm install
```

### database と backend 起動

```zsh
npm run dev
```

## database にテーブルを作成

```zsh
npx wrangler d1 execute hackathon --local --file="./database/migration.sql
```

## database に初期データ投入

```zsh
npx wrangler d1 execute hackathon --local --file="./database/init.sql"
```

## deploy

```zsh
npm run deploy
```
