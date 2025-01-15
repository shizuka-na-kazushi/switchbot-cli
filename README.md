# SwitchBot CLI command (unofficial)
[English](README.md) | [日本語](README.ja.md)

A command-line program for remote control of SwitchBot home automation devices.

## How to install

```bash
npm install switchbot-cli
```

## Getting started

First, you need to obtain a token and secret from the SwitchBot mobile app.
In the app settings, tap the app version 10 times to reveal the developer menu.
You can obtain the token and secret from there.
When you run a command for the first time, you'll be prompted to enter the token and secret. Simply copy and paste them when prompted.

## How to use
You can view available commands using the help command:

```bash
switchbot-cli help
```

## Control device
Let's start by getting a list of devices:

```bash
switchbot-cli device list
```

To check the status of a device, use the ``deviceId`` obtained from the list above:

```bash
switchbot-cli device -d {deviceId} status
```

Device-specific commands can be viewed using ``help``:

```bash
switchbot-cli device -d {deviceId} help
```

For example, to turn on a device, you can execute:

```bash
switchbot-cli device -d {deviceId} turnOn
```

If you find entering ``-d {deviceId}`` tedious, you can set a default device using the device use command:

```bash
switchbot-cli device use {deviceId}
```

Once registered, the ``-d {deviceId}`` option becomes optional. You can simply execute commands like this to control the default device:

```bash
switchbot-cli device turnOn
switchbot-cli device turnOff
switchbot-cli device status
...
```

## Control scene
You can also control scenes registered in the SwitchBot app.
Let's retrieve a list of scenes:

```bash
switchbot-cli scene list
```

To execute a scene, you'll need the sceneId obtained from the ``scene list`` command above. Execute it like this:

```bash
switchbot-cli scene exec {sceneId}
```

## Clear config and cache
The token and secret are saved, and the device list is cached.
You can clear all saved data using the following command:

```bash
switchbot-cli clean
```

## Disclaimer

Webhook-related commands are not implemented
Not all commands are implemented (contributions welcome)
Some "device-specific" commands haven't been tested with actual devices (please let me know if you test them and they work!)

## License

The MIT License

## Technical info

This program internally uses [the Web API provided by SwitchBot]((https://github.com/OpenWonderLabs/SwitchBotAPI)).
The program is written in NodeJS.
