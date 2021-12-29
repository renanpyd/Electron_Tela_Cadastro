// Módulos para controlar a vida do aplicativo e criar janela nativa do navegador
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
	// Cria a janela do navegador.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		x: 20,
		y: 20,
		//resizable: false, // Define se o usuário pode ou não alterar o tamanho da tela.
		// alwaysOnTop: true, // Força a tela ficar sobreposta as demais.
		show: false, // Roda o processo mas não apresenta a tela.
		webPreferences: {
							preload: path.join(__dirname, 'preload.js')
		}
	})

	// Carregua o index.html do aplicativo.
	mainWindow.loadFile('index.html')
	
	//Cria um evento para apresentar a janela quando ela estiver pronta para ser mostrada.
	mainWindow.on('ready-to-show', () => {
		mainWindow.show();
	});
	
	// Abre o DevTools.
	// mainWindow.webContents.openDevTools()
}

// Este método será chamado quando o Electron terminar a
// inicialização, e está pronto para criar janelas do navegador.
// Algumas APIs só podem ser usadas após a ocorrência desse evento.
app.whenReady().then(() => {
	createWindow()

	app.on('activate', function () {
		// No macOS, é comum recriar uma janela no aplicativo quando o
		// ícone de encaixe é clicado e não há outras janelas abertas.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Encerre quando todas as janelas estiverem fechadas, exceto no macOS. 
// Ai é comum para que os aplicativos e sua barra de menu permaneçam 
// ativos até que o usuário saia explicitamente com Cmd + Q.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

// Neste arquivo, você pode incluir o resto do código do processo principal 
// específico do seu aplicativo. Você também pode colocá-los 
// em arquivos separados e solicitá-los aqui.
