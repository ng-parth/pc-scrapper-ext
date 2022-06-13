let finalProfile = {};
document.getElementById("test").addEventListener('click', () => {
  console.log("Popup DOM fully loaded and parsed");

  function modifyDOM() {
    //You can play with your DOM here or check URL against your regex
    console.log('Tab script:');
    // console.log(document.body);                   body > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(3) > font
    // const surname = document.querySelector('body > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(3) > font')?.innerHTML;
    // console.log('Surame: ', surname);
    const idQuerySelector = 'body > table:nth-child(4) > tbody > tr > td > p > b > font';
    const paginationTableSelector = 'body > table:nth-child(4)'
    let clonedPaginationNode;
    const queries = [
      {key: 'idText', displayText: 'Profile', querySelector: idQuerySelector},
      // {key: 'id', displayText: 'Id', querySelector: 'body > table:nth-child(5) > tbody > tr > td > p > b > font'},
      {key: 'id', displayText: 'Id', querySelector: idQuerySelector, processValue: qs => {
          const htmlString = document.querySelector(qs)?.innerHTML;
          const htmlArr = htmlString.split(':-&nbsp;&nbsp;PROFILE OF ');
          if (htmlArr.length === 2) {
            return htmlArr[0].replace('ID NO-', '');
          } else {
            return htmlString;
          }
        }},
      {key: 'name', displayText: 'Name', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(3) > td:nth-child(2) > font'},
      {key: 'surname', displayText: 'Surname', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(3) > font'},
      {key: 'age', displayText: 'Age', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(4) > td:nth-child(2) > font'},
      {key: 'height', displayText: 'Height', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(5) > td:nth-child(2) > font'},
      {key: 'weight', displayText: 'Weight', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(6) > td:nth-child(2) > font'},
      {key: 'qualification', displayText: 'Qualification', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(7) > td:nth-child(2) > font'},
      {key: 'occupation', displayText: 'Occupation', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(8) > td:nth-child(2) > font'},
      {key: 'native', displayText: 'Native', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(5) > font'},
      {key: 'father', displayText: 'Father', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(3) > td:nth-child(4) > font'},
      {key: 'fatherOccupation', displayText: 'Father\'s Occupation' , querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(4) > td:nth-child(4) > font'},
      {key: 'mother', displayText: 'Mother', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(5) > td:nth-child(4) > font'},
      {key: 'motherOccupation', displayText: 'Mother\'s Occupation', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(6) > td:nth-child(4) > font'},
      {key: 'brothers', displayText: 'Brothers', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(7) > td:nth-child(4) > font'},
      {key: 'sisters', displayText: 'Sisters', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(8) > td:nth-child(4) > font'},
      {key: 'familyIncome', displayText: 'Family Income', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(9) > td:nth-child(3) > font'},
      {key: 'personalIncome', displayText: 'Personal Income', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(9) > td:nth-child(5) > font'},
      {key: 'birthDate', displayText: 'Birth Date', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(11) > td:nth-child(1) > font', processValue: qs => qs && document.querySelector(qs)?.innerHTML.replace('D.O.B.-&nbsp;\n      ','')},
      {key: 'birthTime', displayText: 'Birth Time', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(11) > td:nth-child(2) > font', processValue: qs => qs && document.querySelector(qs)?.innerHTML.replace('BIRTH\n      TIME:-', '')},
      {key: 'birthPlace', displayText: 'Birth Place', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(11) > td:nth-child(3) > font', processValue: qs => qs && document.querySelector(qs)?.innerHTML.replace('BIRTH\n      PLACE:-', '')},
      {key: 'specs', displayText: 'Specs', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(12) > td:nth-child(1) > font', processValue: qs => qs && document.querySelector(qs)?.innerHTML.replace('SPECT:-', '')},
      {key: 'mangalShani', displayText: 'Mangal/Shani?', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(12) > td:nth-child(2) > font', processValue: qs => qs && document.querySelector(qs)?.innerHTML.replace('MANGAL/SHANI:-', '')},
      {key: 'aboutMe', displayText: 'About Me', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(13) > td:nth-child(2) > p > font'},
      {key: 'imageUrl', displayText: 'Image Url', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(1) > img', processValue: qs => qs && document.querySelector(qs)?.src },
      {key: 'address', displayText: 'Address', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(15) > td > p > font', processValue: qs => qs && document.querySelector(qs)?.innerHTML.replace('ADDRESS:-     ','')},
      {key: 'contactNo', displayText: 'Contact No', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(16) > td:nth-child(2) > font' },
      {key: 'email', displayText: 'Email', querySelector: 'body > table:nth-child(5) > tbody > tr:nth-child(16) > td:nth-child(3) > font > a' },

    ];
    if (!document.querySelector(idQuerySelector) && document.querySelector('body > table:nth-child(4) > tbody > tr').children.length === 3) {
      const paginationNode = document.querySelector(paginationTableSelector)
      clonedPaginationNode = paginationNode.cloneNode(true);
      paginationNode.remove();
    }
    // const extraDetails =
    // const finalJson = {
    //   candidate: {
    //     name: '',
    //     surname: '',
    //     age: '',
    //     height: '',
    //     weight: '',
    //     qualification: '',
    //     occupation: '',
    //     birthDate: '',
    //     birthTime: '',
    //     birthPlace: '',
    //   },
    //   family: {
    //     native: '',
    //     father: '',
    //     fatherOccupation: '',
    //     mother: '',
    //     motherOccupation: '',
    //     brothers: '',
    //     sisters: '',
    //   },
    //   extraDetails: {
    //
    //   }
    // }
    let tableBody = '';
    const finalJson = queries.map(detail => {
      const {key, querySelector: qs, displayText, processValue } = detail;
      // qs && console.log(`${key}: `,  document.querySelector(qs));
      let value = qs && document.querySelector(qs)?.innerHTML;
      if (processValue) value = processValue(qs);
      const returnVal = {key, value, displayText};
      if(qs) tableBody += `<tr><td>${displayText}</td><td>${returnVal.value}</td></tr>`;
      return returnVal;
    });
    const tableNode = document.getElementById('dataTable');
    // console.log('TableNode: ', tableNode)
    // tableNode.innerHTML = tableBody;
    console.log('FinalJson: ', JSON.stringify(finalJson)) ;
    return finalJson;
  }

  //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
  chrome.tabs.executeScript({
    code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
  }, (results) => {
    //Here we have just the innerHTML and not DOM structure
    console.log('Popup script:')
    //alert(results[0].length);
    // alert('Doc ? '  + document.getElementById('dataTable').outerHTML);
    const tableNode = document.getElementById('dataTable');
    let tableBody = '';
    results[0].map(({key, value, displayText}) => {
      finalProfile[key] = value;
      tableBody += `<tr><td>${displayText}:</td><td>${value}</td></tr>`;
    });
    finalProfile.status = true;
    finalProfile.connectionStatus = 'SHORTLISTED';
    tableBody += `<tr><td id="status">Status</td><td id="status1">Status 1</td></tr>`;
    tableNode.innerHTML = tableBody;
    document.getElementById('saveBtn').style.display = 'inherit';
    // alert('TableNode: ' + tableBody);
  });
});
document.getElementById("saveBtn").addEventListener('click', () => {
  function modifyStatus() {}
  function makeApiCall(method = 'GET', url = '', data = null) {
    // 1. Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configure it: GET-request for the URL /article/.../load
    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    // 3. Send the request over the network
    xhr.send(data ? JSON.stringify(data) : data);

    // 4. This will be called after the response is received
    xhr.onload = function() {
      if (xhr.status != 200) { // analyze HTTP status of the response
        document.getElementById('status').style.background = 'gray';
        document.getElementById('status').innerHTML = 'Request Failed';
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
      } else { // show the result
        let responseKeys = xhr.response;
        document.getElementById('status').style.background = 'green';
        document.getElementById('status').innerHTML = 'Request Success';
        alert(`Saved successfully.`); // response is the server response
        console.log('===> Api Response: ', xhr.response);
      }
    };
    //
    // xhr.onprogress = function(event) {
    //   if (event.lengthComputable) {
    //     alert(`Received ${event.loaded} of ${event.total} bytes`);
    //   } else {
    //     alert(`Received ${event.loaded} bytes`); // no Content-Length
    //   }
    //
    // };

    xhr.onerror = function() {
      document.getElementById('status').innerHTML = 'Req failed';
      document.getElementById('status').style.background = 'red';
      alert("Request failed");
    };
  }
  chrome.tabs.executeScript({
    code: '(' + modifyStatus + ')();' //argument here is a string but function.toString() returns function's code
  }, (results) => {
    //Here we have just the innerHTML and not DOM structure

    document.getElementById('status').style.background = 'gray';
    document.getElementById('status').innerHTML = `Starting request: ${finalProfile || 'No profile data'}` ;
    // makeApiCall('POST', 'http://localhost:8090/api/p-club/profile', finalProfile || {profile:'No profile Data'});
    makeApiCall('POST', 'http://guarded-ridge-6883.herokuapp.com/api/p-club/profile', finalProfile || {profile:'No profile Data'});
    document.getElementById('status1').style.background = 'red'
  });
})

