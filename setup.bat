if not "%minimized%"=="" goto :minimized
set minimized=true
@echo off
cls

if "%ProgramFiles(x86)%" == "" (
    set "MySQLServerPath=%ProgramFiles%\MySQL\MySQL Installer for Windows\"
    set "MySQLCommand=%ProgramFiles%\MySQL\MySQL Server 5.7\bin\"
    set "HomeCloudPath=%ProgramFiles%\HomeCloud\"
    set "nodejsPath=%ProgramFiles%\nodejs"
    if not exist mkdir %ProgramFiles%\HomeCloud
) else (
    set "MySQLServerPath=%ProgramFiles(x86)%\MySQL\MySQL Installer for Windows\"
    set "MySQLCommand=%ProgramFiles(x86)%\MySQL\MySQL Server 5.7\bin\"
    set "HomeCloudPath=%ProgramFiles(x86)%\HomeCloud\"
    If not exist mkdir %ProgramFiles%\HomeCloud
    set "nodejsPath=%ProgramFiles(x86)%\nodejs"
)

for %%i in ("%~dp0.") do set "mypath=%%~fi"

for /f "tokens=1-2 delims=:" %%a in ('ipconfig^|find "IPv4"') do set ip=%%b
set ipAddress=%ip:~1%

echo MYSQL_PASS=mysql >> %mypath%\backend\.env
echo UPLOAD_FOLDER = / >> %mypath%\backend\.env

echo REACT_APP_HOST_IP=%ipAddress% >> %mypath%\frontend\.env

xcopy /e /v "%mypath%" "%HomeCloudPath%"

echo Starting MySQL install ...

%mypath%\vcredist_x86.exe /q /norestart
%mypath%\vcredist_x64.exe /q /norestart

%SystemRoot%\System32\msiexec.exe /i https://dev.mysql.com/get/Downloads/MySQLInstaller/mysql-installer-web-community-8.0.23.0.msi /qn
cd %MySQLServerPath%
MySQLInstallerConsole community install server;5.7.14;x86:*:port=3306;rootpasswd=mysql;servicename=MySQL -silent
echo MySQL installed successfully.

rem if not "%PATH:~-1%" == ";" set "PATH=%PATH%;"
rem set "PATH=%PATH%%MySQLServerPath%"

echo Starting Nodejs install ...
%SystemRoot%\System32\msiexec.exe /i https://nodejs.org/dist/v14.16.0/node-v14.16.0-x86.msi /qn
echo NodeJs installed successfully.

echo Configurating HomeCloud ...
cd %MySQLCommand%
mysql.exe -uroot -pmysql -e "CREATE DATABASE HomeCloud;"
mysql.exe --database=HomeCloud -uroot -pmysql -e "source %HomeCloudPath%db\init.sql"

SET PATH=%nodejsPath%;%PATH%

cd %HomeCloudPath%/backend && CMD /c "npm install"

cd %HomeCloudPath%/frontend && CMD /c "npm install"

cd %HomeCloudPath%/backend
start /min CMD /k "node server.js"

cd %HomeCloudPath%/frontend
start /min CMD /k "npm run start"

echo Do not close the other windows!
echo Your site will be available on: http://%ipAddress%:3000/

pause <null

rem Detele downloaded folder
rem not sure maybe it will not work because of the setup file in dir
CMD /k "rmdir /s %mypath%"
