const electron = require('electron');
const { BrowserWindow, app} = electron;
const url = require('url');
const path = require('path')
let mainWindow = null;


app.on("ready",function() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,  
      enableRemoteModule: true
    }
  });
  
  mainWindow.maximize();
  mainWindow.setTitle('Duties Made Easy');

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname,'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.webContents.openDevTools()
 

  mainWindow.on('close', () => {
    app.quit();
  })
});




/*const fs = require('fs');
const { spawn} = require("child_process")

const ls = spawn('python', ['test.py']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`process exited with code ${code}`);
});
*/