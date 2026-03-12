Set ws = CreateObject("WScript.Shell")
Set sc = ws.CreateShortcut(ws.SpecialFolders("Startup") & "\PoranosManagementUI.lnk")
sc.TargetPath = "powershell.exe"
sc.Arguments = "-WindowStyle Hidden -ExecutionPolicy Bypass -File C:\Services\poranos-management\open_management_ui.ps1"
sc.WindowStyle = 7
sc.Save
