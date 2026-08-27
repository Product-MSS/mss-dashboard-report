#!/bin/bash
# ==============================================================================
# Template: LaunchScriptTemplate.sh
# Placeholder: Mitra1000s, 5174, /Users/admin/Documents/Office/Product Manager Space/Product Management/Mitra1000s/Data /Prototype /Mitra1000s
# Description: Desktop standalone launcher — membuka aplikasi dalam jendela
#              browser Chrome/Edge terpisah tanpa address bar (App mode).
# ==============================================================================

APP_NAME="Mitra1000s"
PORT="5174"
PROJECT_DIR="/Users/admin/Documents/Office/Product Manager Space/Product Management/Mitra1000s/Data /Prototype /Mitra1000s"
APP_URL="http://localhost:${PORT}"

echo "🚀 Launching ${APP_NAME} in Desktop App mode on port ${PORT}..."

# 1. Hentikan proses dev server yang mungkin masih berjalan di port yang sama
lsof -ti tcp:"${PORT}" | xargs kill -9 2>/dev/null || true

# 2. Start dev server di background
cd "${PROJECT_DIR}" || exit 1
npm run dev -- --port "${PORT}" &
DEV_SERVER_PID=$!
echo "   Dev server PID: ${DEV_SERVER_PID}"

# 3. Tunggu server siap (max 30 detik)
echo "   Waiting for server to be ready..."
MAX_WAIT=30
ELAPSED=0
until curl -s --head "${APP_URL}" > /dev/null 2>&1; do
  sleep 1
  ELAPSED=$((ELAPSED + 1))
  if [ "${ELAPSED}" -ge "${MAX_WAIT}" ]; then
    echo "❌ Server did not start within ${MAX_WAIT} seconds. Aborting."
    kill "${DEV_SERVER_PID}" 2>/dev/null
    exit 1
  fi
done
echo "   ✅ Server is ready at ${APP_URL}"

# 4. Buka di Chrome App mode (jika tersedia), fallback ke Edge, lalu default browser
WINDOW_SIZE="1440,900"
CHROME_FLAGS="--app=${APP_URL} --window-size=${WINDOW_SIZE} --no-first-run"

if command -v google-chrome &>/dev/null; then
  google-chrome ${CHROME_FLAGS} &
elif command -v chromium-browser &>/dev/null; then
  chromium-browser ${CHROME_FLAGS} &
elif command -v "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" &>/dev/null; then
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ${CHROME_FLAGS} &
elif command -v "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" &>/dev/null; then
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" ${CHROME_FLAGS} &
else
  echo "⚠️  Chrome/Edge tidak ditemukan. Membuka di browser default..."
  open "${APP_URL}" 2>/dev/null || xdg-open "${APP_URL}" 2>/dev/null || start "${APP_URL}" 2>/dev/null
fi

echo ""
echo "✅ ${APP_NAME} is running!"
echo "   URL    : ${APP_URL}"
echo "   Server : PID ${DEV_SERVER_PID}"
echo ""
echo "   Tekan Ctrl+C untuk menghentikan dev server."
wait "${DEV_SERVER_PID}"
