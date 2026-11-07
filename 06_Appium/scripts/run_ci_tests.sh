#!/usr/bin/env bash
# รันชุด Appium (pytest + Robot Framework) บน emulator ที่เปิดอยู่แล้ว สำหรับ CI
# ต้องเป็นสคริปต์เดียว เพราะ android-emulator-runner รันแต่ละบรรทัดของ `script:` แยก shell กัน
# ตัวแปรสถานะข้ามบรรทัดจึงหาย และ workflow จะเขียวทั้งที่เทสล้ม
#
# Exit code: 0 = ผ่านทั้งสองชุด, 1 = ชุดใดชุดหนึ่งล้ม
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
mkdir -p "$ROOT/06_Appium/results"

nohup appium > "$ROOT/06_Appium/results/appium.log" 2>&1 &

# รอ Appium server พร้อมรับ session (สูงสุด 60 วินาที)
for _ in $(seq 1 30); do
  curl -sf http://127.0.0.1:4723/status > /dev/null && break
  sleep 2
done

status=0
pytest "$ROOT/06_Appium/tests/py" -m "not known_defect" || status=1
robot -d "$ROOT/06_Appium/results/robot" -e known-defect "$ROOT/06_Appium/tests/robot" || status=1
exit "$status"
