#!/bin/bash
# Sobe o portal Tech Fisco localmente e abre no navegador.
# Duplo-clique neste arquivo no Finder, ou rode: ./servir.command
# Para parar o servidor: Control+C nesta janela do Terminal.

cd "$(dirname "$0")" || exit 1

PORTA=8080
while lsof -i :$PORTA >/dev/null 2>&1; do
  PORTA=$((PORTA + 1))
done

echo "Tech Fisco — servidor local"
echo "Pasta: $(pwd)"
echo "URL:   http://localhost:$PORTA/"
echo
echo "Abrindo no navegador. Para parar, pressione Control+C."
echo "─────────────────────────────────────────────────────"

( sleep 1; open "http://localhost:$PORTA/" ) &

python3 -m http.server "$PORTA"
