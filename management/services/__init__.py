import os
import sys


def get_adb_path() -> str:
    """Return path to adb executable, preferring bundled vendor copy."""
    if getattr(sys, "frozen", False):
        bundled = os.path.join(sys._MEIPASS, "vendor", "adb.exe")
    else:
        bundled = os.path.join(os.path.dirname(__file__), "..", "vendor", "adb.exe")

    if os.path.isfile(bundled):
        return bundled
    # Fallback to PATH
    return "adb"
