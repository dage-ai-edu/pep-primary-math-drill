#!/bin/zsh
set -e

project_dir="${0:A:h}"
port=8000
while lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; do
  port=$((port + 1))
done

cd -- "$project_dir"
python3 -m http.server "$port" -d app &
server_pid=$!
trap 'kill "$server_pid" 2>/dev/null || true' EXIT INT TERM
sleep 1
open "http://localhost:$port/"
wait "$server_pid"
