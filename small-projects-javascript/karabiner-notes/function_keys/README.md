## recommended usage

Mac:
- System preferences > Keyboard > `Use F1, F2, etc as standard function keys`
- Optional: Shortcuts
  - Mission Control:
    - Mission Control: F3
    - Application Windows: F4
    - Show Desktop: F5
  - All Applications - Show Help Menu
  - Keyboard - move focus to next window

Karabiner: leave `Use F1, F2, etc as standard function keys` unchecked

## paths

All devices

```
profiles[] > {} > fn_function_keys{}
```

Specific device

```
profiles[] > {} > devices[] > {} > fn_function_keys{}
```

## shape

```
[
  {
      "from": {
          "key_code": "f1"
      },
      "to": {
          "key_code": "f1"
      }
  },
  {
      "from": {
          "key_code": "f2"
      },
      "to": {
          "key_code": "f2"
      }
  },
...
]
```

Useful:

```
"to": {
  "key_code": "mission_control"
}

"to": {
  "consumer_key_code": "volume_increment"
}
```

Not all Mac functions are available in karabiner.
