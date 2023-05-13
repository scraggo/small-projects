#! /bin/bash

function link() {
  echo "Enter an absolute filepath:"
  read -r filepath
  filename=$(basename "$filepath")
  ln "$filepath" "./$filename"
}

link
