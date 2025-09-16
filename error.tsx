function mostrarError(mensaje:string){
    const errorDiv =document.createElement('div');
    errorDiv.style.position ='fixed';
    errorDiv.style.top = '0';
    errorDiv.style.left = '0';
    errorDiv.style.width = '100%';
    errorDiv.style.backgroundColor = 'red';
    errorDiv.style.color = 'white';
    errorDiv.style.padding = '10px';
    errorDiv.style.zIndex = '1000';
    errorDiv.style.textAlign = 'center';
    errorDiv.textContent = 'error en la pagina: ${mensaje}';
    document.body.appendChild(errorDiv);
}
window.onerror = function (message,source,lieno,colno,error){
 mostrarError(message?.toString() || 'error desconocido');
 return true;   
};
