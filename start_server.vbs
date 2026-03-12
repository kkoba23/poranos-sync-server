Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Services\poranos-sync"
WshShell.Run "cmd /C python server.py >> server.log 2>&1", 0, False
