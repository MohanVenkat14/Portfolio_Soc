@echo off
echo Starting MEAN Stack Portfolio...
echo.
echo Backend server is starting...
start cmd /k "node server.js"
timeout /t 3 /nobreak >nul
echo.
echo Angular frontend is starting...
start cmd /k "ng serve --port 4200"
echo.
echo Both servers are running!
echo Backend: http://localhost:3000
echo Frontend: http://localhost:4200
pause