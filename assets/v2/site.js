/* Email links: copy the address and say so, then let the mail app open as usual. */
(function(){
  var links=document.querySelectorAll('a[href^="mailto:"]');
  if(!links.length)return;
  var toast=document.createElement('div');
  toast.className='toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');
  document.body.appendChild(toast);
  var timer;
  function say(text){
    toast.textContent=text;toast.classList.add('on');
    clearTimeout(timer);timer=setTimeout(function(){toast.classList.remove('on')},2600);
  }
  function fallback(addr){
    var t=document.createElement('textarea');t.value=addr;t.setAttribute('readonly','');
    t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();
    var ok=false;try{ok=document.execCommand('copy')}catch(e){}
    document.body.removeChild(t);return ok;
  }
  Array.prototype.forEach.call(links,function(a){
    a.addEventListener('click',function(){
      var addr=a.getAttribute('href').slice(7).split('?')[0];
      var done=function(){say(addr+' copied')};
      if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(addr).then(done,function(){if(fallback(addr))done()});
      }else if(fallback(addr))done();
    });
  });
})();
