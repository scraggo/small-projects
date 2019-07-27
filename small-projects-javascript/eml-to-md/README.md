# eml-to-md

Command-line tool to get .eml files into a basic markdown format (with an emphasis on getting links into markdown.)

## Getting started

`npm i`

## Running the script

`npm start -- <path to .eml files>` (note the `--` to allow npm to pass in arguments)

The directory may contain one or more `.eml` files. All files will be concatenated into one file.

Options:

```txt
OPT: --linksOnly - get list of links in email only.
OPT: --output=<output filename> - output filename (spaces disallowed)
```

## Dependencies

[eml-format - EML file format parser and builder](https://github.com/papnkukn/eml-format)

## Contributing

Please do!
