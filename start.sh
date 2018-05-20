#!/bin/bash
if command -v python3 &>/dev/null; then
  echo "Using Python3 Simple Server";
  python3 -m http.server 8123
else
  echo "Using Python2";
  python -m SimpleHTTPServer 8123
fi