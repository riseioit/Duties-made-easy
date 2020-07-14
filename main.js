const electron = require('electron');
const { BrowserWindow, app} = electron;
const url = require('url');
const path = require('path');
const { exec, execSync } = require('child_process');
const remote = electron.remote;
const { dialog, shell, ipcMain } = require('electron');
let mainWindow = null;
let pythonCheck = null;
let response = null;

process.env.NODE_ENV = 'production';

app.on("ready",function() {




  /*It will check wheather the pip package manager is installed 
  in the system or not*/  
  try { execSync('pip', (error, stdout, stderr) => {
    /*if error occured means python is not installed in the pc, hence
    new window is created which tells the user to install python*/
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  }); 
  } catch {
    const options = {
      type: 'error',
      buttons: ['Cancel', 'Install Python'],
      defaultId: 2,
      title: 'Sytem Error',
      message: 'Python is not installed in your system',
      detail: 'Please install python and try again later'

    };
    response = dialog.showMessageBoxSync(mainWindow, options);
    if(response == 1 ) {
      shell.openExternal('https://www.python.org/downloads/').then(app.quit());
      
    }
    else { app.quit(); }
    

 }








  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, 
      enableRemoteModule: true
    }
  });

  mainWindow.setTitle('Duties Made Easy');
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname,'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  mainWindow.focus();
  mainWindow.maximize();
  mainWindow.webContents.openDevTools()
 
});


app.on('window-all-closed', () => {
  app.quit()
})

module.exports = {
  mainWindow: mainWindow
};

ipcMain.on('download-file', (event, arg) => {
  let obj = arg.split('/');
  let file = obj.pop();
  let filePath = obj.join('/').concat('/');
  console.log(file);
  console.log("filePath : " + filePath);

const fs = require('fs');
const { spawn} = require("child_process")

const ls = spawn('python', ['test.py', filePath, file]);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`process exited with code ${code}`);
  if (code == 0) {
    event.reply('file-downloaded', 'file downloaded succesfully');
  }
  
});

});
