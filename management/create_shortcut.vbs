Set ws = CreateObject("WScript.Shell")
Set sc = ws.CreateShortcut(ws.SpecialFolders("Startup") & "\PoranosDesktopUI.lnk")
sc.TargetPath = "powershell.exe"
sc.Arguments = "-WindowStyle Hidden -ExecutionPolicy Bypass -File C:\Services\poranos-desktop\open_management_ui.ps1"
sc.WindowStyle = 7
sc.Save
