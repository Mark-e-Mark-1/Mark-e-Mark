@echo off
cd /d "%~dp0"

echo.
echo  Basic Spreadsheet — local server
echo  =================================
echo  Open: http://localhost:3000
echo.
echo  Keep this window open while you use the spreadsheet.
echo.

where npx >nul 2>&1
if %ERRORLEVEL%==0 (
  start "" "http://localhost:3000"
  npm run serve
  goto :done
)

where python >nul 2>&1
if %ERRORLEVEL%==0 (
  start "" "http://localhost:3000"
  python -m http.server 3000
  goto :done
)

where py >nul 2>&1
if %ERRORLEVEL%==0 (
  start "" "http://localhost:3000"
  py -m http.server 3000
  goto :done
)

echo Could not find Node.js (npx) or Python.
pause

:done
