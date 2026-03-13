import os
import sys


def get_adb_path() -> str:
    """Return path to adb executable, preferring bundled vendor copy."""
    adb_name = "adb.exe" if sys.platform == "win32" else "adb"

    if getattr(sys, "frozen", False):
        bundled = os.path.join(sys._MEIPASS, "vendor", adb_name)
    else:
        bundled = os.path.join(os.path.dirname(__file__), "..", "vendor", adb_name)

    if os.path.isfile(bundled):
        return bundled
    # Fallback to PATH
    return "adb"
