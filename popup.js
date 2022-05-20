document.addEventListener('DOMContentLoaded', function() {
  alert('DomLoaded');
  chrome.debugger
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {
    chrome.debugger
    alert('--- Button clicked ---');
    alert('--- chrome ---' + !!chrome);
    alert('--- chrome.tabs ---' + !!chrome.tabs);
    alert('--- chrome.tabs.getSelected ---' + !!chrome.tabs.getSelected);
    // alert('--- Button clicked ---');
    // alert('--- Button clicked ---');
    console.log('--- Button clicked ---');
    chrome.tabs.getSelected(null, function(tab) {
      console.log('tab: ', tab);
      alert('tab: ' + tab);
      d = document;
      alert(JSON.toString(a));
      var f = d.createElement('form');
      f.action = 'http://gtmetrix.com/analyze.html?bm';
      f.method = 'post';
      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();
    });
  }, false);
}, false);
