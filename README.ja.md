
# SwitchBot CLI command (unofficial)
[English](README.md) | [日本語](README.ja.md)

SwitchBotのホームオートメーション機器をリモート制御するためのコマンドライン・プログラムです。

## How to install

```bash
npm install -g switchbot-cli
```

## Getting started

はじめに、SwitchBot モバイルアプリでtokenとsecretを取得する必要があります。
アプリの設定で、アプリバージョン(app version)を10回クリックすると開発者メニューが表示されます。
そこからtokenとsecretを得られます。


初めてコマンドを実行したときに、token と secretの入力を促すプロンプトが表示されます。コピー＆ペーストで入力して下さい。


## How to use

ヘルプで使えるコマンドが表示されます。

```bash
switchbot-cli help
```

## Control `device`

まずは、デバイスの一覧を取得しましょう

```bash
switchbot-cli device list
```

デバイスの状態を確認するには、上記のリストで得られる ``deviceId``を使います。

```bash
switchbot-cli device -d {deviceId} status
```

デバイス固有のコマンドは``help``で確認できます。

```bash
switchbot-cli device -d {deviceId} help
```

例えば、デバイスの電源を入れるには以下のように実行できます。

```bash
switchbot-cli device -d {deviceId} turnOn
```

``-d {deviceId}``の入力が面倒な場合は、``device use`` コマンドでデフォルトのデバイスを覚えておくことができます。

```bash
switchbot-cli device use {deviceId}
```

一度登録すると``-d {deviceId}``オプションは不要です。単に以下のように実行すると、デフォルトデバイスの電源を入れることができます。

```bash
switchbot-cli device turnOn
switchbot-cli device turnOff
switchbot-cli device status
...
```

## Control `scene`

SwitchBotアプリで登録した`シーン`の制御もできます。

シーン一覧を取得してみましょう。

```bash
switchbot-cli scene list
```

シーンの実行には、上の``scene list``コマンドで得られるsceneIdが必要になります。以下のように実行します。

```bash
switchbot-cli scene exec {sceneId}
```

## Clear config and cache

tokenとsecretは保存されます。また、device listはキャッシュされます。
これらのコマンドの保存したデータは、以下のコマンドで初期化できます。

```bash
switchbot-cli clean
```

## Disclaimer

- Webhookに関するコマンドは未実装
- すべてのコマンドが実装されているわけではありません（貢献歓迎）
- いくつかの「デバイス固有」コマンドは実際の機器でテストされていません（テストして動いたら連絡くれたら嬉しい!）

## License

- The MIT License

## Technical info

本プログラムは、内部で[SwitchBot が用意している Web API](https://github.com/OpenWonderLabs/SwitchBotAPI)を使っています。
プログラムはNodeJSで記述されています。

